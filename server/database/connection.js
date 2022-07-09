const mongoose = require('mongoose')
require('dotenv').config()

// connection creation and creating a new database
mongoose.connect(process.env.DB_LINK,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=> console.log("connection sucessful..."))
.catch((err)=>{throw err})

// ,useCreateIndex:true,useFindAndModify:false