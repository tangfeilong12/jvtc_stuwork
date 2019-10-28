/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet, Text, View,
    TouchableOpacity,
    StatusBar, ScrollView
} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import Header from '../components/Header';
import IoniconsFeather from 'react-native-vector-icons/Feather';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 24,
    },
    title: {
        color: "#fff",
        fontSize: 16,
        textShadowColor: "#ccc",
        textShadowRadius: 4,
        textShadowOffset: { width: 1, height: 1 },
        fontWeight: '800'
    },
    action: {
        width: '100%'
    },
    actionContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    },
    p_item: { width: '40%', margin: 10, },
    item: {
        width: '100%',
        padding: 10,
        minHeight: 68,
        backgroundColor: "#fff",
        borderRadius: 6,
        borderColor: '#f0f0f0',
        borderWidth: StyleSheet.hairlineWidth,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        color: '#222c69'
    }
});

const actions = [
    { path: 'Curriculum', text: '课表', icon: 'github' },
    { path: 'WebViewShow', text: '校园设备报修', icon: 'frown', params: { title: '九职报修系统', uri: "http://sso.jvtc.jx.cn/cas/login" } },
    { path: 'AboutDev', text: '关于开发', icon: 'octagon' },
];

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginName: ""
        }
    }

    async componentWillMount() {
        StatusBar.setBarStyle('light-content');
    }
    _onPressLogOut = async () => {
        await AsyncStorage.setItem('logintime', '0');
        this.props.navigation.navigate('Login');
    }
    _onPressGoPath = async (path, params = {}) => {
        path && this.props.navigation.navigate(path, params);
    }
    render() {
        return (
            <View style={styles.container}>
                <Header
                    left={
                        <TouchableOpacity onPress={this.props.onOpen}>
                            <IoniconsFeather name='user' size={26} color='#fff' />
                        </TouchableOpacity>
                    }
                    center={
                        <Text style={styles.title}>应用中心</Text>
                    }
                    right={
                        <TouchableOpacity onPress={this._onPressLogOut}>
                            <IoniconsFeather name='log-out' size={26} color='#fff' />
                        </TouchableOpacity>
                    }
                />
                <ScrollView style={styles.action}>

                    <View style={styles.actionContainer}>

                        {
                            actions.map(item => (
                                <TouchableOpacity style={styles.p_item} key={item.text} onPress={() => { this._onPressGoPath(item.path, item.params) }}>
                                    <View style={styles.item}>
                                        <IoniconsFeather name={item.icon || 'meh'} size={26} color='#222c69' />
                                        <Text style={styles.text}>{item.text}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }

                    </View>

                </ScrollView>
            </View>
        );
    }
}

export default Home;