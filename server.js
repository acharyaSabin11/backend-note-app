const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoute = require('./src/routes/authRoutes');
const noteRoute = require('./src/routes/noteRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const refreshRoutes = require('./src/routes/refreshRoutes');

const app = express();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'https://frontend-notes-app-tawny.vercel.app/login'],
    credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/auth', authRoute);
app.use('/notes', noteRoute);
app.use('/categories', categoryRoutes);
app.use('/refresh', refreshRoutes);

app.listen(process.env.PORT, () => { console.log(`Server Running on PORT: ${process.env.PORT}`) })