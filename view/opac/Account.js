import React, { Component } from 'react';
import { View, Text, StatusBar, Alert, ScrollView, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles/info_styles'
import IoniconsFeather from 'react-native-vector-icons/Feather';
import { getAccount } from './api';


export default class BookHist extends Component {
  static navigationOptions = {
    title: '帐目清单',
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
      const { data } = await getAccount();
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
      if (item.length === 1) {
        return (<View style={styles.item_style} key={item[0]}>
          <View style={styles.item_main_title}>
            <IoniconsFeather name='meh' size={20} color='#000' style={{ marginLeft: 4 }} />
            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.item_title}>{item[0]}</Text>
          </View>
        </View>)
      }
      const [title, about] = [item[5], item[3]];
      return (<View style={styles.item_style} key={item[0]}>
        <View style={styles.item_main_title}>
          <IoniconsFeather name='wind' size={20} color='#000' style={{ marginLeft: 4 }} />
          <Text ellipsizeMode='tail' numberOfLines={1} style={styles.item_title}>{title}</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 10 }}>
          <Text style={styles.item_subhead}>结算项目：<Text style={{ color: '#a7afff' }}>{item[1]}</Text></Text>
          <Text style={styles.item_subhead}>结算时间：<Text style={{ color: '#f39fff' }}>{item[0]}</Text></Text>
        </View>
        <View style={styles.item_main_li}>
          <Text style={styles.item_info} ellipsizeMode='tail' numberOfLines={1} >缴款：{item[3]}</Text>
          <Text style={styles.item_info}>退款：{item[2]}</Text>
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
