/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Alert, ImageBackground, StatusBar } from 'react-native';
import { WorkInfo } from "../api/api";
import AsyncStorage from "@react-native-community/async-storage";
import HeadBgImg from '../components/HeadBgImg';
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

    async componentWillMount() {
        StatusBar.setBarStyle('light-content');

        try {
            const { data } = await WorkInfo();

            this.setState({ ...data });


            const loginName = await AsyncStorage.getItem('loginName');

            this.setState({ loginName })


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

                <HeadBgImg/>

                <View style={styles.head_avatar}>
                    <Image source={{ uri: `http://xz.jvtc.jx.cn/JVTC_XG/DownLoad/Student/${loginName}.jpg` }}
                        style={styles.head} />
                    <Text style={styles.head_name}>{loginName}</Text>
                </View>
                <View style={styles.main}>
                    <View style={[styles.item, styles.rowBorder]}>
                        <Text style={styles.red}>{absence}</Text>
                        <Text style={styles.item_text}>早操缺勤</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.red}>{truant}</Text>
                        <Text style={styles.item_text}>旷课</Text>
                    </View>
                    <View style={[styles.item, styles.rowBorder]}>
                        <Text style={styles.red}>{study}</Text>
                        <Text style={styles.item_text}>晚自习缺勤</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.red}>{Illegal}</Text>
                        <Text style={styles.item_text}>违纪</Text>
                    </View>
                    <View style={[styles.item, styles.rowBorder]}>
                        <Text style={styles.red}>{Failing}</Text>
                        <Text style={styles.item_text}>挂科</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.red}>{grade}</Text>
                        <Text style={styles.item_text}>平均成绩</Text>
                    </View>
                    <View style={[styles.item, styles.noBBorder, styles.rowBorder]}>
                        <Text style={styles.red}>{score}</Text>
                        <Text style={styles.item_text}>学分</Text>
                    </View>
                    <View style={[styles.item, styles.noBBorder]}>
                        <Text style={styles.red}>{flunk}</Text>
                        <Text style={styles.item_text}>不及格</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    head_avatar: {
        margin: 60,
        marginTop: 80,
        width: 260,
        height: 140,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.3)',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    head_name: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: '600'
    },
    head: {
        width: 80, height: 80,
        borderRadius: 40,
    },
    main: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        width: '100%',
        padding: 20,
        marginTop: 30,
        backgroundColor: '#f9f9f988'
    },
    item: {
        width: '50%',
        borderBottomWidth: 1,
        borderColor: '#c8cad8',
        padding: 6,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    item_text: {
        color: '#222c69',
        fontWeight: '600',
        fontSize: 18
    },
    noBBorder: {
        borderBottomWidth: 0,
    },
    rowBorder: {
        borderRightWidth: 1,
    },
    red: {
        fontWeight: '600',
        fontSize: 22,
        color: '#222c69',
    }
});
