import { StyleSheet, StatusBar } from 'react-native';
import { isiPhoneX, isiOS } from '../../../utils/device';
const statusBarHeight = isiOS() ? (isiPhoneX() ? 34 : 20) : StatusBar.currentHeight;

export default StyleSheet.create({
  MainlinearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    // paddingTop: 30 + StatusBar.currentHeight,
    alignItems: 'center',
    padding: 10
  },
  item: {
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: '#fff',
    flex: 1,
    padding: 10,
    margin: 10,
    marginTop: 10,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '600'
  },
  header: {
    width: '100%',
    height: 40 + statusBarHeight,
    backgroundColor: '#00f',
    
  }
});