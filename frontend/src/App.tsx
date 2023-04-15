import React, { useEffect, useState } from "react";
import { Note as NoteModel } from "./model/note";
import Note from "./components/Note";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "./style/notePage.module.css";
import styleUtils from "./style/utils.module.css";
import * as NotesApi from "./network/note_api";
import AddEditNoteDialog from "./components/AddEditNoteDialog";
import { FaPlus } from "react-icons/fa";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }
  return (
    <Container>
      <Button
        style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
        className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
        onClick={() => {
          setShowAddNoteDialog(true);
        }}
      >
        <FaPlus />
        Add New Notes
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col>
            <Note
              note={note}
              className={styles.note}
              onNoteClicked={setNoteToEdit}
              onDeleteNoteClick={deleteNote}
            />
          </Col>
        ))}
      </Row>
      {showAddNoteDialog && (
        <AddEditNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNoteDialog(false);
          }}
        />
      )}
      {noteToEdit && (
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            setNotes(
              notes.map((existingNote) =>
                existingNote._id === updatedNote._id
                  ? updatedNote
                  : existingNote
              )
            );
            setNoteToEdit(null);
          }}
        />
      )}
    </Container>
  );
}

export default App;
