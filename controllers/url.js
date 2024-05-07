const shortid=require("shortid");
const URL=require('../models/url');  // importing shema to assign their respective value into it

async function handleGenerateNewShortURL(req,res){
    const body=req.body;
    if(!body.url) return res.status(400).json({error: 'url is required'})
    const shortID=shortid();  // shorting the url by shortid
    
    await URL.create({  // managing(assigning value) the model schema of the URL that was exported by model
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[],
        createdBy:req.user._id,
    })
    return res.render("home",{ //sending id in the ejs home page
        id: shortID
    }); 
}


async function handleAnalytics(req,res){
 const shortId=req.params.shortId;
 const result=await URL.findOne({shortId});
 return res.json({totalClicks:result.visitHistory.length,analytics:result.visitHistory})
}
module.exports={
    handleGenerateNewShortURL,
    handleAnalytics,
    
};