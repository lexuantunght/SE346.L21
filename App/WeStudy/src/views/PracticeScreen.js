import React, { useEffect, useState } from 'react';
import {
    View, Text, Image,
    StyleSheet,
    FlatList,
    TouchableWithoutFeedback
} from 'react-native';
import apiConfig from '../configs/api.config';
import { MainController } from '../controllers/MainController';

export function PracticeScreen({navigation}) {
    const [subjects, setSubjects] = useState([]);
    let mainController = new MainController();
    useEffect(() => {
        mainController.getAllSubject(data => {
            let temp = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].name != 'Văn') temp.push(data[i]);
            }
            setSubjects(temp);
        })
    }, []);
    const ItemCategory = ({id, image, name, head, tail}) => (
        <TouchableWithoutFeedback onPress = {() => navigation.navigate('Chapter', { subjectId: id, subject: name })}>
            <View style = {[styles.itemContainer, head ? styles.topItem : null, tail ? styles.botItem : null]}>
                <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source = {{uri: apiConfig.images + '/' + image}} style = {styles.icon}/>
                    <Text style = {styles.subject}>{name}</Text>
                </View>
                <View>
                    <Image source = {require('../assets/goto.png')} style = {{width: 18, height: 18, resizeMode: 'stretch'}}/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
    return(
        <View style = {styles.container}>
            <FlatList data = {subjects} keyExtractor = {item => item._id} 
            renderItem = {({item}) => <ItemCategory head = {subjects.indexOf(item) == 0 ? true : false} tail = {subjects.indexOf(item) == subjects.length - 1 ? true : false}
            image = {item.photo} name = {item.name} id = {item._id}/>}
            ItemSeparatorComponent = {() => <View style = {{height: 1}}/>} contentContainerStyle = {[{padding: 10}]}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemContainer: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        height: 64,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    icon: {
        width: 25, height: 25, resizeMode: 'stretch'
    },
    subject: {
        fontSize: 17, fontFamily: 'Nunito', fontWeight: '600', marginLeft: 20
    },
    topItem: {
        borderTopRightRadius: 15, borderTopLeftRadius: 15
    },
    botItem: {
        borderBottomLeftRadius: 15, borderBottomRightRadius: 15
    },
    myShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    }
});