const pool = require('../config/db');

exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    if (!users.length) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const user = users[0];
    const result = {
      id: user.id,
      role: user.role,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      avatar: user.avatar,
      initials: user.initials,
      location: user.location,
      country: user.country,
      verified: !!user.verified,
      bio: user.bio,
      memberSince: user.member_since,
    };

    if (user.role === 'freelancer') {
      const [profiles] = await pool.query('SELECT * FROM freelancer_profiles WHERE user_id = ?', [id]);
      const [skills] = await pool.query('SELECT skill FROM freelancer_skills WHERE user_id = ?', [id]);
      const [languages] = await pool.query('SELECT language, level FROM freelancer_languages WHERE user_id = ?', [id]);

      if (profiles.length) {
        const p = profiles[0];
        result.profile = {
          title: p.title,
          hourlyRate: p.hourly_rate,
          topRated: !!p.top_rated,
          badge: p.badge,
          badgeColor: p.badge_color,
          rating: p.rating,
          reviewCount: p.review_count,
          jobsCompleted: p.jobs_completed,
          onTimeDelivery: p.on_time_delivery,
          rehireRate: p.rehire_rate,
          totalEarnings: p.total_earnings,
          ordersInQueue: p.orders_in_queue,
          avgResponseTime: p.avg_response_time,
          lastDelivery: p.last_delivery,
        };
      }
      result.skills = skills.map((s) => s.skill);
      result.languages = languages;
    } else {
      const [profiles] = await pool.query('SELECT * FROM client_profiles WHERE user_id = ?', [id]);
      if (profiles.length) {
        const p = profiles[0];
        result.profile = {
          company: p.company,
          industry: p.industry,
          website: p.website,
          phone: p.phone,
          projectsPosted: p.projects_posted,
          hiredCount: p.hired_count,
          totalSpent: p.total_spent,
          avgRating: p.avg_rating,
          onTimePayment: p.on_time_payment,
        };
      }
    }

    res.json({ success: true, user: result });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user.id !== parseInt(id)) {
      return res.status(403).json({ success: false, message: 'Cannot update another user' });
    }

    const { firstName, lastName, location, country, bio, avatar } = req.body;
    const fields = [];
    const values = [];

    if (firstName) { fields.push('first_name = ?'); values.push(firstName); }
    if (lastName) { fields.push('last_name = ?'); values.push(lastName); }
    if (location) { fields.push('location = ?'); values.push(location); }
    if (country) { fields.push('country = ?'); values.push(country); }
    if (bio) { fields.push('bio = ?'); values.push(bio); }
    if (avatar) { fields.push('avatar = ?'); values.push(avatar); }

    if (fields.length) {
      values.push(id);
      await pool.query(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`, values);
    }

    // Update role-specific profile
    const [users] = await pool.query('SELECT role FROM users WHERE id = ?', [id]);
    if (users[0].role === 'freelancer') {
      const { title, hourlyRate, skills } = req.body;
      const pFields = [];
      const pValues = [];
      if (title) { pFields.push('title = ?'); pValues.push(title); }
      if (hourlyRate) { pFields.push('hourly_rate = ?'); pValues.push(hourlyRate); }
      if (pFields.length) {
        pValues.push(id);
        await pool.query(`UPDATE freelancer_profiles SET ${pFields.join(', ')} WHERE user_id = ?`, pValues);
      }
      if (skills && Array.isArray(skills)) {
        await pool.query('DELETE FROM freelancer_skills WHERE user_id = ?', [id]);
        for (const skill of skills) {
          await pool.query('INSERT INTO freelancer_skills (user_id, skill) VALUES (?, ?)', [id, skill]);
        }
      }
    } else {
      const { company, industry, website, phone } = req.body;
      const pFields = [];
      const pValues = [];
      if (company) { pFields.push('company = ?'); pValues.push(company); }
      if (industry) { pFields.push('industry = ?'); pValues.push(industry); }
      if (website) { pFields.push('website = ?'); pValues.push(website); }
      if (phone) { pFields.push('phone = ?'); pValues.push(phone); }
      if (pFields.length) {
        pValues.push(id);
        await pool.query(`UPDATE client_profiles SET ${pFields.join(', ')} WHERE user_id = ?`, pValues);
      }
    }

    res.json({ success: true, message: 'Profile updated' });
  } catch (err) {
    next(err);
  }
};
