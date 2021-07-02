import React, { useEffect, useState } from 'react';
import {
    Text, View, StyleSheet, Dimensions, TextInput, TouchableOpacity,
    Image, ScrollView, Platform
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import colorConfig from '../configs/color.config';
import DropDownPicker from 'react-native-dropdown-picker';
import { SearchController } from '../controllers/SearchController';
import { WebView } from 'react-native-webview';
import { Loading } from '../components/Loading';

function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}

const TopTabs = createMaterialTopTabNavigator();

function BaseMarkTab() {
    const [universities, setUniversities] = useState([]);
    const [selectedUniversity, setSelectedUniversity] = useState(null);
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState(null);
    const [htmlResult, setHtmlResult] = useState('');
    const [loading, setLoading] = useState(true);
    const [openUniver, setOpenUniver] = useState(false);
    const [openYear, setOpenYear] = useState(false);
    let searchController = new SearchController();
    useEffect(() => {
        searchController.getAllUniversity(data => {
            let temp = [];
            for (let i = 0; i < data.length; i++) {
                temp.push({label: data[i].name, value: data[i]._id});
            }
            setUniversities(temp);
            setLoading(false);
        });
    }, []);
    useEffect(() => {
        setYears([]);
        let temp = [];
        for (let i = 3; i >= 0; i--) {
            temp.push({label: ((new Date()).getFullYear() - i) + '', value: 3 - i});
        }
        setYears(temp);
    }, [selectedUniversity]);
    const findResult = (university, year) => {
        if (university !== '' && year !== '') {
            setLoading(true);
            searchController.getBaseMark(university, data => {
                if (year > data.base_mark.length - 1) {
                    setHtmlResult('<span>Chưa có thông tin</span>')
                } else {
                    setHtmlResult(`<style>table, th, td {
                        border: 1px solid #d1d5db;
                      }
                      td {
                        padding: 10px;
                      }</style>` + data.base_mark[year]);
                }
                setLoading(false);
            });
        }
    }
    return(
        <View style = {styles.container}>
            <Loading loading = {loading}/>
            <View style = {{margin: 10, flex: 1}}>
                <Text style = {styles.title}>Chọn trường đại học</Text>
                { universities.length > 0 ?
                <DropDownPicker open = {openUniver} setOpen={setOpenUniver} items = {universities} searchable={true} placeholder = 'Chọn trường đại học'
                    containerStyle = {{height: 48}} value={selectedUniversity} setValue={setSelectedUniversity}
                    itemStyle = {{justifyContent: 'flex-start'}} style = {[styles.border]}
                    dropDownContainerStyle = {[{borderBottomLeftRadius: 15, borderBottomRightRadius: 15, borderColor: colorConfig.accentColor}]}
                    searchPlaceholder='Tìm kiếm...' searchTextInputStyle={{borderWidth: 0}} searchContainerStyle={{borderBottomColor: colorConfig.accentColor}}
                    onChangeValue = {value => {
                        setSelectedYear('');
                        setHtmlResult('');
                    }}
                    zIndex={2000} zIndexInverse={1000}/>
                : null}

                <Text style = {[styles.title, {marginTop: 20}]}>Chọn năm</Text>
                { years.length > 0 ?
                <DropDownPicker open={openYear} disabled={selectedUniversity == null} setOpen={setOpenYear} items = {years} placeholder = 'Chọn năm'
                    containerStyle = {{height: 48}} value={selectedYear} setValue={setSelectedYear}
                    itemStyle = {{justifyContent: 'flex-start'}} style = {[styles.border]}
                    dropDownContainerStyle = {[{borderBottomLeftRadius: 15, borderBottomRightRadius: 15, borderColor: colorConfig.accentColor}]}
                    disabledStyle={{opacity: 0.5}}
                    onChangeValue = {value => {
                        findResult(selectedUniversity, value);
                    }}
                    zIndex={1000} zIndexInverse={2000}/>
                : null}

                <Text style = {[styles.title, {marginTop: 20}]}>Kết quả tra cứu</Text>
                <View style = {[{flex: 1}, styles.myShadow]}>
                    <WebView source = {{html: htmlResult}} style={{backgroundColor: 'transparent'}}/>
                </View>
            </View>
        </View>
    )
}

function AdmissionTab() {
    const [universities, setUniversities] = useState([]);
    const [htmlResult, setHtmlResult] = useState('');
    const [loading, setLoading] = useState(true);
    const [openUniver, setOpenUniver] = useState(false);
    const [selectedUniversity, setSelectedUniversity] = useState('');
    let searchController = new SearchController();
    useEffect(() => {
        searchController.getAllUniversity(data => {
            let temp = [];
            for (let i = 0; i < data.length; i++) {
                temp.push({label: data[i].name, value: data[i]._id});
            }
            setUniversities(temp);
            setLoading(false);
        });
    }, []);
    const findResult = (university) => {
        if (university !== '') {
            setLoading(true);
            searchController.getAdmission(university, data => {
                setHtmlResult(`<style>table, th, td {
                    border: 1px solid #d1d5db;
                  }
                  td {
                    padding: 10px;
                  }</style>` + data.admission);
                setLoading(false);
            });
        }
    }
    return(
        <View style = {styles.container}>
            <Loading loading = {loading}/>
            <View style = {{margin: 10, flex: 1}}>
                <Text style = {styles.title}>Chọn trường đại học</Text>
                { universities.length > 0 ?
                <DropDownPicker open={openUniver} setOpen={setOpenUniver} items = {universities} searchable={true} placeholder = 'Chọn trường đại học'
                    containerStyle = {{height: 48}} value={selectedUniversity} setValue={setSelectedUniversity}
                    itemStyle = {{justifyContent: 'flex-start'}} style = {[styles.border]}
                    dropDownContainerStyle = {[{borderBottomLeftRadius: 15, borderBottomRightRadius: 15, borderColor: colorConfig.accentColor}]}
                    searchPlaceholder='Tìm kiếm...' searchTextInputStyle={{borderWidth: 0}} searchContainerStyle={{borderBottomColor: colorConfig.accentColor}}
                    onChangeValue = {value => {
                        findResult(value);
                    }}
                    />
                : null}

                <Text style = {[styles.title, {marginTop: 20}]}>Kết quả tra cứu</Text>
                <View style = {[{flex: 1}, styles.myShadow]}>
                    <WebView source = {{html: htmlResult}} style={{backgroundColor: 'transparent'}}/>
                </View>
            </View>
        </View>
    )
}

function UniversityTab() {
    const [major, setMajor] = useState('');
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(false);
    let searchController = new SearchController();
    const findUniversity = () => {
        if (!isEmptyOrSpaces(major)) {
            setLoading(true);
            searchController.getUniversityByMajor(major, data => {
                setUniversities(data);
                setLoading(false);
            });
        }
    }
    const UniversityItem = ({item, id}) => (
        <View style = {{flexDirection: 'row', marginVertical: 10}}>
            <Text style = {{flex: 1}}>{id}</Text>
            <Text style = {{flex: 5, marginLeft: 5}}>{item.name}</Text>
            <Text style = {{flex: 2, marginLeft: 5}}>{item.major}</Text>
        </View>
    );
    return(
        <ScrollView style = {styles.container}>
            <Loading loading = {loading}/>
            <View style = {{margin: 10, zIndex: 20}}>
                <Text style = {styles.title}>Nhập tên ngành</Text>
                <View style = {styles.chatTool}>
                    <TextInput style = {styles.input} placeholder='Tìm kiếm...' autoCorrect = {false}
                    onChangeText={text => setMajor(text)}/>
                    <TouchableOpacity onPress = {findUniversity}>
                        <Image source = {require('../assets/search.png')} style = {styles.icon}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style = {{margin: 10, flex: 1}}>
                <Text style = {styles.title}>Kết quả tra cứu</Text>
                <View style = {[{flex: 1, backgroundColor: '#ffffff', padding: 10, borderRadius: 15, marginTop: 5}, styles.myShadow]}>
                    <View style = {{flexDirection: 'row'}}>
                        <Text style = {{flex: 1, fontWeight: '600'}}>STT</Text>
                        <Text style = {{flex: 5, fontWeight: '600', marginLeft: 5}}>Tên trường</Text>
                        <Text style = {{flex: 2, fontWeight: '600', marginLeft: 5}}>Tên ngành</Text>
                    </View>
                    <View style = {{height: 1, backgroundColor: '#000', marginVertical: 10, flexDirection: 'column'}}/>
                    {
                        universities.map((item, key) => (
                            <UniversityItem item = {item} key = {key} id = {key + 1}/>
                        ))
                    }
                </View>
            </View>
        </ScrollView>
    )
}

export function SearchScreen() {
    return(
        <View style = {styles.container}>
            <TopTabs.Navigator swipeEnabled = {false} tabBarOptions = {{
            labelStyle: {
                fontFamily: 'Nunito', fontWeight: '800'
            },
            activeTintColor: colorConfig.accentColor,
            style: {backgroundColor: 'transparent', marginBottom: 10},
            indicatorStyle: {
                backgroundColor: colorConfig.accentColor,
                height: 8, width: 8, borderRadius: 4,
                marginLeft: Dimensions.get('screen').width / 6 - 4
            }
            }}>
                <TopTabs.Screen name = 'BaseMark' options = {{title: 'Điểm chuẩn'}}>
                {() => <BaseMarkTab/>}
                </TopTabs.Screen>
                <TopTabs.Screen name = 'Admission' options = {{title: 'Tuyển sinh'}}>
                {() => <AdmissionTab/>}
                </TopTabs.Screen>
                <TopTabs.Screen name = 'University' options = {{title: 'Trường ĐH'}}>
                {() => <UniversityTab/>}
                </TopTabs.Screen>
            </TopTabs.Navigator>
        </View>
    )
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
        borderColor: colorConfig.accentColor
    },
    title: {
        fontSize: 15, fontWeight: '700', fontFamily: 'Nunito', marginBottom: 5
    },
    input: {
        fontSize: 15, flex: 1, borderWidth: 1, paddingHorizontal: 10, borderColor: colorConfig.accentColor, borderRadius: 50,
        height: 40
    },
    chatTool: {
        height: 48,
        flexDirection: 'row', alignItems: 'center',
    },
    icon: {
        height: 22, width: 22, resizeMode: 'stretch', tintColor: colorConfig.accentColor,
        marginHorizontal: 10
    }
})