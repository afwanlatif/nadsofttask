const studentRouter = require('./student.router');

const setupRoutes = (app) => {
    app.use('/student', studentRouter);
};

module.exports = setupRoutes
