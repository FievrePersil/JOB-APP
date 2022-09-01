import React, { useState } from "react";
import Navbar from '../components/navbar'
import { useNavigate, Link } from "react-router-dom";

const Login = () =>{
    const navigate = useNavigate()
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [data, setData] = useState('')

    const LoginUSer = async(e) =>{
        e.preventDefault();
        try {
          const body = { id, password }
          const response = await fetch('http://localhost:3001/login',{
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(body)
          });
          const data = await response.json()
          if(data.token){
             navigate('/profile');
             
             localStorage.setItem("token", data.token);
             
         }else{
           setData(data.message);
         }
        } catch (error) {
          console.log(error.message)
        }
    }



    
    


    const Alert = ()=>{
      if(data){
        return ( <div class="alert alert-danger" role="alert">
        {data}
        </div>)
      }
    }


    
    return(
        <div>
            <Navbar />
            <div className="container-xxl bg-primary page-header">
        <div className="container text-center">
        <h1 className="text-white animated zoomIn">Login!</h1>
        <nav aria-label="breadcrumb">
      <ol className="breadcrumb justify-content-center">
        <li className="breadcrumb-item text-white mt-3"><h6>Still not registred? Click Here to <Link className="text-white" to="/register">Register!</Link></h6></li>
      </ol>
    </nav>

        </div>
        </div>
        <div className="container-xxl py-5" id="register">
        <div className="container">
        <div className="mx-auto text-center wow fadeInUp" data-wow-delay="0.1s" style= 
        {{maxWidth: 600}}>
          <div className="d-inline-block border rounded-pill text-primary px-4 mb-5">Login</div>
         <Alert />
          <form onSubmit={LoginUSer}>
          <div className="col-12 mb-3">
              <div className="form-floating">
                <input onChange={(e)=>{setId(e.target.value)}} required type="text" className="form-control" id="id" placeholder="Subject" />
                <label htmlFor="id">Your ID#</label>
              </div>
            </div>
            <div className="col-12">
              <div className="form-floating">
                <input onChange={(e)=>{setPassword(e.target.value)}} required type="password" className="form-control" id="password" placeholder="Subject" />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="col-12 mt-5">
              <button className="btn btn-primary w-100 py-3" type="submit">Login</button>
            </div>
            </form>
          </div></div></div>
  
        </div>
    )
}

export default Login