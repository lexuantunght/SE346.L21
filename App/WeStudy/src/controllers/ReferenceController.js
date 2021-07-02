import config from '../configs/api.config';

export class ReferenceController {
    constructor() {

    }
    getLatestTest(done) {
        fetch(config.host + '/reference-tests/sort/latest', {
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
    getPopularTest(done) {
        fetch(config.host + '/reference-tests/sort/popular', {
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

    getLatestDoc(done) {
        fetch(config.host + '/reference-docs/sort/latest', {
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
    getPopularDoc(done) {
        fetch(config.host + '/reference-docs/sort/popular', {
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
    
    getAllTest(done) {
        fetch(config.host + '/reference-tests/', {
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

    getAllDoc(done) {
        fetch(config.host + '/reference-docs/', {
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

    getTestById(testId, done) {
        fetch(config.host + '/reference-tests/' + testId, {
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

    getDocById(docId, done) {
        fetch(config.host + '/reference-docs/' + docId, {
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

    getLatestPost(done) {
        fetch(config.host + '/shared-posts/sort/latest', {
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
    getPostById(postId, done) {
        fetch(config.host + '/shared-posts/' + postId, {
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
    getAllPost(done) {
        fetch(config.host + '/shared-posts/', {
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