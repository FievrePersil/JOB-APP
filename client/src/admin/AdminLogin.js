import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const AdminLogin = () =>{
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [auth, setAuth] = useState(true)
    

    const LoginAdmin = async(e)=>{
        e.preventDefault()
        try {
          const body = { username, password }
          const response = await fetch('http://localhost:3001/admin',{
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(body)
        });
        const data = await response.json()
        if(data.auth === true){
          setAuth(true)
          localStorage.setItem("admin", data.username);
          navigate('/dashboard')
        }else{
          setAuth(false)
        }
        } catch (err) {
          console.log(err.message)
        }
    }


    return (
        <div className="container py-5 d-flex justify-content-md-center">
            
            <div className="mx-auto">
            <h1 className="mb-4">Admin Login:</h1>
            <form onSubmit={LoginAdmin}>
  <div className="mb-3 col-12">
    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
    <input onChange={(e)=>{setUsername(e.target.value)}} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>

  </div>
  <div className="mb-3 col-12">
    
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input onChange={(e)=>{setPassword(e.target.value)}} type="password" className="form-control" id="exampleInputPassword1" />
  </div>
        {auth ? <p></p> : <div class="alert alert-danger" role="alert">
  Wrong username or password
</div>}
  <button type="submit" className="btn btn-primary">Login</button>
</form>
</div>
        </div>
    )

}
export default AdminLogin