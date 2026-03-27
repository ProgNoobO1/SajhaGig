const request = require('supertest');
const { app, setupTestDB, teardownTestDB } = require('./setup');

let freelancerToken, clientToken;

beforeAll(async () => {
  await setupTestDB();

  const fRes = await request(app)
    .post('/api/auth/login')
    .send({ email: 'sulav@sajhagig.com', password: 'password123' });
  freelancerToken = fRes.body.token;

  const cRes = await request(app)
    .post('/api/auth/login')
    .send({ email: 'ram@sajhagig.com', password: 'password123' });
  clientToken = cRes.body.token;
});

afterAll(async () => {
  await teardownTestDB();
});

describe('Phase 6: Projects & Dashboard', () => {
  // --- List Projects ---
  describe('GET /api/projects', () => {
    it('should return projects for client (filtered by client_id)', async () => {
      const res = await request(app)
        .get('/api/projects')
        .set('Authorization', `Bearer ${clientToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.projects.length).toBeGreaterThan(0);

      res.body.projects.forEach((p) => {
        expect(p).toHaveProperty('id');
        expect(p).toHaveProperty('name');
        expect(p).toHaveProperty('price');
        expect(p).toHaveProperty('status');
        expect(p).toHaveProperty('client');
        expect(p).toHaveProperty('tags');
        expect(Array.isArray(p.tags)).toBe(true);
      });
    });

    it('should return projects for freelancer (filtered by freelancer_id)', async () => {
      const res = await request(app)
        .get('/api/projects')
        .set('Authorization', `Bearer ${freelancerToken}`);

      expect(res.status).toBe(200);
      expect(res.body.projects.length).toBeGreaterThan(0);
      res.body.projects.forEach((p) => {
        expect(p.freelancer).toBeDefined();
      });
    });

    it('should filter by status', async () => {
      const res = await request(app)
        .get('/api/projects?status=completed')
        .set('Authorization', `Bearer ${clientToken}`);

      expect(res.status).toBe(200);
      res.body.projects.forEach((p) => {
        expect(p.status).toBe('completed');
      });
    });

    it('should return 401 without auth', async () => {
      const res = await request(app).get('/api/projects');
      expect(res.status).toBe(401);
    });
  });

  // --- Create Project ---
  describe('POST /api/projects', () => {
    it('should create a project', async () => {
      const res = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${clientToken}`)
        .send({
          name: 'Test Project: Mobile App',
          description: 'Build a mobile app for our restaurant',
          projectType: 'fixed',
          price: 5000,
          freelancerId: 1,
          tags: ['React Native', 'Firebase'],
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.projectId).toBeDefined();
    });
  });

  // --- Update Project ---
  describe('PUT /api/projects/:id', () => {
    it('should update project status', async () => {
      const res = await request(app)
        .put('/api/projects/1')
        .set('Authorization', `Bearer ${clientToken}`)
        .send({ status: 'in_progress' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  // --- Client Dashboard ---
  describe('GET /api/dashboard/client', () => {
    it('should return full client dashboard data', async () => {
      const res = await request(app)
        .get('/api/dashboard/client')
        .set('Authorization', `Bearer ${clientToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      // Stats
      expect(res.body.stats).toBeDefined();
      expect(res.body.stats).toHaveProperty('projectsPosted');
      expect(res.body.stats).toHaveProperty('ongoingProjects');
      expect(res.body.stats).toHaveProperty('completedProjects');
      expect(res.body.stats).toHaveProperty('reviews');

      // Chart data
      expect(res.body.overviewData).toBeDefined();
      expect(Array.isArray(res.body.overviewData)).toBe(true);
      expect(res.body.overviewData.length).toBe(7);

      expect(res.body.analyticsData).toBeDefined();
      expect(Array.isArray(res.body.analyticsData)).toBe(true);

      // Projects
      expect(res.body.ongoingProjects).toBeDefined();
      expect(Array.isArray(res.body.ongoingProjects)).toBe(true);

      // Transactions
      expect(res.body.transactions).toBeDefined();
      expect(Array.isArray(res.body.transactions)).toBe(true);
      res.body.transactions.forEach((t) => {
        expect(t).toHaveProperty('label');
        expect(t).toHaveProperty('amount');
        expect(t).toHaveProperty('type');
      });

      // Jobs
      expect(res.body.jobs).toBeDefined();
      expect(Array.isArray(res.body.jobs)).toBe(true);
    });

    it('should return 401 without auth', async () => {
      const res = await request(app).get('/api/dashboard/client');
      expect(res.status).toBe(401);
    });
  });

  // --- Freelancer Dashboard ---
  describe('GET /api/dashboard/freelancer', () => {
    it('should return full freelancer dashboard data', async () => {
      const res = await request(app)
        .get('/api/dashboard/freelancer')
        .set('Authorization', `Bearer ${freelancerToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      // Stats
      expect(res.body.stats).toBeDefined();
      expect(res.body.stats).toHaveProperty('completedJobs');
      expect(res.body.stats).toHaveProperty('taskCompleted');
      expect(res.body.stats).toHaveProperty('reviews');
      expect(res.body.stats).toHaveProperty('earning');

      // Chart data
      expect(res.body.overviewData).toBeDefined();
      expect(res.body.overviewData.length).toBe(7);

      expect(res.body.analyticsData).toBeDefined();

      // Projects
      expect(res.body.ongoingProjects).toBeDefined();
      expect(Array.isArray(res.body.ongoingProjects)).toBe(true);

      // Earnings
      expect(res.body.recentEarnings).toBeDefined();
      expect(Array.isArray(res.body.recentEarnings)).toBe(true);
      res.body.recentEarnings.forEach((e) => {
        expect(e).toHaveProperty('label');
        expect(e).toHaveProperty('amount');
      });
    });

    it('should aggregate stats from database tables', async () => {
      const res = await request(app)
        .get('/api/dashboard/freelancer')
        .set('Authorization', `Bearer ${freelancerToken}`);

      expect(typeof res.body.stats.completedJobs).toBe('number');
      expect(typeof res.body.stats.reviews).toBe('number');
      expect(typeof res.body.stats.earning).toBe('number');
    });
  });
});
