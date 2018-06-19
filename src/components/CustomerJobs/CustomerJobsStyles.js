const React = require('react-native');
const {Dimensions, StyleSheet} = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff'
  },
  header: {
    width: Dimensions.get('window').width,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    borderColor: '#DDDCDC',
    borderBottomWidth: 1,
    paddingBottom: 10
  },
  header_title: {
    fontSize: 20,
    color: '#2478AE',
    fontWeight: '600'
  },
  main_content: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between'
  },
})