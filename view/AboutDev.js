import React, { Component } from 'react';
import { View, Text, Image, Alert, TouchableOpacity, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import Header from '../components/Header';
import IoniconsFeather from 'react-native-vector-icons/Feather';
import { sendMsg } from '../api/api';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 24,
  },
  title: {
    color: "#222c69",
    fontSize: 16,
    textShadowColor: "#ccc",
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
    color: '#222c69'
  },
  aboutInfo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  about_title: {
    color: "#333",
    fontSize: 18,
    fontWeight: '600'
  },
  info: {
    margin: 10,
    paddingBottom: 20,
    padding: 10,
    borderRadius: 4,
    backgroundColor: "#fff"
  },
  info_title: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4
  },
  info_title2: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    marginBottom: 4,
    marginTop: 4
  }
});

const actions = [
  { path: 'WebViewShow', text: '不才的博客', icon: 'octagon', params: { title: '不才的博客', uri: "http://blog.ncgame.cc" } },
  { path: 'WebViewShow', text: '沐凉的博客', icon: 'hexagon', params: { title: '沐凉的博客', uri: "https://blog.cccccc.online/" } },
];

export default class AboutDev extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputText: ''
    };
  }
  _changeInput = (text) => {
    this.setState({
      inputText: text
    });
  }
  _submitMsg = () => {
    const inputText = this.state.inputText;
    if (inputText.length < 5) {
      return Alert.alert("不能少于5个字符");
    }
    this.setState({
      inputText: ''
    });
    sendMsg(inputText);
    Alert.alert("提交成功");
  }

  _onPressGoPath = async (path, params = {}) => {
    path && this.props.navigation.navigate(path, params);
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          left={
            // <Text>123123</Text>
            <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }}>
              <IoniconsFeather name='chevron-left' size={26} color='#222c69' />
            </TouchableOpacity>
          }
          center={
            <Text style={styles.title}>关于与帮助</Text>
          }
        />
        <ScrollView style={styles.action}>
          <View style={styles.aboutInfo}>
            <Image source={{ uri: "http://v.ncgame.cc/logo.png" }} style={{ height: 80, width: 80 }} />
            <Text style={styles.about_title}>九职学工平台</Text>
          </View>
          <View style={styles.actionContainer}>
            {
              actions.map(item => (
                <TouchableOpacity style={styles.p_item} key={item.text} onPress={() => { this._onPressGoPath(item.path, item.params) }}>
                  <View style={styles.item}>
                    <IoniconsFeather name={item.icon || 'meh'} size={26} color='#222c69' />
                    <Text style={styles.text}>{item.text}</Text>
                  </View>
                </TouchableOpacity>
              ))
            }
          </View>

          <View style={styles.info}>
            <Text style={styles.info_title}>开发说明</Text>
            <View>
              <Text style={styles.info_title2}>首先感谢</Text>
              {/* <Text>感谢沐凉[QQ:2375622526]提供课表免登陆接口</Text> */}
              <Text>感谢信工-计算机技术协会帮助测试</Text>
              <Text>感谢信工-计算机技术协会提供维修平台</Text>
              <Text>感谢信工-计算机技术协会提供学工网相关接口</Text>
            </View>
            <View>
              <Text style={styles.info_title2}>开发概述</Text>
              <Text>目前由我[不才]负责app开发、负责相关接口开发</Text>
              <Text>信工-计算机技术协会提供维修平台相关接口</Text>
              <Text>由信工-计算机技术协会测试</Text>
            </View>
            <View>
              <Text style={styles.info_title2}>如果在使用中遇到问题或对平台对技术感兴趣提意见可以加群</Text>
              <Text style={styles.info_title2} selectable={true} >Q群号（长按复制）:  592874151 </Text>
            </View>
            <View>
              <Text style={styles.info_title2}>问题反馈</Text>
              <TextInput multiline numberOfLines={5} value={this.state.inputText} onChangeText={this._changeInput} style={{ borderColor: '#ddd', textAlignVertical: 'top', marginBottom: 10, padding: 10, borderWidth: StyleSheet.hairlineWidth }} placeholder="请输入问题详情，如果可以的话麻烦留联系方式谢谢" />
              <View style={{ padding: 10 }}>
                <Button
                  onPress={this._submitMsg}
                  title="提交"
                  color="#ff5722"
                  accessibilityLabel="n"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
