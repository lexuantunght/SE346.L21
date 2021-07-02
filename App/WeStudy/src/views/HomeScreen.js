import React, { useEffect, useRef, useState } from 'react';
import {
    View, Text, Image,
    StyleSheet, RefreshControl,
    ScrollView, Dimensions, TouchableOpacity, TouchableWithoutFeedback
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ReferenceController } from '../controllers/ReferenceController';
import { LoadingImage } from '../components/LoadingImage';
const myColor = require('../configs/color.config');
const apiConfig = require('../configs/api.config');
let referenceController = new ReferenceController();
const TopTabs = createMaterialTopTabNavigator();

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const LatestItem = ({item, onClick}) => {
    return(
        <TouchableWithoutFeedback onPress = {onClick}>
            <View style = {styles.testItem}>
                <LoadingImage source = {{uri: apiConfig.images + '/' + item.photo}} style = {[styles.test, {borderRadius: 10, borderColor: '#c4c4c4', borderWidth: 0.25}]} resizeMode='cover'/>
                <Text style = {styles.nameTest} numberOfLines = {3}>{item.name}</Text>
                <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source = {require('../assets/view.png')} style = {{width: 18, height: 18, resizeMode: 'stretch'}}/>
                    <Text style = {styles.viewTest}>{item.views}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
const PopularItem = ({item, onClick}) => {
    return(
        <TouchableWithoutFeedback onPress = {onClick}>
            <View style = {styles.popularItem}>
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
}

function TestTab({navigation}) {
    const [latest, setLatest] = useState([]);
    const [popular, setPopular] = useState([]);
    const fetchData = () => {
        referenceController.getLatestTest(data => setLatest(data));
        referenceController.getPopularTest(data => setPopular(data));
    }
    useEffect(fetchData, []);
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchData();
        wait(3000).then(() => setRefreshing(false));
    }, []);
    return(
            <ScrollView refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
            }>
                <View style = {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style = {styles.title}>Mới nhất</Text>
                    <TouchableOpacity onPress = {() => navigation.navigate('AllTest')}>
                        <Text style = {[styles.title, {color: myColor.accentColor, fontWeight: '700'}]}>Xem tất cả →</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal = {true} showsHorizontalScrollIndicator = {false}>
                {
                    latest.map((item, key) => (
                        <LatestItem item = {item} key = {key} onClick = {() => navigation.navigate('DetailTest', { testId: item._id })}/>
                    ))
                }
                </ScrollView>
                <Text style = {[styles.title, {marginBottom: 20}]}>Phổ biến</Text>
                <View>
                {
                    popular.map((item, key) => (
                        <PopularItem item = {item} key = {key} onClick = {() => navigation.navigate('DetailTest', { testId: item._id })}/>
                    ))
                }
                </View>
            </ScrollView>
    );
}

function DocumentTab({navigation}) {
    const [latest, setLatest] = useState([]);
    const [popular, setPopular] = useState([]);
    const fetchData = () => {
        referenceController.getLatestDoc(data => setLatest(data));
        referenceController.getPopularDoc(data => setPopular(data));
    }
    useEffect(fetchData, []);
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchData();
        wait(3000).then(() => setRefreshing(false));
    }, []);
    return(
            <ScrollView refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
            }>
                <View style = {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style = {styles.title}>Mới nhất</Text>
                    <TouchableOpacity onPress = {() => navigation.navigate('AllDoc')}>
                        <Text style = {[styles.title, {color: myColor.accentColor, fontWeight: '700'}]}>Xem tất cả →</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal = {true} showsHorizontalScrollIndicator = {false}>
                {
                    latest.map((item, key) => (
                        <LatestItem item = {item} key = {key} onClick = {() => navigation.navigate('DetailDoc', { docId: item._id })}/>
                    ))
                }
                </ScrollView>
                <Text style = {[styles.title, {marginBottom: 20}]}>Phổ biến</Text>
                <View>
                {
                    popular.map((item, key) => (
                        <PopularItem item = {item} key = {key} onClick = {() => navigation.navigate('DetailDoc', { docId: item._id })}/>
                    ))
                }
                </View>
            </ScrollView>
    );
}

function ExperTab({navigation}) {
    const [latests, setLatests] = useState([]);
    useEffect(() => {
        referenceController.getLatestPost(data => setLatests(data));
    }, []);
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        referenceController.getLatestPost(data => setLatests(data));
        wait(3000).then(() => setRefreshing(false));
    }, []);
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
        <ScrollView refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
        }>
            <View style = {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style = {styles.title}>Mới nhất</Text>
                <TouchableOpacity onPress = {() => navigation.navigate('AllExper')}>
                    <Text style = {[styles.title, {color: myColor.accentColor, fontWeight: '700'}]}>Xem tất cả →</Text>
                </TouchableOpacity>
            </View>
            <View>
            {
                latests.map((item, key) => (
                    <ExperienceItem item = {item} key = {key} onClick = {() => navigation.navigate('DetailExper', { experId: item._id })}/>
                ))
            }
            </View>
        </ScrollView>
    );
}

function HomeTab({navigation}) {
    return(
        <TopTabs.Navigator swipeEnabled = {false} tabBarOptions = {{
            labelStyle: {
                fontFamily: 'Nunito', fontWeight: '800'
            },
            activeTintColor: myColor.accentColor,
            style: {backgroundColor: 'transparent', marginBottom: 10},
            indicatorStyle: {
                backgroundColor: myColor.accentColor,
                height: 8, width: 8, borderRadius: 4,
                marginLeft: Dimensions.get('screen').width / 6 - 4
            }
        }}>
            <TopTabs.Screen name = 'TestTab' options = {{title: 'Đề thi'}}>
                {() => <TestTab navigation = {navigation}/>}
            </TopTabs.Screen>
            <TopTabs.Screen name = 'DocumentTab' options = {{title: 'Tài liệu'}}>
                {() => <DocumentTab navigation = {navigation}/>}
            </TopTabs.Screen>
            <TopTabs.Screen name = 'ExperienceTab' options = {{title: 'Kinh nghiệm'}}>
                {() => <ExperTab navigation = {navigation}/>}
            </TopTabs.Screen>
        </TopTabs.Navigator>
    )
}

export function HomeScreen({navigation}) {
    return(
        <View style = {styles.container}>
            <View style = {styles.bannerContainer}>
                <Image style = {styles.banner} source = {require('../assets/banner.png')}/>
            </View>
            <View style = {styles.container}>
                <HomeTab navigation = {navigation}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    group: {
        padding: 10
    },
    title: {
        fontSize: 15, fontWeight: '700', fontFamily: 'Nunito', marginHorizontal: 10, marginTop: 20, marginBottom: 10
    },
    testItem: {
        width: (Dimensions.get('screen').width) / 1.5,
        margin: 10, padding: 8,
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
    test: {
        width: (Dimensions.get('screen').width) / 1.5 - 16,
        height: (Dimensions.get('screen').width) / 2.5
    },
    nameTest: {
        textAlign: 'justify', fontSize: 12, fontWeight: '600', marginVertical: 10
    },
    viewTest: {
        fontStyle: 'italic',
        fontSize: 12, marginLeft: 5
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
        borderRadius: 10, borderColor: '#c4c4c4', borderWidth: 0.25,
        resizeMode: 'cover'
    },
    inside: {
        fontSize: 16, fontWeight: '700', fontFamily: 'Nunito',
        color: myColor.accentColor
    },
    banner: {
        width: Dimensions.get('screen').width - 20,
        height: 100,
        resizeMode: 'cover',
        margin: 10,
        borderRadius: 15,
    },
    bannerContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    popularItem: {
        flexDirection: 'row', marginHorizontal: 10, marginBottom: 10, borderRadius: 15,
        backgroundColor: '#fff', padding: 8
    }
})