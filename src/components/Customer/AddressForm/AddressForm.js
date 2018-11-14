import React from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import styles from './AddressFormStyle';

export default class fifthScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.bannerImageContainer}>
                    <Text style={{ textAlign: 'center' }}>
                        Image
                    </Text>
                </View>
                <View style={styles.titleTextViewStyle}>
                    <Text style={styles.titleTextStyle}>
                        New Property
               </Text>
                </View>
                <View style={
                    styles.textInputStyleContainer}>
                    <TextInput
                        ref={input => {
                            this.textInput = input
                        }}
                        underlineColorAndroid='transparent'
                        placeholder='Name'
                        style={styles.textInputStyle}
                        onChangeText={(text) => this.enterText(text)} />
                </View>
                <View style={
                    styles.textInputStyleContainer}>
                    <TextInput
                        ref={input => {
                            this.textInput = input
                        }}
                        underlineColorAndroid='transparent'
                        placeholder='City'
                        style={styles.textInputStyle}
                        onChangeText={(text) => this.enterText(text)} />
                </View>
                <View style={
                    styles.textInputStyleContainer}>
                    <TextInput
                        ref={input => {
                            this.textInput = input
                        }}
                        underlineColorAndroid='transparent'
                        placeholder='Neighborhood'
                        style={styles.textInputStyle}
                        onChangeText={(text) => this.enterText(text)} />
                </View>
                <View style={
                    styles.textInputStyleContainer}>
                    <TextInput
                        ref={input => {
                            this.textInput = input
                        }}
                        underlineColorAndroid='transparent'
                        placeholder='Main Street'
                        style={styles.textInputStyle}
                        onChangeText={(text) => this.enterText(text)} />
                </View>
                <View style={
                    styles.textInputStyleContainer}>
                    <TextInput
                        ref={input => {
                            this.textInput = input
                        }}
                        underlineColorAndroid='transparent'
                        placeholder='Secondary Street'
                        style={styles.textInputStyle}
                        onChangeText={(text) => this.enterText(text)} />
                </View>
                <View style={
                    styles.textInputStyleContainer}>
                    <TextInput
                        ref={input => {
                            this.textInput = input
                        }}
                        underlineColorAndroid='transparent'
                        placeholder='Numeration'
                        style={styles.textInputStyle}
                        onChangeText={(text) => this.enterText(text)} />
                </View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('fifthScreen')}>
                    <View style={styles.buttonViewStyle}>
                        <Text style={styles.buttonTextStyle}>Save</Text>
                    </View>
                </TouchableOpacity>
            </View >
        )
    }
    enterText(text)
    {
        console.log('Text Input---------->',text)
    }
}