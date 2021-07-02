const controller = require('../controllers/referenceTestController');
const authorize = require('../middleware/authorize');
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/reference-tests/create', authorize.verifyToken, authorize.verifyAdmin, controller.create);
    app.get('/reference-tests/', controller.readAll);
    app.get('/reference-tests/sort/latest', controller.readByLatest);
    app.get('/reference-tests/sort/popular', controller.readByPopular);
    app.get('/reference-tests/:id', controller.readById);
    app.put('/reference-tests/:id', authorize.verifyToken, authorize.verifyAdmin, controller.update);
    app.delete('/reference-tests/:id', authorize.verifyToken, authorize.verifyAdmin, controller.delete);
};