const request = require('supertest');
const { app, setupTestDB, teardownTestDB } = require('./setup');

beforeAll(async () => {
  await setupTestDB();
});

afterAll(async () => {
  await teardownTestDB();
});

describe('Phase 2: Auth System', () => {
  let token;

  // --- Signup ---
  describe('POST /api/auth/signup', () => {
    it('should register a new client and return JWT', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          firstName: 'Test',
          lastName: 'Client',
          email: 'testclient@test.com',
          password: 'test1234',
          role: 'client',
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();
      expect(res.body.user).toMatchObject({
        role: 'client',
        firstName: 'Test',
        lastName: 'Client',
        email: 'testclient@test.com',
        initials: 'TC',
      });
    });

    it('should register a new freelancer and return JWT', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          firstName: 'Test',
          lastName: 'Freelancer',
          email: 'testfreelancer@test.com',
          password: 'test1234',
          role: 'freelancer',
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.user.role).toBe('freelancer');
    });

    it('should return 409 for duplicate email', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          firstName: 'Dup',
          lastName: 'User',
          email: 'testclient@test.com',
          password: 'test1234',
          role: 'client',
        });

      expect(res.status).toBe(409);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/already registered/i);
    });

    it('should return 400 for invalid role', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          firstName: 'Bad',
          lastName: 'Role',
          email: 'badrole@test.com',
          password: 'test1234',
          role: 'admin',
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  // --- Login ---
  describe('POST /api/auth/login', () => {
    it('should login with seed user sulav@sajhagig.com', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'sulav@sajhagig.com', password: 'password123' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();
      expect(res.body.user).toMatchObject({
        id: 1,
        role: 'freelancer',
        firstName: 'Sulav',
        lastName: 'Shrestha',
        email: 'sulav@sajhagig.com',
      });

      token = res.body.token;
    });

    it('should login with seed client ram@sajhagig.com', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'ram@sajhagig.com', password: 'password123' });

      expect(res.status).toBe(200);
      expect(res.body.user.role).toBe('client');
      expect(res.body.user.firstName).toBe('Ram');
    });

    it('should return 401 for wrong password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'sulav@sajhagig.com', password: 'wrongpass' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/invalid/i);
    });

    it('should return 401 for non-existent email', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'nobody@test.com', password: 'test1234' });

      expect(res.status).toBe(401);
    });
  });

  // --- Me ---
  describe('GET /api/auth/me', () => {
    it('should return user profile with valid token', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.user).toMatchObject({
        id: 1,
        role: 'freelancer',
        firstName: 'Sulav',
        email: 'sulav@sajhagig.com',
      });
    });

    it('should return 401 with no token', async () => {
      const res = await request(app).get('/api/auth/me');

      expect(res.status).toBe(401);
      expect(res.body.message).toMatch(/no token/i);
    });

    it('should return 401 with invalid token', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalid.token.here');

      expect(res.status).toBe(401);
      expect(res.body.message).toMatch(/invalid/i);
    });
  });

  // --- Health check ---
  describe('GET /api/health', () => {
    it('should return success', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });
});
