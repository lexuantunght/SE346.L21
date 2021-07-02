import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchScreen } from '../views/SearchScreen';
const myColor = require('../configs/color.config');

const Stacks = createStackNavigator();

export function ChatbotNav() {
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
            <Stacks.Screen name = 'Search' component = { SearchScreen } options = {{title: 'Tra cứu thông tin'}}/>
        </Stacks.Navigator>
    )
}