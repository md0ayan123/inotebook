import { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import { useNavigate } from "react-router-dom";
import Noteitem from './Noteitem';
import AddNote from './AddNote';




const Notes = (props) => {
  const context = useContext(noteContext)
  let navigate = useNavigate()
  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      // eslint-disable-next-line
      getNotes()
    }
    else {
      navigate('/login')
    }
  }, [])

  const ref = useRef(null)
  const refClose = useRef(null)

  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" })

  const UpdateNote = (currentNote) => {
    ref.current.click()
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })

  }
  const handleClick = (e) => {

    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click()
    props.showAlert("Updated successfully", "success")
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>

      <AddNote showAlert={props.showAlert} />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">eTitle</label>
                  <input type="text" className="form-control" id="title" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">eDescription</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">eTag</label>
                  <input type="text" className="form-control" id="tag" name="etag" value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h3>Your Note</h3>
        <div className="container">
          {/* jab hamre pass else mai kuch nahi hota hai to double andpercent laga de tai hai, statement true hoja to display ho ja warna nahi ho ho ga */}
          {notes.length === 0 && "No Notes To Display"}
        </div>
        {notes?.map((note) => {
          return <Noteitem key={note._id} UpdateNote={UpdateNote} showAlert={props.showAlert} note={note} getNotes={getNotes} />
        })}
      </div>
    </>
  )
}

export default Notes
