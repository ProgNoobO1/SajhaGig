const router = require('express').Router();
const { listProjects, getProject, createProject, updateProject } = require('../controllers/projects.controller');
const { auth } = require('../middleware/auth');

router.get('/', auth, listProjects);
router.get('/:id', auth, getProject);
router.post('/', auth, createProject);
router.put('/:id', auth, updateProject);

module.exports = router;
