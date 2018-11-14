import React from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    CheckBox
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome'
import styles from './CardSelectStyle';

export default class CardSelect extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.bannerImageContainer}>
                    <Text style={{ textAlign: 'center' }}>
                        Image
                    </Text>
                </View>
                <View style={{ margin: 10, flexDirection: 'row' }}>
                    <FontAwesome name={"check-square"} size={30} color={"rgb(0,121,189)"} style={styles.iconStyle} onPress={() => alert("onClick")} />
                    <View style={{ marginLeft: 10, flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ textAlign: 'center', marginRight: 10 }}>
                                Image
                        </Text>
                            <Text>
                                XXXX-XXXX Exp 9/23
                        </Text>
                        </View>
                        <Text>
                            Name : ABCDEFG
                    </Text>
                    </View>
                </View>
                <View style={{ margin: 10, flexDirection: 'row' }}>
                    <FontAwesome name={"check-square"} size={30} color={"rgb(0,121,189)"} style={styles.iconStyle} onPress={() => alert("onClick")} />
                    <View style={{ marginLeft: 10, flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ textAlign: 'center', marginRight: 10 }}>
                                Image
                        </Text>
                            <Text>
                                XXXX-XXXX Exp 9/23
                        </Text>
                        </View>
                        <Text>
                            Name : ABCDEFG
                    </Text>
                    </View>
                </View>
                <View style={{ flex: 1, position: 'absolute', bottom: 10, alignSelf: 'center' }}>
                    <View style={{ margin: 10, alignItems: 'center' }}>
                        <Text style={styles.textStyle}>
                            Add new card
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('fifthScreen')}>
                        <View style={styles.buttonViewStyle}>
                            <Text style={styles.buttonTextStyle}>Button</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}
