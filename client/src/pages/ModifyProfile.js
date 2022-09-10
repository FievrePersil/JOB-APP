import React, { Fragment, useEffect, useState } from "react";
import { PencilSquare } from "react-bootstrap-icons";


const ModifyProfile = () =>{
    const [newName, setNewName] = useState('')
    const [newLastName, setNewLastName] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [name, setName] = useState('')
    const [lastname, setLastName] = useState('')
    const [company, setCompany] = useState('')
    const [type, setType] = useState('')
    const [id, setId] = useState('')
    const [pass, setPassword] = useState('')
    const [infos, setInfos] = useState()


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

    const UpdateUser = async(e) =>{
        e.preventDefault()
        try {
          const body = { id, newName, newLastName, newPassword }
          const response = await fetch('http://localhost:3001/updateuser',{
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
          });
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(()=>{
      GetUser()
    },[])
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
          <div className="col-12 ">
                <label htmlFor="subject" className="text-dark" style={{fontSize: "15px"}}>Name:</label>
                <input required onChange={(e)=>{setNewName(e.target.value)}} type="text" className="form-control" id="subject" />
              </div>
              <div className="col-12">
              <label htmlFor="subject" className="text-dark" style={{fontSize: "15px"}}>Lastname:</label>
                <input onChange={(e)=>{setNewLastName(e.target.value)}} type="text" className="form-control" id="name" />
              </div>
              <div className="col-12">
              <label htmlFor="subject" className="text-dark" style={{fontSize: "15px"}}>New Password:</label>
                <input onChange={(e)=>{setNewPassword(e.target.value)}} type="password" className="form-control" id="password" />
              </div>
            </div>
            </form>
        </div>
        </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" onClick={(e)=>UpdateUser(e)} className="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
    
  </div>
</Fragment>
    )

}

export default ModifyProfile