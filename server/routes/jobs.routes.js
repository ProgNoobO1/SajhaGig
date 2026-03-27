const router = require('express').Router();
const { listJobs, getJob, createJob, updateJob, deleteJob, getClientJobs } = require('../controllers/jobs.controller');
const { auth } = require('../middleware/auth');

router.get('/', listJobs);
router.get('/:id', getJob);
router.post('/', auth, createJob);
router.put('/:id', auth, updateJob);
router.delete('/:id', auth, deleteJob);
router.get('/client/:clientId', getClientJobs);

module.exports = router;
