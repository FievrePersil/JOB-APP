import React, { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";
import JobForm from "../components/jobForm";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Jobs from "../components/jobs";

const Profile = () =>{
    const navigate = useNavigate()
    const [value, setMyValue] = useState('')

    //the user informations
    const [name, setName] = useState('')
    const [lastname, setLastName] = useState('')
    const [company, setCompany] = useState('')
    const [type, setType] = useState('')
    const [id, setId] = useState('')
    const [isEmployer, setEmployer] = useState(true)


    const ApplyForm = ({ value }) =>{
        if(value === "on"){
            return <JobForm />
        }
        
    }

    const getUser = async() =>{
      try{
      const response = await fetch('http://localhost:3001/users')
      const data = await response.json()
      setId(data.usersid)
      setCompany(data.company)
      setLastName(data.lastname)
      setName(data.name)
      setType(data.type)
      if (data.type === "Employer"){
        setEmployer(true)
      }else{
        setEmployer(false)
      }
      }catch(err){
      console.log(err.message)
      }
    }


    const LogoutSession = () =>{
      try {
        localStorage.removeItem('token');
        if(localStorage.getItem('token') === null){
          navigate('/')
        } 
      } catch (err) {
        console.log(err.message)
      }
 
    }

    useEffect(()=>{
      getUser()
    }, [])



    return (
        <div className="Profile">
            <div className="container-xxl bg-white p-0">

{/* Navbar */}
<div className="container-xxl position-relative p-0">
  <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
    <a href="/profile" className="navbar-brand p-0">
      <h1 className="m-0">TG.</h1>
      
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
      <span className="fa fa-bars" />
    </button>
    <div className="collapse navbar-collapse" id="navbarCollapse">
      <div className="navbar-nav ms-auto py-0">
        
        
        {/* hashlinks to slide inside the index page */}
         <Link to="/profile" className="nav-item nav-link">Home</Link>
        
        
        {
          isEmployer ? <Link to="/proposals" className="nav-item nav-link">My Proposals</Link>
          :
          <HashLink to="#jobs" className="nav-item nav-link">Jobs</HashLink>
        }

        
        <Link to="/contact" className="nav-item nav-link">Contact</Link>
      </div>
      <span onClick={LogoutSession} className="btn btn-light rounded-pill text-primary py-2 px-4 ms-lg-5">Log Out</span>
    </div>
  </nav>
  
  </div>
   {/* Navbar END */}
        </div>
        <div className="container-xxl bg-primary page-header">
            
        <div className="container">
            
        <div className="col-lg-1 col-md-5 wow fadeInUp align-items-center d-flex" data-wow-delay="0.7s">
        <img alt="avatar" className="img-fluid rounded-circle mb-3 ms-2" src="img/avatar.jpg" />
        <h1 className="text-white animated zoomIn text-capitalize mb-2 ms-3 text-nowrap"> {name+" "+lastname} <span className="h6">(#{id}) </span></h1>

        </div>
        <h4 className="text-white mb-2">{type}</h4>
        {
          isEmployer ?  <h4>Company: <span className="text-white">{company}</span></h4> : <h4 className="mb-0 mt-3">Searching for a job? <br /> Go down and start checking for availble jobs!</h4>
        }
        
        {
          isEmployer ? <h4 className="mb-0 mt-5">Searching for Employees? <HashLink to={"#form"} onClick={(e)=>{setMyValue("on")}} className=" mlbtn btn-dark rounded-pill text-primary py-2 px-4">Post Job!  </HashLink></h4> : <p></p>
        }
        
        

        </div>
        </div>
        <div className="container-xxl py-5" id="register">
        <div className="container" id="jobs">
        <div id="form" className="mx-auto text-center wow fadeInUp" data-wow-delay="0.1s" style= 
        {{maxWidth: 600}}>
        <ApplyForm value = {value} />
       
        </div>
        {
          isEmployer ? <p></p> : <Jobs />
        }
        </div></div></div>


    )
}

export default Profile