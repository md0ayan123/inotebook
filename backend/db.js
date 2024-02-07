const mongoose = require('mongoose');

const url = "mongodb://127.0.0.1/inotebook";

mongoose.connect(url).then((res)=>{
    console.log("connected to mongodb successfully")
}).catch((err)=> console.log("err in db ",err))

module.exports=mongoose
