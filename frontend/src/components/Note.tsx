import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../model/note";

interface NoteProps {
  note: NoteModel;
}

const Note = ({ note }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;
  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {text}
      </Card.Body>
    </Card>
  );
};
export default Note;
