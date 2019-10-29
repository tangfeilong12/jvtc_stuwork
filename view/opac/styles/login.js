import { StyleSheet, StatusBar } from 'react-native';
export default StyleSheet.create({
  MainlinearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    // paddingTop: 30 + StatusBar.currentHeight,
    alignItems: 'center'
  },
  HeaderlinearGradient: {
    height: 40 + StatusBar.currentHeight,
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
  },
  btn_text: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: "#fff",
    fontWeight: '700'
  }
});