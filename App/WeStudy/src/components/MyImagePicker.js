import React, { useState } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
const myColor = require('../configs/color.config');
import {
    Text, View, Image, TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';

export function MyImagePicker({onChangeImage, width, height, cropping, defaultImage}) {
    const [avatar, setAvatar] = useState(defaultImage);
    const openImage = () => {
        ImagePicker.openPicker({
            width: width,
            height: height,
            cropping: cropping,
            multiple: false
        }).then(images => {
            setAvatar(images.sourceURL);
            onChangeImage(images);
        }).catch(err => console.log(err));
    }
    return(
        <View style = {styles.container}>
            <Image source = {!avatar ? require('../assets/avatar.png') : {uri: avatar}} style = {styles.image}/>
            <TouchableOpacity style = {styles.button} onPress = {openImage}>
                <Text style = {styles.inside}>Chọn ảnh</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        marginVertical: 10,
    },
    image: {
        width: Dimensions.get('screen').width / 4,
        height: Dimensions.get('screen').width / 4,
        resizeMode: 'cover',
        borderRadius: Dimensions.get('screen').width / 8
    },
    button: {
        marginTop: 5
    },
    inside: {
        fontFamily: 'Nunito', fontSize: 15, fontWeight: '800', textAlign: 'center', color: myColor.accentColor
    }
});
