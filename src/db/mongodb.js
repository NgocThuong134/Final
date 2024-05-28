const mongoose = require('mongoose')
const dotenv = require("dotenv").config({ path: '.env' });



const MONGODB_URL = 'mongodb+srv://ngocthuong:WwiNYGR3gVyVLEF3@atlascluster.dicjzo3.mongodb.net/Final';

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology:true
})//returns a promise
    .then(() => {
        console.log("Mongo DB Connected");
    })
    .catch((error) => {
        console.log(error);
    })
