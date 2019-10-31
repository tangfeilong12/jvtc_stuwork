import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class BookList extends Component {
  static navigationOptions = {
    title: '已借图书',
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
        <Text> BookList </Text>
      </View>
    );
  }
}
