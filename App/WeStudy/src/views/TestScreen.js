import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity,
    ScrollView, Modal, Alert, RefreshControl, Pressable
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import colorConfig from '../configs/color.config';
import { OnTestScreen } from './OnTestScreen';
const myColor = require('../configs/color.config');
import { Loading } from '../components/Loading';
import { MainController } from '../controllers/MainController';
import { TestController } from '../controllers/TestController';
import { UserController } from '../controllers/UserController';

export function TestScreen({navigation}) {
    let mainController = new MainController();
    let testController = new TestController();
    let userController = new UserController();
    const [dataUser, setDataUser] = useState({name: '', school: ''});
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [doneTests, setDoneTests] = useState([]);
    const [subjectReview, setSubjectReview] = useState('');
    const [tests, setTests] = useState([]);
    const [selectedTest, setSelectedTest] = useState('');
    const [ranking, setRanking] = useState([]);
    const [filterDoneTests, setFilterDoneTests] = useState([]);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openSubject, setOpenSubject] = useState(false);
    const [openCode, setOpenCode] = useState(false);
    const [openReview, setOpenReview] = useState(false);
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        reload();
        wait(3000).then(() => setRefreshing(false));
    }, []);
    const reload = () => {
        testController.getAllSubmitted(data => {
            setDoneTests(data);
        });
        if (selectedTest && selectedSubject) {
            testController.getRanking(selectedSubject, selectedTest, data => setRanking(data));
        }
    }
    useEffect(() => {
        mainController.getAllSubject(data => {
            let temp = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].name != 'V??n') {
                    temp.push({
                        label: data[i].name,
                        value: data[i]._id
                    })
                }
            }
            setSubjects(temp);
            testController.getAllSubmitted(data => {
                setDoneTests(data);
            });
        });
        userController.getCurrent(() => {}, data => setDataUser(data));
    }, []);
    useEffect(() => {
        if (selectedSubject != '') {
            setLoading(true);
            testController.getAllTest(selectedSubject, data => {
                let temp = [];
                for (let i = 0; i < data.length; i++) {
                    temp.push({
                        label: '????? s??? ' + data[i].code + (doneTests.findIndex(e => e.testId == data[i]._id) != -1 ? ' - ???? l??m' : ''),
                        value: data[i]._id,
                        data: data[i]
                    })
                }
                setTests(temp);
                setLoading(false);
            });
        }
    }, [selectedSubject]);
    useEffect(() => {
        if (selectedTest != '' && selectedSubject != '') {
            testController.getRanking(selectedSubject, selectedTest, data => setRanking(data));
        }
    }, [selectedTest, selectedSubject]);
    useEffect(() => {
        if (subjectReview != '' && doneTests) {
            let temp = [];
            for (let i = 0; i < doneTests.length; i++) {
                if (doneTests[i].subjectId === subjectReview) {
                    temp.push(doneTests[i]);
                }
            }
            setFilterDoneTests(temp);
        }
    }, [subjectReview, doneTests]);

    const RankItem = ({item, id}) => (
        <View style = {{flexDirection: 'row', marginVertical: 10}}>
            <Text style = {{flex: 1}}>{id}</Text>
            <Text style = {{flex: 5, marginLeft: 5}}>{item.name}</Text>
            <Text style = {{flex: 1, textAlign: 'center', marginLeft: 5}}>{item.mark}</Text>
        </View>
    );
    const HistoryItem = ({item, id}) => (
        <View style = {{flexDirection: 'row', marginVertical: 10}}>
            <Text style = {{flex: 1}}>{id}</Text>
            <Text style = {{flex: 2, marginLeft: 5}}>{'#' + item.id}</Text>
            <Text style = {{flex: 3, marginLeft: 5}}>{(new Date(item.date_done)).toLocaleDateString()}</Text>
            <Text style = {{flex: 2, marginLeft: 5}}>{item.mark}</Text>
            <TouchableOpacity style = {{flex: 2, marginLeft: 5, alignItems: 'center'}}
            onPress = {() => navigation.navigate('ReviewTest', { testId: item.testId, subjectName: subjects[subjects.findIndex(e => e.value == subjectReview)].label })}>
                <Text style = {{color: colorConfig.accentColor, fontWeight: '600'}}>Xem</Text>
            </TouchableOpacity>
        </View>
    );
    const Note = ({ subjectName }) => {
        if (!subjectName) return null;
        if (subjectName === 'To??n') {
            return (
                <Text style={{textAlign: 'justify', fontStyle: 'italic'}}>
                    {'M??n thi To??n g???m 50 c??u tr???c nghi???m. M???i c??u c?? 04 ????p ??n A, B, C, D. Ch??? c?? duy nh???t 01 ????p ??n ch??nh x??c. Th???i gian l??m b??i thi l?? 90 ph??t. N???u th?? sinh b??? b??i thi gi???a ch???ng th?? s??? kh??ng ???????c t??nh ??i???m.'}
                </Text>
            )
        } else if (subjectName === 'Ti???ng Anh') {
            return (
                <Text style={{textAlign: 'justify', fontStyle: 'italic'}}>
                    {'M??n thi Ti???ng Anh g???m 50 c??u tr???c nghi???m. M???i c??u c?? 04 ????p ??n A, B, C, D. Ch??? c?? duy nh???t 01 ????p ??n ch??nh x??c. Th???i gian l??m b??i thi l?? 60 ph??t. N???u th?? sinh b??? b??i thi gi???a ch???ng th?? s??? kh??ng ???????c t??nh ??i???m.'}
                </Text>
            )
        } else {
            return (
                <Text style={{textAlign: 'justify', fontStyle: 'italic'}}>
                    {'M??n thi ' + subjectName + ' g???m 40 c??u tr???c nghi???m. M???i c??u c?? 04 ????p ??n A, B, C, D. Ch??? c?? duy nh???t 01 ????p ??n ch??nh x??c. Th???i gian l??m b??i thi l?? 50 ph??t. N???u th?? sinh b??? b??i thi gi???a ch???ng th?? s??? kh??ng ???????c t??nh ??i???m.'}
                </Text>
            )
        }
    }
    return(
        <ScrollView style = {styles.container} refreshControl = {
            <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            />
        }>
            <Loading loading = {loading}/>
            <View style = {styles.reg}>
                <Text style = {styles.title}>????ng k?? thi th???</Text>
                {subjects.length > 0 ?
                <DropDownPicker listMode='SCROLLVIEW' open={openSubject} setOpen={setOpenSubject} items = {subjects} placeholder = 'Ch???n m??n'
                    containerStyle = {{height: 48}} value = {selectedSubject} setValue={setSelectedSubject}
                    itemStyle = {{justifyContent: 'flex-start'}} style = {[styles.border]}
                    dropDownContainerStyle = {[{borderBottomLeftRadius: 15, borderBottomRightRadius: 15, borderColor: myColor.accentColor}]}
                    onChangeValue={v => setSelectedTest('')}
                    zIndex={3000} zIndexInverse={1000}/>
                : null}
                <View style={{height: 10}}/>
                <DropDownPicker listMode='SCROLLVIEW' open={openCode} disabled={tests.length == 0} setOpen={setOpenCode} items = {tests} placeholder='Ch???n m?? ?????'
                    containerStyle = {{height: 48}} value = {selectedTest} setValue={setSelectedTest}
                    itemStyle = {{justifyContent: 'flex-start'}} style = {[styles.border, {opacity: tests.length == 0 ? 0.5 : 1}]}
                    dropDownContainerStyle = {[{borderBottomLeftRadius: 15, borderBottomRightRadius: 15, borderColor: myColor.accentColor}]}
                    zIndex={2000} zIndexInverse={2000}/>
                <View style = {[styles.card, styles.myShadow]}>
                    <Text style = {styles.cardTitle}>Th??? d??? thi th???</Text>
                    <View style = {{height: 1, backgroundColor: myColor.accentColor, marginVertical: 10}}/>
                    <View style = {styles.cardInfo}>
                        <Text style = {{flex: 1}}>H??? t??n:</Text>
                        <Text style = {styles.cardText}>{dataUser.name}</Text>
                    </View>
                    <View style = {styles.cardInfo}>
                        <Text style = {{flex: 1}}>Tr?????ng:</Text>
                        <Text style = {styles.cardText}>{dataUser.school}</Text>
                    </View>
                    <View style = {styles.cardInfo}>
                        <Text style = {{flex: 1}}>M??n thi:</Text>
                        <Text style = {styles.cardText}>{subjects.length > 0 && selectedSubject !== '' ? subjects[subjects.findIndex(e => e.value == selectedSubject)].label : ''}</Text>
                    </View>
                    <View style = {styles.cardInfo}>
                        <Text style = {{flex: 1}}>M?? ????? thi:</Text>
                        <Text style = {styles.cardText}>{tests.length > 0 && selectedTest !== '' ? tests[tests.findIndex(e => e.value == selectedTest)].label : ''}</Text>
                    </View>
                    <View style = {styles.cardInfo}>
                        <Text style = {{flex: 1}}>Ng??y thi:</Text>
                        <Text style = {styles.cardText}>{(new Date()).toLocaleDateString()}</Text>
                    </View>
                    <View style = {styles.cardInfo}>
                        <Text style = {{flex: 1}}>Th???i gian:</Text>
                        <Text style = {styles.cardText}>{(tests.length > 0 && selectedTest !== '' ? tests[tests.findIndex(e => e.value == selectedTest)].data.time_doing : '') + ' ph??t'}</Text>
                    </View>
                </View>
                <Pressable disabled={selectedSubject == '' || selectedTest == '' || doneTests.findIndex(e => e.testId == selectedTest.value) != -1} style = {[styles.btnStart, styles.myShadow, {opacity: (selectedSubject == '' || selectedTest == '' || doneTests.findIndex(e => e.testId == selectedTest) != -1) ? 0.5 : 1}]}
                onPress = {() => {
                    setIsOpenModal(true);
                }}>
                    <Text style = {styles.inside}>B???t ?????u l??m b??i</Text>
                </Pressable>
                <Text style = {[styles.title, {marginTop: 30}]}>Th??ng tin ????? thi</Text>
                <View>
                    <Note subjectName={subjects.length > 0 && selectedSubject !== '' ? subjects[subjects.findIndex(e => e.value == selectedSubject)].label : ''}/>
                </View>
                <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10}}>
                    <Text style = {styles.title}>B???ng x???p h???ng</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('RankingTest', { ranking: ranking })}>
                        <Text style = {[styles.title, {color: myColor.accentColor, fontWeight: '700'}]}>Xem t???t c??? ???</Text>
                    </TouchableOpacity>
                </View>
                <View style = {[styles.ranking, styles.myShadow]}>
                    <View style = {{flexDirection: 'row'}}>
                        <Text style = {{flex: 1, fontWeight: '600'}}>STT</Text>
                        <Text style = {{flex: 5, fontWeight: '600', marginLeft: 5}}>H??? t??n</Text>
                        <Text style = {{flex: 1, fontWeight: '600', marginLeft: 5, textAlign: 'center'}}>??i???m</Text>
                    </View>
                    <View style = {{height: 1, backgroundColor: '#000', marginVertical: 10}}/>
                    {
                        ranking.sort((a, b) => a.mark > b.mark ? -1 : 1).slice(0, 11).map((item, key) => (
                            <RankItem item = {item} key = {key} id = {key + 1}/>
                        ))
                    }
                </View>
                <Text style = {[styles.title, {marginTop: 20}]}>B??i thi ???? l??m</Text>
                {subjects.length > 0 ?
                <DropDownPicker listMode='SCROLLVIEW' open={openReview} setOpen={setOpenReview} items = {subjects} placeholder='Ch???n m??n'
                    containerStyle = {{height: 48}} value = {subjectReview} setValue={setSubjectReview}
                    itemStyle = {{justifyContent: 'flex-start'}} style = {[styles.border]}
                    dropDownContainerStyle = {[{borderBottomLeftRadius: 15, borderBottomRightRadius: 15, borderColor: myColor.accentColor}]}
                    zIndex={1000} zIndexInverse={3000}/>
                : null}
                <View style = {[styles.ranking, styles.myShadow, {marginTop: 10, minHeight: 200}]}>
                    <View style = {{flexDirection: 'row'}}>
                        <Text style = {{flex: 1, fontWeight: '600', textAlign: 'center'}}>STT</Text>
                        <Text style = {{flex: 2, fontWeight: '600', marginLeft: 5}}>M?? ?????</Text>
                        <Text style = {{flex: 3, fontWeight: '600', marginLeft: 5}}>Ng??y thi</Text>
                        <Text style = {{flex: 2, fontWeight: '600', marginLeft: 5}}>??i???m</Text>
                        <Text style = {{flex: 2, fontWeight: '600', marginLeft: 5, textAlign: 'center'}}>Thao t??c</Text>
                    </View>
                    <View style = {{height: 1, backgroundColor: '#000', marginVertical: 10}}/>
                    {
                        filterDoneTests.map((item, key) => (
                            <HistoryItem item = {item} key = {key} id = {key + 1}/>
                        ))
                    }
                </View>
            </View>
            <Modal visible = {isOpenModal} onDismiss = {() => reload()} animationType='slide'>
                <OnTestScreen subjectName = {subjects.length > 0 && selectedSubject !== '' ? subjects[subjects.findIndex(e => e.value == selectedSubject)].label : ''} testId = {selectedTest} onCancel = {() => setIsOpenModal(false)}/>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 15, fontWeight: '700', fontFamily: 'Nunito', marginTop: 10, marginBottom: 10
    },
    icon: {
        width: 20, height: 20, resizeMode: 'stretch'
    },
    reg: {
        margin: 10
    },
    about: {
        margin: 10
    },
    border: {
        borderTopLeftRadius: 15, borderTopRightRadius: 15,
        borderBottomLeftRadius: 15, borderBottomRightRadius: 15,
        borderColor: myColor.accentColor
    },
    card: {
        padding: 10, backgroundColor: '#fff', marginVertical: 10, borderRadius: 15, zIndex: 1,
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
    cardInfo: {
        flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 5, marginHorizontal: 10
    },
    cardText: {
        fontWeight: '600', flex: 3
    },
    cardTitle: {
        fontSize: 16, fontWeight: '700', fontFamily: 'Nunito', textAlign: 'center', color: myColor.accentColor
    },
    btnStart: {
        height: 48, backgroundColor: myColor.accentColor, justifyContent: 'center', alignItems: 'center',
        borderRadius: 15
    },
    inside: {
        fontSize: 17, fontWeight: '700', fontFamily: 'Nunito', color: '#fff'
    },
    ranking: {
        padding: 10, backgroundColor: '#fff', borderRadius: 15
    }
})
