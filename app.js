const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/db.config.js');
const setupRoutes = require('./router/base.router.js');
const envConfig = require('./config/env.config.js');
const port = envConfig.port || 3001;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// setting up the routes
setupRoutes(app);

// Db Connection
connectDB();



app.listen(port, () => {
    console.log(`Server is running on port no ${port}`);
});