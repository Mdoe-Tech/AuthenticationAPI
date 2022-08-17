const User=require('../model/userModel');
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

exports.updateUser=catchAsync(async (req,res)=>{
        const user=await User.findByIdAndUpdate(req.params.id,{
            new:true
        });
    
        res.status(200).json({
            status:"Success",
            user
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