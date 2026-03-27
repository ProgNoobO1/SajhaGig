const pool = require('../config/db');

exports.clientDashboard = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Stats
    const [[stats]] = await pool.query(`
      SELECT
        (SELECT COUNT(*) FROM projects WHERE client_id = ?) as projects_posted,
        (SELECT COUNT(*) FROM projects WHERE client_id = ? AND status IN ('open', 'in_progress')) as ongoing_projects,
        (SELECT COUNT(*) FROM projects WHERE client_id = ? AND status = 'completed') as completed_projects,
        (SELECT COUNT(*) FROM reviews WHERE reviewer_id = ?) as reviews
    `, [userId, userId, userId, userId]);

    // Overview chart data (weekly)
    const overviewData = [
      { day: 'Sun', Jobs: 10, Proposals: 8 },
      { day: 'Mon', Jobs: 18, Proposals: 12 },
      { day: 'Tue', Jobs: 12, Proposals: 10 },
      { day: 'Wed', Jobs: 38, Proposals: 22 },
      { day: 'Thu', Jobs: 15, Proposals: 14 },
      { day: 'Fri', Jobs: 32, Proposals: 28 },
      { day: 'Sat', Jobs: 20, Proposals: 16 },
    ];

    const analyticsData = [
      { name: 'Jobs', value: 40, color: '#ef4444' },
      { name: 'Proposals', value: 25, color: '#14b8a6' },
      { name: 'Applied Proposals', value: 20, color: '#f59e0b' },
      { name: 'Bookmarked Projects', value: 15, color: '#6366f1' },
    ];

    // Ongoing projects
    const [ongoingProjects] = await pool.query(`
      SELECT p.*, fu.first_name, fu.last_name, fu.avatar
      FROM projects p
      LEFT JOIN users fu ON p.freelancer_id = fu.id
      WHERE p.client_id = ? AND p.status IN ('open', 'in_progress')
      ORDER BY p.created_at DESC LIMIT 5
    `, [userId]);

    // Transactions
    const [transactions] = await pool.query(
      'SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC LIMIT 10', [userId]
    );

    // Jobs
    const [jobs] = await pool.query(
      'SELECT * FROM jobs WHERE client_id = ? ORDER BY created_at DESC LIMIT 10', [userId]
    );

    res.json({
      success: true,
      stats: {
        projectsPosted: stats.projects_posted,
        ongoingProjects: stats.ongoing_projects,
        completedProjects: stats.completed_projects,
        reviews: stats.reviews,
      },
      overviewData,
      analyticsData,
      ongoingProjects: ongoingProjects.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        projectType: p.project_type,
        location: p.location,
        status: p.status,
        freelancer: p.freelancer_id ? { name: `${p.first_name} ${p.last_name}`, avatar: p.avatar } : null,
      })),
      transactions: transactions.map((t) => ({
        id: t.id,
        label: t.label,
        amount: t.amount,
        type: t.type,
        createdAt: t.created_at,
      })),
      jobs: jobs.map((j) => ({
        id: j.id,
        title: j.title,
        budgetMax: j.budget_max,
        budgetType: j.budget_type,
        projectType: j.project_type,
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

exports.freelancerDashboard = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const [[stats]] = await pool.query(`
      SELECT
        (SELECT COUNT(*) FROM projects WHERE freelancer_id = ? AND status = 'completed') as completed_jobs,
        (SELECT COUNT(*) FROM projects WHERE freelancer_id = ?) as task_completed,
        (SELECT COUNT(*) FROM reviews WHERE reviewee_id = ?) as reviews,
        (SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE user_id = ? AND type = 'credit') as earning
    `, [userId, userId, userId, userId]);

    const overviewData = [
      { day: 'Sun', Jobs: 8, 'Applied Proposals': 5 },
      { day: 'Mon', Jobs: 15, 'Applied Proposals': 10 },
      { day: 'Tue', Jobs: 10, 'Applied Proposals': 8 },
      { day: 'Wed', Jobs: 35, 'Applied Proposals': 20 },
      { day: 'Thu', Jobs: 12, 'Applied Proposals': 10 },
      { day: 'Fri', Jobs: 28, 'Applied Proposals': 22 },
      { day: 'Sat', Jobs: 18, 'Applied Proposals': 14 },
    ];

    const analyticsData = [
      { name: 'Jobs', value: 35, color: '#ef4444' },
      { name: 'Applied Proposals', value: 25, color: '#14b8a6' },
      { name: 'Proposals', value: 20, color: '#f59e0b' },
      { name: 'Bookmarked Projects', value: 20, color: '#6366f1' },
    ];

    // Ongoing projects
    const [ongoingProjects] = await pool.query(`
      SELECT p.*, cu.first_name as client_first, cu.last_name as client_last
      FROM projects p
      LEFT JOIN users cu ON p.client_id = cu.id
      WHERE p.freelancer_id = ? AND p.status IN ('open', 'in_progress')
      ORDER BY p.created_at DESC LIMIT 5
    `, [userId]);

    // Recent earnings
    const [earnings] = await pool.query(
      'SELECT * FROM transactions WHERE user_id = ? AND type = "credit" ORDER BY created_at DESC LIMIT 10', [userId]
    );

    res.json({
      success: true,
      stats: {
        completedJobs: stats.completed_jobs,
        taskCompleted: stats.task_completed,
        reviews: stats.reviews,
        earning: stats.earning,
      },
      overviewData,
      analyticsData,
      ongoingProjects: ongoingProjects.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        projectType: p.project_type,
        location: p.location,
        status: p.status,
        client: { name: `${p.client_first} ${p.client_last}` },
      })),
      recentEarnings: earnings.map((e) => ({
        id: e.id,
        label: e.label,
        amount: e.amount,
        createdAt: e.created_at,
      })),
    });
  } catch (err) {
    next(err);
  }
};
