import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../model/note";
import styles from "../style/Note.module.css";
import utilsStyles from "../style/utils.module.css";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";
interface NoteProps {
  note: NoteModel;
  onNoteClicked: (note: NoteModel) => void;
  onDeleteNoteClick: (note: NoteModel) => void;
  className?: string;
}

const Note = ({
  note,
  onNoteClicked,
  onDeleteNoteClick,
  className,
}: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;
  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = "Updated: " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "Created: " + formatDate(createdAt);
  }
  return (
    <Card
      className={`${styles.noteCard} ${className}`}
      onClick={() => {
        onNoteClicked(note);
      }}
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title className={utilsStyles.flexCenter}>
          {title}{" "}
          <MdDelete
            className="text-muted ms-auto"
            onClick={(e) => {
              onDeleteNoteClick(note);
              e.stopPropagation();
            }}
          ></MdDelete>
        </Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{createdUpdatedText}</Card.Footer>
    </Card>
  );
};
export default Note;
