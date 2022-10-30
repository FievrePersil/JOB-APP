const { required, date } = require('joi');
const mongoose = require ('mongoose')


const job = new mongoose.Schema({
    jobtitle :{
        type: String,
        required: true,
    },
    salary:{
        type: String,
        required: true,
    },
    jobemail:{
        type: String,
        required: true,
    },
    schedule:{
        type: String,
        required: true
    },
    aboutjob:{
        type: String,
        required: true
    },
    employer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "employer",
        required: true,
    },
    date:{
        type: String,
        required: true,
        
    },
});


const Job = mongoose.model("job", job)
module.exports = Job