import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const apiConfig = require('../configs/api.config');

export class MainController {
    constructor() {

    }

    getAllSubject(done) {
        fetch(apiConfig.host + '/subjects/', {
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

    getAllDepartmentEducation(done) {
        fetch(apiConfig.host + '/department-educations/', {
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
}