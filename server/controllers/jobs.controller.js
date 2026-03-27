const pool = require('../config/db');
const { paginationMeta } = require('../utils/pagination');

exports.listJobs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const { category, budget_type, experience } = req.query;

    let where = 'WHERE j.status = "open"';
    const params = [];

    if (category) { where += ' AND c.name = ?'; params.push(category); }
    if (budget_type) { where += ' AND j.budget_type = ?'; params.push(budget_type); }
    if (experience) { where += ' AND j.experience_level = ?'; params.push(experience); }

    const [[{ total }]] = await pool.query(
      `SELECT COUNT(*) as total FROM jobs j LEFT JOIN categories c ON j.category_id = c.id ${where}`, params
    );

    const [jobs] = await pool.query(`
      SELECT j.*, c.name as category_name,
        u.first_name, u.last_name, u.country, u.member_since
      FROM jobs j
      LEFT JOIN categories c ON j.category_id = c.id
      LEFT JOIN users u ON j.client_id = u.id
      ${where}
      ORDER BY j.created_at DESC
      LIMIT ? OFFSET ?
    `, [...params, limit, offset]);

    const jobIds = jobs.map((j) => j.id);
    let skillsMap = {};
    if (jobIds.length) {
      const [skills] = await pool.query('SELECT job_id, skill FROM job_skills WHERE job_id IN (?)', [jobIds]);
      skills.forEach((s) => {
        if (!skillsMap[s.job_id]) skillsMap[s.job_id] = [];
        skillsMap[s.job_id].push(s.skill);
      });
    }

    res.json({
      success: true,
      jobs: jobs.map((j) => ({
        id: j.id,
        title: j.title,
        description: j.description,
        budget: { min: j.budget_min, max: j.budget_max, type: j.budget_type },
        experienceLevel: j.experience_level,
        projectType: j.project_type,
        location: j.location,
        remote: !!j.remote,
        status: j.status,
        proposalCount: j.proposal_count,
        skills: skillsMap[j.id] || [],
        category: j.category_name,
        createdAt: j.created_at,
        expiresAt: j.expires_at,
        client: {
          firstName: j.first_name,
          lastName: j.last_name,
          country: j.country,
          memberSince: j.member_since,
        },
      })),
      pagination: paginationMeta(total, page, limit),
    });
  } catch (err) {
    next(err);
  }
};

exports.getJob = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [jobs] = await pool.query(`
      SELECT j.*, c.name as category_name,
        u.first_name, u.last_name, u.country, u.member_since
      FROM jobs j
      LEFT JOIN categories c ON j.category_id = c.id
      LEFT JOIN users u ON j.client_id = u.id
      WHERE j.id = ?
    `, [id]);

    if (!jobs.length) return res.status(404).json({ success: false, message: 'Job not found' });

    const job = jobs[0];
    const [skills] = await pool.query('SELECT skill FROM job_skills WHERE job_id = ?', [id]);

    res.json({
      success: true,
      job: {
        id: job.id,
        title: job.title,
        description: job.description,
        summaryTitle: job.summary_title,
        summaryWhatWeNeed: job.summary_what_we_need,
        designRequirements: typeof job.design_requirements === 'string' ? JSON.parse(job.design_requirements) : job.design_requirements,
        budget: { min: job.budget_min, max: job.budget_max, type: job.budget_type },
        experienceLevel: job.experience_level,
        projectType: job.project_type,
        location: job.location,
        remote: !!job.remote,
        status: job.status,
        skills: skills.map((s) => s.skill),
        category: job.category_name,
        createdAt: job.created_at,
        expiresAt: job.expires_at,
        activity: {
          proposals: job.proposal_count,
          interviewing: job.interviewing,
          invitesSent: job.invites_sent,
        },
        client: {
          firstName: job.first_name,
          lastName: job.last_name,
          country: job.country,
          memberSince: job.member_since,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.createJob = async (req, res, next) => {
  try {
    if (req.user.role !== 'client') {
      return res.status(403).json({ success: false, message: 'Only clients can post jobs' });
    }

    const { title, description, categoryId, budgetMin, budgetMax, budgetType, experienceLevel, projectType, location, skills } = req.body;

    const [result] = await pool.query(
      'INSERT INTO jobs (client_id, title, description, category_id, budget_min, budget_max, budget_type, experience_level, project_type, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [req.user.id, title, description, categoryId || null, budgetMin, budgetMax, budgetType || 'fixed', experienceLevel || 'intermediate', projectType || 'one_time', location || 'Worldwide']
    );

    const jobId = result.insertId;
    if (skills && skills.length) {
      for (const skill of skills) {
        await pool.query('INSERT INTO job_skills (job_id, skill) VALUES (?, ?)', [jobId, skill]);
      }
    }

    res.status(201).json({ success: true, jobId });
  } catch (err) {
    next(err);
  }
};

exports.updateJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [jobs] = await pool.query('SELECT client_id FROM jobs WHERE id = ?', [id]);
    if (!jobs.length) return res.status(404).json({ success: false, message: 'Job not found' });
    if (jobs[0].client_id !== req.user.id) return res.status(403).json({ success: false, message: 'Not authorized' });

    const { title, description, status } = req.body;
    const fields = [];
    const values = [];
    if (title) { fields.push('title = ?'); values.push(title); }
    if (description) { fields.push('description = ?'); values.push(description); }
    if (status) { fields.push('status = ?'); values.push(status); }

    if (fields.length) {
      values.push(id);
      await pool.query(`UPDATE jobs SET ${fields.join(', ')} WHERE id = ?`, values);
    }

    res.json({ success: true, message: 'Job updated' });
  } catch (err) {
    next(err);
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [jobs] = await pool.query('SELECT client_id FROM jobs WHERE id = ?', [id]);
    if (!jobs.length) return res.status(404).json({ success: false, message: 'Job not found' });
    if (jobs[0].client_id !== req.user.id) return res.status(403).json({ success: false, message: 'Not authorized' });

    await pool.query('UPDATE jobs SET status = "cancelled" WHERE id = ?', [id]);
    res.json({ success: true, message: 'Job cancelled' });
  } catch (err) {
    next(err);
  }
};

exports.getClientJobs = async (req, res, next) => {
  try {
    const { clientId } = req.params;
    const [jobs] = await pool.query('SELECT * FROM jobs WHERE client_id = ? ORDER BY created_at DESC', [clientId]);

    res.json({
      success: true,
      jobs: jobs.map((j) => ({
        id: j.id,
        title: j.title,
        budgetMax: j.budget_max,
        budgetType: j.budget_type,
        status: j.status,
        proposalCount: j.proposal_count,
        createdAt: j.created_at,
        expiresAt: j.expires_at,
      })),
    });
  } catch (err) {
    next(err);
  }
};
