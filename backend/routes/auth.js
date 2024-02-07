const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcrypt');
var jwt = require('jsonwebtoken');
var fetchuser=require("../middleware/fetchuser")

const JWT_SECRET="Harryisagoodb$oy"

// ROUTE 1: Create a User Using :POST"/api/auth/createuser" .login doesn't required
router.post('/createuser', [
   body('name','Enter a valid name').isLength({min:3}),
   body('email','Enter a valid email ').isEmail(),
   body('password','Password must be atleast 5 characters ').isLength({min:5}),
],async(req,res)=>{
  let success=false
   // If there is an error, return Bad request and errors
   const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success,errors:errors.array()});
  }

  try{
    //  Check wheather the user with the same email
  let user=await User.findOne({email:req.body.email})
  if(user){
   console.log(user);
   return res.status(400).json({ success, error:"User with this email already exists"})
  }
  const salt=await bcrypt.genSalt(10)
  secPass=await bcrypt.hash(req.body.password,salt)
  // create a new user
  user= await User.create({
   name:req.body.name,
   email:req.body.email,
   password:secPass
  })
  const data={
    user:{
      id:user.id
    }
  }
const authtoken=jwt.sign(data,JWT_SECRET)
console.log(authtoken);

  // console.log(user);
  success=true
  res.json({success, authtoken})


  }catch(error){
    console.log(error.message);
    res.status(500).send("Internal Server Error")
  }


});
 
// ROUTE 2: Authenticate a using: POST"/api/auth/login" .login doesn't required
router.post('/login', [

  body('email','Enter a valid email ').isEmail(),
  body('password','Password cannot be blank ').exists(),

],async(req,res)=>{
  let success=false
  // If there is an error, return Bad request and errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success,errors:errors.array()});
  }
  

  const {email,password}=req.body;
  try {
    let user= await User.findOne({email})
    if(!user){
      return res.status(400).json({error:"Please try to login with correct credentials"})
    }
    const passwordCompare= await bcrypt.compare(password,user.password)
    if(!passwordCompare){
      success=false
      return res.status(400).json({ success, error:"Please try to login with correct credentials"})
    }
   
    const data={
      user:{
        id:user.id
      }
    }
  const authtoken=jwt.sign(data,JWT_SECRET)
   success=true
  res.json({success,authtoken})
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error")
    
  }

})

// ROUTE 3: Get login User Detail Using :POST"/api/auth/getuser" .login required

router.post('/getuser',fetchuser,async(req,res)=>{
try {
   const userId=req.user.id
  const user =await User.findById(userId).select("-password")
  res.send(user)
 
} catch (error) {
  console.log(error.message);
    res.status(500).send("Internal Server Error")
}
})
module.exports= router