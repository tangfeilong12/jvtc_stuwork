/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, ImageBackground, Dimensions, Linking, Image, Text, View, Alert, TextInput, PixelRatio, TouchableHighlight, StatusBar } from 'react-native';
import { login, announcement } from "../api/api";
import AsyncStorage from "@react-native-community/async-storage";
import { BoxShadow } from 'react-native-shadow';
const { width, height } = Dimensions.get('window');
import CodePush from "react-native-code-push"; // 引入code-push
import Toast from 'react-native-root-toast';
import { isAndroidV } from '../utils/Update';
import { connect } from 'react-redux';
import { getThemeConfig } from '../store';

const shadowOpt = {
    width: width - 60,
    height: 50,
    // color: "#eee",
    color: "#282828",
    border: 4,
    radius: 25,
    opacity: 0.7,
    x: 0,
    y: 14,
    // style: { marginVertical: 5 }
};
class Login extends Component {
    static navigationOptions = {
        title: 'Login',
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            loginName: '',
            loginPass: '',
            btnStat: 0,
            announcement: '',
        };
        this.placeholderTextColor = '#d0d0ff';

        this.handleClick = this.handleClick.bind(this);
        this.handleLoginNameChange = this.handleLoginNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }
    //如果有更新的提示
    syncImmediate() {
        CodePush.sync({
            //安装模式
            //ON_NEXT_RESUME 下次恢复到前台时
            //ON_NEXT_RESTART 下一次重启时
            //IMMEDIATE 马上更新
            installMode: CodePush.InstallMode.IMMEDIATE,
            //对话框
            updateDialog: {
                //是否显示更新描述
                appendReleaseDescription: true,
                //更新描述的前缀。 默认为"Description"
                descriptionPrefix: "更新内容：",
                //强制更新按钮文字，默认为continue
                mandatoryContinueButtonLabel: "立即更新",
                //强制更新时的信息. 默认为"An update is available that must be installed."
                mandatoryUpdateMessage: "必须更新后才能使用",
                //非强制更新时，按钮文字,默认为"ignore"
                optionalIgnoreButtonLabel: '稍后',
                //非强制更新时，确认按钮文字. 默认为"Install"
                optionalInstallButtonLabel: '后台更新',
                //非强制更新时，检查到更新的消息文本
                optionalUpdateMessage: '有新版本了，是否更新？',
                //Alert窗口的标题
                title: '更新提示'
            },
        } ,
        );
    }

    async updateApp(v) {
        try {
            const { flag, link, msg } = await isAndroidV(v, 'android');
            if (flag) {
                Alert.alert('有版本更新', msg || '是否更新', [
                    { text: '确认', onPress: () => { Linking.openURL(link); } },
                    { text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                ]);
            }
        } catch (error) {
        }
    }
    async getAnnouncement() {
        const res = await announcement();
        if (res.message) {
            this.setState({
                announcement: res.message
            });
        }
    }
    async componentWillMount() {
        this.updateApp('1.0.4');
        this.getAnnouncement();
        CodePush.disallowRestart();//禁止重启
        this.syncImmediate(); //开始检查更新
        //    这里处理 打开后 自动登陆
        // this.props.navigation.navigate('Home');

        const loginName = await AsyncStorage.getItem("loginName");
        const loginPass = await AsyncStorage.getItem("loginPass");
        const logintime = await AsyncStorage.getItem("logintime");

        this.setState({
            loginName,
            loginPass
        });

        const _autoLogin = await AsyncStorage.getItem('autoLogin');

        if (_autoLogin != 'true') {
            return;
        }

        if ((parseInt(logintime) || 0) + 1 * 60 * 60 * 1000 > Date.now()) {
            this.props.navigation.navigate('Home');
        } else {
            if (!this.props.navigation.state.params || !this.props.navigation.state.params.logout) {
                this.autoLogin();
            }
        }
    }


    async componentDidMount() {

        CodePush.allowRestart();//在加载完了，允许重启

        StatusBar.setTranslucent(true);
        // StatusBar.setBackgroundColor("red");
        StatusBar.setBackgroundColor('transparent');

    }

    autoLogin = () => {
        const { loginName, loginPass } = this.state;

        if (!/^[0-9]{4,}$/.test(loginName)) {
            return;
        } else if (!loginPass.length) {
            return;
        }
        this.handleClick();
    }
    changeTheme = () => {
        const { theme } = this.props;

        styles.inputWarp = {
            ...styles.inputWarp,
            backgroundColor: theme.three_color,
        };
        styles.inputWarp_info = {
            ...styles.inputWarp_info,
            color: theme.nine_color,
        }
        styles.input = {
            ...styles.input,
            color: theme.ten_color,
        }
        styles.btn = {
            ...styles.btn,
            backgroundColor: theme.five_color,
        }
        styles.btn_mini = {
            ...styles.btn_mini,
            backgroundColor: theme.ten_color,
        }
        styles.btnDs = {
            ...styles.btnDs,
            backgroundColor: theme.six_color,
        }
        styles.btn_text = {
            ...styles.btn_text,
            color: theme.ten1_color,
        }
        this.placeholderTextColor = theme.seven_color;
        shadowOpt.color = theme.four_color;
        StatusBar.setBarStyle(theme.bar_style);
    }
    render() {
        const { theme } = this.props;

        const { handleClick, handleLoginNameChange, handleQuery, handlePasswordChange } = this;
        const { loginName, loginPass, btnStat, announcement } = this.state;
        this.changeTheme();
        return (
            <View style={[styles.container, { backgroundColor: theme.one_color }]}>

                <ImageBackground resizeMode='contain' source={require('../assets/img/h_bg.png')} style={styles.h_style} />
                <ImageBackground resizeMode='contain' source={require('../assets/img/f_bg.png')} style={styles.f_style} />

                <View style={styles.login}>
                    <View style={styles.title}>
                        <Text style={[styles.title_bg, { color: theme.three_color }]}>LOGIN</Text>
                        <Text style={[styles.title_text, { color: theme.two_color }]}>九江职业技术学院-学工网</Text>
                    </View>
                    <View style={styles.inputWarp}>
                        <Text style={styles.inputWarp_info}>学工账号</Text>
                        <TextInput style={styles.input} placeholder={"请输入学工网账号"} placeholderTextColor={this.placeholderTextColor} value={loginName}
                            keyboardType="number-pad" onChangeText={handleLoginNameChange} />
                    </View>
                    <View style={styles.inputWarp}>
                        <Text style={styles.inputWarp_info}>学工密码</Text>
                        <TextInput style={styles.input} secureTextEntry={true} placeholder={"请输入学工网密码"} placeholderTextColor={this.placeholderTextColor} value={loginPass}
                            onChangeText={handlePasswordChange} />
                    </View>
                    <View style={styles.inputWarp_btn}>
                        <BoxShadow setting={shadowOpt}>
                            <TouchableHighlight onPress={handleClick} style={btnStat === 1 ? [styles.btn, styles.btnDs] : styles.btn}
                                underlayColor="#fa4169aa">
                                <Text style={styles.btn_text}>{btnStat === 1 ? '登陆中...' : '登陆'}</Text>
                            </TouchableHighlight>
                        </BoxShadow>
                    </View>
                    {/* 免登陆查课表 */}
                    <View style={{ flex: 1, display: 'flex', alignItems: 'center', marginTop: 20 }}>
                        <View style={{ width: 100, height: 34 }}>
                            <TouchableHighlight onPress={handleQuery} style={{
                                ...styles.btn,
                                ...styles.btn_mini,
                                // backgroundColor: '#d0d0ff' 
                                // backgroundColor: '#282828'
                            }}
                                underlayColor="#fa4169aa">
                                <Text style={[styles.btn_text, { fontSize: 12, color: '#f9fffc' }]}>免登陆查课表</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                <View style={{ position: 'absolute', top: height - 120, width: '100%', textAlign: 'center' }}>
                    {
                        announcement ? <Text style={{ textAlign: 'center', fontSize: 14, color: '#f00', backgroundColor: "#ffd0d0",padding:4,marginBottom:6 }}>公告: {announcement}</Text> : null
                    }
                    <Text style={{ textAlign: 'center', fontSize: 14, color: '#69707f' }}>&copy;2018-2020 计算机技术协会</Text>
                    <Text style={{ textAlign: 'center', fontSize: 14, color: '#69707f' }} selectable={true}>QQ群：592874151</Text>
                </View>

            </View>
        );
    }

    handleQuery = () => {

        const { loginName, loginPass } = this.state;

        if (!/^[0-9]{4,}$/.test(loginName)) {
            return Alert.alert("提示", '账号必须输入哦，密码不需要的');
        }
        AsyncStorage.setItem("loginName", loginName);
        AsyncStorage.setItem("loginPass", loginPass);

        this.props.navigation.navigate('CurriculumX', { isdirect: true });

    }

    async handleClick() {
        // if(Date.now() >= new Date('2019-10-26 00:00:00').getTime()){
        //     Alert.alert("测试时间已过，已停止使用!");
        //     return;
        // }
        if (this.state.btnStat === 1) {
            return;
        }

        const { loginName, loginPass } = this.state;

        if (!/^[0-9]{4,}$/.test(loginName)) {
            return Alert.alert("请输入正确的学号!");
        } else if (!loginPass || !loginPass.length) {
            return Alert.alert("请输入密码!");
        }

        try {

            this.setState({
                btnStat: 1
            });
            const { message } = await login(loginName, loginPass);

            Toast.show(message, { opacity: 0.6 });

            this.props.navigation.navigate('Home');

            AsyncStorage.setItem("loginName", loginName);
            AsyncStorage.setItem("loginPass", loginPass);

            // 初始化
            AsyncStorage.setItem('activeList', "");
            AsyncStorage.setItem('info', "");
            AsyncStorage.setItem('activeNums', "");
            AsyncStorage.setItem('StuEnlightenRoomScore', "");
            AsyncStorage.setItem('logintime', String(Date.now()));

        } catch (e) {

            console.log(e);
            Alert.alert(e.message + "，请再试一次");

        } finally {
            this.setState({
                btnStat: 0
            });
        }

    }

    handlePasswordChange(value) {
        this.setState({
            loginPass: value
        });
    }

    handleLoginNameChange(value) {
        this.setState({
            loginName: value
        });
    }

}


const mapStateToProps = (state) => {
    return {
        theme: getThemeConfig('login', state.theme)
    }
}
const mapDispatchToProps = (
    dispatch,
    ownProps
) => {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: '100%',
        // justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: "#ffffff",
        backgroundColor: "#1a1a1a",
        position: "relative"
    },
    h_style: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 194,
        height: 157,
    },
    f_style: {
        position: 'absolute',
        left: -3,
        bottom: 0,
        width: 174,
        height: 144,
    },
    login: {
        width: '100%',
        height: 300,
        padding: 20,
        paddingLeft: 30,
        paddingRight: 30
        // backgroundColor: "",
        // marginTop: 100,
        // alignItems: 'center',
        // flexDirection: "column"
    },
    title: {
        marginTop: 180,
        position: 'relative',
        marginBottom: 40
    },
    title_bg: {
        position: 'absolute',
        bottom: -10,
        left: -30,
        margin: 0,
        padding: 0,
        fontSize: 80,
        // color: "#f7f7fb",
        color: "#2d2d2d",
        fontWeight: '500',
    },
    title_text: {
        fontSize: 26,
        fontWeight: '500',
        // color: '#333',
        color: '#5f5f5f',
    },
    inputWarp: {
        marginBottom: 20,
        width: '100%',
        // backgroundColor: "#f7f7fb",
        backgroundColor: "#282828",
        borderRadius: 4,
        padding: 20,
        paddingTop: 0,
        paddingBottom: 0,
        overflow: 'hidden'
    },
    inputWarp_info: {
        // color: "#69707f",
        color: "#5f5f5f",
        fontSize: 14,
        marginTop: 8,
        padding: 0,
    },
    input: {
        color: "#5f5f5f",
        // color: "#1d1e2f",
        fontWeight: '600',
        fontSize: 18,
        padding: 0,
        // height: 36,
        paddingTop: 4,
        // paddingBottom:4,
        margin: 0,
        marginBottom: 6,
    },
    inputWarp_btn: {

    },
    btn: {
        width: '100%',
        height: '100%',
        marginLeft: "auto",
        marginRight: "auto",
        // backgroundColor: '#fa4169',
        backgroundColor: '#1a1a1a',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginTop: 12
    },
    btn_mini: {

    },
    btnDs: {
        // backgroundColor: '#fa416999',
        backgroundColor: '#1a1a1a99',
    },
    btn_text: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: '500',
        // color: '#fff'
        color: "#5f5f5f"
    },
    welcome: {
        fontSize: 10,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
