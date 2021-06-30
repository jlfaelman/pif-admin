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
        const getFundraiser = await fetch( db +'fundraising/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        });
        const fundraiser = await  getFundraiser.json();
        res.render('fundraiser-table',{
            data:fundraiser.body,
  
        });
    } catch (e) {
        console.error(e)
        res.send('Cannot Get Request')
    }
})
router.get('/page',async(req,res)=>{
    try {
        const id = req.query.id;
        const success = req.query.success;
        const getPage = await fetch(db+`fundraising/page/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        })
        
        const page = await getPage.json();
        const getValidation = await fetch(db+`admin/validation?id=${id}`,{
            method:"GET",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
          
        })
        const validation = await getValidation.json();
        if(page.body.funding[0]){
            const getQR = await fetch(db+`fundraising/get/qr/${page.body.funding[0].Funding_ID}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
            })
            const qr = await getQR.json();
            res.render('fundraiser-page',{
                fundraiser:page.body.fundraiser[0],
                funding:page.body.funding[0],
                gcash:qr.body.gcash[0],
                validation:validation.body,
                paymaya:qr.body.paymaya[0],
                success: success,
                moment:moment
            });
        }
        else{
            res.render('fundraiser-page',{
                fundraiser:page.body.fundraiser[0],
                funding:page.body.funding[0],
                goods:page.body.goods[0],
                validation:validation.body,
                gcash:undefined,
                paymaya:undefined,
                success: success,
                moment:moment
            });
        }
        
    } catch (e) {
        if(e){
            res.send(e.message)
        }
        
    }
})

module.exports = router;