import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Jobs = () => {


    
    const [jobs, setJobs] = useState([]);
    const [check, setCheck]= useState(false)



    //delete a certain job
    const DeleteJob = async(id) =>{
        const body = {id}
        try {
            const response = await fetch('http://localhost:3001/deljob',{
                method: 'DELETE',
                body: JSON.stringify(body),
                headers: { "Content-type": "application/json" },
            });
            const data = await response.json()
            alert(data.message)
        } catch (err) {
            console.log(err.message)
        }
    }
    //get the jobs of the current user
    const getJobs = async() =>{
        try {
            const response = await fetch('http://localhost:3001/jobs',{
                method: 'GET'
            })
            const data = await response.json()
            if(data.jobs.length > 0){
                setJobs(data.jobs)
                setCheck(true)
            }else{
                setCheck(false)
            }
        } catch (err) {
            console.log(err.message)
            
        }

    }


    useEffect(()=>{
        getJobs()
    }, [])
    
//set the title of the page
useEffect(()=>{
  document.title = "Jobs";
})

    return(
        <>
        <div className="mb-5 position-relative p-5">
            <nav className="navbar navbar-expand-lg navbar-light bg-primary px-3 py-0">
  <div className="container-fluid">
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarText">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to ="/profile" className="nav-link" aria-current="page">Go Back</Link>
        </li>
        <li className="nav-item">
          <Link to="/contact" className="nav-link">Contact</Link>
        </li>
      </ul>
      <span className="navbar-text mt-2">
        <h5>Your Jobs</h5>
      </span>
    </div>
  </div>
</nav>

            </div>
        
            
        {check ?
        
        <div>
        
          {jobs.map(job => (
          <div className="container border border-primary border-2 rounded mb-5 mt-5" key={job._id}>
            
              <h2 className="mt-4 ms-3 text-nowrap d-flex">Job Title: <p className="ms-2 text-secondary text-capitalize"> {job.jobtitle}</p></h2>
              <h6 className="mt-2 ms-3 text-nowrap d-flex">Released in: <p className="ms-2 text-success"> {job.date} </p></h6>
              <h6 className="mt-2 ms-3 text-nowrap d-flex">Salary: <p className="ms-2 text-success">{job.salary}$</p></h6>
              <h6 className="mt-2 ms-3 text-nowrap d-flex">Schedule: <p className="ms-2 text-success">{job.schedule}</p></h6>
              <h6 className="mt-2 ms-3 d-flex text-nowrap">About Job<p className="ms-2 d-flex text-wrap text-success"> <span>{job.aboutjob}</span></p></h6>
              <div className=" d-flex justify-content-center">
              <button onClick={()=>DeleteJob(job._id)}  type="button" class="btn btn-outline-danger mb-3 mt-3" style={{width: 800}}>Delete Job</button>
              </div>
          </div>

          
          
        ))};

        </div> : <div className="alert alert-success py-5" role="alert">
  <h4 className="alert-heading">Sorry!</h4>
  <p>Unfortunatly, seems like you have no Jobs yet .</p>
  <hr />
  <p className="mb-0">Maybe you need to post a job first, in order to get proposals.</p>
</div>
}
        </>
    );
}

export default Jobs