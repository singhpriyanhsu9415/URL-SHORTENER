const mongoose=require('mongoose');
// creating model is the first step in the MVC followed by view and controllers, at the last routes are decided

const urlSchema=new mongoose.Schema({  // schema is struction of data in the data-base of mongodb
    shortId:{
        type:String,
        required:true,
        unique:true,
    },
    redirectURL:{
        type:String,
        required:true,
    },
    visitHistory:[{timestamp:{type: Number}}],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    }
},{timestamps:true});

const URL=mongoose.model('url',urlSchema);

module.exports=URL; // exporting model schema to be used in the controller