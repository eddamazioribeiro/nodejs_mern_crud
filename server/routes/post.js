const express = require('express');
const router = express.Router();
// import controller methods
const {create} = require('../controllers/posts');

router.get('/', create);

module.exports = router; 