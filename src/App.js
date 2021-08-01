import Navbar from "./components/Navbar";
import Textarea from "./components/Textarea";
import Displaynotes from "./components/Displaynotes";
import { nanoid } from 'nanoid';
import { useState, useEffect } from "react";


function App() {
  const [notes, setNotes] = useState([]);


  /* Adding new notes to current notes list */
  const addNote = (title, text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      title: title,
      text: text,
      date: date.toLocaleDateString()
    }
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  }

  /* Delete a node */
  const deleteNode = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
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
      <Textarea handleAddNote={addNote} />
      <Displaynotes notes={notes} handleDeleteNode={deleteNode} />
    </>
  );
}

export default App;
