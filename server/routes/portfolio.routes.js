const router = require('express').Router();
const { getPortfolio, addItem, updateItem, deleteItem } = require('../controllers/portfolio.controller');
const { auth } = require('../middleware/auth');

router.get('/:userId', getPortfolio);
router.post('/', auth, addItem);
router.put('/:id', auth, updateItem);
router.delete('/:id', auth, deleteItem);

module.exports = router;
