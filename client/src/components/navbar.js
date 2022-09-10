import React from "react"
import { Link } from "react-router-dom"
import { HashLink } from "react-router-hash-link";
const navbar = () =>{

    return (
        
        <div>
                <div className="container-xxl bg-white p-0">

  {/* Navbar */}
  <div className="container-xxl position-relative p-0">
    <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
      <a href="/" className="navbar-brand p-0">
        <h1 className="m-0">TG<span className="text-warning">.</span></h1>
        {/* <img src="img/logo.png" alt="Logo"> */}
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
        <span className="fa fa-bars" />
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto py-0">
          
          
          {/* hashlinks to slide inside the index page */}
           <a href="/" className="nav-item nav-link">Home</a>
          <HashLink to="#about" className="nav-item nav-link">About</HashLink>
          <HashLink to="#services" className="nav-item nav-link">Services</HashLink>

          
          {/* this is the scroll down nav link with many options 
          <div className="nav-item dropdown">
            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
            <div className="dropdown-menu m-0">
              <a href="feature.html" className="dropdown-item">Features</a>
              <a href="quote.html" className="dropdown-item">Free Quote</a>
              <a href="team.html" className="dropdown-item">Our Team</a>
              <a href="testimonial.html" className="dropdown-item">Testimonial</a>
              <a href="404.html" className="dropdown-item">404 Page</a>
            </div>
          </div> */}
          
          <a href="/contact" className="nav-item nav-link">Contact</a>
          <Link to="/login" className="nav-item nav-link">Log In</Link>
        </div>
        <a href="/register" className="btn btn-light rounded-pill text-primary py-2 px-4 ms-lg-5">Sign Up</a>
      </div>
    </nav>
    
    </div>
     {/* Navbar END */}
    </div>
    
        </div>
        
    )
}
export default navbar