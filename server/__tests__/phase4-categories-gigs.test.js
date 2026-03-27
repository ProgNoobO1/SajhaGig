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

describe('Phase 4: Categories & Gigs', () => {
  // --- Categories ---
  describe('GET /api/categories', () => {
    it('should return 8 categories with subcategories', async () => {
      const res = await request(app).get('/api/categories');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.categories).toHaveLength(8);

      const graphicDesign = res.body.categories.find((c) => c.name === 'Graphic Design');
      expect(graphicDesign).toBeDefined();
      expect(graphicDesign.slug).toBe('graphic-design');
      expect(graphicDesign.subcategories.length).toBe(5);
    });

    it('each category should have id, name, slug, subcategories', async () => {
      const res = await request(app).get('/api/categories');

      res.body.categories.forEach((cat) => {
        expect(cat).toHaveProperty('id');
        expect(cat).toHaveProperty('name');
        expect(cat).toHaveProperty('slug');
        expect(cat).toHaveProperty('subcategories');
        expect(Array.isArray(cat.subcategories)).toBe(true);
      });
    });
  });

  // --- List Gigs ---
  describe('GET /api/gigs', () => {
    it('should return gigs with pagination', async () => {
      const res = await request(app).get('/api/gigs');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.gigs.length).toBeGreaterThan(0);
      expect(res.body.pagination).toBeDefined();
      expect(res.body.pagination.total).toBeGreaterThanOrEqual(10);
    });

    it('each gig should have seller info', async () => {
      const res = await request(app).get('/api/gigs');

      res.body.gigs.forEach((gig) => {
        expect(gig).toHaveProperty('id');
        expect(gig).toHaveProperty('title');
        expect(gig).toHaveProperty('price');
        expect(gig).toHaveProperty('rating');
        expect(gig).toHaveProperty('seller');
        expect(gig.seller).toHaveProperty('id');
        expect(gig.seller).toHaveProperty('username');
      });
    });

    it('should filter by page and limit', async () => {
      const res = await request(app).get('/api/gigs?page=1&limit=3');

      expect(res.body.gigs.length).toBeLessThanOrEqual(3);
      expect(res.body.pagination.page).toBe(1);
      expect(res.body.pagination.limit).toBe(3);
    });

    it('should filter by search query', async () => {
      const res = await request(app).get('/api/gigs?search=promo');

      expect(res.status).toBe(200);
      res.body.gigs.forEach((gig) => {
        expect(gig.title.toLowerCase()).toContain('promo');
      });
    });
  });

  // --- Gig Detail ---
  describe('GET /api/gigs/:id', () => {
    it('should return full gig detail with packages, FAQs, reviews', async () => {
      const res = await request(app).get('/api/gigs/10');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      const gig = res.body.gig;
      expect(gig.id).toBe(10);
      expect(gig.title).toBeDefined();
      expect(gig.category).toBeDefined();

      // Seller
      expect(gig.seller).toBeDefined();
      expect(gig.seller.id).toBeDefined();
      expect(gig.seller.username).toBeDefined();
      expect(gig.seller.rating).toBeDefined();

      // Packages (3 tiers)
      expect(gig.packages).toBeDefined();
      expect(gig.packages.basic).toBeDefined();
      expect(gig.packages.standard).toBeDefined();
      expect(gig.packages.premium).toBeDefined();
      expect(gig.packages.basic.price).toBeDefined();
      expect(gig.packages.basic.deliveryDays).toBeDefined();

      // FAQs
      expect(gig.faqs).toBeDefined();
      expect(Array.isArray(gig.faqs)).toBe(true);
      expect(gig.faqs.length).toBeGreaterThan(0);
      expect(gig.faqs[0]).toHaveProperty('question');
      expect(gig.faqs[0]).toHaveProperty('answer');

      // Reviews
      expect(gig.reviews).toBeDefined();
      expect(Array.isArray(gig.reviews)).toBe(true);
      expect(gig.reviews.length).toBeGreaterThan(0);
      expect(gig.reviews[0]).toHaveProperty('rating');
      expect(gig.reviews[0]).toHaveProperty('comment');
      expect(gig.reviews[0]).toHaveProperty('reviewer');
    });

    it('should return 404 for non-existent gig', async () => {
      const res = await request(app).get('/api/gigs/9999');
      expect(res.status).toBe(404);
    });
  });

  // --- Create Gig ---
  describe('POST /api/gigs', () => {
    it('should create gig with freelancer token', async () => {
      const res = await request(app)
        .post('/api/gigs')
        .set('Authorization', `Bearer ${freelancerToken}`)
        .send({
          title: 'Test Gig: Modern Logo Design',
          categoryId: 1,
          subcategoryId: 1,
          description: 'I will design a modern logo for your brand',
          searchTags: ['logo', 'design', 'brand'],
          packages: {
            basic: { name: 'Basic Logo', price: 2000, deliveryDays: 3, revisions: '1', features: ['1 concept'] },
            standard: { name: 'Standard Logo', price: 4000, deliveryDays: 5, revisions: '3', features: ['3 concepts'] },
            premium: { name: 'Premium Logo', price: 8000, deliveryDays: 7, revisions: 'Unlimited', features: ['5 concepts', 'Source files'] },
          },
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.gigId).toBeDefined();

      // Verify gig was created with packages
      const detail = await request(app).get(`/api/gigs/${res.body.gigId}`);
      expect(detail.body.gig.title).toBe('Test Gig: Modern Logo Design');
      expect(detail.body.gig.packages.basic).toBeDefined();
      expect(detail.body.gig.packages.standard).toBeDefined();
      expect(detail.body.gig.packages.premium).toBeDefined();
    });

    it('should return 403 when client tries to create gig', async () => {
      const res = await request(app)
        .post('/api/gigs')
        .set('Authorization', `Bearer ${clientToken}`)
        .send({
          title: 'Should Fail',
          categoryId: 1,
          description: 'Clients cannot create gigs',
        });

      expect(res.status).toBe(403);
      expect(res.body.message).toMatch(/only freelancers/i);
    });

    it('should return 401 without auth', async () => {
      const res = await request(app)
        .post('/api/gigs')
        .send({ title: 'No Auth Gig', categoryId: 1 });

      expect(res.status).toBe(401);
    });
  });

  // --- Update Gig ---
  describe('PUT /api/gigs/:id', () => {
    it('should update own gig', async () => {
      // Gig 10 belongs to freelancer 5 (artz23), so let's use a gig owned by Sulav (id=1)
      // First create a gig as Sulav
      const create = await request(app)
        .post('/api/gigs')
        .set('Authorization', `Bearer ${freelancerToken}`)
        .send({ title: 'Gig to Update', categoryId: 2, description: 'Original desc' });

      const gigId = create.body.gigId;

      const res = await request(app)
        .put(`/api/gigs/${gigId}`)
        .set('Authorization', `Bearer ${freelancerToken}`)
        .send({ title: 'Updated Gig Title' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  // --- Delete (soft) Gig ---
  describe('DELETE /api/gigs/:id', () => {
    it('should soft-delete own gig', async () => {
      const create = await request(app)
        .post('/api/gigs')
        .set('Authorization', `Bearer ${freelancerToken}`)
        .send({ title: 'Gig to Delete', categoryId: 1, description: 'Will be deleted' });

      const gigId = create.body.gigId;

      const res = await request(app)
        .delete(`/api/gigs/${gigId}`)
        .set('Authorization', `Bearer ${freelancerToken}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/deleted/i);
    });
  });

  // --- User Gigs ---
  describe('GET /api/gigs/user/:userId', () => {
    it('should return gigs for a freelancer', async () => {
      const res = await request(app).get('/api/gigs/user/3');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.gigs.length).toBeGreaterThan(0);
      res.body.gigs.forEach((g) => {
        expect(g).toHaveProperty('id');
        expect(g).toHaveProperty('title');
      });
    });
  });
});
