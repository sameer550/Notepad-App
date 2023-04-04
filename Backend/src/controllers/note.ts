import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const id = req.params.id;

  try {
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, "Unauthorized or Invalid note id");
    }
    const note = await NoteModel.findById(id).exec();
    if (!note) {
      throw createHttpError(404, "Must send valid id note not found");
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};
interface CreateNoteBody {
  title?: string;
  text?: string;
}
export const createNotes: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;
  try {
    if (!title) {
      throw createHttpError(400, "Note must send title to processed");
    }
    const newNote = await NoteModel.create({
      title: title,
      text: text,
    });

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};
interface UpdateNoteParams {
  id: string;
}
interface UpdateNoteBody {
  title?: string;
  text?: string;
}
export const updateNote: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNoteBody,
  unknown
> = async (req, res, next) => {
  const id = req.params.id;
  const newTitle = req.body.title;
  const newText = req.body.text;

  try {
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, "Unauthorized or Invalid note id");
    }
    if (!newTitle) {
      throw createHttpError(400, "Note must send New title to processed");
    }
    const note = await NoteModel.findById(id).exec();
    if (!note) {
      throw createHttpError(404, "Must send valid id note not found");
    }
    note.title = newTitle;
    note.text = newText;
    const UpdatedNote = await note.save();
    res.status(200).json(UpdatedNote);
  } catch (error) {
    next(error);
  }
};
export const deleteNote: RequestHandler = async (req, res, next) => {
  const id = req.params.id;

  try {
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, "Unauthorized or Invalid note id");
    }
    const note = await NoteModel.findById(id).exec();
    if (!note) {
      throw createHttpError(404, "Must send valid id note not found");
    }
    const deletedNote = await NoteModel.findByIdAndRemove(id).exec();
    res.status(204).json(deletedNote);
  } catch (error) {
    next(error);
  }
};