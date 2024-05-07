const express=require("express");
const {connectToMongoDB}=require('./connect'); // importing the function to connect the mongodb to url
const cookieParser=require("cookie-parser");
const {resrictToLogin,checkAuth}=require("./middlewares/auth");

const path=require("path");
const URL=require('./models/url');  // for importing all the created routes

const urlRoute=require('./routes/url'); // importing all the routes for the different async function
const staticRoute=require('./routes/staticRouter');
const userRoute=require("./routes/user");

const app=express();
const PORT=8001;

connectToMongoDB('mongodb://localhost:27017/short-url').then(()=>console.log('mongodb is connected')); // connecting mongodb to url

// for creating the user interface by ejs which is very similar to html
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());

app.use("/url",resrictToLogin,urlRoute);  // for all other routes
app.use("/",checkAuth,staticRoute); // for home page or user interface
app.use("/user",userRoute);

app.get("/",async(req,res)=>{
    const allURL=await URL.find({});
    return res.render("details",{
        urls:allURL,
    })
});

app.get('/url/:shortId',async(req,res)=>{
    const shortId=req.params.shortId;
  const entry=  await URL.findOneAndUpdate({
        shortId,
    },{
        $push:{
            visitHistory:{
                timestamp:Date.now(),
            },
        },
    })
  res.redirect(entry.redirectURL);
})
app.listen(PORT,()=>console.log(`server started at port: ${PORT}`));