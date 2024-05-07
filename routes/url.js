const express=require('express');
const {handleGenerateNewShortURL,handleAnalytics,handleDetails}=require('../controllers/url');

const router=express.Router();

router.post("/",handleGenerateNewShortURL); // routes and respective async  function to be performed

router.get('/analytics/:shortId',handleAnalytics);


module.exports=router;