// React and react native imports
import React, { Component } from 'react';
import { Image, StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

// Third party imports
import Button from 'react-native-button';
import EntypoIcons from '@expo/vector-icons/Entypo';
import EvilIconsIcons from '@expo/vector-icons/EvilIcons';
import FeatherIcons from '@expo/vector-icons/Feather';
import FontAwesomeIcons from '@expo/vector-icons/FontAwesome';
import FoundationIcons from '@expo/vector-icons/Foundation';
import IoniconsIcons from '@expo/vector-icons/Ionicons';
import MaterialIconsIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIconsIcons from '@expo/vector-icons/MaterialCommunityIcons';
import OcticonsIcons from '@expo/vector-icons/Octicons';
import ZocialIcons from '@expo/vector-icons/Zocial';
import SimpleLineIconsIcons from '@expo/vector-icons/SimpleLineIcons';

const iconSets = {
  Entypo: EntypoIcons,
  EvilIcons: EvilIconsIcons,
  Feather: FeatherIcons,
  FontAwesome: FontAwesomeIcons,
  Foundation: FoundationIcons,
  Ionicons: IoniconsIcons,
  MaterialIcons: MaterialIconsIcons,
  MaterialCommunityIcons: MaterialCommunityIconsIcons,
  Octicons: OcticonsIcons,
  Zocial: ZocialIcons,
  SimpleLineIcons: SimpleLineIconsIcons,
};

const propTypes = {
  buttonStyle: ViewPropTypes.style,
  disabled: PropTypes.bool.isRequired,
  halfStarEnabled: PropTypes.bool.isRequired,
  iconSet: PropTypes.string.isRequired,
  onStarButtonPress: PropTypes.func.isRequired,
  rating: PropTypes.number.isRequired,
  reversed: PropTypes.bool.isRequired,
  starColor: PropTypes.string.isRequired,
  starIconName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number,
  ]).isRequired,
  starSize: PropTypes.number.isRequired,
  starStyle: ViewPropTypes.style,
};

const defaultProps = {
  buttonStyle: {},
  starStyle: {},
};

class StarButton extends Component {
  constructor(props) {
    super(props);

    this.onButtonPress = this.onButtonPress.bind(this);
  }

  onButtonPress(event) {
    const {
      halfStarEnabled,
      starSize,
      rating,
      onStarButtonPress,
    } = this.props;

    let addition = 0;

    if (halfStarEnabled) {
      const isHalfSelected = event.nativeEvent.locationX < starSize / 2;
      addition = isHalfSelected ? -0.5 : 0;
    }

    onStarButtonPress(rating + addition);
  }

  renderIcon() {
    const {
      iconSet,
      starIconName,
      starSize,
      starColor,
      starStyle,
      reversed,
    } = this.props;

    const Icon = iconSets[iconSet];
    let iconElement;

    const newStarStyle = {
      transform: [{
        scaleX: reversed ? -1 : 1,
      }],
      // Flattening because of:
      // https://github.com/djchie/react-native-star-rating/issues/56
      ...StyleSheet.flatten(starStyle),
    };

    if (typeof starIconName === 'string') {
      iconElement = (
        <Icon
          name={starIconName}
          size={starSize}
          color={starColor}
          style={newStarStyle}
        />
      );
    } else {
      const imageStyle = {
        width: starSize,
        height: starSize,
        resizeMode: 'contain',
      };

      const iconStyles = [
        imageStyle,
        newStarStyle,
      ];

      iconElement = (
        <Image
          source={starIconName}
          style={iconStyles}
        />
      );
    }

    return iconElement;
  }

  render() {
    const {
      disabled,
      buttonStyle,
    } = this.props;

    return (
      <Button
        activeOpacity={0.20}
        disabled={disabled}
        containerStyle={buttonStyle}
        onPress={this.onButtonPress}
      >
        {this.renderIcon()}
      </Button>
    );
  }
}

StarButton.propTypes = propTypes;
StarButton.defaultProps = defaultProps;

export default StarButton;
