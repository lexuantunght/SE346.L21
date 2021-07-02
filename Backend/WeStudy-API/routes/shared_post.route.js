const controller = require('../controllers/sharedPostController');
const authorize = require('../middleware/authorize');
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/shared-posts/create', authorize.verifyToken, authorize.verifyAdmin, controller.create);
    app.get('/shared-posts/', controller.readAll);
    app.get('/shared-posts/:id', controller.readById);
    app.get('/shared-posts/sort/latest', controller.readByLatest);
    app.put('/shared-posts/:id', authorize.verifyToken, authorize.verifyAdmin, controller.update);
    app.delete('/shared-posts/:id', authorize.verifyToken, authorize.verifyAdmin, controller.delete);
};