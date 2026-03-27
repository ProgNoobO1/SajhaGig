const express = require('express');
const cors = require('cors');
const env = require('./config/env');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/gigs', require('./routes/gigs.routes'));
app.use('/api/jobs', require('./routes/jobs.routes'));
app.use('/api/proposals', require('./routes/proposals.routes'));
app.use('/api/projects', require('./routes/projects.routes'));
app.use('/api/chats', require('./routes/messages.routes'));
app.use('/api/reviews', require('./routes/reviews.routes'));
app.use('/api/portfolio', require('./routes/portfolio.routes'));
app.use('/api/categories', require('./routes/categories.routes'));
app.use('/api/dashboard', require('./routes/dashboard.routes'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'SajhaGig API is running' });
});

// Error handler
app.use(errorHandler);

if (require.main === module) {
  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
}

module.exports = app;
