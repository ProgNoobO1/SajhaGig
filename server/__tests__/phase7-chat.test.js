const request = require('supertest');
const { app, setupTestDB, teardownTestDB } = require('./setup');

let sulavToken, sarahToken, ramToken;

beforeAll(async () => {
  await setupTestDB();

  // Sulav (freelancer, id=1)
  const s = await request(app)
    .post('/api/auth/login')
    .send({ email: 'sulav@sajhagig.com', password: 'password123' });
  sulavToken = s.body.token;

  // Sarah (client, id=6) - has chat with Sulav
  const sa = await request(app)
    .post('/api/auth/login')
    .send({ email: 'sarah@sajhagig.com', password: 'password123' });
  sarahToken = sa.body.token;

  // Ram (client, id=2) - no existing chat with Sulav in seed data for this test
  const r = await request(app)
    .post('/api/auth/login')
    .send({ email: 'ram@sajhagig.com', password: 'password123' });
  ramToken = r.body.token;
});

afterAll(async () => {
  await teardownTestDB();
});

describe('Phase 7: Chat & Messages', () => {
  // --- List Chats ---
  describe('GET /api/chats', () => {
    it('should return conversations for Sulav with contact info', async () => {
      const res = await request(app)
        .get('/api/chats')
        .set('Authorization', `Bearer ${sulavToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.chats.length).toBeGreaterThan(0);

      res.body.chats.forEach((chat) => {
        expect(chat).toHaveProperty('id');
        expect(chat).toHaveProperty('contact');
        expect(chat.contact).toHaveProperty('id');
        expect(chat.contact).toHaveProperty('name');
        expect(chat).toHaveProperty('lastMessage');
        expect(chat).toHaveProperty('unreadCount');
        expect(typeof chat.unreadCount).toBe('number');
      });
    });

    it('should return 401 without auth', async () => {
      const res = await request(app).get('/api/chats');
      expect(res.status).toBe(401);
    });
  });

  // --- Get Messages ---
  describe('GET /api/chats/:id/messages', () => {
    it('should return messages for chat 1 (Sulav <-> Sarah)', async () => {
      const res = await request(app)
        .get('/api/chats/1/messages')
        .set('Authorization', `Bearer ${sulavToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.messages.length).toBeGreaterThan(0);

      res.body.messages.forEach((msg) => {
        expect(msg).toHaveProperty('id');
        expect(msg).toHaveProperty('text');
        expect(msg).toHaveProperty('isRead');
        expect(msg).toHaveProperty('from');
        expect(['me', 'them']).toContain(msg.from);
        expect(msg).toHaveProperty('sender');
        expect(msg.sender).toHaveProperty('name');
      });

      // Messages should be in chronological order
      for (let i = 1; i < res.body.messages.length; i++) {
        const prev = new Date(res.body.messages[i - 1].createdAt);
        const curr = new Date(res.body.messages[i].createdAt);
        expect(curr >= prev).toBe(true);
      }
    });

    it('should return 403 for non-participant', async () => {
      // Ram (id=2) is not part of chat 1 (Sulav <-> Sarah)
      const res = await request(app)
        .get('/api/chats/1/messages')
        .set('Authorization', `Bearer ${ramToken}`);

      expect(res.status).toBe(403);
      expect(res.body.message).toMatch(/not a participant/i);
    });
  });

  // --- Send Message ---
  describe('POST /api/chats/:id/messages', () => {
    it('should send a message in existing chat', async () => {
      const res = await request(app)
        .post('/api/chats/1/messages')
        .set('Authorization', `Bearer ${sulavToken}`)
        .send({ text: 'Hello from test!' });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.messageId).toBeDefined();

      // Verify message appears in chat history
      const messages = await request(app)
        .get('/api/chats/1/messages')
        .set('Authorization', `Bearer ${sulavToken}`);

      const lastMsg = messages.body.messages[messages.body.messages.length - 1];
      expect(lastMsg.text).toBe('Hello from test!');
      expect(lastMsg.from).toBe('me');
    });

    it('should return 403 for non-participant sending message', async () => {
      const res = await request(app)
        .post('/api/chats/1/messages')
        .set('Authorization', `Bearer ${ramToken}`)
        .send({ text: 'Should fail' });

      expect(res.status).toBe(403);
    });
  });

  // --- Mark Read ---
  describe('PUT /api/chats/:id/read', () => {
    it('should mark messages as read', async () => {
      const res = await request(app)
        .put('/api/chats/1/read')
        .set('Authorization', `Bearer ${sulavToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      // Verify unread count is 0
      const chats = await request(app)
        .get('/api/chats')
        .set('Authorization', `Bearer ${sulavToken}`);

      const chat1 = chats.body.chats.find((c) => c.id === 1);
      if (chat1) {
        expect(chat1.unreadCount).toBe(0);
      }
    });
  });

  // --- Create Chat ---
  describe('POST /api/chats', () => {
    it('should create a new chat between two users', async () => {
      const res = await request(app)
        .post('/api/chats')
        .set('Authorization', `Bearer ${ramToken}`)
        .send({ participantId: 3 });

      expect(res.status === 200 || res.status === 201).toBe(true);
      expect(res.body.success).toBe(true);
      expect(res.body.chatId).toBeDefined();
    });

    it('should return existing chat if already exists', async () => {
      // Create same chat again
      const res1 = await request(app)
        .post('/api/chats')
        .set('Authorization', `Bearer ${ramToken}`)
        .send({ participantId: 3 });

      const res2 = await request(app)
        .post('/api/chats')
        .set('Authorization', `Bearer ${ramToken}`)
        .send({ participantId: 3 });

      expect(res1.body.chatId).toBe(res2.body.chatId);
    });
  });
});
