import React, { useEffect, useState } from 'react';
import {
    View, Text, FlatList, RefreshControl, Image,
    StyleSheet, Dimensions, TouchableWithoutFeedback, TouchableOpacity, TextInput,
    Modal, SafeAreaView
} from 'react-native';
import { LoadingImage } from '../components/LoadingImage';
import apiConfig from '../configs/api.config';
import colorConfig from '../configs/color.config';
import { ReferenceController } from '../controllers/ReferenceController';
import { Loading } from '../components/Loading';

export function AllExperScreen({navigation}) {
    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [resultSearching, setResultSearching] = useState([]);
    const [loading, setLoading] = useState(true);
    let referenceController = new ReferenceController();
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style = {{marginRight: 10}} onPress={() => setShowModal(true)}>
                    <Image source = {require('../assets/search.png')} style = {{width: 20, height: 20, resizeMode: 'stretch', tintColor: '#fff'}}/>
                </TouchableOpacity>
            ),
        });
        referenceController.getAllPost(data => {
            setPosts(data);
            setLoading(false);
        });
    }, []);
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        referenceController.getAllPost(data => setPosts(data));
        wait(3000).then(() => setRefreshing(false));
    }, []);
    const filterKeyword = (data, keyword) => {
        let temp = [];
        if (keyword != '')
            for (let i = 0; i < data.length; i++) {
                if (data[i].name.toLowerCase().startsWith(keyword.toLowerCase())) {
                    temp.push(data[i]);
                }
            }
        setResultSearching(temp);
    }
    const ExperienceItem = ({item, onClick}) => (
        <TouchableWithoutFeedback onPress = {onClick}>
            <View style = {styles.experItem}>
                <LoadingImage source = {{uri: apiConfig.images + '/' + item.photo}} style = {styles.exper}/>
                <Text style = {{marginVertical: 10, fontWeight: '600'}} numberOfLines = {3}>{item.name}</Text>
                <Text style = {{marginBottom: 5}}>{item.author}</Text>
                <Text>Nguồn: {item.from}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
    return(
        <View style = {styles.container}>
            <Loading loading = {loading}/>
            <View style = {{flex: 1}}>
                <FlatList data = {posts} keyExtractor = {item => item._id}
                renderItem = {({item}) => <ExperienceItem item = {item} onClick = {() => navigation.navigate('DetailExper', { experId: item._id })}/>}
                refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                }/>
            </View>
            <Modal animationType='slide' visible={showModal}>
                <View style = {{flex: 1}}>
                    <SafeAreaView style = {{backgroundColor: colorConfig.accentColor}}>
                        <View style = {styles.chatTool}>
                            <TouchableOpacity onPress = {() => setShowModal(false)}>
                                <Image source = {require('../assets/cancel.png')} style = {{height: 20, width: 20, resizeMode: 'stretch', tintColor: '#ffffff', marginHorizontal: 10}}/>
                            </TouchableOpacity>
                            <TextInput style = {styles.input} placeholder='Tìm kiếm...' autoCorrect = {false} placeholderTextColor = '#cccccc'
                            autoFocus={true} onChangeText={text => setKeyword(text)}/>
                            <TouchableOpacity onPress = {() => filterKeyword(posts, keyword)}>
                                <Image source = {require('../assets/search.png')} style = {styles.icon}/>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                    <View style={{backgroundColor: '#eeeeee', flex: 1}}>
                        {resultSearching.length > 0 ?
                        <FlatList data = {resultSearching} keyExtractor = {item => item._id}
                        renderItem = {({item}) => <ExperienceItem item = {item} onClick = {() => {setShowModal(false); navigation.navigate('DetailExper', { experId: item._id })}}/>}
                        removeClippedSubviews = {true} showsVerticalScrollIndicator = {false}
                        maxToRenderPerBatch = {20} initialNumToRender = {20}
                        ListHeaderComponent={() => <View style = {{height: 10}}/>}/>
                        : null}
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    myShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    border: {
        borderTopLeftRadius: 15, borderTopRightRadius: 15,
        borderBottomLeftRadius: 15, borderBottomRightRadius: 15,
    },
    title: {
        fontSize: 15, fontWeight: '700', fontFamily: 'Nunito', marginBottom: 5
    },
    experItem: {
        width: Dimensions.get('screen').width - 20, margin: 10, padding: 8,
        borderRadius: 15,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    exper: {
        width: Dimensions.get('screen').width - 36,
        height: (Dimensions.get('screen').width) / 1.8,
        borderRadius: 10, borderWidth: 0.25, borderColor: '#c4c4c4',
        resizeMode: 'cover'
    },
    input: {
        fontSize: 15, flex: 1, borderWidth: 0.5, paddingHorizontal: 10, borderColor: '#ddd', borderRadius: 50,
        height: 36, color: '#ffffff'
    },
    chatTool: {
        height: 48,
        flexDirection: 'row', alignItems: 'center'
    },
    icon: {
        height: 22, width: 22, resizeMode: 'stretch', tintColor: '#ffffff',
        marginHorizontal: 10
    }
})