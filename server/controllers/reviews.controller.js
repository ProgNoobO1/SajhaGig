const pool = require('../config/db');

exports.getUserReviews = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const [reviews] = await pool.query(`
      SELECT r.*, u.first_name, u.last_name, u.avatar, u.initials, u.country
      FROM reviews r
      LEFT JOIN users u ON r.reviewer_id = u.id
      WHERE r.reviewee_id = ?
      ORDER BY r.created_at DESC
    `, [userId]);

    res.json({
      success: true,
      reviews: reviews.map((r) => ({
        id: r.id,
        rating: r.rating,
        comment: r.comment,
        createdAt: r.created_at,
        gigId: r.gig_id,
        projectId: r.project_id,
        reviewer: {
          id: r.reviewer_id,
          name: `${r.first_name} ${r.last_name}`,
          avatar: r.avatar,
          initials: r.initials,
          country: r.country,
        },
      })),
    });
  } catch (err) {
    next(err);
  }
};

exports.getGivenReviews = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const [reviews] = await pool.query(`
      SELECT r.*, u.first_name, u.last_name, u.avatar, u.initials
      FROM reviews r
      LEFT JOIN users u ON r.reviewee_id = u.id
      WHERE r.reviewer_id = ?
      ORDER BY r.created_at DESC
    `, [userId]);

    res.json({
      success: true,
      reviews: reviews.map((r) => ({
        id: r.id,
        rating: r.rating,
        comment: r.comment,
        createdAt: r.created_at,
        reviewee: {
          id: r.reviewee_id,
          name: `${r.first_name} ${r.last_name}`,
          avatar: r.avatar,
          initials: r.initials,
        },
      })),
    });
  } catch (err) {
    next(err);
  }
};

exports.getGigReviews = async (req, res, next) => {
  try {
    const { gigId } = req.params;

    const [reviews] = await pool.query(`
      SELECT r.*, u.first_name, u.last_name, u.avatar, u.initials, u.country
      FROM reviews r
      LEFT JOIN users u ON r.reviewer_id = u.id
      WHERE r.gig_id = ?
      ORDER BY r.created_at DESC
    `, [gigId]);

    res.json({
      success: true,
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
    });
  } catch (err) {
    next(err);
  }
};

exports.createReview = async (req, res, next) => {
  try {
    const { revieweeId, gigId, projectId, rating, comment } = req.body;

    const [result] = await pool.query(
      'INSERT INTO reviews (reviewer_id, reviewee_id, gig_id, project_id, rating, comment) VALUES (?, ?, ?, ?, ?, ?)',
      [req.user.id, revieweeId, gigId || null, projectId || null, rating, comment]
    );

    // Update review count on gig if applicable
    if (gigId) {
      await pool.query(`
        UPDATE gigs SET review_count = (SELECT COUNT(*) FROM reviews WHERE gig_id = ?),
        overall_rating = (SELECT AVG(rating) FROM reviews WHERE gig_id = ?) WHERE id = ?
      `, [gigId, gigId, gigId]);
    }

    // Update freelancer profile review count
    const [users] = await pool.query('SELECT role FROM users WHERE id = ?', [revieweeId]);
    if (users.length && users[0].role === 'freelancer') {
      await pool.query(`
        UPDATE freelancer_profiles SET
          review_count = (SELECT COUNT(*) FROM reviews WHERE reviewee_id = ?),
          rating = (SELECT AVG(rating) FROM reviews WHERE reviewee_id = ?)
        WHERE user_id = ?
      `, [revieweeId, revieweeId, revieweeId]);
    }

    res.status(201).json({ success: true, reviewId: result.insertId });
  } catch (err) {
    next(err);
  }
};
