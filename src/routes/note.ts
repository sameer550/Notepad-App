import express from "express";
import * as NotesController from "../controllers/note";

const router = express.Router();

router.get("/", NotesController.getNotes);
router.post("/", NotesController.createNotes);
router.get("/:id", NotesController.getNote);
export default router;
