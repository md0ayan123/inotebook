import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, email, password } = credentials
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({ name, email, password }),
    })
    const json = await response.json()
    console.log(json);

    if (json.success) {

      //  Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      props.showAlert("Account created successfully", "success")
      navigate('/', { success: true })

    }
    else {
      props.showAlert("Invalid credentials", "danger")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <div className='container my-3 mx-3'>
        <h3 className='my-4'>Signup</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="nameHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />

          </div>
          <div className="mb-3">
            <label htmlFor="Password" className="form-label">Password</label>
            <input type="password" className="form-control" onChange={onChange} id="password" name="password" minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="cPassword1" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" onChange={onChange} id="cpassword" name="cpassword" minLength={5} required />
          </div>
          <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Signup
