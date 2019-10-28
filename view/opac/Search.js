import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { SearchX } from '../../api/api';
import styles from './styles/Search'

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getList() {

  }

  render() {
    return (
      <View style={styles.search}>
        <View style={styles.header}>
          
        </View>
      </View>
    );
  }
}
