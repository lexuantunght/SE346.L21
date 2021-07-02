const controller = require('../controllers/userController');
const authorize = require('../middleware/authorize');
const upload = require('../utils/upload');
const passport = require('passport');
const config = require('../config/auth.config');
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/users/signup', upload.single('image'), controller.signup);
    app.post('/users/signin', controller.signin);
    app.get('/users/signin/facebook', passport.authenticate('facebook', { scope : ['email'] }));
    app.get('/users/signin/facebook/callback', passport.authenticate('facebook', { failureRedirect: config.frontend + '/login' }), controller.signinByOthers);
    app.get('/users/signin/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/users/signin/google/callback', passport.authenticate('google', { failureRedirect: config.frontend + '/login' }), controller.signinByOthers);
    app.get('/users/current', authorize.verifyToken, controller.current);
    app.put('/users/update', authorize.verifyToken, controller.update);
    app.put('/users/updateinfo', authorize.verifyToken, upload.single('image'), controller.updateInfo);
};