import React, { Fragment, useState } from "react";
import { PencilSquare } from "react-bootstrap-icons";


const ModifyProfile = ({userid}) =>{
    const [user, setUser] = useState()
    const [name, setName] = useState('')
    const [lastname, setLastName] = useState('')
    const [company, setCompany] = useState('')
    const [type, setType] = useState('')
    const [id, setId] = useState('')


    const GetUser = async() =>{
        try {
            const response = await fetch('http://localhost:3001/users')
            const data = await response.json()
            setId(data.usersid)
            setCompany(data.company)
            setLastName(data.lastname)
            setName(data.name)
            setType(data.type)
        } catch (err) {
            console.log(err.message)
        }
    }

    const UpdateUser = () =>{
        try {
            
        } catch (err) {
            
        }
    }
    return(
          <Fragment>
  {/* Button trigger modal */}
  <span data-bs-toggle="modal" data-bs-target="#exampleModal">
  <PencilSquare className="ms-2" style={{height: "30px", cursor: "pointer"}} />
  </span>
  {/* Modal */}
  <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Update your profile</h5>
          
        </div>
        <div className="modal-body">
          
        {/* put the form here */}
        <div className="row justify-content-center">
        <div className="col-lg-10">
            <form>
            <div className="row g-1">
          <div className="col-12 mb-3">
                <label htmlFor="subject" className="text-dark" style={{fontSize: "15px"}}>Name:</label>
                <input required onChange={(e)=>{setId(e.target.value)}} type="text" className="form-control" id="subject" placeholder="Subject" />
              </div>
              <div className="col-12">
                <input onChange={(e)=>{setName(e.target.value)}} type="text" className="form-control" id="name" placeholder="Your Name" />
              </div>
            </div>
            </form>
        </div>
        </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" className="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</Fragment>
    )

}

export default ModifyProfile