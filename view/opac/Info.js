import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles/info_styles'
export default class Info extends Component {
  static navigationOptions = {
    title: '个人信息',
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
    };

  }
  componentWillMount() {
    StatusBar.setBarStyle('dark-content');
  }

  render() {
    return (
      <LinearGradient start={{ x: 0.0, y: 0.3 }} end={{ x: 1, y: 0 }} colors={['#a7afff', '#f39fff']} style={styles.MainlinearGradient}>

      </LinearGradient>
    );
  }
}
