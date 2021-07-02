import React, { useState } from 'react';
import {
    View, SafeAreaView, KeyboardAvoidingView,
    Text, Image, TouchableOpacity, TextInput,
    StyleSheet, Modal, Dimensions, Platform
} from 'react-native';
import { Loading } from '../components/Loading';
import { UserController } from '../controllers/UserController';
import { RegisterScreen } from './RegisterScreen';
const myColor = require('../configs/color.config');

export function LoginScreen({onLoginSuccess}) {
    const [openRegister, setOpenRegister] = useState(false);
    const [loading, setLoading] = useState(false);
    let controller = new UserController();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return(
        <View style = {styles.container}>
            <SafeAreaView style = {styles.container}>
                <Loading loading = {loading}/>
                <View style = {styles.header}>
                    <Image source = {require('../assets/flame-training.png')} style = {styles.logo}/>
                </View>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios'? 'padding': 'height'} style = {styles.body}>
                    <Text style = {styles.title}>We Study</Text>
                    <View style = {styles.inputContainer}>
                        <Image source = {require('../assets/user.png')} style = {styles.icon}/>
                        <TextInput style = {styles.input} placeholder = 'Tài khoản' autoCorrect = {false} onChangeText = {text => setUsername(text)}/>
                    </View>
                    <View style = {styles.inputContainer}>
                        <Image source = {require('../assets/key.png')} style = {styles.icon}/>
                        <TextInput style = {styles.input} placeholder = 'Mật khẩu' textContentType='oneTimeCode' secureTextEntry = {true} onChangeText = {text => setPassword(text)}/>
                    </View>
                    <TouchableOpacity style = {styles.btn} onPress = {() => {
                        setLoading(true);
                        controller.login({username, password}, () => setLoading(false), onLoginSuccess);
                    }}>
                        <Text style = {{fontWeight: '700', fontSize: 17, color: '#fff', fontFamily: 'Nunito'}}>Đăng nhập</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
                <View style = {styles.footer}>
                    <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style = {{fontSize: 17, marginRight: 10, fontFamily: 'Nunito'}}>Chưa có tài khoản?</Text>
                        <TouchableOpacity onPress = {() => setOpenRegister(true)}>
                            <Text style = {styles.inside}>Đăng ký</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
            <Modal visible = {openRegister} animationType='slide' onRequestClose = {() => setOpenRegister(false)}>
                <RegisterScreen onDismiss = {() => setOpenRegister(false)}/>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        flex: 5, alignItems: 'center', justifyContent: 'center',
    },
    logo: {
        flex: 1, resizeMode: 'contain', height: '100%', width: '100%', maxWidth: Dimensions.get('screen').width * 2 / 3, aspectRatio: 1
    },
    body: {
        flex: 7
    },
    footer: {
        height: 60, justifyContent: 'center', alignItems: 'center'
    },
    title: {
        fontSize: 28, fontWeight: '800', fontFamily: 'Nunito',
        marginHorizontal: 40, marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row', alignItems: 'center',
        marginHorizontal: 40, marginVertical: 10,
        borderBottomWidth: 0.5, borderColor: '#aaa'
    },
    input: {
        fontSize: 17, fontWeight: '600',
        padding: 10, flex: 1
    },
    icon: {
        width: 20, height: 20, resizeMode: 'stretch', tintColor: '#aaa'
    },
    inside: {
        fontSize: 17, fontWeight: '800', color: myColor.accentColor, fontFamily: 'Nunito'
    },
    btn: {
        justifyContent: 'center', alignItems: 'center', marginHorizontal: 40, marginVertical: 20,
        backgroundColor: myColor.accentColor,
        height: 48, borderRadius: 15
    },
});