const controller = require('../controllers/chatController');
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

    app.post('/chatbot', controller.chatbot);
};