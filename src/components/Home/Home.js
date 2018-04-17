import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SwitchNavigator } from 'react-navigation';


export default class Home extends Component {

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.loginButton}>HOME</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: 'lightgrey',
    color: "#000",
    width: 100,
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center'
  }
});
