const controller = require('../controllers/referenceDocController');
const authorize = require('../middleware/authorize');
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/reference-docs/create', authorize.verifyToken, authorize.verifyAdmin, controller.create);
    app.get('/reference-docs/', controller.readAll);
    app.get('/reference-docs/sort/latest', controller.readByLatest);
    app.get('/reference-docs/sort/popular', controller.readByPopular);
    app.get('/reference-docs/:id', controller.readById);
    app.put('/reference-docs/:id', authorize.verifyToken, authorize.verifyAdmin, controller.update);
    app.delete('/reference-docs/:id', authorize.verifyToken, authorize.verifyAdmin, controller.delete);
};