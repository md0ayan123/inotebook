import React from 'react'
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
  const context=useContext(noteContext)
    const {deleteNote}=context;
    const {note,UpdateNote}=props;
  return (     
      <div className='col-md-3'>
      <div className="card my-3" >
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <i className="fa-regular fa-trash-can mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Delete successfully", "success")}}></i>
    <i className="fa-regular fa-pen-to-square" onClick={()=>{UpdateNote(note)}}></i>
    

  </div>
</div>
    </div>
  )
}

export default Noteitem
