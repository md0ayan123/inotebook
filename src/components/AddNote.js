import React, { useState, useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context=useContext(noteContext)
    const {addNote}=context;

    const[note, setNote]=useState({title:"", description:"", tag:""})
    const handleClick=(e)=>{
        e.preventDefault();
     addNote(note.title, note.description, note.tag)
     setNote({title:"", description:"", tag:""})
     props.showAlert("Added successfully", "success")
    }
    const onChange=(e)=>{
      // (...)is a  spread operator , jo bhi value is note object ke andar hai wo rahe lekin jo property aagay lickhi ja rahi hai unko add ya overright kar dena, jo bhi change hora hai uska name, value ka barabar ho jaee
     setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <div>
       <div className="container my-3">
        <h3>Add a Note</h3>
        <form className='my-3'>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title}onChange={onChange} minLength={5} required/>
   
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name="description" value={note.description}onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" name="tag" value={note.tag}onChange={onChange}/>
  </div>
 
  <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
</form>
        </div>
    </div>
  )
}

export default AddNote
