import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles/index';
import { BoxShadow } from 'react-native-shadow';
const { width } = Dimensions.get('window');
import IoniconsFeather from 'react-native-vector-icons/Feather';

const shadowOpt = {
  width: width - 60,
  height: 140,
  color: "#fff",
  border: 4,
  radius: 8,
  opacity: 0.12,
  x: 0,
  y: 0,
  style: {
    paddingBottom: 6,
    marginTop: 20,
    // padding: 20,
  }
};

export default class Index extends Component {
  static navigationOptions = {
    title: '图书馆',
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <LinearGradient start={{ x: 0.0, y: 0.3 }} end={{ x: 1, y: 0 }} colors={['#a7afff', '#f39fff']} style={styles.MainlinearGradient}>
        <View style={styles.container}>

          <BoxShadow setting={shadowOpt}>
            <TouchableOpacity style={{ width: '100%', flex: 1 }} onPress={() => {
              this.props.navigation.navigate('OpacSearch');
            }}>
              <View style={styles.item}>
                <IoniconsFeather name='search' size={60} color='#FFF' />
                <Text style={styles.text}>查找图书</Text>
              </View>
            </TouchableOpacity>
          </BoxShadow>


          <BoxShadow setting={shadowOpt}>
            <TouchableOpacity style={{ width: '100%', flex: 1 }} onPress={() => {
              this.props.navigation.navigate('OpacLogin');
            }}>
              <View style={styles.item}>
                <IoniconsFeather name='at-sign' size={60} color='#FFF' />
                <Text style={styles.text}>登陆系统</Text>
              </View>
            </TouchableOpacity>
          </BoxShadow>

        </View>
      </LinearGradient>
    );
  }
}
