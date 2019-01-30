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
            <link href="https://cdn.paymentez.com/js/1.0.1/paymentez.min.css" rel="stylesheet" type="text/css" />
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
            <div class="panel">
              <div class="paymentez-form" id="my-card" data-capture-name="true">
                <input class="card-number" name="card-number" placeholder="Card number">
                <input class="name" id="the-card-name-id" placeholder="Card Holders Name">
                <input class="expiry-month" name="expiry-month">
                <input class="expiry-year" name="expiry-year">
                <input class="cvc" name="cvc">
              </div>
              <input class="user_id" id='user_id' name="user_id" hidden>
              <input class="email" id='email' name="email" hidden>
              <button class="btn submit-payment">Save</button>
              <div id="messages"></div>
              
            </div>
          </body>
          <script>
          $(function() {
            Paymentez.init('stg', 'NOC-EC-CLIENT', 'Owo41X6qbItrAcEy7Pz9DAL7wl8gAo');
            var submitInitialText = $('.submit-payment').text();
            var email = ''
            var uid = ''
            var cardNumber = '';
            var cardType = '';
            var name = '';
            var expiryMonth = '';
            var expiryYear = '';
            var cvc = '';
            var uid = "";
            var email = "";
            $('.submit-payment').click(function (e) {
              e.preventDefault();
              var myCard = $('#my-card');
              cardNumber = myCard.PaymentezForm('cardNumber');
              cardType = get_card_type(myCard.PaymentezForm('cardType'));
              name = myCard.PaymentezForm('name');
              expiryMonth = myCard.PaymentezForm('expiryMonth');
              expiryYear = myCard.PaymentezForm('expiryYear');
              cvc = $('.cvc').val();
              uid = $('.user_id').val();
              email = $('.email').val();
              // Validar los cambios antes de enviar
              console.log(cardType)
              if (validate_data(name, cardNumber, expiryMonth, cvc) == true){
                $('.submit-payment').attr("disabled", "disabled").text("Card Processing..."); 
                // Mandar campos una vez validados
                var cardToSave = {
                  "card": {
                    "number": cardNumber,
                    "holder_name": name,
                    "expiry_month": parseInt(expiryMonth, 10),
                    "expiry_year": parseInt('20'+expiryYear, 10),
                    "cvc": cvc,
                    "type": "vi"
                  }
                };
                // Antes de anadir la tarjeta necesitamos validar el email
                Paymentez.addCard(uid, email, cardToSave, successHandler, errorHandler)
              }
            })
            var successHandler = function(cardResponse) {
              console.log(cardResponse.card);
              if(cardResponse.card.status === 'valid'){
                $('#messages').html('Tarjeta añadida exitosamente.<br>'+
                  'status: ' + cardResponse.card.status + '<br>' +
                  "Card Token: " + cardResponse.card.token + "<br>" +
                  "transaction_reference: " + cardResponse.card.transaction_reference
                );
                $.ajax({
                  url: "https://hopeec-staging.herokuapp.com/api/v1/customers/add_card_mobile",
                  cache: false,
                  type: "POST",
                  data: {
                    payment: {
                      email: email,
                      id : uid,
                      holder_name: name,
                      card_type: cardResponse.card.type, 
                      number: cardResponse.card.number, 
                      token: cardResponse.card.token , 
                      status: cardResponse.card.valid , 
                      expiry_month: cardResponse.card.expiry_month, 
                      expiry_year: cardResponse.card.expiry_year
                    }
                  },
                  success: function(html){
                    console.log('Tarjeta Agregada')
                  }
                });
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
              $('.submit-payment').text(submitInitialText);
            };
            var errorHandler = function(err) {    
              $('#messages').html(err.error.type);    
              $('.submit-payment').removeAttr("disabled");
              $('.submit-payment').text(submitInitialText);
            };
          });
          function validate_data(name, card_number, month_year, cvc) {
            if (card_number == 0){
              $('#messages').html('Por favor ingresa el numero de la tarjeta');
              return false
            }
            return true
          }
          function get_card_type(type) {
            if (type == 'Visa') {
              type = 'vi'
            }else if (type == 'Mastercard') {
              type = 'mc'
            }else if (type == 'American Express') {
              type = 'ax'
            }else if (type == 'Diners' || type == 'Diners Club' ) {
              type = 'di'
            }else if (type == 'Discover') {
              type = 'dc'
            }else if (type == 'Elo') {
              type = 'el'
            }else if (type == 'Credisensa') {
              type = 'cs'
            }else if (type == 'Solidario') {
              type = 'so'
            }else if (type == 'Exito') {
              type = 'ex'
            }else if (type == 'Alkosto') {
              type = 'ak'
            }
            return type
          }
          </script>
        </html> ` 
          }}
        />
        <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("CardListScreen")} style={styles.back_button}>
            <Text style={{ color: '#1F68A9', fontFamily: 'helvetica', fontSize: 20, fontWeight: 'bold' }}>{"REGRESAR"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}