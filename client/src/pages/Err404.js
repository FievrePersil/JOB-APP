import React from "react";
import { Link } from "react-router-dom";



const Err404 = () =>{
    return (
        <div>
    {/* 404 Start */}
<div className="container-xxl py-6">
  <div className="container text-center">
    <div className="row justify-content-center">
      <div className="col-lg-6">
        <i className="bi bi-exclamation-triangle display-1 text-primary" />
        <h1 className="display-1">404</h1>
        <h1 className="mb-4">Page Not Found</h1>
        <p className="mb-4">We’re sorry, the page you have looked for cannot be accessed before logging in! Maybe try to login or go to our <Link to="/">Home</Link> page?</p>
        <a className="btn btn-primary rounded-pill py-3 px-5" href="/login">Login now!</a>
      </div>
    </div>
  </div>
</div>
{/* 404 End */}
</div>

    )
}
export default Err404