import React, {useState, useEffect} from "react";


const Users = () =>{

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
                setJobs(data.jobp)
            }
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
  <h3 id="user" className="mt-3">EMPLOYERS: ({employers.length} Employers)</h3>
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
        <td className="text-center table-danger"><button type="button" class="btn btn-danger">Delete</button></td>

      </tr>
    ))}
  
  </tbody>
</table>

{/* table employees */}
<h3 className="mt-5">EMPLOYEES: ({employees.length} Employees)</h3>
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
        <td className="text-center table-danger"><button type="button" class="btn btn-danger">Delete</button></td>
      </tr>
    ))}
  
  </tbody>
</table>


{/* table Jobs */}
<h3 className="mt-5">JOBS: ({jobs.length} Jobs)</h3>
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
        <td className="text-capitalize">{job.user.name} {job.user.lastname}</td>
        <td>{job.salary}$</td>
        <td className="w-25">{job.schedule}</td>
        <td className="text-capitalize">{job.user.company}</td>
        <td className="text-center table-danger"><button type="button" class="btn btn-danger">Delete</button></td>
      </tr>
    ))}
  
  </tbody>
</table>

{/* table Proposals */}
<h3 className="mt-5">PROPOSALS: ({proposals.length} Proposals)</h3>
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
        <th className="text-capitalize text-success" scope="row"> {proposal.user.name} {proposal.user.lastname}</th>
        <td className="text-capitalize">{proposal.job.jobtitle} </td>
        <td>{proposal.startin}</td>
        <td>{proposal.age}</td>
        <td className="w-25">{proposal.propemail}</td>
        <td className="text-center table-danger"><button type="button" class="btn btn-danger">Delete</button></td>
      </tr>
    ))}
  
  </tbody>
</table>

     </div>
    )

}
export default Users