import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen } from '../views/ProfileScreen';
import { ChangePasswordScreen } from '../views/ChangePasswordScreen';
import { ChangeProfileScreen } from '../views/ChangeProfileScreen';
const myColor = require('../configs/color.config');

const Stacks = createStackNavigator();

export function ProfileNav({onLogout}) {
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
            <Stacks.Screen name = 'Profile' options = {{title: 'Thông tin'}}>
                {({navigation}) => <ProfileScreen navigation = {navigation} onLogout = {onLogout}/>}
            </Stacks.Screen>
            <Stacks.Screen name = 'ChangePassword' component = {ChangePasswordScreen} options = {{title: 'Đổi mật khẩu'}}/>
            <Stacks.Screen name = 'ChangeProfile' component = {ChangeProfileScreen} options = {{title: 'Đổi thông tin'}}/>
        </Stacks.Navigator>
    )
}