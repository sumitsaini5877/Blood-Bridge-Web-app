// const { consumerModel } = require('../models/conumerModel')

// // CREATE CONSUMER
// const addConsumer = async (req, res) => {
//   try {
//     // Validate the request body
//     const { consumerName, consumerEmail, consumerAddress, consumerPhone } = req.body;
//     if (!consumerName || !consumerEmail || !consumerAddress || !consumerPhone ) {
//       return res.status(400).send({
//         success: false,
//         message: "Please provide all required fields",
//       });
//     }

//     // Check if the consumer email already exists
//     const existingConsumer = await consumerModel.findOne({ consumerEmail });
//     if (existingConsumer) {
//       return res.status(400).send({
//         success: false,
//         message: "Consumer with this email already exists",
//       });
//     }

//     // Create a new consumer
//     const newConsumer = new consumerModel(req.body);
//     await newConsumer.save();
//     return res.status(201).send({
//       success: true,
//       message: "New Consumer Record Added",
//     });
//   } catch (error) {
//     console.log(error);
//     if (error.code === 11000) {
//       return res.status(400).send({
//         success: false,
//         message: "Consumer with this email already exists",
//       });
//     }
//     return res.status(500).send({
//       success: false,
//       message: "Error creating consumer",
//       error,
//     });
//   }
// };

// module.exports = { addConsumer };


const mongoose=require('mongoose')
const { consumerModel } = require("../models/conumerModel");

// CREATE CONSUMER
const addConsumer = async (req, res) => {
  try {
    // Validate the request body
    const { consumerName, consumerEmail, consumerAddress, consumerPhone,  bloodType, bloodAmount } = req.body;
    if (!consumerName || !consumerEmail || !consumerAddress || !consumerPhone||!bloodAmount||!bloodType ) {
      return res.status(400).send({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Validate the consumer phone number
    if (consumerPhone.length !== 10 || !/^\d+$/.test(consumerPhone)) {
      return res.status(400).send({
        success: false,
        message: "Invalid phone number",
      });
    }

    // Validate the hospital ObjectId
    // if (!mongoose.Types.ObjectId.isValid(hospital)) {
    //   return res.status(400).send({
    //     success: false,
    //     message: "Invalid hospital ObjectId",
    //   });
    // }

    // Check if the consumer email already exists
    const existingConsumer = await consumerModel.findOne({ consumerPhone });
    if (existingConsumer) {
      return res.status(400).send({
        success: false,
        message: "Consumer with this phone number already exists",
      });
    }

    const existingConsume = await consumerModel.findOne({ consumerEmail});
    if (existingConsume) {
      return res.status(400).send({
        success: false,
        message: "Consumer with this phone email already exists",
      });
    }


    // Create a new consumer
    const newConsumer = new consumerModel(req.body);
    await newConsumer.save();
    return res.status(201).send({
      success: true,
      message: "New Consumer Record Added",
    });
  } catch (error) {
    console.log(error);
    
    
    return res.status(500).send({
      success: false,
      message: "Error creating consumer",
      error,
    });
  }
};

// GET CONSUMER
const getConsumers = async (req, res) => {
    try {
      const consumers = await consumerModel.find();
      return res.status(200).send({
        success: true,
        message: "Consumers retrieved successfully",
        data: consumers,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error retrieving consumers",
        error,
      });
    }
  };
  
  module.exports = { getConsumers,addConsumer };

// module.exports = { addConsumer };