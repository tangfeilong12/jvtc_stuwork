import { StyleSheet, StatusBar } from 'react-native';
export default StyleSheet.create({
  MainlinearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 50 + StatusBar.currentHeight,
    backgroundColor: '#00f',
    paddingTop: StatusBar.currentHeight,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: '#fff9',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  searchInput: {
    flexGrow: 1,
    backgroundColor: '#fff4',
    height: 36,
    borderRadius: 20,
    padding: 0,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  search_btn: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 12,
    marginLeft: 12,
  },
  spinnerTextStyle: {
    color: '#f000'
  },
  item_title: {
    color: '#000', fontSize: 16, fontWeight: '700'
  },
  item_subhead: {
    marginTop: 4, color: '#333', fontWeight: '700'
  },
  item_info: {
    marginTop: 4
  },
  item_style: {
    padding: 20,
    marginBottom: 20,
    width: '100%',
    flex: 1,
    borderColor: '#fff7',
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#f0f0f0"
  }
});