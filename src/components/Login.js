import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {



  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ email: "", password: "" })

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("https://inotebook-kijm.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      props.showAlert("Logged in successfully", "success");
      navigate('/');
    } else {
      props.showAlert("Invalid email or password", "danger");
    }
  } catch (error) {
    console.error("Login error:", error.message);
    props.showAlert("Something went wrong. Please try again.", "danger");
  }
};

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div >
      <h3 className='my-3'>Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password" />
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}

export default Login
