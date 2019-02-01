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
    <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
    <script src="https://cdn.paymentez.com/js/1.0.1/paymentez.min.js"></script>
    <style>
      .panel {
        margin: 0 auto;
        padding: 20px;
        display: block;
        width: 80%;
        border-radius: 6px;
      }
      .btn {
        background: rgb(140,197,65); /* Old browsers */
        background: -moz-linear-gradient(top, rgba(140,197,65,1) 0%, rgba(20,167,81,1) 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(top, rgba(140,197,65,1) 0%,rgba(20,167,81,1) 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to bottom, rgba(140,197,65,1) 0%,rgba(20,167,81,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#44afe7', endColorstr='#3198df',GradientType=0 );
        color: #fff;
        display: block;
        width: 100%;
        border: 1px solid rgba(46, 86, 153, 0.0980392);
        border-bottom-color: rgba(46, 86, 153, 0.4);
        border-top: 0;
        border-radius: 4px;
        font-size: 17px;
        text-shadow: rgba(46, 86, 153, 0.298039) 0px -1px 0px;
        line-height: 34px;
        -webkit-font-smoothing: antialiased;
        font-weight: bold;
        display : block;
        margin-top: 20px;
      }
      .btn:hover {
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <div>
      <h1>Agregar Tarjeta</h1>
      <button class="btn payment">Save</button>

      <div id="messages"></div>
    </div>
  </body>
  <script>
  $(function() {
    Paymentez.init('stg', 'NOC-EC-CLIENT', 'Owo41X6qbItrAcEy7Pz9DAL7wl8gAo');

    $('.payment').click(function (e) {

      // Validar los cambios antes de enviar
      
        $('.payment').attr("disabled", "disabled").text("Card Processing...");
        // Mandar campos una vez validados
        var cardToSave = {
          "card": {
            "number": '4111111111111111',
            "holder_name": 'henry test',
            "expiry_month": 10,
            "expiry_year": 2019,
            "cvc": '111',
            "type": "vi"
          }
        };
        // Antes de anadir la tarjeta necesitamos validar el email
        Paymentez.addCard('12345', 'test1@email.com', cardToSave, successHandler, errorHandler)
      
    })
    var successHandler = function(cardResponse) {
      console.log(cardResponse.card);
      if(cardResponse.card.status === 'valid'){
        $('#messages').html('Tarjeta añadida exitosamente.<br>'+
          'status: ' + cardResponse.card.status + '<br>' +
          "Card Token: " + cardResponse.card.token + "<br>" +
          "transaction_reference: " + cardResponse.card.transaction_reference
        );
      }else if(cardResponse.card.status === 'review'){
        $('#messages').html('Card Under Review<br>'+
          'status: ' + cardResponse.card.status + '<br>' +
          "Card Token: " + cardResponse.card.token + "<br>" +
          "transaction_reference: " + cardResponse.card.transaction_reference
        );
      }else{
        $('#messages').html('Error<br>'+
          'status: ' + cardResponse.card.status + '<br>' +
          "message Token: " + cardResponse.card.message + "<br>"
        );
      }
      $('.submit-payment').removeAttr("disabled");
    };
    var errorHandler = function(err) {    
      $('#messages').html('ahi un error aqui' + err.error.type);

  $('.submit-payment').removeAttr("disabled");
    };
  });
  </script>
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