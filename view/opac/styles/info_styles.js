import { StyleSheet, StatusBar } from 'react-native';
export default StyleSheet.create({
  MainlinearGradient: {
    flex: 1,
  },
  item_title: {
    color: '#000', fontSize: 18, fontWeight: '700', marginLeft: 4, flex: 1
  },
  item_subhead: {
    marginTop: 4, color: '#333', fontWeight: '700'
  },
  item_info: {
    marginTop: 4
  },
  item_style: {
    marginBottom: 20,
    width: '100%',
    flex: 1,
    borderColor: '#fff7',
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#f0f0f0"
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
    flexGrow: 1
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
  },
  btnDs: {
    opacity: 0.4
  },
  item_main_title: {
    marginBottom: 10,
    paddingLeft: 4, paddingRight: 4, borderBottomColor: '#eee', borderBottomWidth: StyleSheet.hairlineWidth, width: '100%', height: 40, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'
  },
  item_main_li: {
    display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 10, paddingTop: 0, paddingBottom: 10
  }
});