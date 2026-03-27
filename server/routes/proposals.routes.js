const router = require('express').Router();
const { getFreelancerProposals, getJobProposals, createProposal, updateProposal, deleteProposal } = require('../controllers/proposals.controller');
const { auth } = require('../middleware/auth');

router.get('/freelancer/:id', auth, getFreelancerProposals);
router.get('/job/:jobId', auth, getJobProposals);
router.post('/', auth, createProposal);
router.put('/:id', auth, updateProposal);
router.delete('/:id', auth, deleteProposal);

module.exports = router;
