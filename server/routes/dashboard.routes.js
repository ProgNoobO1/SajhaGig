const router = require('express').Router();
const { clientDashboard, freelancerDashboard } = require('../controllers/dashboard.controller');
const { auth } = require('../middleware/auth');

router.get('/client', auth, clientDashboard);
router.get('/freelancer', auth, freelancerDashboard);

module.exports = router;
