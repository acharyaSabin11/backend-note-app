const { createCategory, getCategoriesByUserId, getCategoriesByUserIdWithPagination } = require("../models/categoryModel");

const handleCreateCategory = async (req, res) => {
    try {
        const { title } = req.body;
        const userId = req.user.id;

        const newCategory = await createCategory(title, userId);
        res.status(201).json({ message: "Category Created Successfully", category: newCategory });
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
        const categories = await getCategoriesByUserId(userId);
        res.status(200).json({ categories });
    } catch (e) {
        res.status(500).json({ message: "Error Fetching Categories" });
    }
}

const handleGetRecentCategories = async (req, res) => {
    try {
        const userId = req.user.id;
        const { limit } = req.query;
        const data = await getCategoriesByUserIdWithPagination(userId, 1, limit);
        res.status(200).json({ data });
    } catch (e) {
        res.status(500).json({ message: "Error Fetching Categories" });
    }
}


module.exports = { handleCreateCategory, handleGetCategories, handleGetRecentCategories };