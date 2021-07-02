import React, { useEffect, useState } from 'react';
import {
    View, Text, Image, TouchableOpacity, RefreshControl,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { UserController } from '../controllers/UserController';
const myColor = require('../configs/color.config');
import { TestController } from '../controllers/TestController';
import { PracticeController } from '../controllers/PracticeController';
import { MainController } from '../controllers/MainController';
import { useIsFocused } from '@react-navigation/native';

export function ProfileScreen({navigation, onLogout}) {
    let userController = new UserController();
    let testController = new TestController();
    let practiceController = new PracticeController();
    let mainController = new MainController();
    const isFocused = useIsFocused();
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [school, setSchool] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [doneExercises, setDoneExercises] = useState(0);
    const [doneTests, setDoneTests] = useState(0);
    const [maxTest, setMaxTest] = useState({mark: 0, name: ''});
    const [handleReload, setHandleReload] = useState(true);
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setHandleReload(handleReload => !handleReload);
        wait(3000).then(() => setRefreshing(false));
    }, []);
    useEffect(() => {
        userController.getCurrent(() => {}, data => {
            setName(data.name);
            setUsername(data.username);
            setEmail(data.email);
            setSchool(data.school);
            setAvatar(data.avatar);
        });
        testController.getAllSubmitted(data => {
            setDoneTests(data.length);
            mainController.getAllSubject(subjects => {
                let maxMark = 0;
                let maxName = '';
                for (let i = 0; i < data.length; i++) {
                    if (data[i].mark >= maxMark) {
                        maxMark = data[i].mark;
                        maxName = subjects[subjects.findIndex(e => e._id == data[i].subjectId)].name;
                    }
                }
                setMaxTest({
                    mark: maxMark,
                    name: maxName
                })
            });
        });
        practiceController.getAllSubmitted(data => setDoneExercises(data.length));
    }, [handleReload, isFocused]);
    return(
        <ScrollView style = {styles.container} refreshControl = {
            <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            />
        }>
            <View>
                <Text style = {styles.title}>Thông tin chung</Text>
                <View style = {styles.card}>
                    <View style={styles.avatar}>
                      {avatar !== '' ? <Image source = {{uri: avatar}} style = {{flex: 1, borderRadius: 50}} resizeMode='cover'/> : null}
                    </View>
                    <Text style = {styles.name}>{name}</Text>
                    <View>
                        <View style = {{flexDirection: 'row', marginHorizontal: 20, marginTop: 10}}>
                            <Image source = {require('../assets/user.png')} style = {styles.icon}/>
                            <Text>{username}</Text>
                        </View>
                        <View style = {{flexDirection: 'row', marginHorizontal: 20, marginTop: 10}}>
                            <Image source = {require('../assets/bag.png')} style = {styles.icon}/>
                            <Text>{school}</Text>
                        </View>
                        <View style = {{flexDirection: 'row', marginHorizontal: 20, marginTop: 10}}>
                            <Image source = {require('../assets/email.png')} style = {styles.icon}/>
                            <Text>{email}</Text>
                        </View>
                        <TouchableOpacity style = {styles.edit} onPress = {() => navigation.navigate('ChangeProfile', { name: name, school: school, avatar: avatar })}>
                            <Image source = {require('../assets/edit.png')} style = {[styles.icon, {tintColor: myColor.accentColor}]}/>
                            <Text style = {styles.inside}>Chỉnh sửa</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View>
                <Text style = {styles.title}>Thành tích</Text>
                <View style = {styles.achievement}>
                    <Image source = {require('../assets/medal.png')} style = {{width: 30, height: 40, resizeMode: 'stretch', tintColor: myColor.accentColor}}/>
                    <View style = {{marginHorizontal: 20, marginVertical: 10}}>
                        <Text style = {{marginVertical: 5}}>Số bài tập đã làm: {doneExercises}</Text>
                        <Text style = {{marginVertical: 5}}>Số lần thi thử: {doneTests}</Text>
                        <Text style = {{marginVertical: 5}}>{'Điểm thi cao nhất: ' + maxTest.mark + ' (' + maxTest.name + ')'}</Text>
                    </View>
                </View>
            </View>
            <View>
                <Text style = {styles.title}>Bảo mật</Text>
                <TouchableOpacity style = {styles.btn} onPress = {() => navigation.navigate('ChangePassword')}>
                    <Text style = {styles.insideBtn}>Đổi mật khẩu</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.btn} onPress = {() => userController.logout(onLogout)}>
                    <Text style = {styles.insideBtn}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 15, fontWeight: '700', fontFamily: 'Nunito', marginHorizontal: 10, marginTop: 10
    },
    card: {
        margin: 10, backgroundColor: '#fff', borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    avatar: {
        borderWidth: 2, borderColor: myColor.accentColor,
        padding: 2, width: 100, height: 100, borderRadius: 50, alignSelf: 'center',
        marginTop: 20
    },
    name: {
        fontWeight: '700', fontSize: 17, marginVertical: 10, textAlign: 'center'
    },
    icon: {
        width: 18, height: 18, resizeMode: 'stretch', marginRight: 10
    },
    inside: {
        fontWeight: '700', fontSize: 15, color: myColor.accentColor, fontFamily: 'Nunito',
    },
    edit: {
        alignSelf: 'flex-end', flexDirection: 'row',
        marginHorizontal: 20, marginVertical: 10
    },
    achievement: {
        paddingHorizontal: 20, margin: 10, backgroundColor: '#fff', borderRadius: 15, flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    btn: {
        height: 48, backgroundColor: myColor.accentColor, justifyContent: 'center', alignItems: 'center',
        borderRadius: 15, margin: 10,
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
