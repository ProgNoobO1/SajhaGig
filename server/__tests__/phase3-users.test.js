const request = require('supertest');
const { app, setupTestDB, teardownTestDB } = require('./setup');

let freelancerToken, clientToken;

beforeAll(async () => {
  await setupTestDB();

  // Login as freelancer (Sulav, id=1)
  const fRes = await request(app)
    .post('/api/auth/login')
    .send({ email: 'sulav@sajhagig.com', password: 'password123' });
  freelancerToken = fRes.body.token;

  // Login as client (Ram, id=2)
  const cRes = await request(app)
    .post('/api/auth/login')
    .send({ email: 'ram@sajhagig.com', password: 'password123' });
  clientToken = cRes.body.token;
});

afterAll(async () => {
  await teardownTestDB();
});

describe('Phase 3: Users & Profiles', () => {
  // --- Get freelancer profile ---
  describe('GET /api/users/:id', () => {
    it('should return freelancer profile with skills and languages', async () => {
      const res = await request(app).get('/api/users/1');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      const user = res.body.user;
      expect(user.id).toBe(1);
      expect(user.role).toBe('freelancer');
      expect(user.firstName).toBe('Sulav');
      expect(user.lastName).toBe('Shrestha');
      expect(user.verified).toBe(true);

      // Freelancer profile data
      expect(user.profile).toBeDefined();
      expect(user.profile.title).toBe('Full Stack Developer');
      expect(user.profile.hourlyRate).toBeDefined();
      expect(user.profile.rating).toBeDefined();
      expect(user.profile.badge).toBe('Top Rated Seller');

      // Skills
      expect(user.skills).toBeDefined();
      expect(Array.isArray(user.skills)).toBe(true);
      expect(user.skills.length).toBeGreaterThan(0);
      expect(user.skills).toContain('React');

      // Languages
      expect(user.languages).toBeDefined();
      expect(Array.isArray(user.languages)).toBe(true);
    });

    it('should return client profile with company info', async () => {
      const res = await request(app).get('/api/users/2');

      expect(res.status).toBe(200);

      const user = res.body.user;
      expect(user.id).toBe(2);
      expect(user.role).toBe('client');
      expect(user.firstName).toBe('Ram');

      // Client profile data
      expect(user.profile).toBeDefined();
      expect(user.profile.company).toBe('Thamel Restaurant');
      expect(user.profile.projectsPosted).toBeDefined();
      expect(user.profile.totalSpent).toBeDefined();
      expect(user.profile.avgRating).toBeDefined();
    });

    it('should return 404 for non-existent user', async () => {
      const res = await request(app).get('/api/users/9999');
      expect(res.status).toBe(404);
    });
  });

  // --- Update profile ---
  describe('PUT /api/users/:id', () => {
    it('should update own profile with valid token', async () => {
      const res = await request(app)
        .put('/api/users/1')
        .set('Authorization', `Bearer ${freelancerToken}`)
        .send({ bio: 'Updated bio for testing' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      // Verify the update
      const check = await request(app).get('/api/users/1');
      expect(check.body.user.bio).toBe('Updated bio for testing');
    });

    it('should update freelancer-specific fields (title, skills)', async () => {
      const res = await request(app)
        .put('/api/users/1')
        .set('Authorization', `Bearer ${freelancerToken}`)
        .send({
          title: 'Senior Full Stack Developer',
          skills: ['React', 'Node.js', 'TypeScript', 'GraphQL'],
        });

      expect(res.status).toBe(200);

      const check = await request(app).get('/api/users/1');
      expect(check.body.user.profile.title).toBe('Senior Full Stack Developer');
      expect(check.body.user.skills).toContain('GraphQL');
      expect(check.body.user.skills.length).toBe(4);
    });

    it('should update client-specific fields (company, industry)', async () => {
      const res = await request(app)
        .put('/api/users/2')
        .set('Authorization', `Bearer ${clientToken}`)
        .send({ company: 'Updated Restaurant' });

      expect(res.status).toBe(200);

      const check = await request(app).get('/api/users/2');
      expect(check.body.user.profile.company).toBe('Updated Restaurant');
    });

    it('should return 403 when updating another user', async () => {
      const res = await request(app)
        .put('/api/users/2')
        .set('Authorization', `Bearer ${freelancerToken}`)
        .send({ bio: 'Hacked bio' });

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
    });

    it('should return 401 with no token', async () => {
      const res = await request(app)
        .put('/api/users/1')
        .send({ bio: 'No auth' });

      expect(res.status).toBe(401);
    });
  });
});
