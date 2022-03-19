const mongoose = require('mongoose');

const {Schema} = mongoose;

let ExerciseSchema = new Schema({
    description:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true,
        default:0
    },
    date:{
        type:Date,
        default:new Date()
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
});

module.exports = mongoose.model('Exercise',ExerciseSchema);