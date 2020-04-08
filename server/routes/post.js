const express = require('express');
const router = express.Router();
// import controller methods
const {create, list, read, update, remove} = require('../controllers/posts');
const {requireSingIn } = require('../controllers/auth');

router.post('/post', requireSingIn, create);
router.get('/posts', list);
router.get('/post/:slug', read);
router.put('/post/:slug', requireSingIn, update);
router.delete('/post/:slug', requireSingIn, remove);
// test secret
router.get('/secret', requireSingIn, (req, res) =>{
    res.json({
        data: req.user.name
    });
});


module.exports = router; 