import {
    createSwitchNavigator,
    createAppContainer,
    createBottomTabNavigator,
    createStackNavigator
} from "react-navigation";
import HomeScreen from './view/Home';
import LoginScreen from './view/Login';
import AboutScreen from './view/About';
import StuActiveScreen from './view/StuActive';
import StuEnlightenRoomScore from './view/StuEnlightenRoomScore';
import StuWork from './view/StuWork';
import CurriculumScreen from './view/Curriculum';
import WebViewShow from './view/WebViewShow';
import OpacIndex from './view/opac/Index';
import OpacLogin from './view/opac/Login';
import OpacSearch from './view/opac/Search';

import Ionicons from 'react-native-vector-icons/AntDesign';

import React from "react";
import AboutDev from "./view/AboutDev";

const AppNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeScreen
        },
        StuWork: {
            screen: StuWork
        },
        OpacIndex: {
            screen: OpacIndex
        }
        // StuActive: {
        //     screen: StuActiveScreen
        // },
        // StuEnlightenRoomScore: {
        //     screen: StuEnlightenRoomScore
        // },
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
                } else if (routeName === 'StuWork') {
                    iconName = `solution1`;
                } else if (routeName === 'StuEnlightenRoomScore') {
                    iconName = `calendar`;
                } else if (routeName === 'OpacIndex') {
                    iconName = `book`;
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
            style: {
                borderTopWidth: 0,
                height: 54,
                paddingBottom: 2,
            }
        },
    }
);

const StackNavigator = createStackNavigator({
    Curriculum: {
        screen: CurriculumScreen
    },
    WebViewShow: {
        screen: WebViewShow
    },
    AboutDev: {
        screen: AboutDev
    },
    StuActive: {
        screen: StuActiveScreen
    },
    StuEnlightenRoomScore: {
        screen: StuEnlightenRoomScore
    },
    OpacLogin: {
        screen: OpacLogin
    },
    OpacSearch: {
        screen: OpacSearch
    },
    About: {
        screen: AboutScreen
    },
    AppNavigator
}, {
    initialRouteName: "AppNavigator",
    headerMode: "none"
});


const SwitchNavigator = createSwitchNavigator({
    Login: {
        screen: LoginScreen
    },
    StackNavigator
})
export default createAppContainer(SwitchNavigator);
