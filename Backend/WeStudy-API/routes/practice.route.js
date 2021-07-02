const controller = require('../controllers/practiceController');
const authorize = require('../middleware/authorize');
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/chapters/create', authorize.verifyToken, authorize.verifyAdmin, controller.createChapter);
    app.get('/chapters/:subjectId', controller.readAllChapters);
    app.post('/exercises/create', authorize.verifyToken, authorize.verifyAdmin, controller.createExercise);
    app.get('/exercises/:subjectId/:chapterId', controller.readAllExercises);
    app.get('/exercises/:exerciseId', controller.readExerciseById);
    app.put('/submit/exercise/:exerciseId', authorize.verifyToken, controller.submitExercise);
    app.get('/submit/exercise/', authorize.verifyToken, controller.getAllSubmitted);
};