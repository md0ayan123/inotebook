import './App.css';
import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
function App() {
  const [alert, setalert] = useState(null);


  ;
  const showAlert = (message, type) => {
    setalert({
      msg: message,
      type: type

    })
    setTimeout(() => {
      setalert(null)
    }, 2000);

  }
  return (
    <>

      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className='container'>
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path='/login' element={<Login showAlert={showAlert} />} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
