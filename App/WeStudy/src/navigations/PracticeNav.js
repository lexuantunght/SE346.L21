import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PracticeScreen } from '../views/PracticeScreen';
import { ChapterView } from '../views/ChapterView';
import { ExerciseView } from '../views/ExerciseScreen';
const myColor = require('../configs/color.config');

const Stacks = createStackNavigator();

export function PracticeNav() {
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
            <Stacks.Screen name = 'Practice' component = { PracticeScreen } options = {{title: 'Luyện tập'}}/>
            <Stacks.Screen name = 'Chapter' component = { ChapterView } options = {{title: 'Chương'}}/>
            <Stacks.Screen name = 'Exercise' component = { ExerciseView } options = {{title: 'Bài tập'}}/>
        </Stacks.Navigator>
    )
}