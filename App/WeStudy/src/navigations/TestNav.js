import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TestScreen } from '../views/TestScreen';
import { RankingTestScreen } from '../views/RankingTestScreen';
import { ReviewTestScreen } from '../views/ReviewTestScreen';
const myColor = require('../configs/color.config');

const Stacks = createStackNavigator();

export function TestNav() {
    return(
        <Stacks.Navigator screenOptions = {{
            headerStyle: {
                backgroundColor: myColor.accentColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontFamily: 'Nunito'
            },
            headerBackTitleStyle: {
                fontFamily: 'Nunito'
            }
        }}>
            <Stacks.Screen name = 'Test' component = { TestScreen } options = {{title: 'Thi thử'}}/>
            <Stacks.Screen name = 'RankingTest' component = { RankingTestScreen } options = {{ title: 'Bảng xếp hạng' }}/>
            <Stacks.Screen name = 'ReviewTest' component = { ReviewTestScreen } options = {{title: 'Xem bài thi'}}/>
        </Stacks.Navigator>
    )
}