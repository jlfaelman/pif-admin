const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts')
require('dotenv').config();
const fetch = require('node-fetch');
const moment = require('moment');
const fundraiser = require('./route/fundraisers');
const forward = require('./route/forward');
const user = require('./route/users');
const port = process.env.PORT;
const db = process.env.DB;


app.use(express.static('public'));
app.use(express.static('assets'));
app.use(expressLayouts)
app.set('view engine', 'ejs');

app.use('/fundraisers', fundraiser);
app.use('/users', user);
app.use('/forwards', forward);


app.get('/', (req, res) => {
    res.render('index');
})
app.get('/dashboard', async(req, res) => {
    try {
        const getFundraiser = await fetch( db +'fundraising/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        });
        const fundraiser = await  getFundraiser.json();
        res.render('dashboard',{
            data:fundraiser.body,
  
        });
    } catch (e) {
        console.error(e)
        res.send('Cannot Get Request')
    }

})


app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`)
})