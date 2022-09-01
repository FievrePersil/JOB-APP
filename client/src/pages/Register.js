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
          
          <div className="d-inline-block border rounded-pill text-primary px-4 mb-2">Sign Up 
          As</div>
          <select onChange={(e)=>{setMyValue(e.target.value)}} className="form-select" aria-label="Default select example">
        
          <option value="false">Employer</option>
          <option value="true">Employee</option>
          </select>
          <h2 className="mb-5 mt-4">Sign Up</h2>
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