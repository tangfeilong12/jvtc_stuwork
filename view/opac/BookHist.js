import React, { Component } from 'react';
import { View, Text, StatusBar, Alert, ScrollView, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles/info_styles'
import IoniconsFeather from 'react-native-vector-icons/Feather';
import { getBookHist } from './api';


export default class BookHist extends Component {
  static navigationOptions = {
    title: '借阅历史',
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      table_line: [],
      listReNew: [],
      code: '',
      imgBase64: '',
      renewalObj: null
    };
    StatusBar.setBarStyle('dark-content');
  }

  async componentDidMount() {
    try {
      const { data } = await getBookHist();
      console.warn(data.table_line);

      this.setState({
        table_line: data.table_line,
        listReNew: data.listReNew
      });
    } catch (error) {
      console.warn("==>", error);
      Alert.alert("出错了", error.message || error);
    }

  }

  _renderList = () => {

    return this.state.table_line.map(item => {
      if (!Array.isArray(item)) return null;
      const [title, about] = [item[2], item[3]];
      return (<View style={styles.item_style} key={item[0]}>
        <View style={{ paddingLeft: 4, paddingRight: 4, borderBottomColor: '#eee', borderBottomWidth: StyleSheet.hairlineWidth, width: '100%', height: 40, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
          <IoniconsFeather name='book-open' size={20} color='#000' style={{ marginLeft: 4 }} />
          <Text ellipsizeMode='tail' numberOfLines={1} style={styles.item_title}>{title}</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 10 }}>
          <Text style={styles.item_subhead}>借阅时间：<Text style={{ color: '#a7afff' }}>{item[4]}</Text></Text>
          <Text style={styles.item_subhead}>还书时间：<Text style={{ color: '#f39fff' }}>{item[5]}</Text></Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 10, paddingTop: 0 }}>
          <Text style={styles.item_info} ellipsizeMode='tail' numberOfLines={1} >作者/出版：{about}</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 10, paddingTop: 0 }}>
          <Text style={styles.item_info}>编号：{item[1]}</Text>
          <Text style={styles.item_info}>位置：{item[6]}</Text>
        </View>
      </View>)

    });

  }

  render() {

    return (
      <LinearGradient start={{ x: 0.0, y: 0.3 }} end={{ x: 1, y: 0 }} colors={['#a7afff', '#f39fff']} style={styles.MainlinearGradient}>

        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1, display: 'flex', alignItems: 'center', margin: 20 }}>

            {
              this._renderList()
            }

          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
}
