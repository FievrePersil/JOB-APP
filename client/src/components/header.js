import React from "react"
import { useState } from "react";
import { Link, NavLink } from "react-router-dom"
import { HashLink } from "react-router-hash-link";
const header = () =>{

    return (
        <div>
                <div className="container-xxl bg-white p-0">

  {/* Navbar & Hero Start */}
  
    
    <div className="container-xxl bg-primary hero-header">
    
      <div className="container">

      
        <div className="row g-5 align-items-center">
          
          <div className="col-lg-6 text-center text-lg-start">
          
          
            <h1 className="text-white mb-4 animated zoomIn">Sign Up and find your dream job on TG.</h1>
            <p className="text-white pb-3 animated zoomIn">We help you find the job that you desire, And if you already own a company Sign Up and search for the best employees on our community</p>
            <a href ='#about' className="btn btn-outline-light rounded-pill border-2 py-3 px-5 animated slideInRight">Learn More</a>
          </div>
          <div className="col-lg-6 text-center text-lg-start">
            <img className="img-fluid animated zoomIn" src="img/hero.png" alt />
          </div>
        </div>
      </div>
    </div>
  {/* Navbar & Hero End */}</div>

        </div>
    )
}
export default header