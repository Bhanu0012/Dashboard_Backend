const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name:{type: String, required: true}, 
  fathersName: {type: String},
  mobile: Number,
  email:{type: String, required: true, unique: true}, 
  imageUrl: {type: String},
  institute_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institute",
    required: true
  },
  course_id: { // Add this line to reference the Course model
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  fee: {type: Number, default:0}
});

module.exports = mongoose.model("Student", studentSchema);