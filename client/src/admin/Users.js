import React, {useState, useEffect} from "react";


const Users = () =>{

    const [contacts, setContacts] = useState([])
    const [employees, setEmployees] = useState([])
    const [employers, setEmployers] = useState([])
    const [proposals, setProposals] = useState([])
    const [jobs, setJobs] = useState([])

    const getUsers = async() =>{
        try {
            const response = await fetch('http://localhost:3001/allinfos')
            const data = await response.json()
            if(data){
                setEmployees(data.employee)
                setEmployers(data.employer)
                setProposals(data.proposal)
                setJobs(data.job)
                setContacts(data.contact)
            }
        } catch (err) {
            console.log(err.message)
        }
    }


    //delete employer
    const DeleteEmployer = async(id) =>{
      try {
        const body = {id}
        const response = await fetch('http://localhost:3001/delemployer', {
          headers: { "Content-type": "application/json" },
          method: "DELETE",
          body: JSON.stringify(body)
        });
        const data = await response.json()
        alert(data.message)
      } catch (err) {
        console.log(err.message)
      }
    }

        //delete employee
        const DeleteEmployee = async(id) =>{
          try {
            const body = {id}
            const response = await fetch('http://localhost:3001/delemployee', {
              headers: { "Content-type": "application/json" },
              method: "DELETE",
              body: JSON.stringify(body)
            });
            const data = await response.json()
            alert(data.message)
          } catch (err) {
            console.log(err.message)
          }
        }


               //delete job
               const DeleteJob = async(id) =>{
                try {
                  const body = {id}
                  const response = await fetch('http://localhost:3001/deljob', {
                    headers: { "Content-type": "application/json" },
                    method: "DELETE",
                    body: JSON.stringify(body)
                  });
                  const data = await response.json()
                  alert(data.message)
                } catch (err) {
                  console.log(err.message)
                }
              }

              //delete proposal
              const DeleteProposal = async(id) =>{
                try {
                  const body = {id}
                  const response = await fetch('http://localhost:3001/delproposal', {
                    headers: { "Content-type": "application/json" },
                    method: "DELETE",
                    body: JSON.stringify(body)
                  });
                  const data = await response.json()
                  alert(data.message)
                } catch (err) {
                  console.log(err.message)
                }
              }

              //delete proposal
              const DeleteContact = async(id) =>{
                try {
                  const body = {id}
                  const response = await fetch('http://localhost:3001/delcontact', {
                    headers: { "Content-type": "application/json" },
                    method: "DELETE",
                    body: JSON.stringify(body)
                  });
                  const data = await response.json()
                  alert(data.message)
                } catch (err) {
                  console.log(err.message)
                }
              }


    useEffect(()=>{
        getUsers()
      }, [])

    return (
<div>
  {/* table employers */}
  <h3 id="user" className="mt-3">EMPLOYERS: ({employers.length} Employer(s))</h3>
<table  className="table">
  <thead>
    <tr>
      <th scope="col">ID#</th>
      <th scope="col">Name</th>
      <th scope="col">Lastname</th>
      <th scope="col">Email</th>
      <th scope="col">Company</th>
      <th className="text-center text-danger" scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    {employers.map(employer =>(
        <tr className="align-middle table-info" key={employer._id}>
        <th scope="row"> #{employer.id} </th>
        <td className="text-capitalize">{employer.name}</td>
        <td className="text-capitalize">{employer.lastname}</td>
        <td className="w-25">{employer.email}</td>
        <td className="text-capitalize">{employer.company}</td>
        <td className="text-center table-danger"><button type="button" class="btn btn-danger" onClick={()=>DeleteEmployer(employer._id)}>Delete</button></td>

      </tr>
    ))}
  
  </tbody>
</table>

{/* table employees */}
<h3 className="mt-5">EMPLOYEES: ({employees.length} Employee(s))</h3>
<table className="table">
  <thead>
    <tr>
      <th scope="col">ID#</th>
      <th scope="col">Name</th>
      <th scope="col">Lastname</th>
      <th scope="col">Email</th>
      <th scope="col">Company</th>
      <th className="text-center text-danger" scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    {employees.map(employee =>(
        <tr  className="align-middle table-info" key={employee._id}>
        <th scope="row"> #{employee.id} </th>
        <td className="text-capitalize">{employee.name}</td>
        <td>{employee.lastname}</td>
        <td className="w-25">{employee.email}</td>
        <td className="text-capitalize">None</td>
        <td className="text-center table-danger"><button type="button" class="btn btn-danger" onClick={()=>DeleteEmployee(employee._id)}>Delete</button></td>
      </tr>
    ))}
  
  </tbody>
</table>


{/* table Jobs */}
<h3 className="mt-5">JOBS: ({jobs.length} Job(s))</h3>
<table className="table">
  <thead>
    <tr>
      <th scope="col" >Job Title</th>
      <th scope="col">Posted By</th>
      <th scope="col">Salary</th>
      <th scope="col">Schedule</th>
      <th scope="col">Company</th>
      <th className="text-center text-danger" scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    {jobs.map(job =>(
        <tr  className="align-middle table-info" key={job._id}>
        <th className="text-capitalize text-success" scope="row"> {job.jobtitle}</th>
        <td className="text-capitalize">{job.employer.name} {job.employer.lastname}</td>
        <td>{job.salary}$</td>
        <td className="w-25">{job.schedule}</td>
        <td className="text-capitalize">{job.employer.company}</td>
        <td className="text-center table-danger"><button type="button" class="btn btn-danger" onClick={()=>DeleteJob(job._id)}>Delete</button></td>
      </tr>
    ))}
  
  </tbody>
</table>

{/* table Proposals */}
<h3 className="mt-5">PROPOSALS: ({proposals.length} Proposal(s))</h3>
<table className="table">
  <thead>
    <tr>
      <th scope="col" >Proposer</th>
      <th scope="col">On Job</th>
      <th scope="col">Starts</th>
      <th scope="col">Age</th>
      <th scope="col">E-mail</th>
      <th className="text-center text-danger" scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    {proposals.map(proposal =>(
        <tr  className="align-middle table-info" key={proposal._id}>
        <th className="text-capitalize text-success" scope="row"> {proposal.employee.name} {proposal.employee.lastname}</th>
        <td className="text-capitalize">{proposal.job.jobtitle} </td>
        <td>{proposal.startin}</td>
        <td>{proposal.age}</td>
        <td className="w-25">{proposal.propemail}</td>
        <td className="text-center table-danger"><button type="button" class="btn btn-danger" onClick={()=>DeleteProposal(proposal._id)}>Delete</button></td>
      </tr>
    ))}
  
  </tbody>
</table>

  {/* table contacts */}
  <h3 id="user" className="mt-3">MESSAGES: ({contacts.length} Contacts(s))</h3>
<table  className="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Lastname</th>
      <th scope="col">Email</th>
      <th scope="col">Subject</th>
      <th scope="col">Message</th>
      <th className="text-center text-danger" scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    {contacts.map(contact =>(
        <tr className="align-middle table-info" key={contact._id}>
        <th scope="row" className="text-capitalize">{contact.name}</th>
        <td className="text-capitalize">{contact.lastname}</td>
        <td className="text-capitalize">{contact.email}</td>
        <td className="w-25">{contact.subject}</td>
        <td className="text-capitalize">{contact.message}</td>
        <td className="text-center table-danger"><button type="button" class="btn btn-danger" onClick={()=>DeleteContact(contact._id)}>Delete</button></td>

      </tr>
    ))}
  
  </tbody>
</table>

     </div>
    )

}
export default Users