import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const apiConfig = require('../configs/api.config');
function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
export class UserController {
    constructor() {

    }

    login(info, done, onSuccess) {
        if (isEmptyOrSpaces(info.username) || isEmptyOrSpaces(info.password)) {
            Alert.alert('Failed', 'Thông tin nhập chưa đầy đủ');
            done();
            return;
        }
        fetch(apiConfig.host + '/users/signin', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'username': info.username,
                'password': info.password
            })
        })
        .then(response => response.json())
        .then(json => {
            done();
            if (json.status === 'success') {
                AsyncStorage.setItem('WeStudyToken', json.data.accessToken);
                onSuccess();
            } else {
                Alert.alert('Thất bại', json.message);
            }
        })
        .catch(error => {
            console.log(error);
            done();
        });
    }

    register(info, done, onSuccess) {
        if (info.password !== info.confirmPassword) {
            Alert.alert('Lỗi', 'Mật khẩu xác nhận không chính xác');
            done();
            return;
        }
        if (isEmptyOrSpaces(info.name) || isEmptyOrSpaces(info.email) || isEmptyOrSpaces(info.school) || isEmptyOrSpaces(info.username)
        || isEmptyOrSpaces(info.password)) {
            Alert.alert('Lỗi', 'Thông tin nhập chưa đầy đủ');
            done();
            return;
        }
        if (!validateEmail(info.email)) {
            Alert.alert('Lỗi', 'Email không hợp lệ');
            done();
            return;
        }
        var form = new FormData();
        form.append('name', info.name);
        form.append('email', info.email);
        form.append('school', info.school);
        form.append('username', info.username);
        form.append('password', info.password);
        if (info.avatar != null) form.append('image', info.avatar);
        fetch(apiConfig.host + '/users/signup', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            },
            body: form
        })
        .then(response => response.json())
        .then(json => {
            done();
            if (json.status === 'success') {
                onSuccess();
            } else {
                Alert.alert('Thất bại', json.message);
            }
        })
        .catch(error => {
            console.log(error);
            done();
        });
    }

    async getCurrent(done, onSuccess) {
        let token = await AsyncStorage.getItem('WeStudyToken');
        fetch(apiConfig.host + '/users/current', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'x-access-token': token
            },
        })
        .then(response => response.json())
        .then(json => {
            done();
            if (json.status === 'success') {
                onSuccess(json.data);
            }
        })
        .catch(error => {
            console.log(error);
            done();
        });
    }

    async logout(done) {
        Alert.alert('Thông báo', 'Bạn có chắc chắn muốn đăng xuất?', [
            { text: "Cancel" },
            { 
                text: "OK", 
                onPress: () => {
                    AsyncStorage.removeItem('WeStudyToken');
                    done();
                }
            }
        ]);
    }

    async updatePassword(info, done) {
        if (info.password !== info.confirmPassword) {
            Alert.alert('Lỗi', 'Mật khẩu xác nhận không chính xác');
            done();
            return;
        }
        if (isEmptyOrSpaces(info.oldPassword) || isEmptyOrSpaces(info.password)) {
            Alert.alert('Lỗi', 'Thông tin nhập chưa đầy đủ');
            done();
            return;
        }
        let token = await AsyncStorage.getItem('WeStudyToken');
        fetch(apiConfig.host + '/users/update', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                'oldPassword': info.oldPassword,
                'password': info.password
            })
        })
        .then(response => response.json())
        .then(json => {
            done();
            if (json.status == 'success') {
                Alert.alert('Thành công', json.message);
            } else {
                Alert.alert('Thất bại', json.message);
            }
        })
        .catch(err => {
            console.log(err);
            done();
        });
    }
    async updateInfo(info, done, success) {
        if (isEmptyOrSpaces(info.name) || isEmptyOrSpaces(info.school)) {
            Alert.alert('Lỗi', 'Thông tin nhập chưa đầy đủ');
            done();
            return;
        }
        let form = new FormData();
        form.append('name', info.name);
        form.append('school', info.school);
        if (info.avatar != null) form.append('image', info.avatar);
        let token = await AsyncStorage.getItem('WeStudyToken');
        fetch(apiConfig.host + '/users/updateinfo', {
            method: 'PUT',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'x-access-token': token
            },
            body: form
        })
        .then(response => response.json())
        .then(json => {
            done();
            if (json.status === 'success') {
                success(json.data);
            } else {
                alert(json.message);
            }
        })
        .catch(err => {
            console.log(err);
            done();
        });
    }
}