import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";


const AdminRoute = ({ children }) =>{
    const [isloggedin, setLoggedin] = useState(false)
    const [isloading, setLoading] = useState(true)
    const CheckAdmin = () =>{

        if(localStorage.getItem('admin') === 'tarek'){
            setLoggedin(true)
        }else{
            setLoggedin(false)
        }
        setLoading(false)
    }

useEffect(()=>{
    CheckAdmin()
}, []);



    return(
        isloading ? <p>Loading....</p> : isloggedin ? <Navigate to ="/dashboard" /> : children 
    );
}
export default AdminRoute