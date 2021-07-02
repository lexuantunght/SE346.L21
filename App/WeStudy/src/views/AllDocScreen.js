import React, { useEffect, useState } from 'react';
import {
    View, Text, FlatList, TouchableOpacity, Image, RefreshControl,
    StyleSheet, Dimensions, TouchableWithoutFeedback, Modal, TextInput,
    SafeAreaView
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { LoadingImage } from '../components/LoadingImage';
import apiConfig from '../configs/api.config';
import colorConfig from '../configs/color.config';
import { MainController } from '../controllers/MainController';
import { ReferenceController } from '../controllers/ReferenceController';
import { Loading } from '../components/Loading';

export function AllDocScreen({navigation}) {
    const [docs, setDocs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('0');
    const [result, setResult] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [resultSearching, setResultSearching] = useState([]);
    const [openSubject, setOpenSubject] = useState(false);
    let referenceController = new ReferenceController();
    let mainController = new MainController();
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style = {{marginRight: 10}} onPress={() => setShowModal(true)}>
                    <Image source = {require('../assets/search.png')} style = {{width: 20, height: 20, resizeMode: 'stretch', tintColor: '#fff'}}/>
                </TouchableOpacity>
            ),
        });
        referenceController.getAllDoc(data => {
            setDocs(data);
            setLoading(false);
        });
        mainController.getAllSubject(data => {
            let temp = [{label: 'Tất cả', value: 0}];
            for (let i = 0; i < data.length; i++) {
                temp.push({label: data[i].name, value: (i + 1) + ''});
            }
            setSubjects(temp);
        });
    }, []);
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        referenceController.getAllDoc(data => setDocs(data));
        wait(3000).then(() => setRefreshing(false));
    }, []);
    const filterData = (data, filters) => {
        let temp = [];
        for (let i = 0; i < data.length; i++) {
            if ((filters.subject == '0' || data[i].subject === subjects[subjects.findIndex(e => e.value == filters.subject)].label)) {
                temp.push(data[i]);
            }
        }
        setResult(temp);
    }
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
    useEffect(() => {
        filterData(docs, {subject: selectedSubject});
    }, [selectedSubject, docs]);
    const TestItem = ({item, onClick}) => (
        <TouchableWithoutFeedback onPress = {onClick}>
            <View style = {styles.testItem}>
                <LoadingImage source = {{uri: apiConfig.images + '/' + item.photo}} style = {{flex: 3, height: Dimensions.get('screen').width / 3, 
                    borderRadius: 10, borderWidth: 0.25, borderColor: '#c4c4c4'}}/>
                <View style = {{flexDirection: 'column', flex: 4, marginLeft: 10}}>
                    <Text style = {{textAlign: 'justify', fontSize: 13, fontWeight: '600'}}>{item.name}</Text>
                    <View style = {{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                        <Image source = {require('../assets/view.png')} style = {{width: 18, height: 18, resizeMode: 'stretch'}}/>
                        <Text style = {styles.viewTest}>{item.views}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
    return(
        <View style = {styles.container}>
            <Loading loading = {loading}/>
            <View style = {styles.filter}>
                <View style = {{flex: 1}}>
                    <Text style = {styles.title}>Chọn môn học</Text>
                    {subjects.length > 0 ? <DropDownPicker items = {subjects} open={openSubject} setOpen={setOpenSubject} placeholder='Chọn môn'
                        containerStyle = {{height: 48}} value={selectedSubject} setValue={setSelectedSubject}
                        itemStyle = {{justifyContent: 'flex-start'}} style = {[styles.border]}
                        dropDownContainerStyle = {[{borderBottomLeftRadius: 15, borderBottomRightRadius: 15, borderColor: colorConfig.accentColor}]}
                        />
                    : null}
                </View>
            </View>
            <View style = {{flex: 1}}>
                <FlatList data = {result} keyExtractor = {item => item._id}
                renderItem = {({item}) => <TestItem item = {item} onClick = {() => navigation.navigate('DetailDoc', { docId: item._id })}/>}
                removeClippedSubviews = {true} showsVerticalScrollIndicator = {false}
                maxToRenderPerBatch = {20} initialNumToRender = {20}
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
                            <TouchableOpacity onPress = {() => filterKeyword(docs, keyword)}>
                                <Image source = {require('../assets/search.png')} style = {styles.icon}/>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                    <View style={{backgroundColor: '#eeeeee', flex: 1}}>
                        {resultSearching.length > 0 ?
                        <FlatList data = {resultSearching} keyExtractor = {item => item._id}
                        renderItem = {({item}) => <TestItem item = {item} onClick = {() => {setShowModal(false); navigation.navigate('DetailDoc', { docId: item._id })}}/>}
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
    filter: {
        flexDirection: 'row', padding: 10, zIndex: 1000
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
        borderColor: colorConfig.accentColor
    },
    title: {
        fontSize: 15, fontWeight: '700', fontFamily: 'Nunito', marginBottom: 5
    },
    testItem: {
        flexDirection: 'row', marginHorizontal: 10, marginBottom: 10, borderRadius: 15, padding: 8,
        backgroundColor: '#fff',
    },
    viewTest: {
        fontStyle: 'italic',
        fontSize: 12, marginLeft: 5
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