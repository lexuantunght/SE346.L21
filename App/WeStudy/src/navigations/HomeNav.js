import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../views/HomeScreen';
import { AllTestScreen } from '../views/AllTestScreen';
import { DetailTestScreen } from '../views/DetailTestScreen';
import { AllDocScreen } from '../views/AllDocScreen';
import { AllExperScreen } from '../views/AllExperScreen';
import { DetailExperScreen } from '../views/DetailExperScreen';
import { DetailDocScreen } from '../views/DetailDocScreen';
const myColor = require('../configs/color.config');

const Stacks = createStackNavigator();

export function HomeNav() {
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
            <Stacks.Screen name = 'Home' component = { HomeScreen } options = {{title: 'Trang chủ'}}/>
            <Stacks.Screen name = 'AllTest' component = { AllTestScreen } options = {{title: 'Đề thi'}}/>
            <Stacks.Screen name = 'AllDoc' component = { AllDocScreen } options = {{title: 'Tài liệu'}}/>
            <Stacks.Screen name = 'AllExper' component = { AllExperScreen } options = {{title: 'Kinh nghiệm'}}/>
            <Stacks.Screen name = 'DetailTest' component = { DetailTestScreen } options = {{title: 'Tham khảo'}}/>
            <Stacks.Screen name = 'DetailDoc' component = { DetailDocScreen } options = {{title: 'Tham khảo'}}/>
            <Stacks.Screen name = 'DetailExper' component = { DetailExperScreen } options = {{title: 'Bài viết'}}/>
        </Stacks.Navigator>
    )
}