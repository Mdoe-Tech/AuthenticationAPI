// const bodyParser = require('body-parser');
const dotenv=require('dotenv')
const express= require('express');
const mongoose=require('mongoose');
const userRouter=require('./routes/userRoutes')
const AppError=require('./utils/AppError');
const globalError=require('./controller/errorController');
const app=express();

process.on("uncaughtException",err=>{
    console.log("UNCAUGHT EXCEPTION 💥💥💥");
    console.log(err.name, err.message);
    process.exit(1);
    
})

dotenv.config({path:'./env/config.env'});

app.use(express.json());
const port=3000;


mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
}).then(connection=>{
    console.log("Database Connection Successfully")
}
)
app.use('/api/v1/users',userRouter);

app.all('*',(req,res,next)=>{
    // res.status(404).json({
    //     status:"Fail",
    //     message:`cant find ${req.originalUrl} on this server`
    // })
    // const err=new Error(`Can't find ${req.originalUrl} on this server `);
    // err.status="fail";
    // err.statusCode=404;

    next(new AppError(`Can't find ${req.originalUrl} on this server `,404))
})

app.use(globalError)

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})      


process.on("unhandledRejection",err=>{
    console.log("UNHANDLED REJECTION 💥💥💥");
    console.log(err.name, err.message);
    process.exit(1);
    
})
