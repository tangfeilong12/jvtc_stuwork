import React, { Component, Fragment } from 'react';
import {
  Text, View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert
} from 'react-native';
import Header from '../components/Header';
import getStringToColor from '../utils/getStringToColor';
import Course from '../utils/Course';
import AsyncStorage from "@react-native-community/async-storage";
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 0,
    left: 0,
    backgroundColor: '#f9f9f9'
  },
  title: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 20,
  },
  main: { backgroundColor: "#fff", display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between' },
  left_time: { height: '100%', width: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' },
  lineStyle: { backgroundColor: '#ccc', height: StyleSheet.hairlineWidth, width: width * 2 },
  head_h: {
    height: 30,
    textAlignVertical: 'center',
    textAlign: 'center',
    backgroundColor: '#fafafa',
    padding: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee'
  },
  head_w: {
    flex: 1
  },
  left_w: {
    width: 40,
    textAlign: 'center',
    backgroundColor: '#fafafa',
    flex: 1,
    textAlignVertical: 'center'
  },

  week: {
    flexGrow: 1,
  },
  week_day: {
    display: 'flex', flexDirection: 'row', flex: 1
  },
  week_day_item_box: {
    flex: 1,
    margin: 2,
    // overflow: 'hidden'
  },
  week_day_item: {
    flex: 1,
    // backgroundColor: "#dac",
    borderRadius: 4,
    padding: 3,
    height: "100%",
    overflow: 'hidden',
    textAlign: 'center'
  },
  item_title: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 16,
  },
  item_info: {
    fontSize: 12,
    color: '#fff',
  }
});

export class Curriculum extends Component {
  constructor(props) {
    super(props);
    let day = new Date().getDay();
    if (day === 0) {
      day = 7;
    }
    this.state = {
      courses: [],
      week: '0',
      week_day: day
    };
  }

  static navigationOptions = {
    title: '课表',
  };
  getData = async (loginName) => {
    const week = await Course.getWeek();
    if (week) {
      this.setState({
        week: week.currentWeek
      });
      const courses = await Course.getCourseData(week.currentWeek, loginName);
      this.setState({ courses });
    }
  }
  async componentWillMount() {
    const loginName = await AsyncStorage.getItem('loginName')
    const courses = await AsyncStorage.getItem(loginName + 'courses');
    const courses_time = await AsyncStorage.getItem(loginName + 'courses_time');
    const oldTime = new Date(courses_time);

    if (new Date().getDate() === oldTime.getDate() && courses) {
      try {
        this.setState({
          courses: JSON.parse(courses)
        });
        return;
      } catch (error) { }
    }

    for (let i = 0; i < 3; i++) {
      try {
        await this.getData(loginName);
        AsyncStorage.setItem(loginName + 'courses', JSON.stringify(this.state.courses));
        AsyncStorage.setItem(loginName + 'courses_time', Date.now());
        return ;
      } catch (error) {
        console.warn(error);
        
       }
    }
    Alert.alert("好像出了点小问题，等会再试吧");
  }
  render() {
    const { courses, week, week_day } = this.state;
    return (
      <View style={styles.container}>
        <Header
          center={
            <Text style={styles.title}>第{week}周</Text>
          }
        />
        {/* 主要内容块 */}
        <View style={styles.main}>
          {/* 左边的时间 */}
          <View style={styles.left_time}>
            <Text style={[styles.head_h, styles.left_w, { flex: 0 }]}>{new Date().getMonth() + 1}月</Text>
            {
              new Array(12).join().split(',').map((item, index) => (
                <Fragment key={String(Math.random())}>
                  <Text key={String(Math.random())} style={styles.left_w}>{index + 1}</Text>
                  <View key={String(Math.random())} style={styles.lineStyle}></View>
                </Fragment>
              ))
            }
          </View>
          {/* 主要的 */}
          <View style={styles.week}>
            {/* 上面的日期 */}
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              {
                ['一', '二', '三', '四', '五', '六', '日'].map((item, index) => (
                  <Text style={[styles.head_w, styles.head_h, week_day === (index + 1) ? { backgroundColor: "#eee" } : {}]} key={item}>周{item}</Text>
                ))
              }
            </View>
            {/* 下面课程内容 */}
            <View style={styles.week_day}>
              {/* 一周 */}
              {
                courses.map((item, index) => (
                  <View key={index} style={{ flex: 1 }}>
                    {
                      item.map(course => (
                        <TouchableOpacity key={Math.random().toString()} style={styles.week_day_item_box}>

                          <View style={[styles.week_day_item, course && { backgroundColor: getStringToColor(course.courseName) } || {}]}>
                            <Text style={styles.item_title}>{course && course.courseName}</Text>
                            <Text style={styles.item_info}>@{course && course.classRoom}</Text>
                          </View>

                        </TouchableOpacity>
                      ))
                    }
                  </View>
                ))
              }

            </View>

          </View>
        </View>
      </View>
    );
  }
}

export default Curriculum;
