const express = require('express');
const router = express.Router();
router.use(express.static("public"));
router.use(express.static("assets"));
const db = process.env.DB;
const fetch = require('node-fetch');
const moment = require('moment');


router.get('/', async(req,res)=>{
    try {
        const getUsers = await fetch( db +'admin/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        });
        const users = await  getUsers.json();
        res.render('user-table',{
            data:users.body,
        });
    } catch (e) {
        console.error(e)
        res.send('Cannot Get Request')
    }
})
router.get('/page',async(req,res)=>{
    try {
        const getUser = await fetch(db+ `admin/users/page/${req.query.id}`,{
            method:"GET",
            headers:{
                'Content-Type':'application/json;charset=utf-8'
            }
        })
        const user = await getUser.json();
        // console.log(user.body);                                
        res.render('user-page',{
           data: user.body,
           fundraisings: user.body.fundraising
        })
    } catch (e) {
        console.error(e)
        res.send('Cannot Get Request')
    }
})

module.exports = router;