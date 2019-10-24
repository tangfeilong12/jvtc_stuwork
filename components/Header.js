import React from 'react';
import { Dimensions, View, StyleSheet, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import { BoxShadow } from 'react-native-shadow';
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  head: {
    width: '100%',
    height: 68,
    // backgroundColor: '#FFD034',
    paddingTop: 20,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
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
  height: 74,
  color: "#222c69",
  border: 6,
  // radius: 25,
  opacity: 0.12,
  x: 0,
  y: -6,
};

const Header = ({ left, right, center }) => {

  return (
    <BoxShadow setting={shadowOpt}>
      <ImageBackground resizeMode='cover' source={require('../assets/img/home_top.png')} style={{ width: '100%', height: 68 }}>
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
}
export default Header;
