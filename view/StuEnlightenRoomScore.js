/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View, Alert, FlatList, StatusBar } from 'react-native';
import { StuEnlightenRoomScore } from "../api/api";
import AsyncStorage from "@react-native-community/async-storage";
import HeadBgImg from '../components/HeadBgImg';


export default class StuEnlightenRoomScoreObj extends Component {
    static navigationOptions = {
        title: '宿舍活动',
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            list: []
        };
    }

    componentWillMount() {
        StatusBar.setBarStyle('light-content');
        this.getActiveList.call(this);
    }

    async getActiveList() {
        try {

            let list;
            try {
                list = (JSON.parse(await AsyncStorage.getItem('StuEnlightenRoomScore')));

                if (!list || typeof list !== "object") {
                    throw new Error('类型不匹配');
                }

            } catch (e) {
                console.log(e);
                list = (await StuEnlightenRoomScore()).data;
            }

            this.setState({ list });

            AsyncStorage.setItem('StuEnlightenRoomScore', JSON.stringify(list));

        } catch (e) {

            console.log(e);
            Alert.alert(e.message);

        }
    }

    render() {
        const { list } = this.state;
        return (
            <View style={styles.container}>
                <HeadBgImg/>
                <ScrollView>
                    <View style={[styles.MyActionGetNum,styles.topSize]}>
                        <Text style={styles.title}>查寝列表</Text>
                        <FlatList
                            data={list}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.active_item}>
                                    <Text style={[styles.active_item_title]} numberOfLines={1}>{item.name}</Text>

                                    <View style={styles.calss_}>
                                        <View style={styles.calss_item}>
                                            <Text style={styles.label}>宿舍：</Text>
                                            <Text>{item.dorm}</Text>
                                        </View>
                                        <View style={styles.calss_item}>
                                            <Text style={styles.label}>分数：</Text>
                                            <Text>{item.score}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.calss_}>
                                        <View style={styles.calss_item}>
                                            <Text style={styles.label}>状态：</Text>
                                            <Text>{item.grade}</Text>
                                        </View>
                                        <View style={styles.calss_item}>
                                            <Text style={styles.label}>来源：</Text>
                                            <Text>{item.source}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.calss_}>
                                        <View style={styles.calss_item}>
                                            <Text style={styles.label}>时间：</Text>
                                            <Text>{item.time}</Text>
                                        </View>
                                        <View style={styles.calss_item}>
                                            <Text style={styles.label}>周次：</Text>
                                            <Text>{item.week}</Text>
                                        </View>
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                </ScrollView>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        // padding: 10,
        backgroundColor: '#f0f0f0',
    },
    topSize: {
        marginTop: 40
    },
    MyActionGetNum: {
        borderRadius: 8,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        margin: 10,
        backgroundColor: "#fffd"
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
        flexDirection: 'row'
    },
    active_item: {
        padding: 4,
        fontSize: 16,
        // height: 100,
        overflow: 'hidden',
        marginTop: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#b7bacd',
    },
    active_item_title: {
        color: '#222c69',
        fontWeight: '700'
    },
    no_yes: {
        color: '#b7bacd',
        fontWeight: '800'
    },
    no_yes_item: {
        backgroundColor: '#f9f9f9'
    }
});
