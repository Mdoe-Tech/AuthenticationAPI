const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const validator=require('validator');
const crypto=require('crypto')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is required"]
    },

    email:{
        type:String,
        required:true,
        lowercase:true,
        validate:[validator.isEmail,"Please Provide Valid Email"]
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    passwordConfirm:{
        type:String,
        required:true,
        minlength:8,
        validate:{
            validator:function(el){
            return el== this.password
            },
            message:"Password should be Same",
        }
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    passwordChangedAt:Date,
    passwordResetToken:String,
    resetExpires:Date,
    photo:String,
})


userSchema.pre('save',async function(next){
  if(!this.isModified('password')) return next();
  this.password=await bcrypt.hash(this.password,12);
  this.passwordConfirm=undefined
})

userSchema.methods.correctPassword=async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword)
}

userSchema.methods.changePasswordAt=async function(JWTTimeStamp){
  if(this.passwordChangedAt){
    const changedPassword=parseInt(this.passwordChangedAt/1000,10);
    return JWTTimeStamp<changedPassword;
  }
}

userSchema.methods.resetPasswordFunctionality=async function(){
   //create a token
   const resetToken=crypto.randomBytes(32).toString('hex');
   
   this.passwordResetToken=crypto.createHash('sha256').update(resetToken).digest('hex');

   this.resetExpires=Date.now()+10*60*1000;

   console.log({resetToken},this.passwordResetToken);

   return resetToken;
}

const User=mongoose.model('User', userSchema);
module.exports=User;