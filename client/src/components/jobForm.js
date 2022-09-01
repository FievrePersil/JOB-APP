import React, { useState } from "react"


const JobForm = () =>{

    const [jobTitle, setJobTitle] = useState('')
    const [salary, setSalary] = useState('')
    const [email, setEmail] = useState('')
    const [time, setTime] = useState('')
    const [description, setDescription] = useState('')
    const [message, setMessage] = useState('')
    const [checked, setChecked] = useState(false)

const SubmitJob =async(e)=>{
    e.preventDefault();
    try {
        const body = { jobTitle, salary, email, time, description }
        const response = await fetch('http://localhost:3001/job',{
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(body),
        });
        const data = await response.json()
        if(data.posted === true){
            setChecked(true)
            setMessage(data.message)
        }else{
            setChecked(true)
            setMessage(data.message)
        }
    } catch (error) {
        console.log(error.message)
    }
}



    return (
        <div>
            <div className="d-inline-block border rounded-pill text-primary px-4 mb-5">Job Descriptions</div>
        <form  onSubmit={SubmitJob}>
        <div className="row g-3">
        <div className="col-12">
        <h6 className="text-start">Job Position:</h6>     
        <input required onChange={(e)=>{setJobTitle(e.target.value)}} type="text" class="form-control" id="jobtitle" aria-describedby="basic-addon3" /></div>
            
        
        <div className="col-12">
        <h6 className="text-start">Salary budget:</h6>
        <div class="input-group">
        <span class="input-group-text">$</span>
        <input required onChange={(e)=>{setSalary(e.target.value)}} type="number" class="form-control" aria-label="Amount (to the nearest dollar)" />
        <span class="input-group-text">.00</span>
        </div>
        </div>

        <div className="col-12">
        <h6 className="text-start">Your Email:</h6>
        <div className="input-group flex-nowrap">
        <span class="input-group-text" id="addon-wrapping">@</span>
        <input required onChange={(e)=>{setEmail(e.target.value)}} type="email" class="form-control" aria-label="Username" aria-describedby="addon-wrapping" />
        </div>
        </div>


            <div className="col-12">
            <h6 className="text-start">Schedule?:</h6>
            <div className="form-check text-start">
            <input required value={"Part Time"} onChange={(e)=>{setTime(e.target.value)}} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
            Part Time
            </label>
            </div>
            <div className="form-check text-start">
                <input required value={"Full Time"} onChange={(e)=>{setTime(e.target.value)}} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                Full Time
                </label>
            </div>
            </div>

            <div className="col-12">
          <div className="form-floating">
            <textarea onChange={(e)=>{setDescription(e.target.value)}} style={{height: 200}} required className="form-control" id="password" placeholder="Subject" />
            <label htmlFor="password">Tell the employees more about the job...</label>
          </div>
        </div>
        
        
        <div className="col-12 mt-5">
            {checked ?
        <div class="alert alert-dark" role="alert">
  {message}
</div>: <p></p> }
          <button className="btn btn-primary w-100 py-3" type="submit">Submit</button>
        </div>
        </div>
        </form>
        </div>
    )
}

export default JobForm