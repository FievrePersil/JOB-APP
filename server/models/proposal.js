const mongoose = require ('mongoose')


const proposal = new mongoose.Schema({
    propemail :{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    age:{
        type: String,
        required: true,
    },
    gender:{
        type: String,
        required: true
    },
    startin:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    job:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "job",
        required: true
    }
});


const Proposal = mongoose.model("proposal", proposal)
module.exports = Proposal