const mongoose = require ('mongoose')


const contact = new mongoose.Schema({
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
    },
    subject:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true,
    },
});


const Contact = mongoose.model("contact", contact)
module.exports = Contact