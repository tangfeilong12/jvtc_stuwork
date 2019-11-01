import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, TextInput, Image, Alert, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles/info_styles'
import IoniconsFeather from 'react-native-vector-icons/Feather';
import { getBookList, getCode, renew } from './api';
const { width } = Dimensions.get('window');
import { BoxShadow } from 'react-native-shadow';
import Toast from 'react-native-root-toast';

const testImg = 'data:application/octet-stream;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAyCAMAAACd646MAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0ZEOEMxNzlGMjMxMTFFOTgzQUZCRDM5MUFFRjAzOEEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0ZEOEMxN0FGMjMxMTFFOTgzQUZCRDM5MUFFRjAzOEEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozRkQ4QzE3N0YyMzExMUU5ODNBRkJEMzkxQUVGMDM4QSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozRkQ4QzE3OEYyMzExMUU5ODNBRkJEMzkxQUVGMDM4QSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtBM9zAAAAAzUExURbXM/9De/+jv/6G9//r7/+7z/6/H/9zn/8PV//P3/6jC/9bi/8na/+Pr/73R/5q5/////1EUQ1cAAAIlSURBVHja7JbZkuwgCIYBTVwT8/5PO6jRaJZeT52aqQoXfWHQT+EHGpb/YHBDbsgNuSG/HTKQ/AYikZ47UQj4DcSFzlvKTyDS6odXxQ4yCf0JRIXgLgljiAagDYddh7Sg9gAipdkJi8kjhLeZS0goJtNtpsWIYJtHhtanGLUQI/NDx+tYGVIQLEDcYELgUE1aPoNgC9FxxfJDHQ2v5GQMov/kE4TDZbac0A4yt/j5TL28f+KXIHp+DNhDQBKkP3rYQQyhrxvhXDPn9gCy7CDRGILk0EaI57jxCSPMdIDEl4BgZ7apVPcFRO8g/FFkd0g/1KWu5sLWHExdJVTNdBDYQTj3voVwGhy2EBTAGp9RxdsP9ZYFAi9ApFiLZIWIPqpFgTUPlj2UcO9BVFlJ7lmRjT6iOFDEhIwZwh66qasOoitk7iFQmkRyz7UVN6iu6yChqvrkJJomJ6ZCYFX9Xl0mp31wfN05QZArw1WJ5oDarh7b3OdCGyG9VCT1HSqeu3hagPXLptih7RyxKwhIO7lztd0UT4tIqA5ic9pdrAE+15SriFZAYVuT8SG+nYcToob6ktiItw4FJcL6OEZpN0gNkebOokp47MU8gfN50gX/hbnF0bGsAw/HdiovIQv5p+erFIposdOKYRHhZAg21fHJjN/EIOXIDE6gV/IfQyTnkodrqj/5YOqIbyBrQT7dMBzn3puQAfzyvt3/hW/IDbkhfxHyI8AAqmoihAi//68AAAAASUVORK5CYII='

const shadowOpt = {
  width: width - 60,
  height: 190,
  color: "#a7afff",
  border: 2,
  radius: 4,
  opacity: 0.98,
  x: 0,
  // y: -6,
  style: { padding: 10, marginTop: -150, marginLeft: -(width - 60) / 2, borderRadius: 4, borderColor: '#a7afff', borderWidth: StyleSheet.hairlineWidth, position: 'absolute', zIndex: 10, top: '50%', left: "50%" }
};

export default class BookList extends Component {
  static navigationOptions = {
    title: '借阅中',
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
      const { data } = await getBookList();
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

  isOverdue(dateStr) {
    const date = (new Date(dateStr)).getTime();
    const c_date = Date.now();
    const interval = 10 * 24 * 60 * 60 * 1000;
    if (date <= c_date) {
      return true;
    }
    if (date - c_date <= interval) {
      return true;
    }
    return false;
  }

  _handleRenewal = (data) => {
    this._getCodeData();
    this.setState({
      renewalObj: data,
    });
  }

  _handleRenewalGo = async () => {
    const { renewalObj, listReNew, code, table_line } = this.state;


    if (!code) {
      return Toast.show("请先输入验证码", { opacity: 0.6 });
    }
    const obj = renewalObj;
    const id = obj[0];
    const checkObj = listReNew.find(item => item.id === id);

    if (checkObj) {
      const check = checkObj.check;
      try {
        const { data } = await renew({
          barcode: id,
          check,
          code,
        });
        console.warn(data);
        Toast.show('续借成功', { opacity: 0.6 });
        this._closeRenew();
        const date = new Date(renewalObj[3]);
        date.setMonth(date.getMonth() + 1);
        renewalObj[3] = date.toLocaleDateString();
        renewalObj[4] += 1;
        this.setState({
          table_line: JSON.parse(JSON.stringify(table_line))
        });
      } catch (error) {
        Toast.show(error.message || '未知错误', { opacity: 0.6 });
      }

    } else {
      this._closeRenew();
      Toast.show("出现问题，请重新登陆", { opacity: 0.6 });
    }

  }

  _closeRenew = () => {

    this.setState({
      imgBase64: '',
      renewalObj: null
    });
  }

  _renderList = () => {

    return this.state.table_line.map(item => {
      if (!Array.isArray(item)) return null;
      const titleAndAbout = item[1] || '/';
      const [title, about] = titleAndAbout.split('/');
      return (<View style={styles.item_style} key={item[0]}>
        <View style={{ paddingLeft: 4, paddingRight: 4, borderBottomColor: '#eee', borderBottomWidth: StyleSheet.hairlineWidth, width: '100%', height: 40, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
          <IoniconsFeather name='book-open' size={20} color='#000' style={{ marginLeft: 4 }} />
          <Text ellipsizeMode='tail' numberOfLines={1} style={styles.item_title}>{title}</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 10 }}>
          <Text style={styles.item_subhead}>借阅时间：<Text style={{ color: '#a7afff' }}>{item[2]}</Text></Text>
          <Text style={styles.item_subhead}>到期时间：<Text style={{ color: '#f39fff' }}>{item[3]}</Text></Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 10, paddingTop: 0 }}>
          <Text style={styles.item_info} ellipsizeMode='tail' numberOfLines={1} >作者/出版：{about}</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 10, paddingTop: 0 }}>
          <Text style={styles.item_info}>编号：{item[0]}</Text>
          <Text style={styles.item_info}>续约次数：{item[4]}</Text>
        </View>
        {
          this.isOverdue(item[3]) ? (
            <TouchableOpacity style={{ margin: 10, marginTop: 0 }} onPress={() => {
              this._handleRenewal(item)
            }}>
              <Text style={{ backgroundColor: '#a7afff', color: '#fff', borderRadius: 4, padding: 10, textAlign: 'center' }}>续约</Text>
            </TouchableOpacity>
          ) : null
        }
      </View>)

    });

  }

  _changeCode = (text) => {
    this.setState({
      code: text
    });
  }
  _getCodeData = async () => {

    if (this._getCodeData.ing) return;
    this._getCodeData.ing = true;
    this._getCodeData.num = this._getCodeData.num || 0;
    try {
      const { data } = await getCode();

      const { code } = data;
      this.setState({
        imgBase64: code
      });
      this._getCodeData.num = 0;
      this._getCodeData.ing = false;

    } catch (error) {
      this._getCodeData.ing = false;
      this._getCodeData.num += 1;
      if (this._getCodeData.num >= 3) {
        return Alert.alert("获取数据失败，请截图发给开发者", error.message);
      }
      await this._getCodeData();
    }
  }

  render() {

    const { code, imgBase64, renewalObj } = this.state;

    return (
      <LinearGradient start={{ x: 0.0, y: 0.3 }} end={{ x: 1, y: 0 }} colors={['#a7afff', '#f39fff']} style={styles.MainlinearGradient}>

        {
          Array.isArray(renewalObj) && renewalObj[0] && (<BoxShadow setting={shadowOpt} >
            <Text style={{ color: '#fff', padding: 10, fontWeight: 'bold' }}>书籍ID：{renewalObj && renewalObj[0]}</Text>
            <IoniconsFeather name='x' size={20} color='#fff' style={{ position: 'absolute', right: 0, top: 0, padding: 4, margin: 10 }} onPress={this._closeRenew} />

            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <TextInput
                style={styles.input}
                value={code}
                onChangeText={this._changeCode}
                placeholder="请输入验证码"
                placeholderTextColor="#eee"
              />
              <TouchableOpacity onPress={this._getCodeData} style={{ width: 100, margin: 10, marginLeft: 0 }} >
                <Image style={{ flex: 1, borderRadius: 2 }} resizeMode='stretch' source={{ uri: imgBase64 && `data:image/png;base64,${imgBase64}` || testImg }} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={this._handleRenewalGo}>
              <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', backgroundColor: '#f39fff', padding: 10, margin: 10, borderRadius: 6 }}>续约</Text>
            </TouchableOpacity>
          </BoxShadow>)
        }

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
