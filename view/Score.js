/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View, TextInput, Alert, FlatList, TouchableHighlight, TouchableOpacity, StatusBar } from 'react-native';
import Header from '../components/Header';
import IoniconsFeather from 'react-native-vector-icons/Feather';
import { Cjcx } from '../api/api';
import AsyncStorage from '@react-native-community/async-storage';

export default class Score extends Component {
  static navigationOptions = {
    title: '成绩单',
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      scoreObj: {},
      passwrod: '',
      loging: false,
    };
  }

  async componentDidMount() {
    const pass = await AsyncStorage.getItem('jwpass');
    this.setState({ passwrod: pass });
  }

  getData = async (loginname, passwrod) => {
    try {

      const { data } = await Cjcx({ loginname, passwrod });
      return data;
    } catch (error) {
      alert(error.message || error);
      return null;
    }
  }
  _changeInput = (text) => {
    this.setState({
      passwrod: text
    });
  }

  handleLogin = async () => {
    const { loging, passwrod } = this.state;
    const loginname = await AsyncStorage.getItem('loginName');
    console.warn(loging, passwrod, loginname);

    if (loging) {
      return;
    }
    if (!/^[0-9]{4,}$/.test(loginname)) {
      return alert('无法获取到用户名，请重新登陆');
    }

    if (!passwrod || passwrod.length <= 0) {
      return alert('请输入密码');
    }

    this.setState({ loging: true });

    const data = await this.getData(loginname, passwrod);

    if (data !== null && Object.keys(data).length <= 0) {
      alert('未查询到成绩，请检查密码。成绩可能没有录入！');
    }
    this.setState({ loging: false, scoreObj: data || {} });
    AsyncStorage.setItem('jwpass', passwrod);
  }

  showLoginView = () => {
    const { loging, passwrod } = this.state;
    return (<View style={{ flex: 1, padding: 20, marginTop: 20 }}>
      <TextInput secureTextEntry onChangeText={this._changeInput} value={passwrod} style={{ color: '#333', backgroundColor: '#fff', borderRadius: 4, paddingLeft: 20, paddingRight: 20, marginBottom: 20 }} placeholder="请输入教务处密码" />
      <TouchableOpacity onPress={this.handleLogin} ><Text style={{ color: '#fff', width: '100%', backgroundColor: '#20296a', textAlign: 'center', padding: 12, borderRadius: 4 }}>{loging ? '查询中' : '查询'}</Text></TouchableOpacity>
    </View>);
  }



  readerList = () => {
    const { scoreObj } = this.state;
    const years = Object.keys(scoreObj).reverse();
    const list = Object.values(scoreObj).reverse();
    return list.map((item, index) => {
      const year = years[index];

      return (<View key={year} style={{ marginTop: 10, margin: 14, marginBottom: 4, backgroundColor: '#fff', borderRadius: 4, padding: 10, }}>
        <View style={{ display: 'flex', justifyContent: "center", alignItems: 'center', marginBottom: 10 }}><Text style={{ color: '#444', textAlign: 'center', fontWeight: '600' }}>{year}</Text></View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "center", marginBottom: 8, }}>
          <Text style={{ flex: 1, textAlign: 'center', color: '#555' }}>课程名称</Text>
          <Text style={{ flex: 1, textAlign: 'center', color: '#555' }}>课程属性</Text>
          <Text style={{ flex: 1, textAlign: 'center', color: '#555' }}>成绩</Text>
          <Text style={{ flex: 1, textAlign: 'center', color: '#555' }}>学分</Text>
        </View>
        {
          item.map((k_item, index) => {
            return (
              <View key={k_item[0] + index} style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
                <Text style={{ flex: 1, textAlign: 'center', overflow: 'hidden' }} numberOfLines={1}>{k_item[1]}</Text>
                <Text style={{ flex: 1, textAlign: 'center' }}>{k_item[8]}</Text>
                <Text style={{ flex: 1, textAlign: 'center' }}>{k_item[2]}</Text>
                <Text style={{ flex: 1, textAlign: 'center' }}>{k_item[4]}</Text>
              </View>
            )
          })
        }
      </View>);
    })
  }

  render() {
    const { scoreObj } = this.state;

    return (
      <View style={styles.container}>
        <Header
          left={
            <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }}>
              <IoniconsFeather name='chevron-left' size={26} color='#222c69' />
            </TouchableOpacity>
          }
          center={
            <Text style={styles.title}>成绩单</Text>
          }
        />
        <ScrollView>
          {Object.keys(scoreObj || {}).length <= 0 && this.showLoginView()}
          {this.readerList()}
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
  title: {
    color: '#222c69',
    fontSize: 16,
    fontWeight: '600'
  }
});
