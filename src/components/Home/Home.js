import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SwitchNavigator } from 'react-navigation';
import Carousel from 'react-native-banner-carousel';

const styles = require('./HomeStyles');

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = Dimensions.get('window').height;

const images = [
  {
    uri: "https://images.pexels.com/photos/132037/pexels-photo-132037.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "Feature 1"
  },
  {
    uri: "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "Feature 2"
  },
  {
    uri: "https://images.pexels.com/photos/371633/pexels-photo-371633.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "Feature 3"
  }
];

export default class Home extends Component {

  renderPage(image, index) {
    return (
        <View key={index}>
            <Image style={{ width: BannerWidth, height: BannerHeight }} source={{ uri: image.uri }} />
            <Text style={styles.carousel_description}> {image.description} </Text>
        </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.carousel_container}>
          <Carousel
          autoplay
          autoplayTimeout={5000}
          loop
          index={0}
          pageSize={BannerWidth}
          >
            {images.map((image, index) => this.renderPage(image, index))}
          </Carousel>
        </View>
        <View style={styles.actions_container}>
          <View style={styles.signup_button_container}>
          <TouchableOpacity
             onPress={() => this.props.navigation.navigate('SignUp')}
          >
            <Text style={styles.action_buttons}>REGISTRO</Text>
        </TouchableOpacity>
          </View>
          <View style={styles.login_button_container}>
            <TouchableOpacity 
              onPress={() => this.props.navigation.navigate('Login')}
              >
                <Text style={styles.action_buttons}>LOGIN</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </View>
    );
  }
}
