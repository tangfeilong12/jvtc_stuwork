/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet, Text, View,
    TouchableOpacity,
    StatusBar, ScrollView,
    Linking
} from 'react-native';
import { WorkInfo } from "../api/api";
import AsyncStorage from "@react-native-community/async-storage";
import Menu from '../components/Menu';
import SideMenu from 'react-native-side-menu'
import Header from '../components/Header';
import IoniconsFeather from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import { getThemeConfig } from '../store';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 24,
    },
    title: {
        color: "#222c69",
        fontSize: 16,
        textShadowColor: "#888",
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
        color: '#222c69',
        fontWeight: '600',
        marginTop: 4
    }
});

const actions = [
    { path: 'Curriculum', text: '课表', icon: 'github' },
    { path: 'WebViewShow', text: '毕业生', icon: 'droplet', params: { title: '九职-毕业生', uri: "http:/https://seniors.netlify.com/" } },
    { path: 'AboutDev', text: '反馈帮助', icon: 'alert-octagon' },
    { path: 'Score', text: '成绩查询', icon: 'sidebar' },
    { path: 'About', text: '校园卡查看', icon: 'credit-card' },
];

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loginName: ""
        }
        this.iconColor = '#222c69';
    }

    async componentWillMount() {
        //    StatusBar.setBarStyle('dark-content');
    }

    _onPressLogOut = async () => {
        await AsyncStorage.setItem('logintime', '0');
        this.props.navigation.navigate('Login', { logout: true });
    }
    _onPressGoPath = async (path, params = {}) => {
        path && this.props.navigation.navigate(path, params);
    }
    changeTheme = () => {
        const { theme } = this.props;
        StatusBar.setBarStyle(theme.bar_style);
    }
    render() {
        this.changeTheme();
        return (
            <View style={styles.container}>
                <Header
                    left={
                        <TouchableOpacity onPress={this.props.onOpen}>
                            <IoniconsFeather name='user' size={26} color={this.iconColor} />
                        </TouchableOpacity>
                    }
                    center={
                        <Text style={styles.title}>应用中心</Text>
                    }
                    right={
                        <TouchableOpacity onPress={this._onPressLogOut}>
                            <IoniconsFeather name='log-out' size={26} color={this.iconColor} />
                        </TouchableOpacity>
                    }
                />
                <ScrollView style={styles.action}>

                    <View style={styles.actionContainer}>

                        {
                            actions.map(item => (
                                <TouchableOpacity style={styles.p_item} key={item.text} onPress={() => { this._onPressGoPath(item.path, item.params) }}>
                                    <View style={styles.item}>
                                        <IoniconsFeather name={item.icon || 'meh'} size={26} color={this.iconColor} />
                                        <Text style={styles.text}>{item.text}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                        {/* <TouchableOpacity style={styles.p_item} onPress={() => { this.props.navigation.navigate('Score'); }}>
                            <View style={styles.item}>
                                <IoniconsFeather name='maximize' size={26} color={this.iconColor} />
                                <Text style={styles.text}>成绩查询</Text>
                            </View>
                        </TouchableOpacity> */}

                        <TouchableOpacity style={styles.p_item} onPress={() => { Linking.openURL('https://fee.icbc.com.cn/servlet/H5OnlinePaymentServlet?f=ICBCqr&t=2&p=33&x=0&z=&i=UEoxMjAwMTIwMkIwMDAwMTgyOTc=&n=UEoxMjAwMTIwMkIwMDAwMTgyOTc=&l=') }}>
                            <View style={styles.item}>
                                <IoniconsFeather name='stop-circle' size={26} color={this.iconColor} />
                                <Text style={styles.text}>饭卡充值</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.p_item} onPress={() => { Linking.openURL('http://sso.jvtc.jx.cn/cas/login') }}>
                            <View style={styles.item}>
                                <IoniconsFeather name='frown' size={26} color={this.iconColor} />
                                <Text style={styles.text}>校园设备报修</Text>
                            </View>
                        </TouchableOpacity>


                    </View>

                </ScrollView>
            </View>
        );
    }
}


class HomeS extends Component {
    static navigationOptions = {
        title: '首页',
    };
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            WorkInfo: { loginName: "", absence: "0", truant: "0", study: "0", Illegal: "0", Failing: "0", grade: "0", score: "0", flunk: "0", dorm: "" }
        }
    }
    componentWillMount() {
        this.handleGetData();
    }
    onMenuItemSelected = (isOpen = false) =>
        this.setState({
            isOpen,
        });

    handleGetData = async () => {
        try {
            const { data } = await WorkInfo();
            const loginName = await AsyncStorage.getItem('loginName');
            this.setState({
                WorkInfo: { loginName, ...data }
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const menu = <Menu data={this.state.WorkInfo} />;
        return (
            <SideMenu menu={menu} isOpen={this.state.isOpen}>
                <Home navigation={this.props.navigation} theme={this.props.theme} onOpen={() => { this.onMenuItemSelected(true) }} />
            </SideMenu>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        theme: getThemeConfig('home', state.theme)
    }
}

export default connect(mapStateToProps)(HomeS);
