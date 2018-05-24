const React = require('react-native');
const { Dimensions, StyleSheet } = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'lightgray'
  },
  banner_image: {
    width: Dimensions.get('window').width,
    height: 200,
    resizeMode: 'contain',
  },
  logo_image: {
    position: 'absolute',
    width: 120,
    height: 110,
    top: 50
  },
  section_servicios_container: {
    height: 270,
    padding: 10,
    borderRadius: 5,
    margin: 10,
    backgroundColor: 'white',
    alignItems: 'flex-start'
  },
  section_trabajos_container: {
    height: 200,
    padding: 10,
    borderRadius: 5,
    margin: 10,
    backgroundColor: 'white',
    alignItems: 'flex-start'
  },
  section_title:  {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 10
  },
  servicios_container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  servicios_item :{
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  servicios_item_image: {
    width: Dimensions.get('window').width,
    height: 200,
    resizeMode: 'cover',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    height: 70,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    paddingHorizontal: 50
  },
  footer_item: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  footer_item_text: {
    color: 'gray'
  }
});