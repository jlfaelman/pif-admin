const express = require('express');
const router = express.Router();
router.use(express.static("public"));
router.use(express.static("assets"));
const db = process.env.DB;
const fetch = require('node-fetch');
const moment = require('moment');
const { json } = require('express');


router.get('/', async(req,res)=>{
    try {
        const getForward = await fetch( db +'forward/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        });
        const forward = await  getForward.json();
        res.render('forward-table',{
            data:forward.body,
  
        });
    } catch (e) {
        console.error(e)
        res.send('Cannot Get Request')
    }
})
router.get('/page',async(req,res)=>{
    try {
        const getPage = await fetch(db+`forward/page/${req.query.id}`)
        const forward = getPage.json();
        res.render('forward-page',{
            forward:forward.body,
            success:req.query.success
        })
    } catch (e) {
        console.error(e)
        res.send('Cannot Get Request')
    }
})

module.exports = router;