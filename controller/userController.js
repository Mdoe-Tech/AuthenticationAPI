const User=require('../model/userModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.createUser=catchAsync(async (req,res)=>{
    const user=await User.create(req.body);
    res.status(200).json({
        status:"Success",
        data:{
            user
        }
    })
})

exports.getAllUsers=catchAsync(async (req,res)=>{
        const users=await User.find();
        res.status(200).json({
            status:"Success",
            data:{
                users
            }
        })  
})

exports.getUser=catchAsync(async(req,res)=>{
    const user=await User.findById(req.params.id);
    res.status(200).json({
        status:"Success",
        data:{
            user
        }
    })
        
})

exports.updateUser=catchAsync(async (req,res,next)=>{
        const filterObject=(obj,...allowedObjects)=>{
            const newObj={};
            Object.keys(obj).forEach(element => {
                if(allowedObjects.includes(element)) newObj[element]=obj[element]  
            });
        }
        const filteredBody=filterObject(req.body, 'username','email');

        if(req.body.password || req.body.passwordConfirm){
            return next(new AppError("Your not Allowed to Update Password here, please use another route",500))
        }
        const updatedUser=await User.findByIdAndUpdate(req.user.id,filteredBody,{
            new:true,
            runValidators:true
        });
    
        res.status(200).json({
            status:"Success",
            user:updatedUser
        })   
})

exports.deleteUser=catchAsync (async (req,res)=>{
    const user=await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
        status:"Success",
        data:{
            user
        }
    })
})