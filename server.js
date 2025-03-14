const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const authRoute = require('./src/routes/authRoutes');
const noteRoute = require('./src/routes/noteRoutes');

const app = express();

app.use(express.json());
app.use(cors({
    origin: [
        'http://localhost:3000',
    ]
}));
app.use(helmet());
app.use(morgan('dev'));

app.use('/auth', authRoute);
app.use('/notes', noteRoute);

app.listen(process.env.PORT, () => { console.log(`Server Running on PORT: ${process.env.PORT}`) })