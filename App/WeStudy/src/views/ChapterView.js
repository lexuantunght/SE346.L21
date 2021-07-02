import React, { useEffect, useState } from 'react';
import { Loading } from '../components/Loading';
import {
    FlatList, TouchableWithoutFeedback,
    Text, View, StyleSheet, Image
} from 'react-native';
import { PracticeController } from '../controllers/PracticeController';

export function ChapterView({navigation, route}) {
    const [chapters, setChapters] = useState([]);
    const { subjectId } = route.params;
    const { subject } = route.params;
    const [loading, setLoading] = useState(true);
    let practiceController = new PracticeController();
    useEffect(() => {
        navigation.setOptions({
            headerTitle: subject
        });
        practiceController.getAllChapter(subjectId, data => {
            setChapters(data);
            setLoading(false);
        });
    }, []);

    const ItemCategory = ({id, name, head, tail, _id}) => (
        <TouchableWithoutFeedback onPress = {() => navigation.navigate('Exercise', { subjectId: subjectId, chapter: name, chapterId: _id })}>
            <View style = {[styles.itemContainer, head ? styles.topItem : null, tail ? styles.botItem : null]}>
                <Text style = {styles.subject}>{id}. {name}</Text>
                <View>
                    <Image source = {require('../assets/goto.png')} style = {{width: 18, height: 18, resizeMode: 'stretch'}}/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );

    return(
        <View style = {styles.container}>
            <Loading loading = {loading}/>
            <FlatList style = {styles.container} data = {chapters} keyExtractor = {item => item._id} renderItem = {({item}) => 
            <ItemCategory id = {chapters.indexOf(item) + 1} name = {item.name} head = {chapters.indexOf(item) == 0 ? true : false} tail = {chapters.indexOf(item) == chapters.length - 1 ? true : false}
            _id = {item._id}/>}
            ItemSeparatorComponent = {() => <View style = {{height: 1}}/>} contentContainerStyle = {[{padding: 10}]}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemContainer: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        minHeight: 64,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    myShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    subject: {
        fontSize: 15, flex: 1, marginRight: 10
    },
    topItem: {
        borderTopRightRadius: 15, borderTopLeftRadius: 15
    },
    botItem: {
        borderBottomLeftRadius: 15, borderBottomRightRadius: 15
    }
});