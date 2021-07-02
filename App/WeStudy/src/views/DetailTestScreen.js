import React, { useEffect, useState } from 'react';
import {
    View, Text,
    StyleSheet
} from 'react-native';
import Pdf from 'react-native-pdf';
import apiConfig from '../configs/api.config';
import { ReferenceController } from '../controllers/ReferenceController';

export function DetailTestScreen({navigation, route}) {
    const { testId } = route.params;
    const [test, setTest] = useState({});
    let referenceController = new ReferenceController();
    useEffect(() => {
        referenceController.getTestById(testId, data => setTest(data));
    }, []);
    return(
        <View style = {styles.container}>
            <Pdf source = {{uri: apiConfig.docs + '/' + test.file}}
            style = {styles.test}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    test: {
        flex: 1, marginTop: 3
    }
})