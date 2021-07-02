import React, { useEffect, useState } from 'react';
import {
    View, Text, SafeAreaView, Image,
    StyleSheet, FlatList, Dimensions
} from 'react-native';
import colorConfig from '../configs/color.config';
import RadioForm, { RadioButton, RadioButtonInput } from 'react-native-simple-radio-button';
import { TestController } from '../controllers/TestController';
import apiConfig from '../configs/api.config';
import { MathText } from 'react-native-math-view';
import { Loading } from '../components/Loading';

const ItemTest = ({item, listCheck}) => {
    return(
        <View style = {{flexDirection: 'column', margin: 10}}>
            <Text style = {{fontWeight: '600', marginVertical: 5}}>Câu {item.id}:</Text>
            <MathText value={item.content} direction="ltr"/>
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
                            isSelected = {listCheck[parseInt(item.id) - 1].value == String.fromCharCode(65 + key)}
                            borderWidth={1} buttonSize={20} buttonInnerColor = {colorConfig.accentColor} buttonOuterColor = {colorConfig.accentColor}
                            onPress={() => {}}/>
                            <View style = {{flexWrap: 'wrap', marginLeft: 10, width: Dimensions.get('screen').width - 80}}>
                                <MathText value={String.fromCharCode(65 + key) + '. ' + it} direction="ltr"/>
                            </View>
                        </RadioButton>
                    ))
                }
                </RadioForm>
            </View>
            <Text style = {{fontWeight: '500', color: (item.key == listCheck[parseInt(item.id) - 1].value ? colorConfig.accentColor : 'red')}}>{'Đáp án đúng: ' + item.key}</Text>
        </View>
    );
}

export function ReviewTestScreen({navigation, route}) {
    const { testId } = route.params;
    const { subjectName } = route.params;
    const [test, setTest] = useState(null);
    const [doneTest, setDoneTest] = useState(null);
    const [loading, setLoading] = useState(true);
    let testController = new TestController();
    
    useEffect(() => {
        testController.getTestById(testId, data => {
            setTest(data);
            testController.getSubmittedById(testId, dt => {
                setDoneTest(dt);
                setLoading(false);
            });
        });
    }, []);

    return(
        <SafeAreaView style = {styles.container}>
            <Loading loading = {loading}/>
            <View style = {{flex: 1}}>
                {loading ? null :
                <FlatList data = {test ? test.questions : []} keyExtractor = {item => item.id} 
                renderItem = {({item}) => <ItemTest listCheck = {doneTest.answers} item = {item}/>
                }
                ListHeaderComponent = {() =>
                    <View style = {{flexDirection: 'column', margin: 10}}>
                        <Text style = {{fontWeight: '600', marginBottom: 5}}>{'Môn ' + subjectName + ' - Mã đề thi #' + (test ? test.code : '')}</Text>
                        <Text style = {{fontWeight: '600', marginBottom: 5}}>{'Thời gian: ' + (test ? test.time_doing : 0 )+ ' phút'}</Text>
                        <Text style = {{fontWeight: '600'}}>{'Số điểm: ' + (doneTest ? doneTest.mark : 0 )}</Text>
                        <Text style = {{fontWeight: '600', textAlign: 'center', fontSize: 17, marginTop: 10}}>Đề thi</Text>
                    </View>}
                />}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
