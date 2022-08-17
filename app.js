const morgan=require('morgan')
const dotenv=require('dotenv')
const express= require('express');
const mongoose=require('mongoose');
const rateLimit=require('express-rate-limit');

const userRouter=require('./routes/userRoutes')
const AppError=require('./utils/AppError');
const globalError=require('./controller/errorController');
const app=express();

process.on("uncaughtException",err=>{
    console.log("UNCAUGHT EXCEPTION 💥💥💥");
    console.log(err.name, err.message);
    process.exit(1);
    
})

const limiter=rateLimit({
    max:100,
    window:60*60*1000,
    message:"Too Many Request from this IP please try again after 1 hour"
})

dotenv.config({path:'./env/config.env'});

if(process.env.NODE_ENV=="development"){
    app.use(morgan('dev'));
}
app.use(express.json());
app.use('/api', limiter);
const port=3000;


mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
}).then(connection=>{
    console.log("Database Connection Successfully")
}
)
app.use('/api/v1/users',userRouter);

app.all('*',(req,res,next)=>{
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
