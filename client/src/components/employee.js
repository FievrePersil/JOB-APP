import React, { useState } from "react"
import { Link } from 'react-router-dom'
function Employee(){

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isInserted, setInserted] = useState()

  const SubmitEmployee = async(e)=>{
    
    //e.preventDefault() prevents the page from refreshing everytime i submit the form
    e.preventDefault();
    const type = "Employee";
    try {
      const body = { id, name, lastName, email, password, type }
      const response = await fetch('http://localhost:3001/employee',{
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(body)
      });
      const data = await response.json()
      setInserted(data.inserted)
    } catch (error) {
      console.log(error.message)
    }

  }
    return (
      <div>
        <div className="row justify-content-center">
      <div className="col-lg-7 wow fadeInUp" data-wow-delay="0.3s">
        <form onSubmit={SubmitEmployee}>
          <div className="row g-3">
          <div className="col-12">
              <div className="form-floating">
                <input onChange={(e)=>{setId(e.target.value)}} type="text" className="form-control" id="id" placeholder="Subject" />
                <label htmlFor="id">ID#</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating">
                <input onChange={(e)=>{setName(e.target.value)}} type="text" className="form-control" id="name" placeholder="Your Name" />
                <label htmlFor="name">Your Name</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating">
                <input onChange={(e)=>{setLastName(e.target.value)}} type="text" className="form-control" id="lastname" placeholder="Last Name" />
                <label htmlFor="lastname">Last Name</label>
              </div>
            </div>
            <div className="col-12">
              <div className="form-floating">
                <input onChange={(e)=>{setEmail(e.target.value)}} type="email" className="form-control" id="email" placeholder="Subject" />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="col-12">
              <div className="form-floating">
                <input onChange={(e)=>{setPassword(e.target.value)}} type="password" className="form-control" id="password" placeholder="Subject" />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="col-12">
            {
                isInserted ? <div class="alert alert-secondary text-center" role="alert">
                Account created, <Link to="/login">Login</Link> now!
              </div> : 
              <div>
              </div>
              }
              <button className="btn btn-primary w-100 py-3" type="submit">Sign Up</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
      
    )
  }

  export default Employee