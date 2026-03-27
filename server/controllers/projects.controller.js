const pool = require('../config/db');

exports.listProjects = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;
    const status = req.query.status;

    let where = role === 'client' ? 'WHERE p.client_id = ?' : 'WHERE p.freelancer_id = ?';
    const params = [userId];

    if (status) {
      where += ' AND p.status = ?';
      params.push(status);
    }

    const [projects] = await pool.query(`
      SELECT p.*,
        cu.first_name as client_first, cu.last_name as client_last, cu.avatar as client_avatar,
        fu.first_name as freelancer_first, fu.last_name as freelancer_last, fu.avatar as freelancer_avatar, fu.initials as freelancer_initials
      FROM projects p
      LEFT JOIN users cu ON p.client_id = cu.id
      LEFT JOIN users fu ON p.freelancer_id = fu.id
      ${where}
      ORDER BY p.created_at DESC
    `, params);

    const projectIds = projects.map((p) => p.id);
    let tagsMap = {};
    if (projectIds.length) {
      const [tags] = await pool.query('SELECT project_id, tag FROM project_tags WHERE project_id IN (?)', [projectIds]);
      tags.forEach((t) => {
        if (!tagsMap[t.project_id]) tagsMap[t.project_id] = [];
        tagsMap[t.project_id].push(t.tag);
      });
    }

    res.json({
      success: true,
      projects: projects.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        projectType: p.project_type,
        price: p.price,
        status: p.status,
        hiredOn: p.hired_on,
        deadline: p.deadline,
        location: p.location,
        rating: p.rating,
        tags: tagsMap[p.id] || [],
        client: { name: `${p.client_first} ${p.client_last}`, avatar: p.client_avatar },
        freelancer: p.freelancer_id ? {
          name: `${p.freelancer_first} ${p.freelancer_last}`,
          avatar: p.freelancer_avatar,
          initials: p.freelancer_initials,
        } : null,
      })),
    });
  } catch (err) {
    next(err);
  }
};

exports.getProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [projects] = await pool.query('SELECT * FROM projects WHERE id = ?', [id]);
    if (!projects.length) return res.status(404).json({ success: false, message: 'Project not found' });

    res.json({ success: true, project: projects[0] });
  } catch (err) {
    next(err);
  }
};

exports.createProject = async (req, res, next) => {
  try {
    const { name, description, projectType, price, freelancerId, jobId, gigId, location, tags } = req.body;

    const [result] = await pool.query(
      'INSERT INTO projects (client_id, freelancer_id, job_id, gig_id, name, description, project_type, price, location, hired_on) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE())',
      [req.user.id, freelancerId || null, jobId || null, gigId || null, name, description, projectType || 'fixed', price, location]
    );

    const projectId = result.insertId;
    if (tags && tags.length) {
      for (const tag of tags) {
        await pool.query('INSERT INTO project_tags (project_id, tag) VALUES (?, ?)', [projectId, tag]);
      }
    }

    res.status(201).json({ success: true, projectId });
  } catch (err) {
    next(err);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, rating } = req.body;

    const fields = [];
    const values = [];
    if (status) { fields.push('status = ?'); values.push(status); }
    if (rating) { fields.push('rating = ?'); values.push(rating); }

    if (fields.length) {
      values.push(id);
      await pool.query(`UPDATE projects SET ${fields.join(', ')} WHERE id = ?`, values);
    }

    res.json({ success: true, message: 'Project updated' });
  } catch (err) {
    next(err);
  }
};
