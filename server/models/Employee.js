const mongoose = require ('mongoose')


const employee = new mongoose.Schema({
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
    type:{
        type: String,
        required: true
    },
});


const Employee = mongoose.model("employee", employee)
module.exports = Employee