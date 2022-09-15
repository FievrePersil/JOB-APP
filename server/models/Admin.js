const mongoose = require ('mongoose')


const admin = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
});


const Admin = mongoose.model("admin", admin)
module.exports = Admin