import React, { useState } from 'react'
import Navbar from '../components/navbar'
import Employee from '../components/employee'
import Employer from '../components/employer'
import { Link } from 'react-router-dom'

const Register = () =>{

    const [value, setMyValue] = useState()

    const Choice = ({ value }) =>{
        if (value === "true"){
        return <Employee />
        }else{
        return <Employer />
        }
        }
        
        return(
            <div>
              <Navbar />
              <div className="container-xxl bg-primary page-header">
        <div className="container text-center">
        <h1 className="text-white animated zoomIn">Sign Up</h1>
        <nav aria-label="breadcrumb">
      <ol className="breadcrumb justify-content-center">
        <li className="breadcrumb-item text-white mt-3"><h6>Already have an Account? Click Here to <Link className="text-white" to="/login">Sign in!</Link></h6></li>
      </ol>
    </nav>
        </div>
        </div>
        
        <div className="container-xxl py-5" id="register">
        <div className="container">
        <div className="mx-auto text-center wow fadeInUp" data-wow-delay="0.1s" style= 
        {{maxWidth: 600}}>
          


          <h2 className="text-primary">Sign As:</h2>


          <div className='mt-3 ms-2 mb-5'>
  <div className="form-check form-check-inline">
    <input onChange={(e)=>{setMyValue(e.target.value)}} className="form-check-input" type="radio" id="inlineCheckbox1" name='user' value={"false"} required />
    <label className="form-check-label" htmlFor="inlineCheckbox1"><h6>Employer</h6></label>
  </div>
  <div className="form-check form-check-inline">
    <input onChange={(e)=>{setMyValue(e.target.value)}} className="form-check-input" type="radio" id="inlineCheckbox2" name='user' value={"true"} required />
    <label className="form-check-label " htmlFor="inlineCheckbox2"><h6>Employee</h6></label>
  </div>
</div>
          </div>
          <div>
          <Choice value={ value } />
          </div>
          </div>
          </div>
          </div>
            
          )
          }
         
          export default Register