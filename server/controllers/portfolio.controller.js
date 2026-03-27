const pool = require('../config/db');

exports.getPortfolio = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const [items] = await pool.query('SELECT * FROM portfolio_items WHERE freelancer_id = ? ORDER BY created_at DESC', [userId]);

    res.json({
      success: true,
      items: items.map((i) => ({
        id: i.id,
        title: i.title,
        description: i.description,
        imageUrl: i.image_url,
        rating: i.rating,
        createdAt: i.created_at,
      })),
    });
  } catch (err) {
    next(err);
  }
};

exports.addItem = async (req, res, next) => {
  try {
    if (req.user.role !== 'freelancer') {
      return res.status(403).json({ success: false, message: 'Only freelancers can add portfolio items' });
    }

    const { title, description, imageUrl, rating } = req.body;
    const [result] = await pool.query(
      'INSERT INTO portfolio_items (freelancer_id, title, description, image_url, rating) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, title, description, imageUrl, rating]
    );

    res.status(201).json({ success: true, itemId: result.insertId });
  } catch (err) {
    next(err);
  }
};

exports.updateItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [items] = await pool.query('SELECT freelancer_id FROM portfolio_items WHERE id = ?', [id]);
    if (!items.length) return res.status(404).json({ success: false, message: 'Item not found' });
    if (items[0].freelancer_id !== req.user.id) return res.status(403).json({ success: false, message: 'Not authorized' });

    const { title, description, imageUrl, rating } = req.body;
    const fields = [];
    const values = [];
    if (title) { fields.push('title = ?'); values.push(title); }
    if (description) { fields.push('description = ?'); values.push(description); }
    if (imageUrl) { fields.push('image_url = ?'); values.push(imageUrl); }
    if (rating) { fields.push('rating = ?'); values.push(rating); }

    if (fields.length) {
      values.push(id);
      await pool.query(`UPDATE portfolio_items SET ${fields.join(', ')} WHERE id = ?`, values);
    }

    res.json({ success: true, message: 'Item updated' });
  } catch (err) {
    next(err);
  }
};

exports.deleteItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [items] = await pool.query('SELECT freelancer_id FROM portfolio_items WHERE id = ?', [id]);
    if (!items.length) return res.status(404).json({ success: false, message: 'Item not found' });
    if (items[0].freelancer_id !== req.user.id) return res.status(403).json({ success: false, message: 'Not authorized' });

    await pool.query('DELETE FROM portfolio_items WHERE id = ?', [id]);
    res.json({ success: true, message: 'Item deleted' });
  } catch (err) {
    next(err);
  }
};
