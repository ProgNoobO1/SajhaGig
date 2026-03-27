const pool = require('../config/db');

exports.getFreelancerProposals = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.user.id !== parseInt(id)) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const [proposals] = await pool.query(`
      SELECT p.*, j.title as job_title, j.description as job_description, j.budget_max as client_price, j.budget_type,
        u.first_name as client_first, u.last_name as client_last, u.avatar as client_avatar
      FROM proposals p
      LEFT JOIN jobs j ON p.job_id = j.id
      LEFT JOIN users u ON j.client_id = u.id
      WHERE p.freelancer_id = ?
      ORDER BY p.created_at DESC
    `, [id]);

    res.json({
      success: true,
      proposals: proposals.map((p) => ({
        id: p.id,
        jobId: p.job_id,
        jobTitle: p.job_title,
        jobDescription: p.job_description,
        clientPrice: p.client_price,
        budgetType: p.budget_type,
        proposedRate: p.proposed_rate,
        status: p.status,
        coverLetter: p.cover_letter,
        createdAt: p.created_at,
        client: {
          name: `${p.client_first} ${p.client_last}`,
          avatar: p.client_avatar,
        },
      })),
    });
  } catch (err) {
    next(err);
  }
};

exports.getJobProposals = async (req, res, next) => {
  try {
    const { jobId } = req.params;

    const [jobs] = await pool.query('SELECT client_id FROM jobs WHERE id = ?', [jobId]);
    if (!jobs.length) return res.status(404).json({ success: false, message: 'Job not found' });
    if (jobs[0].client_id !== req.user.id) return res.status(403).json({ success: false, message: 'Not authorized' });

    const [proposals] = await pool.query(`
      SELECT p.*, u.first_name, u.last_name, u.avatar, u.initials,
        fp.rating, fp.jobs_completed
      FROM proposals p
      LEFT JOIN users u ON p.freelancer_id = u.id
      LEFT JOIN freelancer_profiles fp ON p.freelancer_id = fp.user_id
      WHERE p.job_id = ?
      ORDER BY p.created_at DESC
    `, [jobId]);

    res.json({
      success: true,
      proposals: proposals.map((p) => ({
        id: p.id,
        proposedRate: p.proposed_rate,
        coverLetter: p.cover_letter,
        status: p.status,
        createdAt: p.created_at,
        freelancer: {
          id: p.freelancer_id,
          name: `${p.first_name} ${p.last_name}`,
          avatar: p.avatar,
          initials: p.initials,
          rating: p.rating,
          jobsCompleted: p.jobs_completed,
        },
      })),
    });
  } catch (err) {
    next(err);
  }
};

exports.createProposal = async (req, res, next) => {
  try {
    if (req.user.role !== 'freelancer') {
      return res.status(403).json({ success: false, message: 'Only freelancers can submit proposals' });
    }

    const { jobId, coverLetter, proposedRate } = req.body;
    const [result] = await pool.query(
      'INSERT INTO proposals (freelancer_id, job_id, cover_letter, proposed_rate) VALUES (?, ?, ?, ?)',
      [req.user.id, jobId, coverLetter, proposedRate]
    );

    // Update proposal count
    await pool.query('UPDATE jobs SET proposal_count = proposal_count + 1 WHERE id = ?', [jobId]);

    res.status(201).json({ success: true, proposalId: result.insertId });
  } catch (err) {
    next(err);
  }
};

exports.updateProposal = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const [proposals] = await pool.query('SELECT * FROM proposals WHERE id = ?', [id]);
    if (!proposals.length) return res.status(404).json({ success: false, message: 'Proposal not found' });

    await pool.query('UPDATE proposals SET status = ? WHERE id = ?', [status, id]);
    res.json({ success: true, message: 'Proposal updated' });
  } catch (err) {
    next(err);
  }
};

exports.deleteProposal = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [proposals] = await pool.query('SELECT * FROM proposals WHERE id = ?', [id]);
    if (!proposals.length) return res.status(404).json({ success: false, message: 'Proposal not found' });
    if (proposals[0].freelancer_id !== req.user.id) return res.status(403).json({ success: false, message: 'Not authorized' });

    await pool.query('UPDATE proposals SET status = "withdrawn" WHERE id = ?', [id]);
    res.json({ success: true, message: 'Proposal withdrawn' });
  } catch (err) {
    next(err);
  }
};
