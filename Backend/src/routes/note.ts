import express from "express";
import * as NotesController from "../controllers/note";

const router = express.Router();

router.get("/", NotesController.getNotes);
router.post("/", NotesController.createNotes);
router.patch("/:id", NotesController.updateNote);
router.get("/:id", NotesController.getNote);
router.delete("/:id", NotesController.deleteNote);
export default router;
