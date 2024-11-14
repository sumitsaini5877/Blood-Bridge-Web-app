const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel =require('../models/userModel')

const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already exists",
      });
    }


    // Ensure that the phone field is provided
    // if (!req.body.phone) {
    //   return res.status(400).send({
    //     success: false,
    //     message: "Phone number is required",
    //   });
    // }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const user = new userModel(req.body);
    await user.save();

    return res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send({
      success: false,
      message: "Error registering user",
    });
  }
};

const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // Check if the role field is being sent in the request body
    if (!req.body.role) {
      console.error("Role field is missing in request body");
      return res.status(400).send({
        success: false,
        message: "Role field is required",
      });
    }

    // Check if the role matches
    if (user.role !== req.body.role) {
      console.error("Role does not match");
      return res.status(401).send({
        success: false,
        message: "Role does not match",
      });
    }

    // Compare password
    const comparePassword = await bcrypt.compare(req.body.password, user.password);
    if (!comparePassword) {
      console.error("Invalid password");
      return res.status(401).send({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.error("Error in login API:", error);
    res.status(500).send({
      success: false,
      message: "Error In Login API",
      error,
    });
  }
};
// old code 
//login call back
// const loginController = async (req, res) => {
//   try {
//     const user = await userModel.findOne({ email: req.body.email });
//     if (!user) {
//       return res.status(404).send({
//         success: false,
//         message: "Invalid Credentials",
//       });
//     }
//     // check role
//     if (user.role !== req.body.role) {
//       return res.status(500).send({
//         success: false,
//         message: "role dosent match",
//       });
//     }
//     //compare password
//     const comparePassword = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );
//     if (!comparePassword) {
//       return res.status(500).send({
//         success: false,
//         message: "Invalid Credentials",
//       });
//     }
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });
//     return res.status(200).send({
//       success: true,
//       message: "Login Successfully",
//       token,
//       user,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error In Login API",
//       error,
//     });
//   }
// };
// 
//GET CURRENT USER




const currentUserController = async (req, res) => {
  try {
    console.log("Current user controller called");
    const user = await userModel.findOne({ _id: req.body.userId });
    if (!user) {
      console.error("User not found");
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    console.log("User found");
    return res.status(200).send({
      success: true,
      message: "User Fetched Successfully",
      user,
    });
  } catch (error) {
    console.error("Error in current user API:", error);
    res.status(500).send({
      success: false,
      message: "Error In Current User API",
      error,
    });
  }
};

// old code
// const currentUserController = async (req, res) => {
//   try {
//     const user = await userModel.findOne({ _id: req.body.userId });
//     return res.status(200).send({
//       success: true,
//       message: "User Fetched Successfully",
//       user,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       success: false,
//       message: "unable to get current user",
//       error,
//     });
//   }
// };



module.exports = { registerController, loginController, currentUserController };
