const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const url = 'mongodb+srv://admin:tung2407@cluster0.uotz5.mongodb.net/westudy?retryWrites=true&w=majority';
const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}

mongoose.connect(url,connectionParams)
.then(() => {
    console.log('Connected to database ')
})
.catch( (err) => {
    console.error(`Error connecting to the database. \n${err}`);
})

const db = {};
db.mongoose = mongoose;

db.User = require('../models/user');
db.ReferenceTest = require('../models/reference_test');
db.ReferenceDoc = require('../models/reference_doc');
db.SharedPost = require('../models/shared_post');
db.Subject = require('../models/subject');
db.DepartmentEducation = require('../models/department_education');
db.Chapter = require('../models/chapter');
db.Exercise = require('../models/exercise');
db.DoneExercise = require('../models/done_exercise');
db.DoneTest = require('../models/done_test');
db.Test = require('../models/test');
db.University = require('../models/university');
db.Role = require('../models/role');

module.exports = db;