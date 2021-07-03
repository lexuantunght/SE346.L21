import React, { useState } from 'react';
import {
    View, SafeAreaView, KeyboardAvoidingView, ScrollView,
    Text, Image, TouchableOpacity, TextInput,
    StyleSheet,
    Dimensions, Keyboard,
    Alert,
} from 'react-native';
import { MyImagePicker } from '../components/MyImagePicker';
import { UserController } from '../controllers/UserController';
import { Loading } from '../components/Loading';
const myColor = require('../configs/color.config');

export function RegisterScreen({onDismiss}) {
    let controller = new UserController();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [school, setSchool] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [avatar, setAvatar] = useState(null);
    return(
        <View style = {styles.container}>
            <SafeAreaView style = {styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios'? 'padding': 'height'} style = {styles.body}>
                <Loading loading = {loading}/>
                <View style = {{height: 45, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20}}>
                    <TouchableOpacity style = {{flex: 1, flexDirection: 'row', alignItems: 'center'}} onPress = {() => onDismiss()}>
                        <Image source = {require('../assets/prev.png')} style = {{width: 20, height: 20, resizeMode: 'stretch', tintColor: myColor.accentColor}}/>
                        <Text style = {{fontWeight: '800', fontSize: 17, marginLeft: 10, color: myColor.accentColor, fontFamily: 'Nunito'}}>Back</Text>
                    </TouchableOpacity>
                    <Text style = {{flex: 2, textAlign: 'center', fontSize: 17, fontWeight: '800', fontFamily: 'Nunito'}}>Đăng ký</Text>
                    <View style = {{flex: 1}}/>
                </View>
                <ScrollView style = {styles.container}>
                        <View style = {styles.inputContainer}>
                            <Image source = {require('../assets/name.png')} style = {styles.icon}/>
                            <TextInput style = {styles.input} placeholder = 'Họ tên' autoCorrect = {false} maxLength = {50} onChangeText = {text => setName(text)}/>
                        </View>
                        <View style = {styles.inputContainer}>
                            <Image source = {require('../assets/bag.png')} style = {styles.icon}/>
                            <TextInput style = {styles.input} placeholder = 'Trường học' autoCorrect = {false} maxLength = {50} onChangeText = {text => setSchool(text)}/>
                        </View>
                        <View style = {styles.inputContainer}>
                            <Image source = {require('../assets/email.png')} style = {styles.icon}/>
                            <TextInput style = {styles.input} placeholder = 'Email' autoCorrect = {false} maxLength = {50} textContentType='emailAddress' onChangeText = {text => setEmail(text)}/>
                        </View>
                        <View style = {styles.inputContainer}>
                            <Image source = {require('../assets/user.png')} style = {styles.icon}/>
                            <TextInput style = {styles.input} placeholder = 'Tên tài khoản' autoCorrect = {false} maxLength = {50}
                            onChangeText = {text => setUsername(text)}/>
                        </View>
                        <View style = {styles.inputContainer}>
                            <Image source = {require('../assets/key.png')} style = {styles.icon}/>
                            <TextInput style = {styles.input} placeholder = 'Mật khẩu' blurOnSubmit={false} maxLength = {50}
                            onSubmitEditing={()=> Keyboard.dismiss()} secureTextEntry = {true} onChangeText = {text => setPassword(text)}/>
                        </View>
                        <View style = {styles.inputContainer}>
                            <Image source = {require('../assets/key.png')} style = {styles.icon}/>
                            <TextInput style = {styles.input} placeholder = 'Xác nhận mật khẩu' blurOnSubmit={false} maxLength = {50}
                            onSubmitEditing={()=> Keyboard.dismiss()} secureTextEntry = {true} onChangeText = {text => setConfirmPassword(text)}/>
                        </View>
                        <View>
                            <MyImagePicker width = {256} height = {256} cropping = {true} onChangeImage = {image => setAvatar({
                                'uri': image.path,
                                'type': image.mime,
                                'name': image.filename
                            })}/>
                        </View>
                        <TouchableOpacity style = {styles.btn} onPress = {() => {
                            setLoading(true);
                            controller.register({name, email, school, username, password, confirmPassword, avatar}, 
                                () => setLoading(false), 
                                () => Alert.alert('Thông báo', 'Đăng ký thành công, đăng nhập ngay?', [
                                    {
                                        text: "Cancel",
                                    },
                                    { text: "OK", onPress: () =>  onDismiss()}
                                ]));
                        }}>
                            <Text style = {{fontWeight: '700', fontSize: 17, color: '#fff', fontFamily: 'Nunito'}}>Đăng ký</Text>
                        </TouchableOpacity>
                </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#fff'
    },
    title: {
        fontSize: 28, fontWeight: '600',
        marginHorizontal: 40, marginBottom: 20,
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
    body: {
        flex: 2
    },
    btn: {
        justifyContent: 'center', alignItems: 'center', marginHorizontal: 40, marginVertical: 10,
        backgroundColor: myColor.accentColor,
        height: 45, borderRadius: 12
    },
});