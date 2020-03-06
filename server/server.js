const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// app
const app = express();

// db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => console.log('DB connected'))
.catch(err => console.log(err));

// middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// routes
app.get('*',(req, res) => {
    res.json({
        data: 'You reached NodeJS API for react node crud app'
    });
});

// port
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server ir running on port ${port}`);
});