const router = require('express').Router();
const { getUserReviews, getGivenReviews, getGigReviews, createReview } = require('../controllers/reviews.controller');
const { auth } = require('../middleware/auth');

router.get('/user/:userId', getUserReviews);
router.get('/given/:userId', getGivenReviews);
router.get('/gig/:gigId', getGigReviews);
router.post('/', auth, createReview);

module.exports = router;
