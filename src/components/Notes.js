import { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import { useNavigate } from "react-router-dom";
import Noteitem from './Noteitem';
import AddNote from './AddNote';

const Notes = (props) => {
  const { notes, getNotes, editNote } = useContext(noteContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    } else {
      navigate('/login');
    }
  }, [getNotes, navigate]);

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "default"
  });

  const updateNote = (currentNote) => {
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag
    });
    ref.current.click(); // still using hidden button to trigger modal
  };

  const handleClick = async () => {
    try {
      await editNote(note.id, note.etitle, note.edescription, note.etag);
      refClose.current.click();
      props.showAlert("Updated successfully", "success");
    } catch (error) {
      props.showAlert("Failed to update note", "danger");
    }
  };

  const onChange = (e) => {
    setNote(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
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
              <form className="my-3" onSubmit={e => e.preventDefault()}>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">eTitle</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">eDescription</label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">eTag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button
                disabled={note.etitle.length < 5 || note.edescription.length < 5}
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h3>Your Notes</h3>
        <div className="container">
          {notes.length === 0 && "No Notes To Display"}
        </div>
        {notes?.map(n => (
          <Noteitem
            key={n._id}
            UpdateNote={updateNote}
            showAlert={props.showAlert}
            note={n}
          />
        ))}
      </div>
    </>
  );
};

export default Notes;
