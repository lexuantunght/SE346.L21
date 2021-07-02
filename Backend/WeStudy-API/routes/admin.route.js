const controller = require('../controllers/adminController');
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

    app.post('/subjects/create', authorize.verifyToken, authorize.verifyAdmin, controller.createSubject);
    app.get('/subjects/', controller.readAllSubject);
    app.post('/department-educations/create', authorize.verifyToken, authorize.verifyAdmin, controller.createDepartmentEducation);
    app.get('/department-educations/', controller.readAllDepartmentEducation);
    app.post('/university/create', authorize.verifyToken, authorize.verifyAdmin, controller.createUniversity);
    app.get('/university/', controller.readAllUniversity);
    app.get('/university/basemark/:id', controller.readBaseMark);
    app.get('/university/admission/:id', controller.readAddmission);
    app.post('/university/major', controller.readUniversityByMajor);
    app.post('/roles/create', authorize.verifyToken, authorize.verifyAdmin, controller.addRole);
};