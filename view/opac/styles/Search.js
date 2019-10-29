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
  }
});