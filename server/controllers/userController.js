const userModel = require('../models/Users')
const bcrypt = require("bcrypt");
const { use } = require('../routes/userRoutes');


// create register user
exports.registerController = async(req,res) => {
      try{
          const {username,email,password} = req.body
          // validation
          if(!username || !email || !password){
            return res.status(400).send({
                success: false,
                message:'Please fill all the fields'
            })
          }

          // existing user
          const existingUser = await userModel.findOne({email})
          if(existingUser){
            return res.status(401).send({
                success: false,
                message: 'user already existing',
            })
          }

          const hashedpassword = await bcrypt.hash(password, 10)

          // create new user
          const user = await new userModel({username,email,password: hashedpassword}).save();

          return res.status(201).send({
            success: true,
            message: 'user has been created',
            user
          })
      }catch(error){
        console.log(error);
        // internal server error
        return res.status(500).send({
            message: "Error in register callback",
            success: false,
            error
        })
      }
};

//get all users
exports.getAllUsers = async(req,res) => {
      try{
        const users = await userModel.find();
      return res.status(201).send({
        userCount: users.length,
        success: true,
        message: "gett all users",
        users
      })

      }catch(error){
        console.log(error);
        return res.status(500).send({
          success: false,
          message: "error in getting all users",
          error
        })
      }
};

// login
exports.loginController = async(req,res) => {
    try{

      const {email,password} = req.body;

      
      // validation
      if(!email || !password){
        return res.status(401).send({
          success: false,
          message: "email or password is provided"
        })
      }
      const user = await userModel.findOne({email});
      if(!user){
        return res.status(200).send({
          success: false,
          message: "email id is not registered"
        })
      }
     // password checking

     const isMatch = await bcrypt.compare(password,user.password);
     if(!isMatch){
       return res.status(401).send({
         success: false,
         message: "Invalid username or password"
       })
     }

     return res.status(200).send({
      success: true,
      message: "successfully logined",
      user
     })


    }catch(error){
      console.log(error);
      return res.status(500).send({
        success: false,
        message:"Error in login callback",
        error
      })
    }
};