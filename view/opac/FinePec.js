import React, { Component } from 'react';
import { View, Text, StatusBar, Alert, ScrollView, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles/info_styles'
import IoniconsFeather from 'react-native-vector-icons/Feather';
import { getFinePec } from './api';


export default class FinePec extends Component {
  static navigationOptions = {
    title: '违章缴费',
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
      const { data } = await getFinePec();
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
      const [title, about] = [item[2], item[1]];
      return (<View style={styles.item_style} key={item[0]}>
        <View style={styles.item_main_title}>
          <IoniconsFeather name='calendar' size={20} color='#000' style={{ marginLeft: 4 }} />
          <Text ellipsizeMode='tail' numberOfLines={1} style={styles.item_title}>{title}</Text>
        </View>
        <View  style={styles.item_main_li}>
          <Text style={styles.item_subhead}>条码号：<Text style={{ color: '#f39fff' }}>{item[0]}</Text></Text>
          <Text style={styles.item_subhead}>状态：<Text style={{ color: '#a7afff' }}>{item[9]}</Text></Text>
        </View>
        <View style={styles.item_main_li}>
          <Text style={styles.item_info} ellipsizeMode='tail' numberOfLines={1} >借阅日：{about}</Text>
          <Text style={styles.item_info} ellipsizeMode='tail' numberOfLines={1} >应还日：{about}</Text>
        </View>
        <View style={styles.item_main_li}>
          <Text style={styles.item_info}>应缴：{item[7]}</Text>
          <Text style={styles.item_info}>实缴：{item[8]}</Text>
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
