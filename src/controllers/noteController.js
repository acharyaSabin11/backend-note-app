const { insertNoteCategory } = require("../models/noteCategoryMode");
const { createNote, getNotesByUserId, getNoteDetailById, deleteNoteById, updateNoteById } = require("../models/noteModel");

const handleCreateNote = async (req, res) => {
    try {
        const { title, description, additional_info, categories } = req.body;
        const userId = req.user.id;

        const newNote = await createNote(title, description, additional_info, userId);

        if (categories && categories.length > 0) {
            const noteId = newNote.id;
            for (let i = 0; i < categories.length; i++) {
                //because categories only contains id of categories
                await insertNoteCategory(noteId, categories[i]);
            }
        }

        res.status(201).json({ message: "Note Created Successfully", note: newNote });
    } catch (e) {
        console.log(e);
        if (e.code = '23502') {
            res.status(500).json({ message: `Invalid ${e.column} of ${e.table}` });

        } else {
            res.status(500).json({ message: "Error Creating Note" });

        }
    }
}

const handleGetNotes = async (req, res) => {
    try {
        console.log(req.user);
        const userId = req.user.id;
        const { page, limit } = req.query;
        const data = await getNotesByUserId(userId, page, limit);
        res.status(200).json({ data });
    } catch (e) {
        res.status(500).json({ message: "Error Fetching Notes" });
    }
}

const handleGetNoteDetail = async (req, res) => {
    try {
        const noteId = req.params.id;
        const userId = req.user.id;
        const data = await getNoteDetailById(noteId, userId);
        res.status(200).json({ data });
    } catch (e) {
        res.status(500).json({ message: "Error Fetching Note" });
    }
}

const handleDeleteNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        const data = await deleteNoteById(noteId);
        res.status(204).json({ data });
    } catch (e) {
        res.status(500).json({ message: "Error Deleting Note" });
    }
}

const handleUpdateNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        const { title, description, additional_info, addCategories, removeCategories } = req.body;
        console.log(addCategories);
        const data = await updateNoteById(noteId, title, description, additional_info, addCategories, removeCategories);
        console.log(addCategories);
        res.status(200).json({ message: "Note Updated Successfully", data });
    } catch (e) {
        res.status(500).json({ message: "Error Updating Note" });
    }
}

module.exports = { handleCreateNote, handleGetNotes, handleGetNoteDetail, handleDeleteNote, handleUpdateNote };