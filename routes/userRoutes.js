const express=require('express');
const userController=require('../controller/userController')
const authController=require('../controller/authController')
const router=express.Router();

router.post('/signup',authController.signup);
router.post('/login',authController.login);
router.post('/forgotPassword', authController.forgotPassword)
router.post('/resetPassword', authController.resetPassword)

router.route('/')
   .get(authController.protect, userController.getAllUsers)
   .post(authController.protect,authController.restrictTo('admin'),userController.createUser);

router.route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(authController.protect,authController.restrictTo('admin'), userController.deleteUser);

module.exports=router;   