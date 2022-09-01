const mongoose = require ('mongoose')


const user = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true,
    },
    name:{
        type: String,
        required: true,
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    pass:{
        type: String,
        required: true
    },
    company:{
        type: String,
    },
    type:{
        type: String,
        required: true
    },
});


const User = mongoose.model("user", user)
module.exports = User