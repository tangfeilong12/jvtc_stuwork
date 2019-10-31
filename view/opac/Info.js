import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Info extends Component {
  static navigationOptions = {
    title: '个人信息',
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> Info </Text>
      </View>
    );
  }
}
