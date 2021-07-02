import React, { useState, useEffect } from 'react';
import {
    View, TextInput, TouchableOpacity, Keyboard, Image, Text,
    StyleSheet, ScrollView, Alert
} from 'react-native';
import { MyImagePicker } from '../components/MyImagePicker';
const myColor = require('../configs/color.config');
import { Loading } from '../components/Loading';
import { UserController } from '../controllers/UserController';

export function ChangeProfileScreen({navigation, route}) {
    const { name } = route.params;
    const { school } = route.params;
    const { avatar } = route.params;
    const [_name, setName] = useState(name);
    const [_school, setSchool] = useState(school);
    const [_avatar, setAvatar] = useState(avatar);
    const [loading, setLoading] = useState(false);
    let userController = new UserController();

    const updateInfo = () => {
        setLoading(true);
        userController.updateInfo({
            name: _name,
            school: _school,
            avatar: _avatar
        }, () => setLoading(false), () => Alert.alert('Thông báo', 'Thay đổi thông tin thành công', [
                { text: "OK", onPress: () => navigation.goBack()}
            ])
        );
    }

    return(
        <ScrollView style = {styles.container}>
            <Loading loading = {loading}/>
            <View style = {styles.inputContainer}>
                <Image source = {require('../assets/name.png')} style = {styles.icon}/>
                <TextInput style = {styles.input} placeholder = 'Họ tên' maxLength = {50} value = {_name} onChangeText = {text => setName(text)}/>
            </View>
            <View style = {styles.inputContainer}>
                <Image source = {require('../assets/bag.png')} style = {styles.icon}/>
                <TextInput style = {styles.input} placeholder = 'Trường học' maxLength = {50} value = {_school} onChangeText = {text => setSchool(text)}/>
            </View>
            <MyImagePicker width = {256} height = {256} cropping = {true} defaultImage={_avatar} onChangeImage = {image => setAvatar({
                'uri': image.path,
                'type': image.mime,
                'name': image.filename
            })}/>
            <TouchableOpacity style = {styles.btn} onPress = {updateInfo}>
                <Text style = {styles.insideBtn}>Thay đổi</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#fff', paddingTop: 20
    },
    inputContainer: {
        flexDirection: 'row', alignItems: 'center',
        marginHorizontal: 40, marginVertical: 10,
        borderBottomWidth: 0.5, borderColor: '#aaa'
    },
    icon: {
        width: 20, height: 20, resizeMode: 'stretch', tintColor: '#aaa'
    },
    input: {
        fontSize: 17, fontWeight: '600',
        padding: 10, flex: 1
    },
    btn: {
        height: 48, backgroundColor: myColor.accentColor, justifyContent: 'center', alignItems: 'center',
        borderRadius: 15, marginVertical: 10, marginHorizontal: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    insideBtn: {
        fontSize: 17, fontWeight: '700', fontFamily: 'Nunito', color: '#fff'
    },
});
