require('dotenv').config();
const express =require('express');
const connectToDb=require("./config/db");
const app=express();
const router=require("./Routes/router")
const cors=require("cors")
const PORT=process.env.PORT || 4000
//db connection
connectToDb();

// app.use(bodyParser.json({extended: true }))
// app.use(bodyParser.urlencoded({ extended: true }));


// app.use("/",(req,res)=>{
//     res.send("helow")
// })

app.use(express.json())
app.use(cors())
app.use(router)

app.listen(PORT,()=>{
    console.log(`Server is listenning port no:${PORT}`)
});

module.exports=app;