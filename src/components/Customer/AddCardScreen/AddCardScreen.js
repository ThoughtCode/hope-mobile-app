import React from 'react';
import { WebView,TouchableOpacity,Text,Image,Dimensions} from 'react-native';
import * as globals from '../../../util/globals';
import { View } from 'react-native-animatable';

import styles from './AddCardScreenStyle';
const { width } = Dimensions.get('window')
const IMAGES = {
  TOP_BACKGROUND: require("../../../../assets/img/topbg.png")
}

export default class AddCardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email : globals.email,
      id : globals.id,
    }
  }
  render() {
    let yourAlert = `document.getElementById("email").value += '${this.state.email}';
      document.getElementById("user_id").value += '` + this.state.id +`';`
    return (
      <View style={{flex: 1}}>
        <View>
          <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage} />
          <View style={{ position: 'absolute', zIndex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50, width: width }}>
            <Text style={{ color: '#fff', fontSize: 22, fontFamily: 'helvetica' }}>{"Agregar Tarjeta"}</Text>
          </View>
        </View>
        <WebView
          style={{flex: 1}}
          originWhitelist={['*']}
          nativeConfig={{props: {webContentsDebuggingEnabled: true}}} 
          javaScriptEnabled={true}
          domStorageEnabled={true}
          injectedJavaScript={yourAlert}
          source={{ html: `
            <!DOCTYPE html>
            <html>
              <head>  
                <title>Example Paymentez Add Card | PaymentezJs</title>
                <meta charset="UTF-8">  
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
              </head>
              <body>
                <div>
                  <h1>
                    <button class="btn payment">Agregar Tarjeta Save</button>
                  </h1>
                </div>
              </body>
            </html>
          ` 
          }}
        />
        <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("CardListScreen",{jobActualState:this.props.navigation.state.params.jobActualState})} style={styles.back_button}>
            <Text style={{ color: '#1F68A9', fontFamily: 'helvetica', fontSize: 20, fontWeight: 'bold' }}>{"REGRESAR"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}