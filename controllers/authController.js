const crypto = require('crypto');
const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const taskUser1 = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');



const signToken = id =>{
    return jwt.sign({ id}, process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN})
}
// utils/createSendToken.js (for reusability)
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id)

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,          // cannot be accessed by JS
    secure: false,           // set true in production (with HTTPS)
    sameSite: "lax"          // or "none" + secure:true if frontend/backend are on diff domains
  };

  res.cookie('jwt', token, cookieOptions);
   // Hide password field
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: { user }
  });
}


exports.signup = catchAsync(async (req, res) => {
    const newUser = await taskUser1.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        role: req.body.role
    });
    createSendToken(newUser, 201, res);
});

//login
exports.login = catchAsync( async(req,res,next) =>{
        const {email,password} = req.body;

        //check if email and password exists
        if(!email || !password){
            res.status(404).json({
                status:'fail',
                message: 'please proveide email and password'
            });
        }
        //check if user exists && password is correct
        const user = await taskUser1.findOne({email}).select('+password');
        
        if(!user){
             return res.status(404).json({
                status:'fail',
                message:' Invalid email or password'
            })
        }
        //to compare the passwords
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                status: 'fail',
                message: ' Invalid email or password'
            })
        }

        createSendToken(user,200,res)
    
});

exports.restrictTo = (...roles)=>{
    return (req,res,next)=>{
        //roles is an array['admin','lead-guide']
        if(!roles.includes(req.user.role)){
            
           
            return next(new AppError('you do not have permission to perform this action',403))
        }
         next();
        
         
    } 
}

//how to protect routes using a middleware
exports.protect = catchAsync( async(req,res,next)=>{
    //1) getting the token and check if it's there

    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){    
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt){
        token = req.cookies.jwt;
    }
   
 
    
    if(!token){
        return next(new AppError('You are not logged in! please log in to get access.', 401))
    }
    //2)verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    
    
    //3) check if user still exists
    const currentUser = await taskUser1.findById(decoded.id);
    if(!currentUser){
        return next(new AppError('The user no longer exist.',401))
    }

//     //4) check if user changed password after the token was issued
//    if (currentUser.changePasswordAfter(decoded.iat)){
//     return next(new AppError('User recently changed password! Please log in again.',401))
//    };

   //grant access to protected route
   req.user = currentUser;
    next();
})