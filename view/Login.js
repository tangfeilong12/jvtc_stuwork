/**
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert, TextInput, PixelRatio, TouchableHighlight} from 'react-native';
import {login} from "../api/api";
import AsyncStorage from "@react-native-community/async-storage";

export default class Login extends Component {
    static navigationOptions = {
        title: 'Login',
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            loginName: '',
            loginPass: ''
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleLoginNameChange = this.handleLoginNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }


    async componentDidMount(): void {

        //    这里处理 打开后 自动登陆
        //     this.props.navigation.navigate('StuActive');

        const loginName = await AsyncStorage.getItem("loginName");
        const loginPass = await AsyncStorage.getItem("loginPass");

        console.log(loginName, loginPass);

        this.setState({
            loginName, loginPass
        });

    }

    render() {

        const {handleClick, handleLoginNameChange, handlePasswordChange} = this;
        const {loginName, loginPass} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.login}>
                    <Text style={styles.title}>九江职业技术学院-学工网</Text>
                    <View style={styles.inputWarp}>
                        <TextInput style={styles.input} placeholder={"请输入学工网账号"} value={loginName}
                                   onChangeText={handleLoginNameChange}/>
                    </View>
                    <View style={styles.inputWarp}>
                        <TextInput style={styles.input} placeholder={"请输入学工网密码"} value={loginPass}
                                   keyboardType="number-pad" onChangeText={handlePasswordChange}/>
                    </View>
                    <View style={{...styles.inputWarp}}>
                        <TouchableHighlight onPress={handleClick} style={styles.btn}
                                            underlayColor="#48adffaa">
                            <Text style={{
                                textAlign: "center",
                                fontSize: 20,
                                color: '#fff'
                            }}>GO</Text>

                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }

    async handleClick() {

        const {loginName, loginPass} = this.state;

        try {
            const {message} = await login(loginName, loginPass);
            Alert.alert(message);

            this.props.navigation.navigate('Home');

            AsyncStorage.setItem("loginName", loginName);
            AsyncStorage.setItem("loginPass", loginPass);

            // 初始化
            AsyncStorage.setItem('activeList', "");
            AsyncStorage.setItem('info', "");
            AsyncStorage.setItem('activeNums', "");
            AsyncStorage.setItem('StuEnlightenRoomScore', "");


        } catch (e) {

            console.log(e);
            Alert.alert(e.message + "，请再试一次");

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fafafa"
    },
    login: {
        width: '100%',
        height: 300,
        padding: 20,
        // backgroundColor: "",
        marginTop: 100,
        alignItems: 'center',
        flexDirection: "column"
    },
    title: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: '500',
        color: '#000',
        marginBottom: 20,

    },
    inputWarp: {
        marginBottom: 20,
        width: '100%',

    },
    input: {
        borderWidth: 1 / PixelRatio.get(),
        borderColor: "#f0f0f0",
        borderStyle: "solid",
        borderRadius: 30,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'rgb(245,242,242)',
        textAlign: 'center',
        height: 50,
        fontSize: 18,
    },
    btn: {
        width: 70,
        height: 70,
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: '#48adff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
