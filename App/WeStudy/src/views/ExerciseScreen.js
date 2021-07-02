import React, { useEffect, useRef, useState } from 'react';
import {
    Text, View, Image, TouchableOpacity, TouchableWithoutFeedback,
    StyleSheet, ScrollView, Dimensions, Alert,
} from 'react-native';
import colorConfig from '../configs/color.config';
import RBSheet from 'react-native-raw-bottom-sheet';
import { FlatGrid } from 'react-native-super-grid';
import RadioForm, { RadioButton, RadioButtonInput } from 'react-native-simple-radio-button';
import { MathText } from 'react-native-math-view';
import { PracticeController } from '../controllers/PracticeController';
import apiConfig from '../configs/api.config';
import { Loading } from '../components/Loading';

export function ExerciseView({navigation, route}) {
    const { subjectId } = route.params;
    const { chapterId } = route.params;
    const { chapter } = route.params;
    const refSheet = useRef();
    const [selectedExercise, setSelectedExercise] = useState({_id: '', content: '', photos: [], answers: [], key: '', detail_key: ''});
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [exercises, setExercises] = useState([]);
    const [submited, setSubmitted] = useState([]);
    const [loading, setLoading] = useState(true);
    let practiceController = new PracticeController();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: chapter,
            headerRight: () => (
                <TouchableOpacity style={{marginRight: 10}} onPress={() => refSheet.current.open()}>
                    <Image source={require('../assets/menu.png')} style = {{width: 20, height: 20, tintColor: '#ffffff'}} resizeMode='stretch'/>
                </TouchableOpacity>
            )
        });
        practiceController.getAllExercise(subjectId, chapterId, data => {
            if (data.length > 0) setSelectedExercise(data[0]);
            setExercises(data);
            practiceController.getAllSubmitted(dt => {
                setSubmitted(dt);
                if (dt.includes(data[0]._id)) setSelectedAnswer(data[0].key);
                setLoading(false);
            });
        });
    }, []);

    useEffect(() => {
        if (submited.includes(selectedExercise._id)) setSelectedAnswer(selectedExercise.key);
    }, [selectedIndex])

    const prevExercise = () => {
        if (submited.includes(exercises[selectedIndex - 1]._id)) {
            setSelectedAnswer(exercises[selectedIndex - 1].key);
        } else setSelectedAnswer('');
        setSelectedExercise(exercises[selectedIndex - 1]);
        setSelectedIndex(selectedIndex => selectedIndex - 1);
    }

    const nextExercise = () => {
        if (submited.includes(exercises[selectedIndex + 1]._id)) {
            setSelectedAnswer(exercises[selectedIndex + 1].key);
        } else setSelectedAnswer('');
        setSelectedExercise(exercises[selectedIndex + 1]);
        setSelectedIndex(selectedIndex => selectedIndex + 1);
    }

    const submitExercise = () => {
        if (selectedAnswer != selectedExercise.key) {
            Alert.alert('Kết quả', 'Đáp án bạn chọn chưa chính xác, hãy kiểm tra và thử lại!')
        } else {
            Alert.alert('Kết quả', 'Chúc mừng bạn đã hoàn thành xuất sắc bài tập ' + (selectedIndex + 1));
            practiceController.submitExercise(selectedExercise._id, data => setSubmitted(data));
        }
    }

    const ItemExercise = ({item}) => (
        <TouchableWithoutFeedback onPress = {() => {
            setSelectedAnswer('');
            setSelectedExercise(item);
            setSelectedIndex(exercises.indexOf(item));

        }}>
            <View style = {{borderRadius: 25, backgroundColor: submited.includes(item._id) ? colorConfig.accentColor : '#c4c4c4', width: 50, height: 50, 
            justifyContent: 'center', alignItems: 'center', borderWidth: selectedIndex == exercises.indexOf(item) ? 1 : 0}}>
                <Text style = {{fontSize: 15, fontWeight: '500'}}>{exercises.indexOf(item) + 1}</Text>
            </View>
        </TouchableWithoutFeedback>
    );

    return(
        <View style = {styles.container}>
            <Loading loading = {loading}/>
            <ScrollView>
                <View style = {[styles.myShadow, styles.body]}>
                    <View style = {styles.head}>
                        <Text style = {styles.title}>Bài tập đang chọn: {selectedIndex + 1}</Text>
                        <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                            <TouchableOpacity disabled={selectedIndex == 0} 
                            style = {{opacity: selectedIndex == 0 ? 0.5 : 1}} onPress = {prevExercise}>
                                <Image source={require('../assets/previous.png')} 
                                style = {{width: 16, height: 16, tintColor: colorConfig.accentColor}} resizeMode='stretch'/>
                            </TouchableOpacity>
                            <Text style = {{fontSize: 16, marginHorizontal: 10, color: colorConfig.accentColor}}>{selectedIndex + 1 + '/' + exercises.length}</Text>
                            <TouchableOpacity disabled={selectedIndex== exercises.length - 1} 
                            style = {{opacity: selectedIndex == exercises.length - 1 ? 0.5 : 1}} onPress = {nextExercise}>
                                <Image source={require('../assets/next.png')} 
                                style = {{width: 16, height: 16, tintColor: colorConfig.accentColor}} resizeMode='stretch'/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style = {styles.title}>Nội dung</Text>
                    <View style = {{flexDirection: 'column', marginVertical: 10}}>
                        {selectedExercise.content != '' ? <MathText value={selectedExercise.content} direction="ltr"/> : null}
                        {selectedExercise.photos.map((item, key) => (
                            <Image source = {{uri: apiConfig.images + '/' + item}} key = {key} style = {styles.photo} resizeMode='contain'/>
                        ))
                        }
                        <View style = {{marginVertical: 10}}>
                            <RadioForm>
                            {
                                selectedExercise.answers.map((item, key) => (
                                    <RadioButton labelHorizontal={true} key={key} style={{alignItems: 'center'}}>
                                        <RadioButtonInput obj={item} index={key}
                                        isSelected={selectedAnswer == String.fromCharCode(65 + selectedExercise.answers.indexOf(item))}
                                        onPress={() => setSelectedAnswer(String.fromCharCode(65 + selectedExercise.answers.indexOf(item)))}
                                        borderWidth={1} buttonSize={20} buttonInnerColor = {colorConfig.accentColor} buttonOuterColor = {colorConfig.accentColor}
                                        />
                                        <TouchableOpacity style = {{flexWrap: 'wrap', marginLeft: 10, width: Dimensions.get('screen').width - 80}}
                                        onPress={() => setSelectedAnswer(String.fromCharCode(65 + selectedExercise.answers.indexOf(item)))}>
                                            <MathText value={String.fromCharCode(65 + selectedExercise.answers.indexOf(item)) + '. ' + item} direction="ltr"/>
                                        </TouchableOpacity>
                                    </RadioButton>
                                ))
                            }
                            </RadioForm>
                        </View>
                        <TouchableOpacity style = {{alignSelf: 'flex-end'}} onPress = {() => setSelectedAnswer('')}>
                            <Text style = {{fontWeight: '600', color: colorConfig.accentColor}}>Xoá lựa chọn</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style = {[styles.buttonSubmit, styles.myShadow, {opacity: selectedAnswer == '' ? 0.5 : 1}]} 
                    disabled = {selectedAnswer == ''} onPress = {submitExercise}>
                        <Text style = {{color: '#fff', fontWeight: '600'}}>Xem đáp án</Text>
                    </TouchableOpacity>
                    {!submited.includes(selectedExercise._id) ? null :
                    <View>
                        <Text style={styles.title}>Đáp án chi tiết</Text>
                        <Image source = {{uri: apiConfig.images + '/' + selectedExercise.detail_key}} style = {styles.photo} resizeMode='contain'/>
                    </View>
                    }
                </View>
            </ScrollView>
            <RBSheet ref = {refSheet} closeOnDragDown={true} closeOnPressMask={true} height = {320} dragFromTopOnly = {true} customStyles = {{
                container: {
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                }
            }}>
                <FlatGrid data = {exercises} itemDimension = {50} renderItem = {ItemExercise}/>
            </RBSheet>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    head: {
        flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20
    },
    body: {
        backgroundColor: '#fff', borderRadius: 15, padding: 10, margin: 10
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
    title: {
        fontSize: 15, fontWeight: '600'
    },
    buttonSubmit: {
        alignSelf: 'center', justifyContent: 'center', alignItems: 'center',
        backgroundColor: colorConfig.accentColor,
        paddingVertical: 10, paddingHorizontal: 20,
        height: 40, borderRadius: 20, marginVertical: 10
    },
    photo: {
        width: Dimensions.get('screen').width - 40,
        height: 160
    }
})