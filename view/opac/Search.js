import React, { Component } from 'react';
import { View, Text, Alert, Dimensions, ScrollView, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles/search';
import { BoxShadow } from 'react-native-shadow';
const { width } = Dimensions.get('window');
import IoniconsFeather from 'react-native-vector-icons/Feather';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-root-toast';
import { search } from './api';

const shadowOpt = {
  width: width - 30,
  height: 160,
  color: "#fff",
  border: 1,
  radius: 4,
  opacity: 0.8,
  x: 0,
  y: -6,
  style: {
    // paddingBottom: 6,
    marginTop: 20,
    // padding: 20,
    borderColor: '#fff7',
  }
};

export default class Index extends Component {
  static navigationOptions = {
    title: '书籍查询',
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      keyword: '',
      list: []
    };
  }

  _search = async () => {
    this.refs['searchInput'] && this.refs['searchInput'].blur();

    const { keyword } = this.state;

    if (!keyword) {
      return Toast.show('不能为空', { opacity: 0.6 })
    }
    this.setState({
      spinner: true
    });
    // 获取数据，并渲染
    try {
      const { data } = await search(keyword);
      this.setState({
        list: data
      });
    } catch (error) {
      Toast.show(error.message || '出现问题', { opacity: 0.5 })
    } finally {
      this.setState({
        spinner: false
      });
    }
  }
  _changeKeyWord = (text) => {
    this.setState({
      keyword: text
    })
  }

  render() {
    return (
      <LinearGradient start={{ x: 0.0, y: 0.3 }} end={{ x: 1, y: 0 }} colors={['#a7afff', '#f39fff']} style={styles.MainlinearGradient}>

        <View style={styles.container}>
          {/* loading */}
          <Spinner
            visible={this.state.spinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
          <LinearGradient start={{ x: 0.3, y: 0 }} end={{ x: 1.2, y: 0.4 }} colors={['#a7afff', '#f39fff']} style={styles.header}>

            <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={{ height: 30, width: 35 }} >
              <IoniconsFeather name='chevron-left' size={26} color='#fff' style={{ flex: 1, textAlign: 'center', textAlignVertical: 'center' }} />
            </TouchableOpacity>

            <TextInput value={this.state.keyword} onChangeText={this._changeKeyWord} blurOnSubmit autoFocus ref="searchInput" onSubmitEditing={this._search} style={styles.searchInput} placeholder="请输入关键词" placeholderTextColor="#fff8" />

            <TouchableOpacity onPress={this._search} >
              <Text style={styles.search_btn}>搜索</Text>
            </TouchableOpacity>

          </LinearGradient>

          <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 1, display: 'flex', alignItems: 'center' }}>

              <BoxShadow setting={shadowOpt}>

              </BoxShadow>

            </View>
          </ScrollView>

        </View>
      </LinearGradient >
    );
  }
}
