import React, { useEffect, useRef, useState } from 'react';
import {
    View, Text, TouchableOpacity, SafeAreaView, Image,
    StyleSheet, FlatList, Dimensions, Alert
} from 'react-native';
import colorConfig from '../configs/color.config';
import RBSheet from 'react-native-raw-bottom-sheet';
import RadioForm, { RadioButton, RadioButtonInput } from 'react-native-simple-radio-button';
import { FlatGrid } from 'react-native-super-grid';
import { TestController } from '../controllers/TestController';
import apiConfig from '../configs/api.config';
import { MathText } from 'react-native-math-view';
import { Loading } from '../components/Loading';

const ItemTest = ({item, onSelect, onRemove}) => {
    const [checkKey, setCheckKey] = useState('');
    return(
        <View style = {{flexDirection: 'column', margin: 10}}>
            {item.instruction && item.instruction != '' ? <Text style = {{fontWeight: '600', marginVertical: 5}}>{item.instruction}</Text> : null}
            {item.instruction_photo ? <Image source={{uri: apiConfig.images + '/' + item.instruction_photo}} style={{width: Dimensions.get('screen').width - 20, minHeight: 350}} resizeMode='contain'/> : null}
            <Text style = {{fontWeight: '600', marginVertical: 5}}>Câu {item.id}:</Text>
            {item.content != '' ? <MathText value={item.content} direction="ltr"/> : null}
            {item.photos.map((item, key) => (
                    <Image source = {{uri: apiConfig.images + '/' + item}} key = {key} style = {styles.photo} resizeMode='contain'/>
                ))
            }
            <View style = {{marginVertical: 10}}>
                <RadioForm>
                {
                    item.answer.map((it, key) => (
                        <RadioButton labelHorizontal={true} key={key} style={{alignItems: 'center'}}>
                            <RadioButtonInput obj={item} index={key}
                            isSelected = {checkKey == String.fromCharCode(65 + key)}
                            borderWidth={1} buttonSize={20} buttonInnerColor = {colorConfig.accentColor} buttonOuterColor = {colorConfig.accentColor}
                            onPress={() => {
                                onSelect(String.fromCharCode(65 + key));
                                setCheckKey(String.fromCharCode(65 + key));
                            }}/>
                            <TouchableOpacity style = {{flexWrap: 'wrap', marginLeft: 10, width: Dimensions.get('screen').width - 80}}
                            onPress={() => {
                                onSelect(String.fromCharCode(65 + key));
                                setCheckKey(String.fromCharCode(65 + key));
                            }}>
                                <MathText value={String.fromCharCode(65 + key) + '. ' + it} direction="ltr"/>
                            </TouchableOpacity>
                        </RadioButton>
                    ))
                }
                </RadioForm>
            </View>
            <TouchableOpacity style = {{alignSelf: 'flex-end'}} onPress = {() => {
                setCheckKey('');
                onRemove();
            }}>
                <Text style = {{fontWeight: '600', color: colorConfig.accentColor}}>Xoá lựa chọn</Text>
            </TouchableOpacity>
        </View>
    );
}

export function OnTestScreen({onCancel, testId, subjectName}) {
    const [test, setTest] = useState(null);
    const [time, setTime] = useState(5400);
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    let testController = new TestController();
    
    const refSheet = useRef();
    useEffect(() => {
        testController.getTestById(testId, data => {
            setTest(data);
            setTime(parseInt(data.time_doing) * 60);
            let temp = [];
            for (let i = 1; i <= data.questions.length; i++) {
                temp.push({id: i + '', value: ''});
            }
            setAnswers(temp);
            setLoading(false);
        });

        let interval = setInterval(() => {
            setTime(time => {
               if(time === 0) clearInterval(interval);
               return time - 1;
            });
        }, 1000);
        // interval cleanup on component unmount
        return () => clearInterval(interval);
    }, []);

    const submit = () => {
        setLoading(true);
        let temp = 0;
        for (let i = 0; i < answers.length; i++) {
            if (answers[i].value === test.questions[i].key) temp += 1;
        }
        testController.submitTest({
            testId: test._id,
            subjectId: test.subjectId,
            mark: temp / test.questions.length * 10,
            answers: answers,
            date_done: (new Date()),
            id: test.code
        }, () => {
            setLoading(false);
            Alert.alert('Thông báo', 'Chúc mừng bạn đã hoàn thành bài thi môn ' + subjectName + ' với số điểm ' + (temp / test.questions.length * 10), [
                { text: "OK", onPress: onCancel }
            ]);
        });
    }

    const ItemExercise = ({item}) => (
        <View style = {{borderRadius: 25, backgroundColor: (answers.findIndex(e => e.id == item.id) != -1 && answers[answers.findIndex(e => e.id == item.id)].value != '' ? colorConfig.accentColor : '#c4c4c4'), 
        width: 50, height: 50, justifyContent: 'center', alignItems: 'center'}}>
            <Text style = {{fontSize: 15, fontWeight: '500'}}>{item.id}</Text>
        </View>
    );

    return(
        <SafeAreaView style = {styles.container}>
            <Loading loading = {loading}/>
            <View style = {styles.header}>
                <TouchableOpacity onPress = {() => {
                    Alert.alert('Thông báo', 'Bạn chưa nộp bài, nếu thoát bài thi sẽ không ghi nhận. Bạn có chắc chắn thoát?', [
                        {
                            text: "Cancel",
                        },
                        { text: "OK", onPress: onCancel}
                    ])
                }}>
                    <Image source = {require('../assets/cancel.png')} style = {styles.iconHeader} resizeMode='stretch'/>
                </TouchableOpacity>
                {!loading ? <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source = {require('../assets/clock.png')} style = {styles.iconHeader} resizeMode='stretch'/>
                    <Text style = {{fontSize: 19, fontWeight: '600', marginLeft: 10}}>{parseInt(time / 60)} : {time - (parseInt(time / 60)) * 60}</Text>
                </View> : null}
                <TouchableOpacity onPress = {() => refSheet.current.open()}>
                    <Image source = {require('../assets/menu.png')} style = {styles.iconHeader} resizeMode='stretch'/>
                </TouchableOpacity>
            </View>
            <View style = {{flex: 1}}>
                {loading ? null :
                <FlatList data = {test ? test.questions : []} keyExtractor = {item => item.id} 
                renderItem = {({item}) => <ItemTest listCheck = {answers} item = {item} onSelect = {value => {
                    setAnswers([...(answers.slice(0, item.id - 1)), {id: item.id, value: value }, ...(answers.slice(item.id))]);
                }}
                onRemove = {() => setAnswers([...(answers.slice(0, item.id - 1)), {id: item.id, value: '' }, ...(answers.slice(item.id))])}/>}
                ListHeaderComponent = {() =>
                    <View style = {{flexDirection: 'column', margin: 10}}>
                        <Text style = {{fontWeight: '600', marginBottom: 5}}>{'Môn ' + subjectName + ' - Mã đề thi #' + (test ? test.code : '')}</Text>
                        <Text style = {{fontWeight: '600'}}>{'Thời gian: ' + (test ? test.time_doing : 0 )+ ' phút'}</Text>
                        <Text style = {{fontWeight: '600', textAlign: 'center', fontSize: 17, marginTop: 10}}>Đề thi</Text>
                    </View>}
                ListFooterComponent = {() =>
                    <TouchableOpacity style = {[styles.buttonSubmit, styles.myShadow]}
                    onPress = {() => {
                        Alert.alert('Thông báo', 'Bạn có chắc chắn nộp bài?', [
                            {
                                text: "Cancel",
                            },
                            { text: "OK", onPress: submit}
                        ])
                    }}>
                        <Text style = {{color: '#fff', fontWeight: '600'}}>Nộp bài</Text>
                    </TouchableOpacity>}
                />}
            </View>
            <RBSheet ref = {refSheet} closeOnDragDown={true} closeOnPressMask={true} height = {250} dragFromTopOnly = {true} customStyles = {{
                container: {
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                }
            }}>
                <FlatGrid data = {test ? test.questions : []} itemDimension = {50} renderItem = {({item}) => <ItemExercise item = {item}/>}/>
            </RBSheet>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: 49, borderBottomWidth: 0.5, borderColor: 'gray',
        flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, justifyContent: 'space-between'
    },
    iconHeader: {
        width: 20, height: 20
    },
    buttonSubmit: {
        alignSelf: 'center', justifyContent: 'center', alignItems: 'center',
        backgroundColor: colorConfig.accentColor,
        paddingVertical: 10, paddingHorizontal: 20,
        height: 40, borderRadius: 20, marginVertical: 10
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
    photo: {
        width: Dimensions.get('screen').width - 40,
        height: 160
    }
})
