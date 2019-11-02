import React, { Component } from 'react';
import { View, Text, Alert, Dimensions, ScrollView, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles/search';
import { BoxShadow } from 'react-native-shadow';
const { width } = Dimensions.get('window');
import IoniconsFeather from 'react-native-vector-icons/Feather';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-root-toast';
import { search, getDetail } from './api';
const hisList = new Map();
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
      console.warn(1);

      const { data } = await search(keyword);
      console.warn(3);
      this.setState({
        list: data
      });
      if (!data.length) {
        Toast.show("未找到", { opacity: 0.6 })
      } else {
        Toast.show("搜索到" + data.length + "本", { opacity: 0.6 })
      }
      console.warn(4);
    } catch (error) {
      console.warn(5);
      Toast.show(error.message || '出现问题', { opacity: 0.5 })
    } finally {
      this.setState({
        spinner: false
      });
    }
  }
  _showDetail = async (id) => {
    try {
      const data = hisList.get(id) || (await getDetail(id)).data;
      hisList.set(id, data);
      const info = data.reduce((a, b) => {
        return a + b.reduce((a1, b1) => {
          return a1 + b1 + ' ';
        }, '') + '\n';
      }, '');
      Alert.alert("细节", info);
    } catch (error) {
      console.warn(error);
    }
  }
  _changeKeyWord = (text) => {
    this.setState({
      keyword: text
    })
  }
  _showList = () => {
    return this.state.list.map(item => {
      return (
        <View style={styles.item_style} key={item.id} >
          <TouchableOpacity style={{ flex: 1 }} onPress={() => { this._showDetail(item.id) }}>
            <Text style={styles.item_title}>{item.title}</Text>
            <Text style={styles.item_subhead}>当前总数：{item.stat && item.stat.allCount || 0} 当前可借：{item.stat && item.stat.canCount || 0}</Text>
            <Text style={styles.item_info}>{item.where}</Text>
            <Text style={styles.item_info}>{item.author}</Text>
          </TouchableOpacity>
        </View>
      );
    });
  }
  render() {
    return (
      <LinearGradient start={{ x: 0.0, y: 0.3 }} end={{ x: 1, y: 0 }} colors={['#a7afff', '#f39fff']} style={styles.MainlinearGradient}>

        <View style={styles.container}>
          {/* loading */}
          <Spinner
            cancelable={true}
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
            <View style={{ flex: 1, display: 'flex', alignItems: 'center', margin: 20 }}>

              {
                this._showList()
              }

            </View>
          </ScrollView>

        </View>
      </LinearGradient >
    );
  }
}
