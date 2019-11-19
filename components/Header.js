import React from 'react';
import { Dimensions, View, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { BoxShadow } from 'react-native-shadow';
const { width } = Dimensions.get('window');
const statusBarHeight = StatusBar.currentHeight;
const styles = StyleSheet.create({
  head: {
    width: '100%',
    height: 42 + statusBarHeight,
    // backgroundColor: '#FFD034',
    paddingTop: statusBarHeight,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  bg: {
    width: '100%', height: 42 + statusBarHeight
  },
  left: {

  },
  center: {

  },
  right: {

  }
});

const shadowOpt = {
  width: width,
  height: 48 + statusBarHeight,
  color: "#222c69",
  border: 6,
  // radius: 25,
  opacity: 0.12,
  x: 0,
  y: -6,
};

const Header = ({ left, right, center, isL }) => {

  return (
    <BoxShadow setting={shadowOpt}>
      <ImageBackground resizeMode='cover' source={isL ? require('../assets/img/f_bg.png') : require('../assets/img/home_top.png')} style={styles.bg}>
        <View style={styles.head}>
          <View style={styles.left}>
            {left}
          </View>
          <View style={styles.center}>
            {center}
          </View>
          <View style={styles.right}>
            {right}
          </View>
        </View>
      </ImageBackground>
    </BoxShadow>
  );
}

Header.propTypes = {
  left: PropTypes.element,
  center: PropTypes.element,
  right: PropTypes.element,
  isL: PropTypes.bool,
}
export default Header;
