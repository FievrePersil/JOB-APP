import React, { useState, useEffect } from "react";






const Jobs = ()=>{
  const [value, setMyValue] = useState('')
  
  


  const ProposalForm = ({id}) =>{

    const SaveProposal = async(e) =>{
      e.preventDefault();
      try {
        const jobid = value
        const body = {phone, age, gender, email, time, description, jobid}
        const response = await fetch('http://localhost:3001/proposal',{
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(body)
        });
        const data = await response.json()
        if (data.message){
          alert(data.message)
        }
      }catch(err){
        console.log(err.message)
      }}


    const [phone, setPhone] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [email, setEmail] = useState('')
    const [time, setTime] = useState('')
    const [description, setDescription] = useState('')
    //checks if its the id sent by the button is the same in the box
    if(id === value){
    return <form onSubmit={SaveProposal} className="wow fadeInUp" data-wow-delay="0.1s">
    <div className="row g-3">
    <div className="col-12">
    <h6 className="text-start" >Your Email:</h6>
    <div className="input-group flex-nowrap">
    <span class="input-group-text" id="addon-wrapping">@</span>
    <input required onChange={(e)=>{setEmail(e.target.value)}} type="email" class="form-control" aria-label="Username" aria-describedby="addon-wrapping" />
    </div>
    </div>
    <div className="col-12">
    <h6 className="text-start">Phone:</h6> 
    <div className="input-group flex-nowrap">
    <span class="input-group-text" id="addon-wrapping">+216</span>    
    <input required onChange={(e)=>{setPhone(e.target.value)}} type="number" class="form-control" id="jobtitle" aria-describedby="basic-addon3" />
    </div>
    </div>
        
    
    <div className="col-12">
    <h6 className="text-start">Age:</h6>
    <div class="input-group">
    
    <input required onChange={(e)=>{setAge(e.target.value)}} type="number" class="form-control" aria-label="Amount (to the nearest dollar)" />
    <span class="input-group-text">y/o</span>
    </div>
    </div>
        <div className="col-12">
        <h6 className="text-start">Gender:</h6>
        <div className="form-check text-start">
        <input required value={"Male"} onChange={(e)=>{setGender(e.target.value)}} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
        <label className="form-check-label" htmlFor="flexRadioDefault1">Male</label>
        </div>
        <div className="form-check text-start">
            <input required value={"Female"} onChange={(e)=>{setGender(e.target.value)}} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
            <label className="form-check-label" htmlFor="flexRadioDefault2">Female</label>
        </div>
        </div>


        <div className="col-12">
        <h6 className="text-start" id="form">When can you start?:</h6>
        <div className="form-check text-start">
        <input required value={"Right away"} onChange={(e)=>{setTime(e.target.value)}} className="form-check-input" type="radio" name="startin" id="startin1" />
        <label className="form-check-label" htmlFor="startin1">Right away</label>
        </div>
        <div className="form-check text-start">
            <input required value={"In 2 weeks"} onChange={(e)=>{setTime(e.target.value)}} className="form-check-input" type="radio" name="startin" id="startin2" />
            <label className="form-check-label" htmlFor="startin2">In 2 weeks</label>
        </div>
        <div className="form-check text-start">
            <input required value={"In 1 month"} onChange={(e)=>{setTime(e.target.value)}} className="form-check-input" type="radio" name="startin" id="startin3" />
            <label className="form-check-label" htmlFor="startin3">In 1 month</label>
        </div>
     
        </div>
  
        <div className="col-12">
      <div className="form-floating">
        <textarea onChange={(e)=>{setDescription(e.target.value)}} style={{height: 200}} required className="form-control" id="password" placeholder="Subject" />
        <label htmlFor="password">Describe yourself and tell us why you thing you are suitable for this job...</label>
      </div>
    </div>
    
    
    <div className="col-12 mt-5">
      <button className="btn btn-primary w-100 py-3 mb-3" type="submit">Submit</button>

    </div>
    </div>
    </form>}
  }

 

    const [jobs, setJobs] = useState([])


    const getJobs = async() =>{

        
        try {
            const response = await fetch('http://localhost:3001/getjobs',{
            method: "GET",  
          });
          const data = await response.json()
          if(data.jobs){
            setJobs(data.jobs)
          }else{
            console.log(data.message)
          }
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(()=>{
      getJobs()
    }, [])





    return <div>
         
         {jobs.map(job => (
          <div className="container border border-primary border-2 rounded mb-5" key={job._id}>
            
              <h2 className="mt-3 text-center">{job.jobtitle}</h2>
              <h6 className="mt-5 ms-3 text-nowrap d-flex">Created by Mr/Mrs: <p className="ms-2 text-success text-capitalize"> {job.user.name} {job.user.lastname}</p></h6>
              <h6 className="mt-2 ms-3 text-nowrap d-flex">Owner of: <p className="ms-2 text-success">{job.user.company} Company</p></h6>
              <h6 className="mt-2 ms-3 text-nowrap d-flex">Schedule: <p className="ms-2 text-success"> {job.schedule}</p></h6>
              <h6 className="mt-2 ms-3 text-nowrap d-flex">Salary budget: <p className="ms-2 text-success"> {job.salary}$</p></h6>
              <h6 className="mt-2 ms-3 text-nowrap d-flex">Company E-mail: <p className="ms-2 text-success"> {job.jobemail}$</p></h6>
              <h6 className="mt-2 ms-3 d-flex text-nowrap">Job description: <p className="ms-2 d-flex text-wrap text-success"> <span>{job.aboutjob}</span></p></h6>
              <div className=" d-flex justify-content-center">
              <button onClick={()=>{setMyValue(job._id)}}  type="button" class="btn btn-outline-success mb-3 mt-3" style={{width: 500}}>Start writting a proposal!</button>
              </div>
              <ProposalForm id = {job._id} />
          </div>

          
          
        ))}
      
    </div>
}

export default Jobs