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

describe('Phase 8: Reviews & Portfolio', () => {
  // --- Reviews received by a user ---
  describe('GET /api/reviews/user/:userId', () => {
    it('should return reviews received by artz23 (id=5)', async () => {
      const res = await request(app).get('/api/reviews/user/5');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.reviews.length).toBeGreaterThan(0);

      res.body.reviews.forEach((r) => {
        expect(r).toHaveProperty('id');
        expect(r).toHaveProperty('rating');
        expect(r.rating).toBeGreaterThanOrEqual(1);
        expect(r.rating).toBeLessThanOrEqual(5);
        expect(r).toHaveProperty('comment');
        expect(r).toHaveProperty('reviewer');
        expect(r.reviewer).toHaveProperty('name');
        expect(r.reviewer).toHaveProperty('country');
      });
    });

    it('should return reviews received by Sulav (id=1)', async () => {
      const res = await request(app).get('/api/reviews/user/1');

      expect(res.status).toBe(200);
      expect(res.body.reviews.length).toBeGreaterThan(0);
    });
  });

  // --- Reviews given by a user ---
  describe('GET /api/reviews/given/:userId', () => {
    it('should return reviews given by Ram (id=2)', async () => {
      const res = await request(app).get('/api/reviews/given/2');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.reviews.length).toBeGreaterThan(0);

      res.body.reviews.forEach((r) => {
        expect(r).toHaveProperty('id');
        expect(r).toHaveProperty('rating');
        expect(r).toHaveProperty('comment');
        expect(r).toHaveProperty('reviewee');
        expect(r.reviewee).toHaveProperty('name');
      });
    });
  });

  // --- Reviews for a gig ---
  describe('GET /api/reviews/gig/:gigId', () => {
    it('should return reviews for gig 10 (promo video)', async () => {
      const res = await request(app).get('/api/reviews/gig/10');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.reviews.length).toBeGreaterThan(0);

      res.body.reviews.forEach((r) => {
        expect(r).toHaveProperty('rating');
        expect(r).toHaveProperty('reviewer');
        expect(r.reviewer).toHaveProperty('name');
      });
    });

    it('should return empty array for gig with no reviews', async () => {
      const res = await request(app).get('/api/reviews/gig/2');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.reviews)).toBe(true);
    });
  });

  // --- Create Review ---
  describe('POST /api/reviews', () => {
    it('should create a review with auth', async () => {
      const res = await request(app)
        .post('/api/reviews')
        .set('Authorization', `Bearer ${clientToken}`)
        .send({
          revieweeId: 3,
          gigId: 1,
          rating: 5,
          comment: 'Excellent work! Very professional and creative.',
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.reviewId).toBeDefined();
    });

    it('should update gig review count and rating after review', async () => {
      // Create another review for gig 1
      await request(app)
        .post('/api/reviews')
        .set('Authorization', `Bearer ${freelancerToken}`)
        .send({
          revieweeId: 3,
          gigId: 1,
          rating: 4,
          comment: 'Good work overall.',
        });

      const gig = await request(app).get('/api/gigs/1');
      expect(gig.body.gig.reviewCount).toBeGreaterThan(0);
    });

    it('should return 401 without auth', async () => {
      const res = await request(app)
        .post('/api/reviews')
        .send({ revieweeId: 1, rating: 5, comment: 'No auth' });

      expect(res.status).toBe(401);
    });
  });

  // --- Portfolio ---
  describe('GET /api/portfolio/:userId', () => {
    it('should return portfolio items for Sulav (id=1)', async () => {
      const res = await request(app).get('/api/portfolio/1');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.items.length).toBe(9);

      res.body.items.forEach((item) => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('title');
        expect(item).toHaveProperty('imageUrl');
        expect(item).toHaveProperty('rating');
      });
    });

    it('should return empty array for user with no portfolio', async () => {
      const res = await request(app).get('/api/portfolio/2');

      expect(res.status).toBe(200);
      expect(res.body.items).toHaveLength(0);
    });
  });

  // --- Add Portfolio Item ---
  describe('POST /api/portfolio', () => {
    it('should add portfolio item with freelancer token', async () => {
      const res = await request(app)
        .post('/api/portfolio')
        .set('Authorization', `Bearer ${freelancerToken}`)
        .send({
          title: 'Test Portfolio: Mobile App Design',
          description: 'A beautiful mobile app UI design',
          imageUrl: 'https://picsum.photos/seed/test-portfolio/460/300',
          rating: 4.8,
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.itemId).toBeDefined();

      // Verify item was created
      const portfolio = await request(app).get('/api/portfolio/1');
      const newItem = portfolio.body.items.find((i) => i.title === 'Test Portfolio: Mobile App Design');
      expect(newItem).toBeDefined();
    });

    it('should return 403 when client tries to add portfolio', async () => {
      const res = await request(app)
        .post('/api/portfolio')
        .set('Authorization', `Bearer ${clientToken}`)
        .send({ title: 'Should Fail', imageUrl: 'https://example.com/img.jpg' });

      expect(res.status).toBe(403);
      expect(res.body.message).toMatch(/only freelancers/i);
    });
  });

  // --- Update Portfolio Item ---
  describe('PUT /api/portfolio/:id', () => {
    it('should update own portfolio item', async () => {
      const res = await request(app)
        .put('/api/portfolio/1')
        .set('Authorization', `Bearer ${freelancerToken}`)
        .send({ title: 'Updated Razor Website Design' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('should return 403 when updating another users item', async () => {
      const res = await request(app)
        .put('/api/portfolio/1')
        .set('Authorization', `Bearer ${clientToken}`)
        .send({ title: 'Hacked' });

      expect(res.status).toBe(403);
    });
  });

  // --- Delete Portfolio Item ---
  describe('DELETE /api/portfolio/:id', () => {
    it('should delete own portfolio item', async () => {
      // Create an item to delete
      const create = await request(app)
        .post('/api/portfolio')
        .set('Authorization', `Bearer ${freelancerToken}`)
        .send({ title: 'To Delete', imageUrl: 'https://example.com/del.jpg' });

      const itemId = create.body.itemId;

      const res = await request(app)
        .delete(`/api/portfolio/${itemId}`)
        .set('Authorization', `Bearer ${freelancerToken}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/deleted/i);

      // Verify it's gone
      const portfolio = await request(app).get('/api/portfolio/1');
      const deleted = portfolio.body.items.find((i) => i.id === itemId);
      expect(deleted).toBeUndefined();
    });

    it('should return 403 when deleting another users item', async () => {
      const res = await request(app)
        .delete('/api/portfolio/1')
        .set('Authorization', `Bearer ${clientToken}`);

      expect(res.status).toBe(403);
    });

    it('should return 404 for non-existent item', async () => {
      const res = await request(app)
        .delete('/api/portfolio/9999')
        .set('Authorization', `Bearer ${freelancerToken}`);

      expect(res.status).toBe(404);
    });
  });
});
