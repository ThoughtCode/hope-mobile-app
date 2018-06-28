const React = require('react-native');
const { Dimensions, StyleSheet } = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FAFAFA'
  },
  header: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  banner_image: {
    width: Dimensions.get('window').width,
    height: 100,
    borderBottomWidth: 2,
    borderColor: 'lightgray'
  },
  logo_image: {
    width: 60,
    height: 50,
  },
  jobs_header: {
    color: '#2478AE',
    fontSize: 20,
    fontWeight: '600'
  },
  main_content: {
    flex: 1,
    width: Dimensions.get('window').width,
    display: 'flex',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  jobs_store_button: {
    width: Dimensions.get('window').width,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2478AE'
  },
  jobs_store_button_text: {
    color: '#fff',
    fontSize: 20
  },
  jobs_value: {
    display: 'flex',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  jobs_value_text: {
    color: '#2478AE',
    fontSize: 24,
    fontWeight: '600'
  },

  jobs_details_container: {
    display: 'flex',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderBottomWidth: 1,
    borderColor: 'gray'
  },
  job_detail: {

    },
  jobs_titles: {
    fontSize: 20,
    fontWeight: '600'
  },
  jobs_action_icon: {

  },
  jobs_descriptions: {
    marginTop: 10,
    fontStyle: 'italic'
  }
});