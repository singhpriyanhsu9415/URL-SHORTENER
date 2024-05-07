const mongoose=require('mongoose');

async function connectToMongoDB(url){ // function to connect data-base with the mongodb
    return mongoose.connect(url);
}
module.exports={connectToMongoDB}; 

// file function can be also directly written in the index.js file also