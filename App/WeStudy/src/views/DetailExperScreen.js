import React, { useEffect, useRef, useState } from 'react';
import {
    View, Animated,
    StyleSheet, Dimensions,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { ReferenceController } from '../controllers/ReferenceController';
const myColor = require('../configs/color.config');
import { Loading } from '../components/Loading';

export function DetailExperScreen({navigation, route}) {
    const { experId } = route.params;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    let referenceController = new ReferenceController();
    useEffect(() => {
        referenceController.getPostById(experId, data => {
            setPost(data);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            },).start();
            setLoading(false);
        });
    }, []);
    return(
        <View style = {styles.container}>
            <Loading loading = {loading}/>
            <Animated.View style = {{flex: 1, opacity: fadeAnim}}>
                <WebView source = {{html: post.content}}/>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    test: {
        flex: 1, marginTop: 3
    },
    title: {
        fontSize: 24, fontWeight: '700', fontFamily: 'Nunito',
        margin: 10
    },
    author: {
        fontFamily: 'Nunito', fontSize: 17, fontWeight: '700', color: myColor.accentColor,
        marginVertical: 5
    },
    exper: {
        width: Dimensions.get('screen').width - 20,
        height: (Dimensions.get('screen').width) / 1.8,
        resizeMode: 'cover', alignSelf: 'center', borderRadius: 15,
        marginVertical: 10
    },
})