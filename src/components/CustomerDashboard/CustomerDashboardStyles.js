const React = require('react-native');
const { Dimensions, StyleSheet } = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FAFAFA'
  },
  banner_image: {
    width: Dimensions.get('window').width,
    height: 150,
    resizeMode: 'stretch',
  },
  logo_image: {
    position: 'absolute',
    width: 100,
    height: 90,
    top: 40
  },
  section_servicios_container: {
    height: 270,
    padding: 10,
    borderRadius: 5,
    margin: 10,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    shadowColor: 'lightgray',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,
  },

  section_trabajos_container: {
    height: 200,
    padding: 10,
    borderRadius: 5,
    margin: 10,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    shadowColor: 'lightgray',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,
  },
  trabajos_container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  trabajos_item :{
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trabajos_avatars_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  trabajos_item_title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '900'
  },
  trabajos_item_date: {
    flex: 1,
    color: '#2478AE'
  },
  trabajos_avatar_image: {
    height: 30,
    resizeMode: 'contain'
  },
  trabajos_item_footer: {
    flex: 1
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
    borderTopWidth: 3,
    height: 60,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    paddingHorizontal: 50,
    borderColor: '#DDDCDC'
  },
  footer_item: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  footer_item_text: {
    color: 'gray'
  },
});