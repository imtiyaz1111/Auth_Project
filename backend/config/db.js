const mongoose=require("mongoose")

const connectToDb=async  ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: "true",
        useUnifiedTopology: "true"
      })
    .then(()=>{
        console.log("connection successfully");
    })
    .catch((err)=>{
        console.log(err.message)
    })
}

module.exports=connectToDb;