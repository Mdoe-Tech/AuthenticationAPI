const AppError = require("../utils/AppError")

const sendDevError=(err,res)=>{
    res.status(404).json({
       status:"fail",
       error:err,
       message:err.message,
       stack:err.stack
    })
}

const sendProdError=(err,res)=>{
    if(err.isOperational){
        res.status(404).json({
            status:err.status,
            message:err.message  
        })
    }else{
        console.error(`An ERROR Occurred 💥 `, err)
        res.status(500).json({
            status:err.status,
            message:"Something went Wrong",
        })
    }
   
}

const handleCastleHandler=(err)=>{
    const message=`Invalid ${err.path} : ${err.value}`
    return new AppError(message,400);;
}

const handleDuplicateError=(err)=>{
    const value=err.errmsg.match(/([" '])(\\?.)*?\1/)[0];
    const message=`Duplicate field value ${value} please use another one`
    return new AppError(message,400);
}


const handleValidationError=(err)=>{
    const value=Object.values(err.errors).map(el=>message);
    const message=`Invalid Input value ${value.join('. ')}`;
    return new AppError(message,400);
}

const handleJWTError=(err)=>{
     new AppError("Invalid Json Web Token", 401);
}

const handleExpiredToken=(error)=>{
    new AppError("Expired Token", 401)
}

module.exports=(err,req,res,next)=>{
    err.status==err.status || "fail";
    err.statusCode==err.statusCode || 500;

    if(process.env.NODE_ENV==="development"){
        sendDevError(err,res)
    }
    else if(process.env.NODE_ENV==="production"){
        let error={...err};
        if(err.name=="CastError") error=handleCastleHandler(error);
        if(err.code==11000)error=handleDuplicateError(error);
        if(err.name=="ValidationError") error=handleValidationError(error);
        if(err.name=="JsonWebtokenError")error=handleJWTError(error);
        if(err.name=="TokenExpiredError")error=handleExpiredToken(error);
        sendProdError(err,res)
    }
}