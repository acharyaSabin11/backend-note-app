const { createNote, getNotesByUserId } = require("../models/noteModel");

const handleCreateNote = async (req, res) => {
    try {
        const { title, description, additional_info } = req.body;
        const userId = req.user.id;

        const newNote = await createNote(title, description, additional_info, userId);
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
        const userId = req.user.id;
        const { page, limit } = req.query;
        const data = await getNotesByUserId(userId, page, limit);
        res.status(200).json({ data });
    } catch (e) {
        res.status(500).json({ message: "Error Fetching Notes" });
    }
}

module.exports = { handleCreateNote, handleGetNotes };