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
const Employee = require('./models/Employee')
const Employer = require('./models/Employer')
const Job = require('./models/Jobs');
const Proposal = require('./models/proposal')
const Contact = require('./models/Contact')
const Admin = require('./models/Admin')
//call the .env file
const path = require('path')
require('dotenv').config()


const session = require('express-session')


// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(session({
    secret: process.env.SESSION_KEY,
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));
//this will allow us to recieve informations from the frontend in json format
app.use(express.json())
app.use(cors())

//connect to the database
app.use(router)
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
});



var sess

app.listen(3001, (req, res)=>{
    console.log('running on 3001!')
})


//admin login
router.post('/admin', async(req, res)=>{
    const {username, password} = req.body
    try {
        const admin = await Admin.findOne({username: username, password: password})
        if(admin){
            res.json({auth: true, message: "logged in succesfully", username: username})
        }else{
            res.json({auth: false, message: "Invalid ID# or password!"})
        }
    } catch (err) {
        console.log(err.message)
    }
})


//register an employer
router.post("/employer", asyncHandler(async(req, res)=>{
    const { id, name, lastName, email, password, company, type } = req.body
    
    //hash the password
    //salt is a bcrypt fucntion to encrypt the hashedpassword
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);
    const employer = new Employer ({id: id, name: name, lastname: lastName, email: email, pass: hashedPassword, company: company, type: type});
    try {
        await employer.save();
        console.log('employer '+name+ ' inserted!');
        const token = jwt.sign({
            id
        }, process.env.JWT_SECRET, {
            expiresIn: "30d"
        });
        res.json({token: token, inserted: true})
    } catch (err) {
        console.log(err);
        res.json({inserted: false})
    }
}))


//register an employee
router.post("/employee", asyncHandler(async(req, res)=>{
    const { id, name, lastName, email, password, type } = req.body
    
    //hash the password
    //salt is a bcrypt fucntion to encrypt the hashedpassword
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);
    const employee = new Employee ({id: id, name: name, lastname: lastName, email: email, pass: hashedPassword, type: type});
    try {
        await employee.save();
        console.log('employee '+name+ ' inserted!');
        const token = jwt.sign({
            id
        }, process.env.JWT_SECRET, {
            expiresIn: "30d"
        });
        res.json({token: token, inserted: true})
    } catch (err) {
        console.log(err);
        res.json({inserted: false})
    }
}))

//updating a user
router.put('/updateuser', async(req,res)=>{
    const session = sess
    const {id, newName, newLastName, newPassword} = req.body
    try {
        if(session.usertype === "Employer"){
                if(newName.length !== 0){
                    await Employer.findOneAndUpdate({id: id}, {name: newName});
                    console.log("name updated")
                }if(newLastName.length !== 0){
                    await Employer.findOneAndUpdate({id: id}, {lastname: newLastName});
                    console.log("lastname updated")
                }if(newPassword.length !== 0){
                    const salt = await bcrypt.genSalt(10)
                    const hashedPassword = await bcrypt.hash(newPassword, salt);
                    await Employer.findOneAndUpdate({id: id}, {pass: hashedPassword});
                    console.log("password updated")
                }
        }else{
            if(newName.length !== 0){
                await Employee.findOneAndUpdate({id: id}, {name: newName});
                console.log("name updated")
            }if(newLastName.length !== 0){
                await Employee.findOneAndUpdate({id: id}, {lastname: newLastName});
                console.log("lastname updated")
            }if(newPassword.length !== 0){
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(newPassword, salt);
                await Employee.findOneAndUpdate({id: id}, {pass: hashedPassword});
                console.log("password updated")
            }
        }
    } catch (err) {
        console.log(err.message)
    }
})


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
    const { id, password, type } = req.body;
    if(type ==="Employer"){
    try {
        //check for user id
        const employer = await Employer.findOne({id: id})
        if(!employer) res.json({message: "Invalid ID#"})
        //bcrypt.compare to check and compare the hashed password
        if(employer && (await bcrypt.compare(password, employer.pass))){
            
            const token = jwt.sign({
                id,
            }, process.env.JWT_SECRET, {
                expiresIn: "30d",
            })
            console.log(token)
            res.json({auth: true, message: "logged in succesfully", token: token})
            sess = req.session
            sess.userid = employer.id;
            sess.usertype = type
        }else{
            res.status(400)
            res.json({auth: false, message: "Invalid ID# or password!"})
        }
    } catch (err) {
        console.error(err.message)
    }}else{
        try {
            //check for user id
            const employee = await Employee.findOne({id: id})
            if(!employee) res.json({message: "Invalid ID#"})
            //bcrypt.compare to check and compare the hashed password
            if(employee && (await bcrypt.compare(password, employee.pass))){
                
                const token = jwt.sign({
                    id,
                }, process.env.JWT_SECRET, {
                    expiresIn: "30d",
                })
                console.log(token)
                res.json({auth: true, message: "logged in succesfully", token: token})
                sess = req.session
                sess.userid = employee.id;
                sess.usertype = type
            }else{
                res.status(400)
                res.json({auth: false, message: "Invalid ID# or password!"})
            }
        } catch (err) {
            console.error(err.message)
        }
    }
})



//to get the data of the user logged in
router.get("/users", async(req, res)=>{
    const session = sess;
    if(session.usertype === "Employer"){
        try {
            const employer = await Employer.findOne({id: session.userid});
            if(!employer) res.json({message: "Invalid ID#"})
            res.json({usersid: employer.id, company: employer.company, name: employer.name, lastname: employer.lastname, type: employer.type, pass: employer.pass});
        } catch (err) {
            console.log(err.message)
        }
    }else{
        try {
            const employee = await Employee.findOne({id: session.userid})
            if(!employee) res.json({message: "Invalid ID#"})
            res.json({usersid: employee.id, name: employee.name, lastname: employee.lastname, type: employee.type, pass: employee.pass});
        } catch (err) {
            console.log(err.message)
        }
    } 
})

//Save a job
router.post('/job', async(req, res)=>{
    const session = sess;
    //find the current user through the session
    const employer = await Employer.findOne({id: session.userid})
    const { jobTitle, salary, email, time, description } = req.body;
    //to get the current date
    const d = new Date()
    //toLocalString transforms the date into a string and changes its format
    const job = new Job({jobtitle: jobTitle, salary: salary, jobemail: email, schedule: time, aboutjob: description, employer: employer, date: d.toLocaleString()})
    try {
        await job.save()
        res.json({message: "Congratulations! your job has been posted", posted: true})
    } catch (error) {
        console.log(error.message)
        res.json({message: "Sorry your job couldn't be posted", posted: false})
    }
    res.end();
})



//get out all jobs
router.get("/getjobs", async(req, res)=>{

    try {
        const jobs = await Job.find({}).populate('employer').exec();
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

//add a proposal
router.post('/proposal', async(req, res)=>{
    const session = sess;
    const userid = session.userid
    const { phone, age, gender, email, time, description, jobid } = req.body;
    const job = await Job.findOne({_id: jobid}).populate('employer').exec()
    const employee = await Employee.findOne({id: userid})
    try {
        const proposal = new Proposal ({propemail: email, phone: phone, gender: gender, startin: time, age: age, description: description, job: job, employee: employee, employer: job.employer._id})
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
        const employer = await Employer.findOne({id: session.userid})
        const id = employer._id
        const job = await Job.findOne({employer: id})
        const idjob = job._id

        const proposal = await Proposal.find({job: idjob}).populate('job').populate('employer').populate('employee').exec();
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

//get the jobs of the current employer
router.get('/jobs', async(req, res)=>{
    const session = sess
    try {
        const employer = await Employer.findOne({id: session.userid})
        const jobs = await Job.find({employer: employer})
        res.json({jobs: jobs});
    } catch (err) {
        console.log(err.message)
    }
})

//get all the database infos for the admin
router.get('/allinfos', async(req, res)=>{
    try {
        const contact = await Contact.find({})
        const employer = await Employer.find({})
        const employee = await Employee.find({})
        const job = await Job.find({}).populate('employer').exec()
        const proposal = await Proposal.find({}).populate('employer').populate('job').populate('employee').exec()
        res.json({employer: employer, employee: employee, job: job, proposal: proposal, contact: contact})
    } catch (err) {
        console.log(err.message)
    }
})

//delete an employer
router.delete('/delemployer', async(req, res)=>{
    try {
        const { id } = req.body
        await Job.find({employer: id}).deleteMany({})
        await Proposal.find({employer: id}).deleteMany({})
        await Employer.findOneAndRemove({_id: id})
        res.json({message: "employer is deleted"})
    } catch (err) {
        console.log(err.message)
        res.json({message: "employer is not deleted"});
    }
})


//delete an employee
router.delete('/delemployee', async(req, res)=>{
    try {
        const { id } = req.body
        await Proposal.find({employee: id}).deleteMany({})
        await Employee.findOneAndRemove({_id: id})
        res.json({message: "employee is deleted"})
    } catch (err) {
        console.log(err.message)
        res.json({message: "employee is not deleted"});
    }
})

//delete a job
router.delete('/deljob', async(req, res)=>{
    try {
        const { id } = req.body
        await Proposal.find({job: id}).deleteMany({})
        await Job.findOneAndRemove({_id: id})
        res.json({message: "job is deleted"})
    } catch (err) {
        console.log(err.message)
        res.json({message: "job is not deleted"});
    }
})

//delete a proposal
router.delete('/delproposal', async(req, res)=>{
    try {
        const { id } = req.body
        await Proposal.findOneAndRemove({_id: id})
        res.json({message: "proposal is deleted"})
    } catch (err) {
        console.log(err.message)
        res.json({message: "proposal is not deleted"});
    }
})

//delete a proposal
router.delete('/delcontact', async(req, res)=>{
    try {
        const { id } = req.body
        await Contact.findOneAndRemove({_id: id})
        res.json({message: "Contact is deleted"})
    } catch (err) {
        console.log(err.message)
        res.json({message: "Contact is not deleted"});
    }
})



module.exports = router