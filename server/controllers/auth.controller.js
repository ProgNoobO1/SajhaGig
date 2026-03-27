const pool = require('../config/db');
const { hashPassword, comparePassword } = require('../utils/hash');
const { signToken } = require('../utils/jwt');

exports.signup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    if (!['client', 'freelancer'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Role must be client or freelancer' });
    }

    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }

    const passwordHash = await hashPassword(password);
    const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();

    const [result] = await pool.query(
      'INSERT INTO users (role, first_name, last_name, email, password_hash, initials) VALUES (?, ?, ?, ?, ?, ?)',
      [role, firstName, lastName, email, passwordHash, initials]
    );

    const userId = result.insertId;

    // Create role-specific profile
    if (role === 'freelancer') {
      await pool.query('INSERT INTO freelancer_profiles (user_id) VALUES (?)', [userId]);
    } else {
      await pool.query('INSERT INTO client_profiles (user_id) VALUES (?)', [userId]);
    }

    const token = signToken({ id: userId, role, email });

    res.status(201).json({
      success: true,
      token,
      user: { id: userId, role, firstName, lastName, email, initials, verified: false },
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (!rows.length) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const user = rows[0];
    const valid = await comparePassword(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = signToken({ id: user.id, role: user.role, email: user.email });

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        role: user.role,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        avatar: user.avatar,
        initials: user.initials,
        verified: !!user.verified,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.me = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, role, first_name, last_name, email, avatar, initials, verified FROM users WHERE id = ?',
      [req.user.id]
    );
    if (!rows.length) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const u = rows[0];
    res.json({
      success: true,
      user: {
        id: u.id,
        role: u.role,
        firstName: u.first_name,
        lastName: u.last_name,
        email: u.email,
        avatar: u.avatar,
        initials: u.initials,
        verified: !!u.verified,
      },
    });
  } catch (err) {
    next(err);
  }
};
