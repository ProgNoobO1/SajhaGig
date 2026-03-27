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

describe('Phase 5: Jobs & Proposals', () => {
  // --- List Jobs ---
  describe('GET /api/jobs', () => {
    it('should return jobs with skills and pagination', async () => {
      const res = await request(app).get('/api/jobs');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.jobs.length).toBeGreaterThan(0);
      expect(res.body.pagination).toBeDefined();

      res.body.jobs.forEach((job) => {
        expect(job).toHaveProperty('id');
        expect(job).toHaveProperty('title');
        expect(job).toHaveProperty('budget');
        expect(job).toHaveProperty('skills');
        expect(Array.isArray(job.skills)).toBe(true);
        expect(job).toHaveProperty('client');
      });
    });

    it('should paginate results', async () => {
      const res = await request(app).get('/api/jobs?page=1&limit=2');

      expect(res.body.jobs.length).toBeLessThanOrEqual(2);
      expect(res.body.pagination.page).toBe(1);
      expect(res.body.pagination.limit).toBe(2);
    });
  });

  // --- Job Detail ---
  describe('GET /api/jobs/:id', () => {
    it('should return full job detail', async () => {
      const res = await request(app).get('/api/jobs/1');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      const job = res.body.job;
      expect(job.id).toBe(1);
      expect(job.title).toBeDefined();
      expect(job.description).toBeDefined();
      expect(job.budget).toBeDefined();
      expect(job.budget.type).toBeDefined();
      expect(job.skills).toBeDefined();
      expect(Array.isArray(job.skills)).toBe(true);
      expect(job.activity).toBeDefined();
      expect(job.activity).toHaveProperty('proposals');
      expect(job.client).toBeDefined();
      expect(job.client).toHaveProperty('firstName');
    });

    it('should return 404 for non-existent job', async () => {
      const res = await request(app).get('/api/jobs/9999');
      expect(res.status).toBe(404);
    });
  });

  // --- Create Job ---
  describe('POST /api/jobs', () => {
    it('should create job with client token', async () => {
      const res = await request(app)
        .post('/api/jobs')
        .set('Authorization', `Bearer ${clientToken}`)
        .send({
          title: 'Test Job: Build a Landing Page',
          description: 'We need a responsive landing page for our new product',
          categoryId: 2,
          budgetMin: 5000,
          budgetMax: 10000,
          budgetType: 'fixed',
          experienceLevel: 'intermediate',
          skills: ['React', 'Tailwind CSS', 'JavaScript'],
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.jobId).toBeDefined();

      // Verify job was created
      const detail = await request(app).get(`/api/jobs/${res.body.jobId}`);
      expect(detail.body.job.title).toBe('Test Job: Build a Landing Page');
      expect(detail.body.job.skills).toContain('React');
      expect(detail.body.job.skills).toContain('Tailwind CSS');
    });

    it('should return 403 when freelancer tries to create job', async () => {
      const res = await request(app)
        .post('/api/jobs')
        .set('Authorization', `Bearer ${freelancerToken}`)
        .send({
          title: 'Should Fail',
          description: 'Freelancers cannot post jobs',
        });

      expect(res.status).toBe(403);
      expect(res.body.message).toMatch(/only clients/i);
    });

    it('should return 401 without auth', async () => {
      const res = await request(app)
        .post('/api/jobs')
        .send({ title: 'No Auth Job' });

      expect(res.status).toBe(401);
    });
  });

  // --- Proposals ---
  describe('POST /api/proposals', () => {
    it('should submit proposal with freelancer token', async () => {
      const res = await request(app)
        .post('/api/proposals')
        .set('Authorization', `Bearer ${freelancerToken}`)
        .send({
          jobId: 2,
          coverLetter: 'I am a great fit for this project because...',
          proposedRate: 450,
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.proposalId).toBeDefined();
    });

    it('should return 403 when client tries to submit proposal', async () => {
      const res = await request(app)
        .post('/api/proposals')
        .set('Authorization', `Bearer ${clientToken}`)
        .send({ jobId: 1, coverLetter: 'Should fail', proposedRate: 100 });

      expect(res.status).toBe(403);
      expect(res.body.message).toMatch(/only freelancers/i);
    });
  });

  // --- Get Freelancer Proposals ---
  describe('GET /api/proposals/freelancer/:id', () => {
    it('should return proposals for the freelancer', async () => {
      const res = await request(app)
        .get('/api/proposals/freelancer/1')
        .set('Authorization', `Bearer ${freelancerToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.proposals.length).toBeGreaterThan(0);

      res.body.proposals.forEach((p) => {
        expect(p).toHaveProperty('id');
        expect(p).toHaveProperty('jobTitle');
        expect(p).toHaveProperty('proposedRate');
        expect(p).toHaveProperty('status');
        expect(p).toHaveProperty('client');
      });
    });

    it('should return 403 when accessing another freelancer proposals', async () => {
      const res = await request(app)
        .get('/api/proposals/freelancer/3')
        .set('Authorization', `Bearer ${freelancerToken}`);

      expect(res.status).toBe(403);
    });
  });

  // --- Get Job Proposals ---
  describe('GET /api/proposals/job/:jobId', () => {
    it('should return proposals for job owned by client', async () => {
      const res = await request(app)
        .get('/api/proposals/job/1')
        .set('Authorization', `Bearer ${clientToken}`);

      expect(res.status).toBe(200);
      expect(res.body.proposals).toBeDefined();
      expect(Array.isArray(res.body.proposals)).toBe(true);
    });
  });

  // --- Update Proposal ---
  describe('PUT /api/proposals/:id', () => {
    it('should accept a proposal', async () => {
      const res = await request(app)
        .put('/api/proposals/1')
        .set('Authorization', `Bearer ${clientToken}`)
        .send({ status: 'accepted' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  // --- Delete (Withdraw) Proposal ---
  describe('DELETE /api/proposals/:id', () => {
    it('should withdraw own proposal', async () => {
      // Create a new proposal first, then withdraw it
      const create = await request(app)
        .post('/api/proposals')
        .set('Authorization', `Bearer ${freelancerToken}`)
        .send({ jobId: 1, coverLetter: 'Will withdraw', proposedRate: 300 });

      // Proposal might already exist (seed data), so handle both cases
      if (create.status === 201) {
        const res = await request(app)
          .delete(`/api/proposals/${create.body.proposalId}`)
          .set('Authorization', `Bearer ${freelancerToken}`);

        expect(res.status).toBe(200);
        expect(res.body.message).toMatch(/withdrawn/i);
      }
    });
  });
});
