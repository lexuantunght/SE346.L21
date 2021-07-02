import React, { useState } from 'react';
import {
    View, Text, StyleSheet, FlatList, TextInput,
    TouchableOpacity, Image
} from 'react-native';
import colorConfig from '../configs/color.config';

const RankItem = ({item, id}) => (
    <View style = {{flexDirection: 'row', marginVertical: 10}}>
        <Text style = {{flex: 1}}>{id}</Text>
        <Text style = {{flex: 5, marginLeft: 5}}>{item.name}</Text>
        <Text style = {{flex: 1, textAlign: 'center', marginLeft: 5}}>{item.mark}</Text>
    </View>
);

export function RankingTestScreen({navigation, route}) {
    const { ranking } = route.params;
    const [data, setData] = useState(ranking);
    const filterByName = (keyword) => {
        let temp = [];
        for (let i = 0; i < ranking.length; i++) {
            if (ranking[i].name.toLowerCase().startsWith(keyword.toLowerCase())) {
                temp.push(ranking[i]);
            }
        }
        setData(temp);
    }

    return(
        <View style = {styles.container}>
            <View style = {[styles.ranking, styles.myShadow]}>
                <View style = {styles.chatTool}>
                    <TextInput style = {styles.input} placeholder='Tìm kiếm...' autoCorrect = {false}
                    onChangeText={text => filterByName(text)}/>
                    <TouchableOpacity>
                        <Image source = {require('../assets/search.png')} style = {styles.icon}/>
                    </TouchableOpacity>
                </View>
                <View style = {{flexDirection: 'row'}}>
                    <Text style = {{flex: 1, fontWeight: '600'}}>STT</Text>
                    <Text style = {{flex: 5, fontWeight: '600', marginLeft: 5}}>Họ tên</Text>
                    <Text style = {{flex: 1, fontWeight: '600', marginLeft: 5, textAlign: 'center'}}>Điểm</Text>
                </View>
                <View style = {{height: 1, backgroundColor: '#000', marginVertical: 10}}/>
                <FlatList data = {data.sort((a, b) => a.mark > b.mark ? -1 : 1)}
                keyExtractor = {item => ranking.indexOf(item) + ''}
                renderItem = {({item}) => <RankItem item = {item} id = {ranking.indexOf(item) + 1}/>}
                maxToRenderPerBatch={50}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    ranking: {
        flex: 1,
        padding: 10, backgroundColor: '#fff', borderRadius: 15, margin: 10, flexDirection: 'column'
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
    input: {
        fontSize: 15, flex: 1, borderWidth: 0.5, paddingHorizontal: 10, borderColor: '#ddd', borderRadius: 50,
        height: 36
    },
    chatTool: {
        height: 48, marginBottom: 20,
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#fff'
    },
    icon: {
        height: 22, width: 22, resizeMode: 'stretch', tintColor: colorConfig.accentColor,
        marginHorizontal: 10
    }
});