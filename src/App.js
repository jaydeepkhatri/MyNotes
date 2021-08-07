import Navbar from "./components/Navbar";
import Textarea from "./components/Textarea";
import Displaynotes from "./components/Displaynotes";
import { nanoid } from 'nanoid';
import { useState, useEffect } from "react";
import { Snackbar, IconButton } from "@material-ui/core/";
import { Close } from "@material-ui/icons";


const App = () => {

  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({
    title: "",
    date: "",
    id: "",
    tag: "Other",
    text: ""
  });
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }


  /* Adding new notes to current notes list */
  const addNote = (title, text, tag) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      title: title,
      text: text,
      tag: tag,
      date: date.toLocaleDateString()
    }
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
    setSnackbarMessage("Note added");
    setOpen(true);
  }

  /* Editing a note */
  const editNote = (id) => {
    const editingnote = notes.filter((note) => note.id === id);
    setNote(editingnote[0]);
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  }


  /* Delete a note */
  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    setSnackbarMessage("Note deleted");
    setOpen(true);
  }

  /* To get the notes from local storage */
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('mynotes-data'));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [])

  /* Add the newly added note to localstorage */
  useEffect(() => {
    localStorage.setItem('mynotes-data', JSON.stringify(notes));
  }, [notes])

  return (
    <>
      <Navbar />
      <Textarea note={note} handleAddNote={addNote} />
      <Displaynotes notes={notes} handleEditNote={editNote} handleDeleteNote={deleteNote} />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={snackbarMessage}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <Close fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
}

export default App;
