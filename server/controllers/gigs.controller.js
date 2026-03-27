const pool = require('../config/db');
const { paginationMeta } = require('../utils/pagination');

exports.listGigs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const { category, search, sort } = req.query;

    let where = 'WHERE g.status = "active"';
    const params = [];

    if (category) {
      where += ' AND c.name = ?';
      params.push(category);
    }
    if (search) {
      where += ' AND (g.title LIKE ? OR g.search_tags LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    let orderBy = 'ORDER BY g.created_at DESC';
    if (sort === 'rating') orderBy = 'ORDER BY g.overall_rating DESC';
    if (sort === 'price_low') orderBy = 'ORDER BY min_price ASC';
    if (sort === 'price_high') orderBy = 'ORDER BY min_price DESC';

    const countSql = `SELECT COUNT(*) as total FROM gigs g LEFT JOIN categories c ON g.category_id = c.id ${where}`;
    const [[{ total }]] = await pool.query(countSql, params);

    const sql = `
      SELECT g.*, c.name as category_name,
        u.first_name, u.last_name, u.avatar, u.initials,
        fp.badge, fp.badge_color,
        (SELECT MIN(price) FROM gig_packages WHERE gig_id = g.id) as min_price,
        (SELECT image_url FROM gig_images WHERE gig_id = g.id ORDER BY sort_order LIMIT 1) as image
      FROM gigs g
      LEFT JOIN categories c ON g.category_id = c.id
      LEFT JOIN users u ON g.freelancer_id = u.id
      LEFT JOIN freelancer_profiles fp ON g.freelancer_id = fp.user_id
      ${where}
      ${orderBy}
      LIMIT ? OFFSET ?
    `;

    const [gigs] = await pool.query(sql, [...params, limit, offset]);

    const result = gigs.map((g) => ({
      id: g.id,
      title: g.title,
      price: g.min_price,
      rating: g.overall_rating,
      reviewCount: g.review_count,
      likes: g.likes,
      image: g.image,
      category: g.category_name,
      seller: {
        id: g.freelancer_id,
        username: `${g.first_name} ${g.last_name}`,
        avatar: g.avatar,
        initials: g.initials,
        badge: g.badge,
        badgeColor: g.badge_color,
      },
    }));

    res.json({ success: true, gigs: result, pagination: paginationMeta(total, page, limit) });
  } catch (err) {
    next(err);
  }
};

exports.getGig = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [gigs] = await pool.query(`
      SELECT g.*, c.name as category_name, sc.name as subcategory_name
      FROM gigs g
      LEFT JOIN categories c ON g.category_id = c.id
      LEFT JOIN subcategories sc ON g.subcategory_id = sc.id
      WHERE g.id = ?
    `, [id]);

    if (!gigs.length) {
      return res.status(404).json({ success: false, message: 'Gig not found' });
    }

    const gig = gigs[0];

    // Get seller info
    const [sellers] = await pool.query(`
      SELECT u.*, fp.*
      FROM users u
      LEFT JOIN freelancer_profiles fp ON u.id = fp.user_id
      WHERE u.id = ?
    `, [gig.freelancer_id]);

    const [languages] = await pool.query('SELECT language, level FROM freelancer_languages WHERE user_id = ?', [gig.freelancer_id]);
    const [packages] = await pool.query('SELECT * FROM gig_packages WHERE gig_id = ? ORDER BY FIELD(tier, "basic", "standard", "premium")', [id]);
    const [images] = await pool.query('SELECT * FROM gig_images WHERE gig_id = ? ORDER BY sort_order', [id]);
    const [faqs] = await pool.query('SELECT * FROM gig_faqs WHERE gig_id = ? ORDER BY sort_order', [id]);
    const [reviews] = await pool.query(`
      SELECT r.*, u.first_name, u.last_name, u.avatar, u.initials, u.country
      FROM reviews r
      LEFT JOIN users u ON r.reviewer_id = u.id
      WHERE r.gig_id = ?
      ORDER BY r.created_at DESC
    `, [id]);

    const seller = sellers[0];
    const pkgs = {};
    packages.forEach((p) => {
      pkgs[p.tier] = {
        name: p.name,
        price: p.price,
        description: p.description,
        deliveryDays: p.delivery_days,
        revisions: p.revisions,
        features: typeof p.features === 'string' ? JSON.parse(p.features) : p.features,
      };
    });

    res.json({
      success: true,
      gig: {
        id: gig.id,
        title: gig.title,
        category: gig.category_name,
        subcategory: gig.subcategory_name,
        description: gig.description,
        about: typeof gig.about === 'string' ? JSON.parse(gig.about) : gig.about,
        requirements: typeof gig.requirements === 'string' ? JSON.parse(gig.requirements) : gig.requirements,
        searchTags: typeof gig.search_tags === 'string' ? JSON.parse(gig.search_tags) : gig.search_tags,
        rating: gig.overall_rating,
        reviewCount: gig.review_count,
        likes: gig.likes,
        seller: {
          id: seller.id,
          username: `${seller.first_name} ${seller.last_name}`,
          avatar: seller.avatar,
          initials: seller.initials,
          badge: seller.badge,
          badgeColor: seller.badge_color,
          rating: seller.rating,
          reviewCount: seller.review_count,
          ordersInQueue: seller.orders_in_queue,
          memberSince: seller.member_since,
          country: seller.country,
          avgResponseTime: seller.avg_response_time,
          lastDelivery: seller.last_delivery,
          languages,
        },
        packages: pkgs,
        images: images.map((i) => ({ id: i.id, url: i.image_url, sortOrder: i.sort_order })),
        faqs: faqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer })),
        reviews: reviews.map((r) => ({
          id: r.id,
          rating: r.rating,
          comment: r.comment,
          createdAt: r.created_at,
          reviewer: {
            name: `${r.first_name} ${r.last_name}`,
            avatar: r.avatar,
            initials: r.initials,
            country: r.country,
          },
        })),
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.createGig = async (req, res, next) => {
  try {
    if (req.user.role !== 'freelancer') {
      return res.status(403).json({ success: false, message: 'Only freelancers can create gigs' });
    }

    const { title, categoryId, subcategoryId, description, requirements, searchTags, about, packages } = req.body;

    const [result] = await pool.query(
      'INSERT INTO gigs (freelancer_id, title, category_id, subcategory_id, description, requirements, search_tags, about) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [req.user.id, title, categoryId, subcategoryId || null, description, JSON.stringify(requirements), JSON.stringify(searchTags), JSON.stringify(about)]
    );

    const gigId = result.insertId;

    // Insert packages
    if (packages) {
      for (const tier of ['basic', 'standard', 'premium']) {
        if (packages[tier]) {
          const p = packages[tier];
          await pool.query(
            'INSERT INTO gig_packages (gig_id, tier, name, price, description, delivery_days, revisions, features) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [gigId, tier, p.name, p.price, p.description, p.deliveryDays, p.revisions, JSON.stringify(p.features)]
          );
        }
      }
    }

    res.status(201).json({ success: true, gigId });
  } catch (err) {
    next(err);
  }
};

exports.updateGig = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [gigs] = await pool.query('SELECT freelancer_id FROM gigs WHERE id = ?', [id]);

    if (!gigs.length) return res.status(404).json({ success: false, message: 'Gig not found' });
    if (gigs[0].freelancer_id !== req.user.id) return res.status(403).json({ success: false, message: 'Not authorized' });

    const { title, description, requirements, searchTags, about } = req.body;
    const fields = [];
    const values = [];

    if (title) { fields.push('title = ?'); values.push(title); }
    if (description) { fields.push('description = ?'); values.push(description); }
    if (requirements) { fields.push('requirements = ?'); values.push(JSON.stringify(requirements)); }
    if (searchTags) { fields.push('search_tags = ?'); values.push(JSON.stringify(searchTags)); }
    if (about) { fields.push('about = ?'); values.push(JSON.stringify(about)); }

    if (fields.length) {
      values.push(id);
      await pool.query(`UPDATE gigs SET ${fields.join(', ')} WHERE id = ?`, values);
    }

    res.json({ success: true, message: 'Gig updated' });
  } catch (err) {
    next(err);
  }
};

exports.deleteGig = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [gigs] = await pool.query('SELECT freelancer_id FROM gigs WHERE id = ?', [id]);

    if (!gigs.length) return res.status(404).json({ success: false, message: 'Gig not found' });
    if (gigs[0].freelancer_id !== req.user.id) return res.status(403).json({ success: false, message: 'Not authorized' });

    await pool.query('UPDATE gigs SET status = "deleted" WHERE id = ?', [id]);
    res.json({ success: true, message: 'Gig deleted' });
  } catch (err) {
    next(err);
  }
};

exports.getUserGigs = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const [gigs] = await pool.query(`
      SELECT g.*, (SELECT MIN(price) FROM gig_packages WHERE gig_id = g.id) as min_price,
        (SELECT image_url FROM gig_images WHERE gig_id = g.id ORDER BY sort_order LIMIT 1) as image
      FROM gigs g WHERE g.freelancer_id = ? AND g.status = 'active'
    `, [userId]);

    res.json({
      success: true,
      gigs: gigs.map((g) => ({
        id: g.id,
        title: g.title,
        price: g.min_price,
        rating: g.overall_rating,
        reviewCount: g.review_count,
      })),
    });
  } catch (err) {
    next(err);
  }
};
