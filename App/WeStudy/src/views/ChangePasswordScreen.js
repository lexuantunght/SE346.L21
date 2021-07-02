import React, { useState } from 'react';
import {
    View, TextInput, TouchableOpacity, Keyboard, Image, Text,
    StyleSheet
} from 'react-native';
import { UserController } from '../controllers/UserController';
import { Loading } from '../components/Loading';
const myColor = require('../configs/color.config');

export function ChangePasswordScreen({navigation}) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    let controller = new UserController();
    return(
        <View style = {styles.container}>
            <Loading loading = {loading}/>
            <View style = {styles.inputContainer}>
                <Image source = {require('../assets/key.png')} style = {styles.icon}/>
                <TextInput style = {styles.input} placeholder = 'Mật khẩu hiện tại' blurOnSubmit={false} maxLength = {50}
                    onSubmitEditing={()=> Keyboard.dismiss()} secureTextEntry = {true} onChangeText = {text => setCurrentPassword(text)}/>
            </View>
            <View style = {styles.inputContainer}>
                <Image source = {require('../assets/key.png')} style = {styles.icon}/>
                <TextInput style = {styles.input} placeholder = 'Mật khẩu mới' blurOnSubmit={false} maxLength = {50}
                    onSubmitEditing={()=> Keyboard.dismiss()} secureTextEntry = {true} onChangeText = {text => setNewPassword(text)}/>
            </View>
            <View style = {styles.inputContainer}>
                <Image source = {require('../assets/key.png')} style = {styles.icon}/>
                <TextInput style = {styles.input} placeholder = 'Xác nhận mật khẩu' blurOnSubmit={false} maxLength = {50}
                    onSubmitEditing={()=> Keyboard.dismiss()} secureTextEntry = {true} onChangeText = {text => setConfirmPassword(text)}/>
            </View>
            <TouchableOpacity style = {styles.btn} onPress = {() => {
                setLoading(true);
                controller.updatePassword({
                    'oldPassword': currentPassword,
                    'password': newPassword,
                    'confirmPassword': confirmPassword
                }, () => setLoading(false));
            }}>
                <Text style = {styles.insideBtn}>Đổi mật khẩu</Text>
            </TouchableOpacity>
        </View>
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