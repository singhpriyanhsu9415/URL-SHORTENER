const express=require('express');
const router=express.Router();

router.get("/home",(req,res)=>{
    return res.render("home");
})


router.get("/signup",(req,res)=>{
    return res.render("signup");
})
router.get("/login",(req,res)=>{
    return res.render("Login");
})
module.exports=router;