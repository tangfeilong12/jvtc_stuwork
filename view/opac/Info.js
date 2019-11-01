import React, { Component } from 'react';
import { View, Text, StatusBar, ScrollView, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles/info_styles'
import { info } from './api';

export default class Info extends Component {
  static navigationOptions = {
    title: '个人信息',
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      mylib_msg: "",
      mylib_info: []
    };

  }
  async componentWillMount() {
    StatusBar.setBarStyle('dark-content');

    try {
      const { data } = await info();
      this.setState({
        mylib_info: data.mylib_info,
        mylib_msg: data.mylib_msg,
      });
    } catch (error) {
      Alert.alert('出错了', error.message || error);
    }

  }


  render() {
    const { mylib_msg, mylib_info } = this.state;
    return (
      <LinearGradient start={{ x: 0.0, y: 0.3 }} end={{ x: 1, y: 0 }} colors={['#a7afff', '#f39fff']} style={styles.MainlinearGradient}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1, display: 'flex', alignItems: 'center', margin: 20 }}>
            <View style={styles.item_style}>
              <Text style={[styles.item_title, { padding: 10, lineHeight: 28 }]}>{mylib_msg}</Text>
            </View>
            <View style={styles.item_style}>
              {
                mylib_info.map(item => (
                  <Text style={[styles.item_main_li]} key={item}>{item}</Text>
                ))
              }
            </View>
          </View>
        </ScrollView>

      </LinearGradient>
    );
  }
}
