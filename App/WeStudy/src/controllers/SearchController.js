const apiConfig = require('../configs/api.config');

export class SearchController {
    getAllUniversity(done) {
        fetch(apiConfig.host + '/university', {
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
    getBaseMark(id, done) {
        fetch(apiConfig.host + '/university/basemark/' + id, {
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
    getAdmission(id, done) {
        fetch(apiConfig.host + '/university/admission/' + id, {
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
    getUniversityByMajor(major, done) {
        fetch(apiConfig.host + '/university/major', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                major: major
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
}