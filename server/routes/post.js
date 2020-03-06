const express = require('express');
const router = express.Router();
// import controller methods
const {create} = require('../controllers/posts');

router.post('/post', create);

module.exports = router; 