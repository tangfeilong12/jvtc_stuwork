import React, { Component } from 'react';
import { View, Text, Alert, TextInput, StyleSheet, Image, StatusBar, Dimensions, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles/login';
import { BoxShadow } from 'react-native-shadow';
const { width } = Dimensions.get('window');
const statusBarHeight = StatusBar.currentHeight;
import Toast from 'react-native-root-toast';
import { getCode, login } from './api'
import IoniconsFeather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
const shadowOpt = {
  width: width - 50,
  height: 350,
  color: "#fff",
  border: 4,
  radius: 8,
  opacity: 0.12,
  x: 0,
  y: 0,
  style: {
    paddingBottom: 6,
    // marginTop: -20
    padding: 10,
  }
};
const shadowOptBack = {
  width: 40,
  height: 40,
  color: "#fff",
  border: 4,
  radius: 8,
  opacity: 0.22,
  x: 0,
  y: 0,
  style: {
    // paddingBottom: 6,
    // marginTop: -20
    // padding: 10,
    position: 'absolute',
    left: 20,
    top: 20 + statusBarHeight,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20
  }
};

const testImg = 'data:application/octet-stream;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAyCAMAAACd646MAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0ZEOEMxNzlGMjMxMTFFOTgzQUZCRDM5MUFFRjAzOEEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0ZEOEMxN0FGMjMxMTFFOTgzQUZCRDM5MUFFRjAzOEEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozRkQ4QzE3N0YyMzExMUU5ODNBRkJEMzkxQUVGMDM4QSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozRkQ4QzE3OEYyMzExMUU5ODNBRkJEMzkxQUVGMDM4QSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtBM9zAAAAAzUExURbXM/9De/+jv/6G9//r7/+7z/6/H/9zn/8PV//P3/6jC/9bi/8na/+Pr/73R/5q5/////1EUQ1cAAAIlSURBVHja7JbZkuwgCIYBTVwT8/5PO6jRaJZeT52aqQoXfWHQT+EHGpb/YHBDbsgNuSG/HTKQ/AYikZ47UQj4DcSFzlvKTyDS6odXxQ4yCf0JRIXgLgljiAagDYddh7Sg9gAipdkJi8kjhLeZS0goJtNtpsWIYJtHhtanGLUQI/NDx+tYGVIQLEDcYELgUE1aPoNgC9FxxfJDHQ2v5GQMov/kE4TDZbac0A4yt/j5TL28f+KXIHp+DNhDQBKkP3rYQQyhrxvhXDPn9gCy7CDRGILk0EaI57jxCSPMdIDEl4BgZ7apVPcFRO8g/FFkd0g/1KWu5sLWHExdJVTNdBDYQTj3voVwGhy2EBTAGp9RxdsP9ZYFAi9ApFiLZIWIPqpFgTUPlj2UcO9BVFlJ7lmRjT6iOFDEhIwZwh66qasOoitk7iFQmkRyz7UVN6iu6yChqvrkJJomJ6ZCYFX9Xl0mp31wfN05QZArw1WJ5oDarh7b3OdCGyG9VCT1HSqeu3hagPXLptih7RyxKwhIO7lztd0UT4tIqA5ic9pdrAE+15SriFZAYVuT8SG+nYcToob6ktiItw4FJcL6OEZpN0gNkebOokp47MU8gfN50gX/hbnF0bGsAw/HdiovIQv5p+erFIposdOKYRHhZAg21fHJjN/EIOXIDE6gV/IfQyTnkodrqj/5YOqIbyBrQT7dMBzn3puQAfzyvt3/hW/IDbkhfxHyI8AAqmoihAi//68AAAAASUVORK5CYII='
export class Login extends Component {
  static navigationOptions = {
    title: '图书馆',
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      btnStat: 0,
      username: "",
      password: "",
      code: '',
      key: '',
      imgBase64: ''
    }
  }

  _getCodeData = async () => {

    if (this._getCodeData.ing) return;
    this._getCodeData.ing = true;
    this._getCodeData.num = this._getCodeData.num || 0;
    try {
      const { data } = await getCode();

      const { key, code } = data;
      this.setState({
        key,
        imgBase64: code
      });
      this._getCodeData.num = 0;
      this._getCodeData.ing = false;

    } catch (error) {
      this._getCodeData.ing = false;
      this._getCodeData.num += 1;
      if (this._getCodeData.num >= 3) {
        return Alert.alert("获取数据失败，请截图发给开发者", error.message);
      }
      await this._getCodeData();
    }
  }
  initUser = async () => {
    const loginName = await AsyncStorage.getItem('loginName');
    const username = await AsyncStorage.getItem('opac_username');
    const password = await AsyncStorage.getItem('opac_password');
    this.setState({
      username: username || loginName,
      password
    });
  }
  componentDidMount() {
    this._getCodeData();
    this.initUser();
  }

  _changeUsername = (text) => {
    if (text.length === 0) {
      this.setState({
        password: ''
      });
    }
    this.setState({
      username: text
    });
  }
  _changePassword = (text) => {
    this.setState({
      password: text
    });
  }
  _changeCode = (text) => {
    this.setState({
      code: text
    });
  }

  handleSubmit = async () => {
    const { username, password, code, key } = this.state;

    if (!key) {
      return Alert.alert("可能出了点小问题，请重新获取一下验证码");
    }
    if (!code && !/^[A-z]+$/.test(code)) {
      return Alert.alert("验证码不能为空，且都要是字母");
    }
    if (!/^[0-9]+$/.test(username) || !password) {
      return Alert.alert("账号密码存在问题");
    }
    if (this.state.btnStat) return;
    try {
      this.setState({
        btnStat: 1
      });
      await login(username, password, code, key);
      Toast.show('登陆成功', { opacity: 0.6 });
      // 保存数据
      await AsyncStorage.setItem('opac_username', username);
      await AsyncStorage.setItem('opac_password', password);
      // TODO 跳转到个人页面
      this.props.navigation.navigate('OpacBookList');
    } catch (error) {
      this._getCodeData();
      return Alert.alert("登陆错误", error.message);
    } finally {
      this.setState({
        btnStat: 0
      });
    }
  }

  render() {
    const { btnStat, username, password, imgBase64, code } = this.state;
    return (
      <LinearGradient start={{ x: 0.0, y: 0.3 }} end={{ x: 1, y: 0 }} colors={['#a7afff', '#f39fff']} style={styles.MainlinearGradient}>
        <View style={styles.container}>
          {/* <LinearGradient start={{ x: 0.3, y: 0.9 }} end={{ x: 0.65, y: 0 }} colors={['#a7afff', '#f39fff']} style={styles.HeaderlinearGradient}>
            <View style={styles.header}>
            </View>
          </LinearGradient> */}
          <BoxShadow setting={shadowOptBack}>
            <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={{ flex: 1, }} >
              <IoniconsFeather name='chevron-left' size={26} color='#fff' style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlignVertical: 'center' }} />
            </TouchableOpacity>
          </BoxShadow>
          <BoxShadow setting={shadowOpt}>

            <Text style={styles.title}>九职图书馆系统</Text>

            <TextInput
              style={styles.input}
              value={username}
              keyboardType="number-pad"
              onChangeText={this._changeUsername}
              placeholder="请输入学号"
              placeholderTextColor="#eee"
            />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={this._changePassword}
              placeholder="请输入密码"
              placeholderTextColor="#eee"
              secureTextEntry
            />
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <TextInput
                style={styles.input}
                value={code}
                onChangeText={this._changeCode}
                placeholder="请输入验证码"
                placeholderTextColor="#eee"
              />
              <TouchableOpacity onPress={this._getCodeData} style={{ width: 100, margin: 10, marginLeft: 0 }} >
                <Image style={{ flex: 1, borderRadius: 2 }} resizeMode='stretch' source={{ uri: imgBase64 && `data:image/png;base64,${imgBase64}` || testImg }} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={this.handleSubmit} style={btnStat === 1 ? [styles.btn, styles.btnDs] : styles.btn}>
              <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 1.2 }} colors={['#a7afff', '#f39fff']} style={styles.btn_t}>
                <Text style={styles.btn_text}>{btnStat === 1 ? '登陆中...' : '登陆'}</Text>
              </LinearGradient>
            </TouchableOpacity>

          </BoxShadow>

          <Text style={{ color: "#f9f9f9", margin: 10 }}>密码一般为身份证后6位或学号</Text>

        </View>
      </LinearGradient>
    );
  }
}

export default Login;
