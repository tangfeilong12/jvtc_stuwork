import {
    createSwitchNavigator,
    createAppContainer,
    createBottomTabNavigator
} from "react-navigation";
import HomeScreen from './view/Home';
import LoginScreen from './view/Login';
import AboutScreen from './view/About';
import StuActiveScreen from './view/StuActive';
import StuEnlightenRoomScore from './view/StuEnlightenRoomScore';

import Ionicons from 'react-native-vector-icons/AntDesign';

import React from "react";

const AppNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeScreen
        },
        StuActive: {
            screen: StuActiveScreen
        },
        StuEnlightenRoomScore: {
            screen: StuEnlightenRoomScore
        },
        About: {
            screen: AboutScreen
        }
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => { // tab图标
                const { routeName } = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `home`;
                    // Sometimes we want to add badges to some icons.
                    // You can check the implementation below.
                } else if (routeName === 'Settings') {
                    iconName = `ios-options`;
                } else if (routeName === 'About') {
                    iconName = `user`;
                } else if (routeName === 'StuActive') {
                    iconName = `minussquareo`;
                } else if (routeName === 'StuEnlightenRoomScore') {
                    iconName = `calendar`;
                }

                // You can return any component that you like here!
                return <IconComponent name={iconName} size={26} color={tintColor} />;
            },
        }),
        backBehavior: "none", // 关闭返回栈 返回不会在历史里面找
        //样式
        tabBarOptions: {
            activeTintColor: '#222c69',
            inactiveTintColor: '#b8bbce',
            // activeBackgroundColor:'#f9f9f9',
            style:{
                borderTopWidth: 0,
                height: 54,
                paddingBottom: 2
            }
        },
    }
);


export default createAppContainer(createSwitchNavigator({
    Login: {
        screen: LoginScreen
    },
    AppNavigator
}));
