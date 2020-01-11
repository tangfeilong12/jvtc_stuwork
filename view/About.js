/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View, Alert, StatusBar, TouchableOpacity } from 'react-native';
import { user_info } from "../api/api";

import AsyncStorage from '@react-native-community/async-storage';
import HeadBgImg from '../components/HeadBgImg';
import Header from '../components/Header';
import IoniconsFeather from 'react-native-vector-icons/Feather';

const keyMap = new Map();

const basicsinfo = {
    "StudentName": "姓名",
    "StudentNo": "学号",
    "Campus": "校区",
    "BirthDay": "出生年月",
    "National": "名族",
    "Polity": "政治面貌",
    "NativePlace": "籍贯",
    "InTime": "入学时间",
    "WHCD": "文化程度",
    "RXCJ": "入学成绩",
    "KL": "理科",
    "IdCard": "身份证",
    "GetType1": "类型",
    "BankName": "银行卡类型",
    "BankNo": "银行卡号"
};

const contactinfo = {
    "MoveTel": "手机号",
    "Email": "邮箱",
    "QQCard": "QQ",
    "WXH": "微信"
};

const homeinfo = {
    "FatherName": "父亲",
    "MotherName": "母亲",
    "FatherTel": "父亲联系方式",
    "MotherTel": "母亲联系方式"
};
const schoolinfo = {
    "SpeType": "学历类型",
    "InStatus": "状态",
    "CollegeNo": "学院",
    "SpecialtyNo": "专业",
    "Grade": "入学年纪",
    "ClassNo": "班级",
    "BedNo": "宿舍"
};

const keyInfo = {
    basicsinfo: "个人信息",
    contactinfo: '联系方式',
    homeinfo: "家庭信息",
    schoolinfo: "在校信息"
};

for (let key in basicsinfo) {
    keyMap.set(key, basicsinfo[key])
}
for (let key in contactinfo) {
    keyMap.set(key, contactinfo[key])
}
for (let key in homeinfo) {
    keyMap.set(key, homeinfo[key])
}
for (let key in schoolinfo) {
    keyMap.set(key, schoolinfo[key])
}
for (let key in keyInfo) {
    keyMap.set(key, keyInfo[key])
}

export default class About extends Component {
    static navigationOptions = {
        title: '关于',
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            basicsinfo: {},
            contactinfo: {},
            homeinfo: {},
            schoolinfo: {}
        };

    }

    async componentWillMount() {
        StatusBar.setBarStyle('dark-content');
        try {
            let data;
            try {
                data = (JSON.parse(await AsyncStorage.getItem('info')));

                if (!data || typeof data == "string") {
                    throw new Error('类型不匹配');
                }
            } catch (e) {
                console.log(e);
                data = (await user_info()).data;
            }

            this.setState({ ...data });

            AsyncStorage.setItem('info', JSON.stringify(data))

        } catch (e) {

            console.log(e);
            Alert.alert(e.message);

        }

    }

    itemRender(infoObj) {
        let jsx_dom = [];

        for (let key in infoObj) {
            const _key = keyMap.get(key);

            const dom = (<View key={key}>
                <Text style={styles.item}>{_key}: {infoObj[key]}</Text>
            </View>);

            jsx_dom.push(dom);
        }

        return jsx_dom;

    }

    render() {
        const {
            basicsinfo,
            contactinfo,
            homeinfo,
            schoolinfo
        } = this.state;
        return (
            <View style={styles.container}>
                <Header
                    left={
                        <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }}>
                            <IoniconsFeather name='chevron-left' size={26} color='#222c69' />
                        </TouchableOpacity>
                    }
                    center={
                        <Text style={{ color: '#222c69', fontSize: 18 }}>个人信息</Text>
                    }
                />
                <HeadBgImg />
                <ScrollView style={{ felx: 1 }}>
                    <View style={[styles.item_warp, styles.topSize]}>
                        <View>
                            <Text style={styles.title}>{keyMap.get('basicsinfo')}</Text>
                        </View>
                        {this.itemRender({ ...basicsinfo })}
                    </View>
                    <View style={styles.item_warp}>
                        <View>
                            <Text style={styles.title}>{keyMap.get('contactinfo')}</Text>
                        </View>
                        {this.itemRender({ ...contactinfo })}
                    </View>
                    <View style={styles.item_warp}>
                        <View>
                            <Text style={styles.title}>{keyMap.get('homeinfo')}</Text>
                        </View>
                        {this.itemRender({ ...homeinfo })}
                    </View>
                    <View style={[styles.item_warp, styles.item_warp_last]}>
                        <View>
                            <Text style={styles.title}>{keyMap.get('schoolinfo')}</Text>
                        </View>
                        {this.itemRender({ ...schoolinfo })}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9f9f9',
        flex: 1,
    },
    topSize: {
        marginTop: 0
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,

        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item_warp: {
        backgroundColor: '#fffd',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        margin: 10,
    },
    item_warp_last: {
        marginBottom: 30
    },
    item: {
        padding: 4,
        fontSize: 16,
        height: 44,
        color: '#5d6490'
    },
    title: {
        paddingLeft: 4,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222c69',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#b7bacd',
        paddingBottom: 10,
        marginBottom: 6
        // backgroundColor: '#ccc'
    }

});
