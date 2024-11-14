// const mongoose = require("mongoose");

// const consumerSchema = new mongoose.Schema({
//   consumerName: {
//     type: String,
//     required: [true, "Enter Consumer Name."],
//     trim: true,
//   },
//   consumerEmail: {
//     type: String,
//     required: [true, "Enter Consumer Email."],
//     unique: true,
//     trim: true,
//   },
//   consumerAddress: {
//     type: String,
//     required: [true, "Enter the address of consumer."],
//   },
//   consumerPhone: {
//     type: String,
//     unique:true,
//     required: [true, "Enter consumer mobile number."],
//     validate: {
//       validator: (v) => {
//         return v.length === 10;
//       },
//       message: "Phone number should be 10 digits",
//     },
//   },
//   // hospital: {
//   //   type: mongoose.Schema.Types.ObjectId,
//   //   ref: "users",
//   //   required: [true, "Enter Hospital"],
//   // },
// });

// const consumerModel = mongoose.model("consumer", consumerSchema);

// module.exports = { consumerModel };



const mongoose = require("mongoose");

const consumerSchema = new mongoose.Schema({
  consumerName: {
    type: String,
    required: [true, "Enter Consumer Name."],
    trim: true,
  },
  consumerEmail: {
    type: String,
    required: [true, "Enter Consumer Email."],
    unique: true,
    trim: true,
  },
  consumerAddress: {
    type: String,
    required: [true, "Enter the address of consumer."],
  },
  consumerPhone: {
    type: String,
    unique: true,
    required: [true, "Enter consumer mobile number."],
    validate: {
      validator: (v) => {
        return v.length === 10;
      },
      message: "Phone number should be 10 digits",
    },
  },
  bloodType: {
    type: String,
    required: [true, "Enter Blood Type."],
  },
  bloodAmount: {
    type: Number,
    required: [true, "Enter Blood Amount."],
  },
},{timestamps:true});

const consumerModel = mongoose.model("consumer", consumerSchema);

module.exports = { consumerModel };