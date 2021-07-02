import 'react-native-gesture-handler';
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Animated, Image } from 'react-native';
const myColor = require('./src/configs/color.config');
import { LoginScreen } from './src/views/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeNav } from './src/navigations/HomeNav';
import { PracticeNav } from './src/navigations/PracticeNav';
import { TestNav } from './src/navigations/TestNav';
import { ChatbotNav } from './src/navigations/ChatbotNav';
import { ProfileNav } from './src/navigations/ProfileNav';
import { UserController } from './src/controllers/UserController';
import { WaitingScreen } from './src/views/WaitingScreen';

const BottomTabs = createBottomTabNavigator();
function MainApp({onLogout}) {
  return(
    <NavigationContainer>
      <BottomTabs.Navigator lazy = {false} tabBarOptions = {{
        activeTintColor: myColor.accentColor,
        inactiveTintColor: 'gray',
        labelStyle: {
          fontFamily: 'Nunito'
        },
        keyboardHidesTabBar: (Platform.OS == "ios" ? false : true)
      }}>
        <BottomTabs.Screen name = 'Home' component = { HomeNav } options = {{
          tabBarIcon: ({focused}) => <Image style = {focused ? styles.tabbarIcon : styles.tabBarIconInactive} 
            source = {focused ? require('./src/assets/home-fill.png') : require('./src/assets/home.png')}/>,
          tabBarLabel: 'Trang chủ'
        }}/>
        <BottomTabs.Screen name = 'Practice' component = { PracticeNav } options = {{
          tabBarIcon: ({focused}) => <Image style = {focused ? styles.tabbarIcon : styles.tabBarIconInactive} 
            source = {focused ? require('./src/assets/practice-fill.png') : require('./src/assets/practice.png')}/>,
          tabBarLabel: 'Luyện tập',
        }}/>
        <BottomTabs.Screen name = 'Test' component = { TestNav } options = {{
          tabBarIcon: ({focused}) => <Image style = {focused ? styles.tabbarIcon : styles.tabBarIconInactive} 
            source = {focused ? require('./src/assets/test-fill.png') : require('./src/assets/test.png')}/>,
          tabBarLabel: 'Thi thử',
        }}/>
        <BottomTabs.Screen name = 'Search' component = { ChatbotNav } options = {{
          tabBarIcon: ({focused}) => <Image style = {focused ? styles.tabbarIcon : styles.tabBarIconInactive} 
            source = {focused ? require('./src/assets/paper-fill.png') : require('./src/assets/paper.png')}/>,
          tabBarLabel: 'Tra cứu',
        }}/>
        <BottomTabs.Screen name = 'Profile' options = {{
          tabBarIcon: ({focused}) => <Image style = {focused ? styles.tabbarIcon : styles.tabBarIconInactive} 
            source = {focused ? require('./src/assets/user-fill.png') : require('./src/assets/user.png')}/>,
          tabBarLabel: 'Thông tin',
        }}>
          {() => <ProfileNav onLogout = {onLogout}/>}
        </BottomTabs.Screen>
      </BottomTabs.Navigator>
    </NavigationContainer>
  );
}

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [autoLoggingIn, setAutoLoggingIn] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    let userController = new UserController();
    userController.getCurrent(() => setAutoLoggingIn(false), data => {
      setAuthenticated(true);
    });
  }, []);
  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 800,
        useNativeDriver: true
      },
    ).start();
  }, [authenticated]);

  return(
    <Animated.View style = {[styles.container, {opacity: autoLoggingIn ? 1 : fadeAnim}]}>
      {
        autoLoggingIn ? <WaitingScreen/> :
        (authenticated ? <MainApp onLogout = {() => {
          fadeAnim.setValue(0);
          setAuthenticated(false);
        }}/> : <LoginScreen onLoginSuccess = {() => {
          fadeAnim.setValue(0);
          setAuthenticated(true);
        }}/>)
      }
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabbarIcon: {
    width: 22, height: 22, resizeMode: 'stretch',
    tintColor: myColor.accentColor
  },
  tabBarIconInactive: {
    width: 22, height: 22, resizeMode: 'stretch',
    tintColor: 'gray'
  }
});

export default App;