import React, {useState, useEffect} from "react";


const Users = () =>{

    const [users, setUsers] = useState([])
    const [employers, setEmployer] = useState([])

    const getUsers = async() =>{
        try {
            const response = await fetch('http://localhost:3001/allinfos')
            const data = await response.json()
            if(data.user){
                setUsers(data.user)
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(()=>{
        getUsers()
      }, [])

    return (
        <div className="col py-3">
        <h3>All Users:</h3>
        <table className="table">
       
  <thead>
    <tr>
      <th scope="col">ID#</th>
      <th scope="col">Name</th>
      <th scope="col">LastName</th>
      <th scope="col">Company</th>
      <th scope="col">Email</th>
      <th scope="col">Company</th>
    </tr>
  </thead>
  <tbody>
    {users.map(user =>(
            <tr className="table-info" key={user._id}>
            <th scope="row">#{user.id}</th>
            <td className="text-capitalize">{user.name}</td>
            <td className="text-capitalize">{user.lastname}</td>
            <td className="text-capitalize">{user.type}</td>
            <td className="text-capitalize">{user.email}</td>
            <td className="text-capitalize">{user.company}</td>


          </tr>
    ))}

  </tbody>
</table>
      </div>
    )

}

export default Users