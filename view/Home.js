/**
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import {login, WorkInfo} from "../api/api";
import AsyncStorage from "@react-native-community/async-storage";

export default class Home extends Component {
    static navigationOptions = {
        title: '首页',
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            Failing: "0",
            Illegal: "0",
            absence: "0",
            dorm: "0",
            flunk: "0",
            grade: "0",
            score: "0",
            study: "0",
            truant: "0",
            loginName: ""
        };

    }

    async componentWillMount(): void {

        try {
            const {data} = await WorkInfo();

            this.setState({...data});


            const loginName = await AsyncStorage.getItem('loginName');

            this.setState({loginName})


        } catch (e) {

            console.log(e);

            Alert.alert("出现错误，请重新登陆。");

            this.props.navigation.navigate('Login');

        }

    }

    render() {
        const {
            absence,
            truant,
            study,
            Illegal,
            Failing,
            grade,
            score,
            flunk,
            loginName
        } = this.state;
        return (
            <View style={styles.container}>
                <Image source={{uri: `http://xz.jvtc.jx.cn/JVTC_XG/DownLoad/Student/${loginName}.jpg`}}
                       style={styles.head}/>
                <View style={styles.main}>
                    <View style={styles.item}>
                        <Text>早操缺勤</Text>
                        <Text style={styles.red}>{absence}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>旷课</Text>
                        <Text style={styles.red}>{truant}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>晚自习缺勤</Text>
                        <Text style={styles.red}>{study}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>违纪</Text>
                        <Text style={styles.red}>{Illegal}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>挂科</Text>
                        <Text style={styles.red}>{Failing}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>平均成绩</Text>
                        <Text style={styles.red}>{grade}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>学分</Text>
                        <Text style={styles.red}>{score}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>不及格</Text>
                        <Text style={styles.red}>{flunk}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },

    head: {
        width: 80, height: 100,
        margin: 30,
        borderRadius: 4
    },
    main: {
        flex: 1,
        width: '96%',
        marginBottom: 20,
        margin: 10,
        borderRadius: 8,
        overflow: 'hidden'
    },
    item: {
        borderBottomColor: "#f0f0f0",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flex: 1,
        padding: 10,
        paddingLeft: 20,
        justifyContent: 'center',
        backgroundColor: '#fff'
        // borderBottom:'solid'
    },
    red: {
        color: '#f00'
    }
});
