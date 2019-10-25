import React, { Component } from 'react';
import { View, Text, Alert, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';
import Header from '../components/Header';
import { isUrl } from '../utils/utils';

export class WebViewShow extends Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    const navigation = this.props.navigation;
    const { title, uri } = navigation.state.params || {};
    if (!uri || !isUrl(uri)) {
      Alert.alert("参数不正确");
      navigation.goBack();
      return;
    }
    this.title = title;
    this.uri = uri;
  }
  componentDidMount() {

    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
  }

  goBack = () => {
    this.props.navigation.goBack();
  }

  onBackAndroid = () => {

    Alert.alert(
      '是否确认返回',
      '返回将无法保存当前数据，是否确认！',
      [
        { text: '确认', onPress: () => { this.goBack() } },
        { text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      ],
      { cancelable: false }
    );

    return true;
  }

  render() {

    return (
      <View style={{ flex: 1 }}>
        <Header
          center={
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>{this.title}</Text>
          }
        />
        <WebView
          source={{ uri: this.uri }}
          style={{ marginTop: 0 }}
        />
      </View>
    );
  }
}

export default WebViewShow;
