import React, { Component } from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-banner-carousel';

const styles = require('./HomeStyles');

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = Dimensions.get('window').height;

const images = [
  {
    src: require("../../../../assets/img/home_splash_1_opacity.jpg"),
    description: "Disfruta más tú vida",
    subtitle: "LO HACEMOS POR TI"
  },
  {
    src: require("../../../../assets/img/home_splash_2_opacity.jpg"),
    description: "Los mejores profesionales",
    subtitle: "LO HACEMOS POR TI"
  },
  {
    src: require("../../../../assets/img/home_splash_3_opacity.jpg"),
    description: "Seguridad y calidad",
    subtitle: "LO HACEMOS POR TI"
  }
];

export default class Home extends Component {

  renderPage(image, index) {
    return (
        <View key={index}>
            <Image style={{ width: BannerWidth, height: BannerHeight }} source={ image.src } />
            <Text style={styles.carousel_description}>
              {image.description}
              {'\n'}
              {'\n'}
              <Text style={styles.carousel_subtitle}> {image.subtitle} </Text>
            </Text>
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
        <Image style={ styles.logo_image } source={ require('../../../../assets/img/logo_blanco.gif')} />
        <View style={styles.actions_container}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('CustomerSignUp')}
          >
            <View style={styles.signup_button_container}>
              <Text style={styles.action_buttons}>REGISTRO</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('CustomerLogin')}
          >
            <View style={styles.login_button_container}>
              <Text style={styles.action_buttons}>INICIAR SESIÓN</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
