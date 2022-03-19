const mongoose = require('mongoose');

const {Schema} = mongoose;

let userSchema = new Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
        length:255,
        unique:true
    }
})

let UserModel = mongoose.model("User",userSchema);
module.exports = UserModel;