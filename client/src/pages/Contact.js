import React, { useState, useEffect } from "react"
import Footer from '../components/footer'
import { HashLink } from "react-router-hash-link"
const Contact = () =>{


    const [name, setName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [output, setOutput] = useState('')
    const [ready, setReady] = useState(false)

    const SubmitContact = async(e) =>{
      e.preventDefault()
        const body = { name, lastname, email, subject, message }
        const response = await fetch ('http://localhost:3001/contact', {
        headers: { "Content-type": "application/json" },
        method : 'POST',
        body: JSON.stringify(body)
      })
      const data = await response.json()
      if(data){
        setReady(true)
        setOutput(data.message)
      }
    }

    //set the title of the page
    useEffect(()=>{
      document.title = "Contact";
    })

    return (
        
        <div>
            
            
 <div className="container-xxl bg-primary page-header">
  <div className="container text-center">
    <h1 className="text-white animated zoomIn mb-2">Contact Us</h1>
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb justify-content-center">
        <li className="breadcrumb-item"><a className="text-white" href="/">Home</a></li>
        
        <li className="breadcrumb-item text-white active"><HashLink className="text-white" to="#contact">Contact</HashLink></li>
      </ol>
    </nav>
  </div>
</div>
             {/* Contact Start */}
<div className="container-xxl py-6" id="contact">
  <div className="container">
    <div className="mx-auto text-center wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: 600}}>
      <div className="d-inline-block border rounded-pill text-primary px-4 mb-3">Contact Us</div>
      <h2 className="mb-5">If You Have Any Questions, Please Feel Free Contact Us</h2>
    </div>
    <div className="row justify-content-center">
      <div className="col-lg-7 wow fadeInUp" data-wow-delay="0.3s">
        <form onSubmit={SubmitContact}>
          <div className="row g-3">
            <div className="col-md-6">
              <div className="form-floating">
                <input onChange={(e)=>{setName(e.target.value)}} type="text" className="form-control" id="name" placeholder="Your Name" />
                <label htmlFor="name">Your Name</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating">
                <input onChange={(e)=>{setLastName(e.target.value)}} type="text" className="form-control" id="lastname" placeholder="lastname" />
                <label htmlFor="lastname">Last name</label>
              </div>
            </div>
            <div className="col-12">
              <div className="form-floating">
                <input onChange={(e)=>{setEmail(e.target.value)}} type="text" className="form-control" id="email" placeholder="email" />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="col-12">
              <div className="form-floating">
                <input onChange={(e)=>{setSubject(e.target.value)}} type="text" className="form-control" id="subject" placeholder="Subject" />
                <label htmlFor="subject">Subject</label>
              </div>
            </div>
            <div className="col-12">
              <div className="form-floating">
                <textarea onChange={(e)=>{setMessage(e.target.value)}} className="form-control" placeholder="Leave a message here" id="message" style={{height: 150}} defaultValue={""} />
                <label htmlFor="message">Message</label>
              </div>
            </div>
            <div className="col-12">
              {ready ? <div class="alert alert-success text-center" role="alert">
              {output}
              </div> : <p></p>}
              <button className="btn btn-primary w-100 py-3" type="submit">Send Message</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
{/* Contact End */}
<Footer />
        </div>
    )
}
    export default Contact