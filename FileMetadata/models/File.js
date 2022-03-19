const mongoose = require('mongoose');
const {Schema} = mongoose;

let fileSchema = new Schema({
    name:{
        type:String,
        length:255,
        required:true,
        unique:true,
    },
    type:{
        type:String,
        length:255,
        required:true,
        unique:true,
    },
    size:{
        type:Number,
        length:255,
        required:true,
        unique:true,
    },
    path:{
        type:String,
        length:255,
        required:true,
        unique:true,
    }
})


module.exports = mongoose.model("File",fileSchema);