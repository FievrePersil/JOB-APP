import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Proposals = () => {


    
    const [proposals, setProposal] = useState([])
    const [check, setCheck]= useState(false)


    const getProposals = async() =>{
        try {
            const response = await fetch('http://localhost:3001/getproposal')
            const data = await response.json()
            if(data.proposal.length > 0){
                setProposal(data.proposal)
                setCheck(true)
                
            }else{
              setCheck(false)
            }
        } catch (err) {
            console.log(err.message)
        }

    }


    useEffect(()=>{
        getProposals()
    }, [])

    return(
        <>
        <div className="mb-5 position-relative p-5">
            <nav className="navbar navbar-expand-lg navbar-light bg-primary px-3 py-0">
  <div className="container-fluid">
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarText">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to ="/profile" className="nav-link" aria-current="page">Go Back</Link>
        </li>
        <li className="nav-item">
          <Link to="/contact" className="nav-link">Contact</Link>
        </li>
      </ul>
      <span className="navbar-text mt-2">
        <h5>Your Proposals</h5>
      </span>
    </div>
  </div>
</nav>

            </div>
        
            
        
        {check ?
        <div>
        
          {proposals.map(proposal => (
          <div className="container border border-primary border-2 rounded mb-5 mt-5" key={proposal._id}>
            
              <h2 className="mt-4 ms-3 text-nowrap d-flex">Sent By: <p className="ms-2 text-secondary text-capitalize"> {proposal.user.name} {proposal.user.lastname}</p></h2>
              <h6 className="mt-2 ms-3 text-nowrap d-flex">For the Job: <p className="ms-2 text-success"> {proposal.job.jobtitle} </p></h6>
              <h6 className="mt-2 ms-3 text-nowrap d-flex">E-mail: <p className="ms-2 text-success">{proposal.propemail}</p></h6>
              <h6 className="mt-2 ms-3 text-nowrap d-flex">Phone: <p className="ms-2 text-success">{proposal.phone}</p></h6>
              <h6 className="mt-2 ms-3 text-nowrap d-flex">Age: <p className="ms-2 text-success"> {proposal.age} years/old</p></h6>
              <h6 className="mt-2 ms-3 text-nowrap d-flex">Gender: <p className="ms-2 text-success"> {proposal.gender}</p></h6>
              <h6 className="mt-2 ms-3 text-nowrap d-flex">Availble: <p className="ms-2 text-success"> {proposal.startin}</p></h6>
              <h6 className="mt-2 ms-3 d-flex text-nowrap">About <p className="ms-1 text-capitalize">({proposal.user.name})</p> <p className="ms-2 d-flex text-wrap text-success"> <span>{proposal.description}</span></p></h6>
          </div>

          
          
        ))};

        </div> : <div className="alert alert-success py-5" role="alert">
  <h4 className="alert-heading">Sorry!</h4>
  <p>Unfortunatly, seems like you have no proposals yet .</p>
  <hr />
  <p className="mb-0">Maybe you need to post a job first, in order to get proposals.</p>
</div>
}
        </>
    );
}

export default Proposals