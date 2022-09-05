import React from "react";
import { useNavigate } from "react-router-dom";
import Users from "./Users";
import { HashLink } from "react-router-hash-link";


const Dashboard = () =>{

    const navigate = useNavigate()
    const LogoutSession = () =>{
        try {
          localStorage.removeItem('admin');
          if(localStorage.getItem('admin') === null){
            navigate('/admin')
          } 
        } catch (err) {
          console.log(err.message)
        }
   
      }


    return (
    <div  className="container-fluid" >
  <div className="row flex-nowrap ">
    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark" style={{position: "fixed"}}>
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100" >
        <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <span className="fs-5 d-none d-sm-inline"><i className="fs-4 bi-speedometer2" /> Dashboard</span>
        </a>
        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
        <li>
            <HashLink to="#user" className="nav-link px-0 align-middle">
              <i className="fs-4 bi-people" /> <span className="ms-1 d-none d-sm-inline">Users</span> </HashLink>
          </li>
     
 
          <li>
            <a href="#" className="nav-link px-0 align-middle">
              <i className="fs-4 bi-table" /> <span className="ms-1 d-none d-sm-inline">Jobs</span></a>
          </li>
          <li>

            <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
              <li className="w-100">
                <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Item</span> 1</a>
              </li>
              <li>
                <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Item</span> 2</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#submenu3" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
              <i className="fs-4 bi-grid" /> <span className="ms-1 d-none d-sm-inline">Proposals</span> </a>
            <ul className="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
              <li className="w-100">
                <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 1</a>
              </li>
              <li>
                <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 2</a>
              </li>
              <li>
                <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 3</a>
              </li>
              <li>
                <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 4</a>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link align-middle px-0">
              <i className="fs-4 bi-house" /> <span className="ms-1 d-none d-sm-inline">Home</span>
            </a>
          </li>
        </ul>
        <hr />
        <div className="dropdown pb-4">
          <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            <span className="d-none d-sm-inline mx-1">Tarek Gharbi</span>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
            <li><a className="dropdown-item" href="#">New project...</a></li>
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li><span className="dropdown-item" onClick={LogoutSession}>Sign out</span></li>
          </ul>
        </div>
      </div>
    </div>

    <div className="col" style={{marginLeft: "220px"}}>
  <Users  />
  </div>


  </div>
  </div>

    )
}

export default Dashboard