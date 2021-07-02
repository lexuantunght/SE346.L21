import React, { useEffect, useRef, useState } from 'react';
import {
    View, Text, ScrollView, FlatList,
    TouchableOpacity, Image,
    StyleSheet, TextInput, KeyboardAvoidingView, Platform, Dimensions, StatusBar
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import RBSheet from 'react-native-raw-bottom-sheet';
const myColor = require('../configs/color.config');

export function ChatbotScreen({navigation}) {
    const [data, setData] = useState([
        {
            'id': '1',
            'sender': 0,
            'message': 'Xin chào Lê Xuân Tùng. Đây là cổng hỏi đáp về thông tin tuyển sinh đại học. Còn chần chừ gì nữa mà không đặt câu hỏi cho mình nào!'
        },
        {
            'id': '2',
            'sender': 1,
            'message': 'Xin chào đồng chí nha'
        },
        {
            'id': '3',
            'sender': 0,
            'message': 'Xin chào Lê Xuân Tùng'
        },
        {
            'id': '4',
            'sender': 1,
            'message': 'Điểm chuẩn ngành Kỹ thuật Phần mềm trường Đại học Công nghệ Thông tin năm 2020 là nhiêu vậy?'
        },
        {
            'id': '5',
            'sender': 0,
            'message': '27.7'
        },
    ]);
    const headerHeight = useHeaderHeight();
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity style = {{marginLeft: 10}} onPress = {() => refSheet.current.open()}>
                    <Image source = {require('../assets/information.png')} style = {{width: 20, height: 20, resizeMode: 'stretch', tintColor: '#fff'}}/>
                </TouchableOpacity>
            ),
        })
    }, []);
    const refSheet = useRef();
    const MessageItem = ({item}) => (
        <View style = {[styles.message, item.sender == 1 ? {flexDirection: 'row-reverse'} : null]}>
            <View style = {styles.avatarContainer}>
                { (item.sender == 1) ? <Image source = {require('../assets/avatar.png')} style = {styles.avatar}/> :
                    <Image source = {require('../assets/robot.png')} style = {styles.avatar}/>
                }
            </View>
            <View style = {[styles.messageContent, item.sender == 1 ? {backgroundColor: myColor.accentColor} : null]}>
                <Text style = {item.sender == 1 ? {color: '#fff'} : {color: '#000'}}>{item.message}</Text>
            </View>
        </View>
    );
    return(
        <KeyboardAvoidingView style = {styles.container} behavior = {Platform.OS == 'ios' ? 'padding' : 'height'} 
        keyboardVerticalOffset = {headerHeight + StatusBar.currentHeight}>
            <View style = {styles.container}>
                <FlatList data = {data} keyExtractor = {item => item.id} renderItem = {MessageItem}/>
            </View>
            <View style = {styles.chatTool}>
                <TextInput style = {styles.input} placeholder='Nhập tin nhắn' autoCorrect = {false}/>
                <TouchableOpacity>
                    <Image source = {require('../assets/send.png')} style = {styles.icon}/>
                </TouchableOpacity>
            </View>
            <RBSheet ref = {refSheet} closeOnDragDown={true} closeOnPressMask={true} height = {320} dragFromTopOnly = {true} customStyles = {{
                container: {
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                }
            }}>

            </RBSheet>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    chatTool: {
        height: 48, paddingHorizontal: 10,
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#fff'
    },
    input: {
        fontSize: 15, flex: 1, borderWidth: 0.5, paddingHorizontal: 10, borderColor: '#ddd', borderRadius: 50,
        height: 36
    },
    icon: {
        height: 22, width: 22, resizeMode: 'stretch', tintColor: myColor.accentColor,
        marginHorizontal: 10
    },
    message: {
        flexDirection: 'row', margin: 10
    },
    avatar: {
        width: 28, height: 28, resizeMode: 'stretch', borderRadius: 15, margin: 5
    },
    avatarContainer: {
        backgroundColor: '#a1cae2', borderRadius: 50, width: 33, height: 33, justifyContent: 'center', alignItems: 'center'
    },
    messageContent: {
        borderRadius: 15, backgroundColor: '#fff', justifyContent: 'center',
        marginHorizontal: 10, padding: 10, minHeight: 40, maxWidth: Dimensions.get('screen').width * 2 / 3
    }
});