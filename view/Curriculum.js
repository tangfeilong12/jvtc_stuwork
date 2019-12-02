import React, { Component, Fragment } from 'react';
import {
  Text, View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,StatusBar
} from 'react-native';
import Header from '../components/Header';
import getStringToColor from '../utils/getStringToColor';
import Course from '../utils/Course';
import AsyncStorage from "@react-native-community/async-storage";
const { width, height } = Dimensions.get('window');
import Spinner from 'react-native-loading-spinner-overlay';
import { format, compareAsc } from 'date-fns'

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
    fontSize: 16,
  },
  next_perv: {
    color: '#fff'
  },
  main: { backgroundColor: "#fff", display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between' },
  left_time: { height: '100%', width: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' },
  lineStyle: { backgroundColor: '#eee', height: StyleSheet.hairlineWidth, width: width * 2 },
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
    // marginLeft: 1,
    // marginRight: 1,
    overflow: 'hidden'
  },
  week_day_item: {
    flex: 1,
    // backgroundColor: "#dac",
    borderRadius: 4,
    padding: 4,
    paddingLeft: 2,
    paddingRight: 2,
    height: "100%",
    overflow: 'hidden',
    textAlign: 'center',
  },
  item_title: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 11,
    lineHeight: 14,
    textAlign: 'center',
    marginBottom:2
  },
  item_info: {
    fontSize: 10,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 13
  },
  spinnerTextStyle: {
    color: '#f000'
  }
});

function getDate(now = 0) {
  return {
    data: format(Date.now() + now * 7 * 24 * 60 * 60 * 1000, 'yyyy-MM-dd'),
    m: format(Date.now() + now * 7 * 24 * 60 * 60 * 1000, 'M'),

  };
}
getDate.c = 0;

export class Curriculum extends Component {
  constructor(props) {
    super(props);
    let day = new Date().getDay();
    // if (day === 0) {
    //   day = 7;
    // }
    this.state = {
      courses: [],
      timetable: [],
      week: {},
      week_day: day,
      loginName: "",
      spinner: true,
      c_date: getDate().data,
      c_month: getDate().m
    };
  }

  static navigationOptions = {
    title: '课表',
  };
  getData = async (loginName, currentWeek) => {
    if (currentWeek >= this.state.week.totalWeek) return;
    if (currentWeek <= 0) return;
    if (this.getData.stat === 1) return;
    this.getData.stat = 1;

    this.setState({
      spinner: true
    });

    const oldWeekIndex = this.state.week && this.state.week.currentWeek;

    week = currentWeek && { ...this.state.week, currentWeek } || await Course.getWeek();

    if (week) {
      this.setState({ week });
      const { timetable, courseList: courses } = await Course.getCourseData(week.currentWeek, loginName);
      console.warn('oldWeekIndex', oldWeekIndex);
      if (oldWeekIndex) {
        getDate.c -= oldWeekIndex > currentWeek ? 1 : -1;
        console.warn(getDate.c);
      }
      const datex = getDate(getDate.c);

      courses.unshift(courses.pop())

      this.setState({ courses: courses, spinner: false, timetable, c_date: datex.data, c_month: datex.m });
    }

    this.getData.stat = 0;

  }
  showCurrentInfo = async (course) => {
    const str = course.reduce((a, b) => a + b + '\n', '');

    Alert.alert(
      course[0] || '无法显示',
      str
    );

  }
  async componentWillMount() {
    StatusBar.setBarStyle("light-content");
    const loginName = await AsyncStorage.getItem('loginName');
    const courses = await AsyncStorage.getItem(loginName + 'courses');
    const timetable = await AsyncStorage.getItem(loginName + 'timetable');
    const week = await AsyncStorage.getItem(loginName + 'week');
    const courses_time = await AsyncStorage.getItem(loginName + 'courses_time');
    const oldTime = new Date(parseInt(courses_time));
    this.setState({
      loginName
    });
    if (new Date().getDate() === oldTime.getDate() && courses) {
      try {
        this.setState({
          courses: JSON.parse(courses),
          week: JSON.parse(week || {}),
          spinner: false,
          timetable: JSON.parse(timetable || []),
        });
        return;
      } catch (error) { }
    }

    for (let i = 0; i < 3; i++) {
      try {
        await this.getData(loginName);
        AsyncStorage.setItem(loginName + 'courses', JSON.stringify(this.state.courses));
        AsyncStorage.setItem(loginName + 'week', JSON.stringify(this.state.week));
        AsyncStorage.setItem(loginName + 'courses_time', Date.now().toString());
        return;
      } catch (error) {
        this.getData.stat = 0;
        console.warn(error);
      }
      this.getData.stat = 0;
    }
    this.setState({
      spinner: false
    });
    Alert.alert("好像出了点小问题，等会再试吧");
  }
  render() {
    const { courses, week, week_day, loginName, timetable, c_date, c_month } = this.state;
    return (
      <View style={styles.container}>
        <Header
          isL={true}
          center={
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={styles.title}>第{week.currentWeek}周</Text>
              <Text style={{ color: '#eed' }}>{c_date}</Text>
            </View>
          }
          left={
            <TouchableOpacity onPress={() => { this.getData(loginName, week.currentWeek - 1) }}>
              <Text style={styles.next_perv}>上一周</Text>
            </TouchableOpacity>
          }
          right={
            <TouchableOpacity onPress={() => { this.getData(loginName, week.currentWeek + 1) }}>
              <Text style={styles.next_perv}>下一周</Text>
            </TouchableOpacity>
          }
        />
        {/* loading */}
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        {/* 主要内容块 */}
        <View style={styles.main}>
          {/* 左边的时间 */}
          <View style={styles.left_time}>
            <Text style={[styles.head_h, styles.left_w, { flex: 0 }]}>{c_month}月</Text>
            {
              timetable.map((item, index) => (
                <Fragment key={String(Math.random())}>
                  <Text key={String(Math.random())} style={styles.left_w}>{index + 1}{'\n'}<Text style={{ fontSize: 10 }}>{(item.length && item[item.length - 1] || '').replace('-', '\n')}</Text></Text>
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
                ['日', '一', '二', '三', '四', '五', '六'].map((item, index) => (
                  <Text style={[styles.head_w, styles.head_h, week_day === (index) ? { backgroundColor: "#eee" } : {}]} key={item}>周{item}</Text>
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
                      item.map(course => course.length && (
                        <TouchableOpacity key={Math.random().toString()} style={styles.week_day_item_box} onPress={() => { this.showCurrentInfo(course) }}>

                          <View style={[styles.week_day_item, course && { backgroundColor: getStringToColor(course[1] || '') } || {}]}>
                            <Text style={styles.item_title}>{course && course[0]}</Text>
                            <Text style={styles.item_info}>@{course.length === 9 && course[5] || course[6]}</Text>
                          </View>

                        </TouchableOpacity>
                      ) || <View key={Math.random().toString()} style={styles.week_day_item_box}></View>)
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
