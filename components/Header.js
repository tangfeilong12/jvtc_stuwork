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
    width: '100%',
    height: 42 + statusBarHeight,
    backgroundColor: '#ffffff',
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
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
  opacity: 0,
  x: 0,
  y: -6,
};

const Header = ({ left, right, center, isL, bgcolor = '#ffffff' }) => {
  return (
    <BoxShadow setting={shadowOpt}>
      <View resizeMode='cover' style={[styles.bg, { backgroundColor: bgcolor }]}>
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
      </View>
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
