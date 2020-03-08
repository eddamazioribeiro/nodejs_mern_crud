const express = require('express');
const router = express.Router();
// import controller methods
const {create, list} = require('../controllers/posts');

router.post('/post', create);
router.get('/posts', list);

module.exports = router; 