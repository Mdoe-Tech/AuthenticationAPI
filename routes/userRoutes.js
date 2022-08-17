const express=require('express');
const userController=require('../controller/userController')
const authController=require('../controller/authController')
const router=express.Router();

router.post('/signup',authController.signup);
router.post('/login',authController.login);
router.post('/forgotPassword', authController.forgotPassword)
router.patch('/resetPassword/:token', authController.resetPassword)
router.patch('/updatePassword',authController.protect,authController.updatePassword);

router.route('/')
   .get(authController.protect, userController.getAllUsers)
   .post(authController.protect,authController.restrictTo('admin'),userController.createUser);

router.route('/:id')
    .get(userController.getUser)
    .patch(authController.protect, userController.updateUser)
    .delete(authController.protect,authController.restrictTo('admin'), userController.deleteUser);

module.exports=router;   