/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View, Alert, StatusBar, TouchableOpacity, Picker } from 'react-native';
import { stu_judge_score } from "../api/api";

import AsyncStorage from '@react-native-community/async-storage';
import Header from '../components/Header';
import IoniconsFeather from 'react-native-vector-icons/Feather';

const keyMap = ['学号', '姓名', '班级排名', '专业年级排名', '综合成绩', '德育素质A', '智育素质B', '体育素质C', '工作能力D1', '校内获奖D2', '荣誉E1', '课程考核E2'];


export default class About extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            options: [],
            selectTime: ''
        };

    }
    stu_judge_score = async (selectTime) => {

        let data;
        data = (await stu_judge_score(selectTime)).data;

        this.setState({
            list: data.list,
            options: data.options,
        });
    }
    async componentWillMount () {
        StatusBar.setBarStyle('dark-content');
        try {
            this.stu_judge_score();
        } catch (e) {
            Alert.alert(e.message);
        }
    }

    render () {
        const {
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
                        <Text style={{ color: '#222c69', fontSize: 18 }}>成绩排名</Text>
                    }
                />

                <ScrollView style={{ felx: 1, backgroundColor: '#fff', margin: 24, borderRadius: 6 }}>

                    <View style={{ textAlign: 'center', marginBottom: 24, paddingLeft: 24, paddingRight: 24, paddingTop: 12, }}>
                        <Picker
                            selectedValue={this.state.selectTime}
                            style={{ height: 50, width: '100%', backgroundColor: "#f9f9f9", borderRadius: 6, fontWeight: 'bold' }}
                            onValueChange={(itemValue, itemIndex) => {
                                this.setState({ selectTime: itemValue })
                                this.stu_judge_score(itemValue);
                            }}>
                            {
                                this.state.options.map(item => {
                                    return <Picker.Item label={item} value={item} key={item} />
                                })
                            }
                        </Picker>
                    </View>

                    <View>
                        {
                            this.state.list.map((item, index) => (
                                <View key={keyMap[index]} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                                    <Text style={{ width: 140, textAlign: 'right', paddingRight: 24 }}>{keyMap[index]}:</Text>
                                    <Text style={{ color: '#333' }}>{item}</Text>
                                </View>
                            ))
                        }
                    </View>

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
});
