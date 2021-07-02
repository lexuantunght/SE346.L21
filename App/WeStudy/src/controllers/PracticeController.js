import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const apiConfig = require('../configs/api.config');

export class PracticeController {
    constructor() {

    }
    getAllChapter(subjectId, done) {
        fetch(apiConfig.host + '/chapters/' + subjectId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(json => {
            if (json.status === 'success') {
                done(json.data);
            }
        })
        .catch(err => console.log(err));
    }
    getAllExercise(subjectId, chapterId, done) {
        fetch(apiConfig.host + '/exercises/' + subjectId + '/' + chapterId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(json => {
            if (json.status === 'success') {
                done(json.data);
            }
        })
        .catch(err => console.log(err));
    }
    async getAllSubmitted(done) {
        let token = await AsyncStorage.getItem('WeStudyToken');
        fetch(apiConfig.host + '/submit/exercise', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': token
            }
        })
        .then(response => response.json())
        .then(json => {
            if (json.status === 'success') {
                done(json.data);
            }
        })
        .catch(err => console.log(err));
    }
    async submitExercise(exerciseId, done) {
        let token = await AsyncStorage.getItem('WeStudyToken');
        fetch(apiConfig.host + '/submit/exercise/' + exerciseId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': token
            }
        })
        .then(response => response.json())
        .then(json => {
            if (json.status === 'success') {
                done(json.data);
            }
        })
        .catch(err => console.log(err));
    }
}