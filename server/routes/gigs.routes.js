const router = require('express').Router();
const { listGigs, getGig, createGig, updateGig, deleteGig, getUserGigs } = require('../controllers/gigs.controller');
const { auth } = require('../middleware/auth');

router.get('/', listGigs);
router.get('/:id', getGig);
router.post('/', auth, createGig);
router.put('/:id', auth, updateGig);
router.delete('/:id', auth, deleteGig);
router.get('/user/:userId', getUserGigs);

module.exports = router;
