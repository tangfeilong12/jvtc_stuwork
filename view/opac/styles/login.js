import { StyleSheet, StatusBar } from 'react-native';
import { isiOS, isiPhoneX } from '../../../utils/device';
const statusBarHeight = isiOS() ? (isiPhoneX() ? 34 : 20) : StatusBar.currentHeight;

export default StyleSheet.create({
  MainlinearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    // paddingTop: 30 +statusBarHeight,
    alignItems: 'center'
  },
  HeaderlinearGradient: {
    height: 40 + statusBarHeight,
  },
  header: {
    flex: 1,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
    textAlign: 'center',
    margin: 10,
    marginBottom: 20
  },
  input: {
    borderColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    margin: 10,
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    height: 46,
    fontWeight: '600',
    color: '#fff',
    flexGrow:1
  },
  btn: {
    textAlign: 'center',
    margin: 10,
    // padding: 10,
    height: 44,
  },
  btn_t: {
    flex: 1,
    borderRadius: 20,
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  btn_text: {
    flex: 1,
    display:'flex',
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent:'center',
    alignItems:"center",
    color: "#fff",
    fontWeight: '700',
    lineHeight:44,
  },
  btnDs:{
    opacity:0.4
  }
});