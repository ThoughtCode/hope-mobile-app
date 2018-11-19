import { StyleSheet, Dimensions } from 'react-native'
const { height, width } = Dimensions.get('window')

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topImage: {
    height: width * 0.3,
    width: width
  },
  topTitleView: {
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgb(240,240,240)',
    alignItems: "center"
  },
  bottomButton: {
    backgroundColor: 'rgb(0,121,189)', alignItems: 'center', paddingVertical: 10
  },
  backButtonImage: {
    color: "#000", position: 'absolute', top: 20, left: 20, zIndex: 1, color: '#fff'
  },
  filterText: {
    color: "#fff"
  },
  profileImage: {
    height: 78, width: 78, borderRadius: 39
  },
  userImage: {
    height: 38, width: 38, borderRadius: 19
  },
  userImageView: {
    height: 40, width: 40, borderRadius: 20, backgroundColor: '#fff', alignSelf: 'center', marginRight: 5
  },
  profileView: {
    height: 80, width: 80, borderRadius: 40, backgroundColor: '#fff', alignSelf: 'center', borderWidth: 1, marginTop: -40, borderColor: '#fff'
  },
  renderRowView: {
    marginHorizontal: 20, paddingVertical: 10
  },
  listTitleView: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },
  titleText: {
    fontSize: 19, fontWeight: '600', fontFamily: "helvetica"
  },
  subText: {
    fontSize: 14, fontFamily: "helvetica", color: 'lightgray'
  },
  opinionsView: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 5
  },
  opinionsText: {
    fontSize: 16, marginLeft: 10, color: 'gray', fontFamily: 'helvetica'
  },
  emptyText: {
    fontSize: 16, color: '#1e67a9', fontFamily: 'helvetica'
  },
  textInputStyleContainer: {
    borderColor: "#d2d2d2",
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5,
    flex:1
  },
  textInputStyle: {
    // placeholderTextColor: "#A8A8A8",
    fontSize: 15,
    paddingLeft: 5,
    alignItems: 'center',
    height: 45,
  },
  buttonViewStyle: {
    margin: 10, height: 50, backgroundColor: '#1F68A9', justifyContent: 'center'
  },
  buttonTextStyle: {
    fontSize: 16, color: '#ffffff', textAlign: 'center'
  },
  textStyle :{
    flex:1,justifyContent:'center',marginLeft:20
  }
});