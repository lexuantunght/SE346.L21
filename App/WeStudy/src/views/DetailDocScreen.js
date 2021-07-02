import React, { useEffect, useState } from 'react';
import {
    View, Text,
    StyleSheet
} from 'react-native';
import Pdf from 'react-native-pdf';
import apiConfig from '../configs/api.config';
import { ReferenceController } from '../controllers/ReferenceController';

export function DetailDocScreen({navigation, route}) {
    const { docId } = route.params;
    const [doc, setDoc] = useState({});
    let referenceController = new ReferenceController();
    useEffect(() => {
        referenceController.getDocById(docId, data => setDoc(data));
    }, []);
    return(
        <View style = {styles.container}>
            <Pdf source = {{uri: apiConfig.docs + '/' + doc.file}}
            style = {styles.doc}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    doc: {
        flex: 1, marginTop: 3
    }
})