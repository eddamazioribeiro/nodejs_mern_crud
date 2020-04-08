const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
require('dotenv').config();

exports.login = (req, res) => {
    const {name, password} = req.body;

    if(password === process.env.PASSWORD){
        console.log({name});
        const token = jwt.sign({name}, process.env.JWT_SECRET, {expiresIn: '1d'});

        return res.json({name, token});

    } else {
        return res.status(400).json({
            error:'Incorrect password!'
        });
    }
};

exports.requireSingIn = expressJwt({
    secret: process.env.JWT_SECRET
});