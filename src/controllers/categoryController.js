const { createCategory, getCategoryByUserId } = require("../models/categoryModel");

const handleCreateCategory = async (req, res) => {
    try {
        const { title } = req.body;
        const userId = req.user.id;

        const newNote = await createCategory(title, userId);
        res.status(201).json({ message: "Category Created Successfully", note: newNote });
    } catch (e) {
        console.log(e);
        if (e.code = '23502') {
            res.status(500).json({ message: `Invalid ${e.column} of ${e.table}` });

        } else {
            res.status(500).json({ message: "Error Creating Category" });

        }
    }
}

const handleGetCategories = async (req, res) => {
    try {
        const userId = req.user.id;
        const data = await getCategoryByUserId(userId);
        res.status(200).json({ data });
    } catch (e) {
        res.status(500).json({ message: "Error Fetching Categories" });
    }
}

module.exports = { handleCreateCategory, handleGetCategories };