const mongoose = require ('mongoose')


const employer = new mongoose.Schema({
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


const Employer = mongoose.model("employer", employer)
module.exports = Employer