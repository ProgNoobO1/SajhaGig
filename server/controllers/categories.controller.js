const pool = require('../config/db');

exports.getCategories = async (req, res, next) => {
  try {
    const [categories] = await pool.query('SELECT * FROM categories ORDER BY id');
    const [subcategories] = await pool.query('SELECT * FROM subcategories ORDER BY category_id, id');

    const result = categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      subcategories: subcategories
        .filter((sub) => sub.category_id === cat.id)
        .map((sub) => ({ id: sub.id, name: sub.name, slug: sub.slug })),
    }));

    res.json({ success: true, categories: result });
  } catch (err) {
    next(err);
  }
};
