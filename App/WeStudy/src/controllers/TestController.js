import AsyncStorage from '@react-native-async-storage/async-storage';
const apiConfig = require('../configs/api.config');

export class TestController {
    constructor() {

    }

    async getAllTest(subjectId, done) {
        let token = await AsyncStorage.getItem('WeStudyToken');
        fetch(apiConfig.host + '/tests/subject/' + subjectId, {
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
    async getTestById(testId, done) {
        let token = await AsyncStorage.getItem('WeStudyToken');
        fetch(apiConfig.host + '/tests/' + testId, {
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
    async submitTest(test, done) {
        let token = await AsyncStorage.getItem('WeStudyToken');
        fetch(apiConfig.host + '/tests/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                testId: test.testId,
                subjectId: test.subjectId,
                mark: test.mark,
                answers: test.answers,
                date_done: test.date_done,
                id: test.id
            })
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
        fetch(apiConfig.host + '/submit/test', {
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
    async getSubmittedById(testId, done) {
        let token = await AsyncStorage.getItem('WeStudyToken');
        fetch(apiConfig.host + '/submit/test/' + testId, {
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
    async getRanking(subjectId, testId, done) {
        let token = await AsyncStorage.getItem('WeStudyToken');
        fetch(apiConfig.host + '/tests/ranking/' + subjectId + '/' + testId, {
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
}
