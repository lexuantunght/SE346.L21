const controller = require('../controllers/testController');
const authorize = require('../middleware/authorize');
const upload = require('../utils/upload');
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/tests/create', authorize.verifyToken, authorize.verifyAdmin, controller.create);
    app.get('/tests/subject/:subjectId', authorize.verifyToken, controller.readAll);
    app.get('/tests/:id', authorize.verifyToken, controller.readById);
    app.post('/tests/submit', authorize.verifyToken, controller.submit);
    app.get('/submit/test/', authorize.verifyToken, controller.getAllSubmitted);
    app.get('/submit/test/:id', authorize.verifyToken, controller.getSubmittedById);
    app.get('/tests/ranking/:subjectId/:testId', authorize.verifyToken, controller.getRanking);
    app.put('/tests/update', authorize.verifyToken, authorize.verifyAdmin, controller.update);
};