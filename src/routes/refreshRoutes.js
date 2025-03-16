const express = require('express');
const { renewAccessToken } = require('../controllers/tokenController');

const router = express.Router();


router.post('/', renewAccessToken);

module.exports = router;