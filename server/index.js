const express = require('express');
const app = express();
require('dotenv').config();
const cookiesParser = require('cookie-parser');
app.use(cookiesParser())

app.use(express.json());

const PORT = process.env.PORT || 8000

const ConnectDb = require('./config/database')
ConnectDb();

const route = require('./routes/users')
app.use('/api/v1',route);

app.listen(PORT,()=>{
    console.log(`Server connected at ${PORT}`);
})