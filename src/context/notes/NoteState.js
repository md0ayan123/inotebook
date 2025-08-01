import { useState } from "react";
import NoteContext from "./noteContext";




const NoteState = (props) => {
  const host = "https://inotebook-kijm.onrender.com"
  const [notes, setNotes] = useState([])




  // Get all Note
  const getNotes = async () => {

    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')

      }

    });

    const result = await response.json()
 console.log(result);
    setNotes(result)


  }

  // Add a Note
  const addNote = async (title, description, tag) => {

    // API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')

      },

      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json()
    setNotes(notes.concat(note))




  }


  // delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')

      },

    });

    const result= response.json()
     console.log(result);
   
    // console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)

  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')

      },

      body: JSON.stringify({ title, description, tag }),
    });

    const result = await response.json()
    console.log(result);
    

    let newNotes = await JSON.parse(JSON.stringify(notes))
    // Logic to edit in client side
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, editNote, deleteNote, addNote, getNotes }}>{props.children}</NoteContext.Provider>
  )
}

export default NoteState;