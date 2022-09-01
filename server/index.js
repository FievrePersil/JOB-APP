const express = require ('express')
const router = require('express').Router();
const mongoose = require ('mongoose')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
//use the bycrypt to check if the password is valid
const bcrypt = require('bcryptjs')
//cors is required for sending data to the database
var cors = require('cors')
const app = express()
//importing the user model (you have to import it here in order to see it on the mongodb)
const User = require('./models/User');
const Job = require('./models/Jobs');
const Proposal = require('./models/proposal')
const Contact = require('./models/Contact')
//call the .env file
const path = require('path')
require('dotenv').config()


const session = require('express-session')


// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));
//this will allow us to recieve informations from the frontend in json format
app.use(express.json())
app.use(cors())


app.use(router)
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
});



var sess

app.listen(3001, (req, res)=>{
    console.log('running on 3001!')
})



router.post("/user", asyncHandler(async(req, res)=>{
    const { id, name, lastName, email, password, company, type } = req.body
    console.log(password)
    //hash the password
    //salt is a bcrypt fucntion to encrypt the hashedpassword
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User ({id: id, name: name, lastname: lastName, email: email, pass: hashedPassword, company: company, type: type});
    try {
        await user.save();
        console.log('user '+name+ ' inserted!');
        res.json({inserted: true})
        const token = jwt.sign({
            id
        }, process.env.JWT_SECRET, {
            expiresIn: "30d"
        });
        res.json({token: token});
    } catch (err) {
        console.log(err);
        res.json({inserted: false});
    }
}))


const verifyJwt = async(req, res, next)=>{
    let token = req.headers["x-access-token"]

    if(!token){
        res.json({auth: false, message: "we need a token!"})
    }else{
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
            if(err){
                res.json({auth: false, message: "you failed the login!"})
            }else{
                
                req.userId = decoded.id
                next();
            }
        })
    }
}




router.get('/isUSerAuth', verifyJwt, async(req, res)=>{
    res.status(200).json({auth: true, message: "you aree authenticated!"})  
})



router.post('/login', async(req, res)=>{
    const { id, password } = req.body;
    try {
        //check for user email
        const user = await User.findOne({id: id})
        if(!user) res.json({message: "Invalid ID#"})
        //bcrypt.compare to check and compare the hashed password
        if(user && (await bcrypt.compare(password, user.pass))){
            
            const token = jwt.sign({
                id,
            }, process.env.JWT_SECRET, {
                expiresIn: "30d",
            })
            console.log(token)
            res.json({auth: true, message: "logged in succesfully", token: token})
            sess = req.session
            sess.userid = user.id;
        }else{
            res.status(400)
            res.json({auth: false, message: "Invalid ID# or password!"})
        }
    } catch (err) {
        console.error(err.message)
    }
})



//to get the data of the user logged in
router.get("/users", async(req, res)=>{
    try {
        const session = sess;
        const user = await User.findOne({id: session.userid})
        if(!user) res.json({message: "Invalid ID#"})
        res.json({usersid: user.id, company: user.company, name: user.name, lastname: user.lastname, type: user.type});
    } catch (err) {
        console.log(err.message)
    }
    
})

router.post('/job', async(req, res)=>{
    const session = sess;
    //find the current user through the session
    const user = await User.findOne({id: session.userid})
    const { jobTitle, salary, email, time, description } = req.body;
    const job = new Job({jobtitle: jobTitle, salary: salary, jobemail: email, schedule: time, aboutjob: description, user: user})
    try {
        await job.save()
        res.json({message: "Congratulations! your job has been posted", posted: true})
    } catch (error) {
        console.log(error.message)
        res.json({message: "Sorry your job couldn't be posted", posted: false})
    }
    res.end();
})

router.delete('/logout', async(req,res) => {
    try {
        sess = undefined
        console.log(sess)
        res.status(200).json({code: 200, message: 'loggedout', session1: sess})
    } catch (err) {
        console.log(err)
    }
    res.end()
    
})


router.get("/getjobs", async(req, res)=>{

    try {
        const jobs = await Job.find({}).populate('user').exec();
        if(!jobs){
            res.json({message: "Failed to load Jobs"});
        }
        if(jobs){
            res.json({jobs: jobs, message:"Loading jobs complete"});
        }
    } catch (err) {
        console.log(err.message)
    }
    
})

//add proposal router
router.post('/proposal', async(req, res)=>{
    const session = sess;
    const userid = session.userid
    const { phone, age, gender, email, time, description, jobid } = req.body;
    const job = await Job.findOne({_id: jobid})
    const user = await User.findOne({id: userid})
    try {
        const proposal = new Proposal ({propemail: email, phone: phone, gender: gender, startin: time, age: age, description: description, job: job, user: user})
        await proposal.save();
        res.json({message: "Congratulations! your proposal has been sent!"});
    } catch (err) {
        console.log(err.message)
        res.json({message: "Sorry proposal not set, Try again later!"})
    }
})

//get a proposal
router.get('/getproposal', async(req, res)=>{
    try {
        const session = sess;
        const user = await User.findOne({id: session.userid})
        const id = user._id
        const job = await Job.findOne({user: id})
        const idjob = job._id

        const proposal = await Proposal.find({job: idjob}).populate('job').populate('user').exec();
        if(proposal){
        res.json({proposal: proposal, prop: true})}
    } catch (error) {
        res.json({message: "No proposals found"})
    }
})


router.post('/contact', async(req, res)=>{
    const {name, lastname, email, subject, message} = req.body
    const contact = new Contact({name: name, lastname: lastname, email: email, subject: subject, message: message})
    try {
        await contact.save()
        res.json({message: "Your message has been sent! we'll contact you as soon as possible"})
    } catch (error) {
        console.log(error.message)
        res.json({message: "Sorry your message couldn't be sent try again later!"})
    }
})





module.exports = router