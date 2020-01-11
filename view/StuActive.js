/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View, Alert, FlatList, TouchableHighlight,TouchableOpacity, StatusBar } from 'react-native';
import { AppAction, getStuActive, MyActionGetNum } from "../api/api";
import AsyncStorage from "@react-native-community/async-storage";
import HeadBgImg from '../components/HeadBgImg';
import Header from '../components/Header';
import IoniconsFeather from 'react-native-vector-icons/Feather';
export default class StuActive extends Component {
    static navigationOptions = {
        title: '素拓活动列表',
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            activeNums: {},
            activeList: []
        };
        this.handleClickItem = this.handleClickItem.bind(this);
    }

    componentWillMount() {
           StatusBar.setBarStyle('dark-content');
        this.getActiveList.call(this);
        this.getActiveNum.call(this);
    }

    save = async () => {
        await AsyncStorage.setItem('activeNums', JSON.stringify(this.state.activeNums));
        await AsyncStorage.setItem('activeList', JSON.stringify(this.state.activeList));
    }

    async getActiveNum() {
        try {

            let activeNums;
            try {
                activeNums = (JSON.parse(await AsyncStorage.getItem('activeNums')));
                console.warn(activeNums);
                if (!activeNums || typeof activeNums == "string") {
                    throw new Error('类型不匹配');
                }
                if (!Object.keys(activeNums).length) {
                    throw new Error('空');
                }

            } catch (e) {
                console.log(e);
                activeNums = (await MyActionGetNum()).data;
            }

            await this.save();
            this.setState({ activeNums: activeNums || {} });

        } catch (e) {
            console.log(e);
            Alert.alert(e.message);
        }
    }

    async getActiveList() {
        try {

            let activeList;
            try {
                activeList = (JSON.parse(await AsyncStorage.getItem('activeList')));

                if (!activeList || typeof activeList !== "object") {
                    throw new Error('类型不匹配');
                }

            } catch (e) {
                console.log(e);
                activeList = (await getStuActive()).data;
            }

            this.setState({ activeList });

            AsyncStorage.setItem('activeList', JSON.stringify(activeList));

        } catch (e) {

            console.log(e);
            Alert.alert(e.message);

        }
    }

    render() {
        const { activeList, activeNums } = this.state;
        const { handleClickItem } = this;
        return (
            <View style={styles.container}>
                <Header
                    left={
                        <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }}>
                            <IoniconsFeather name='chevron-left' size={26} color='#222c69' />
                        </TouchableOpacity>
                    }
                    center={
                        <Text style={{ color: '#222c69', fontSize: 18 }}>素拓活动</Text>
                    }
                />
                <HeadBgImg />
                <ScrollView  style={{ flex: 1 }}>
                    <View style={[styles.MyActionGetNum, styles.topSize]}>
                        <Text style={styles.title}>素拓分各类得分</Text>
                        <View style={styles.calss_}>
                            <View style={styles.calss_item}>
                                <Text style={styles.label}>A类：</Text>
                                <Text>{activeNums.CountA1}</Text>
                            </View>
                            <View style={styles.calss_item}>
                                <Text style={styles.label}>B类：</Text>
                                <Text>{activeNums.CountB1}</Text>
                            </View>
                            <View style={styles.calss_item}>
                                <Text style={styles.label}>C类：</Text>
                                <Text>{activeNums.CountC1}</Text>
                            </View>
                        </View>
                        <View style={styles.calss_}>
                            <View style={styles.calss_item}>
                                <Text style={styles.label}>D类：</Text>
                                <Text>{activeNums.CountD1}</Text>
                            </View>
                            <View style={styles.calss_item}>
                                <Text style={styles.label}>E类：</Text>
                                <Text>{activeNums.CountE1}</Text>
                            </View>
                            <View style={styles.calss_item}>
                                <Text style={styles.label}>F类：</Text>
                                <Text>{activeNums.CountF1}</Text>
                            </View>
                        </View>
                        <View style={styles.calss_}>
                            <View style={styles.calss_item}>
                                <Text style={styles.label}>总分：</Text>
                                <Text>{activeNums.SunCount1}</Text>
                            </View>
                            <View style={styles.calss_item}>
                                <Text style={styles.label}>总结：</Text>
                                <Text>{activeNums.Status}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.MyActionGetNum}>
                        <Text style={styles.title}>素拓活动列表 <Text style={styles.title_info}>未评价的点击就可以自动评价</Text></Text>
                        <FlatList
                            data={activeList}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableHighlight underlayColor={item.stat !== '已经评价' ? '#f9f9f9' : '#ffffff'}
                                    onPress={() => {
                                        handleClickItem(item.id)
                                    }}>
                                    <View onp style={[styles.active_item, item.stat !== '已经评价' ? styles.no_yes_item : {}]}
                                        key={item.id}>
                                        <Text style={[styles.active_item_title, {}]} numberOfLines={1}>{item.name}</Text>

                                        <View style={styles.calss_}>
                                            <View style={styles.calss_item}>
                                                <Text style={styles.label}>主办方：</Text>
                                                <Text>{item.unit}</Text>
                                            </View>
                                            <View style={styles.calss_item}>
                                                <Text style={styles.label}>时间：</Text>
                                                <Text>{item.date}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.calss_}>
                                            <View style={styles.calss_item}>
                                                <Text style={styles.label}>活动类型：</Text>
                                                <Text numberOfLines={1}>{item.type ? (item.type.length > 12 ? item.type.substr(0, 12) + "..." : item.type) : ""}</Text>
                                            </View>
                                            <View style={styles.calss_item}>
                                                <Text style={styles.label}>分值：</Text>
                                                <Text>{item.score}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.calss_}>
                                            <View style={styles.calss_item}>
                                                <Text style={styles.label}>状态：</Text>
                                                <Text style={item.stat === '已经评价' ? {} : styles.no_yes}>{item.stat}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            )}
                        />
                    </View>
                </ScrollView>

            </View>
        );
    }

    componentWillUnmount() {
        AsyncStorage.removeItem('activeNums');
        AsyncStorage.removeItem('activeList');
    }

    async handleClickItem(id) {


        try {
            const { activeList } = this.state;

            const active = activeList.find(item => item.id === id);
            console.warn(active);
            if (active.stat.indexOf('未评价') !== -1) {

                active.stat = '已经评价';

                this.setState({ activeList: JSON.parse(JSON.stringify(activeList)) });
                this.save();
                Alert.alert("评论成功，请等待学工系统处理，一般为一天再查看结果！");

                await AppAction(active.id);

            }
        } catch (e) {
            console.log(e)
        }

    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9f9f9',
        flex:1,
    },
    topSize: {
        marginTop: 0
    },
    MyActionGetNum: {
        borderRadius: 8,
        padding: 10,
        margin: 10,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: "#fffd",
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
    },
    title_info: {
        color: '#b7bacd',
        fontWeight: '400',
        fontSize: 14,
        marginLeft: 20

    },

    label: {
        color: '#222c69',
        fontWeight: '600'
    },
    calss_: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 6,
        marginTop: 6
    },
    calss_item: {
        flexDirection: 'row',
        overflow: 'hidden',
    },
    active_item: {
        padding: 4,
        fontSize: 16,
        // height: 100,
        overflow: 'hidden',
        marginTop: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#eee',
    },
    active_item_title: {
        color: '#222c69',
        fontWeight: '700'
    },
    no_yes: {
        color: '#3971ff',
        fontWeight: '800'
    },
    no_yes_item: {
        backgroundColor: '#f9f9f9'
    }
});
