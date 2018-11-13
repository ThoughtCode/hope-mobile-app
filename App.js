import React from 'react';
import {StyleSheet, Text, View,AppRegistry, AsyncStorage} from 'react-native';
import {SwitchNavigator, TabNavigator, TabBarBottom,StackNavigator} from 'react-navigation';

import {AgentNavigator, MainNavigator} from './src/components/Navigator/Router.js';
import * as globals from './src/util/globals';
// Don't show warnings about deprecation lifecycle methods on the App
import {YellowBox} from 'react-native';

// Redux Store
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './src/reducers';
import {
  Notifications,
} from 'expo';
import registerForNotifications from './src/services/PushNotification';

const store = createStore(rootReducer);
store.subscribe(() => console.log('store', store.getState()));

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillUpdate is deprecated'
]);



export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      fontLoaded: false,
      isLoading : true,
      isAgentLogin : false,
      notification: {},
    };
  }

  componentDidMount() {
    registerForNotifications();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = (notification) => {
    console.log(JSON.stringify(notification.data))
    this.setState({notification: notification});
  };

  async componentWillMount() {

      await Expo.Font.loadAsync({
        'helvetica': require('./assets/fonts/HELR45W.ttf'),
      })
      AsyncStorage.multiGet(['password', 'access_token', 'first_name', 'last_name', 'email', 'cell_phone', 'avatar', 'status'],(error,value) =>{
    
        globals.password = value[0][1] || ""
        globals.access_token = value[1][1] || ""
        globals.first_name = value[2][1] || ""
        globals.last_name = value[3][1] || ""
        globals.email = value[4][1] || ""
        globals.cell_phone = value[5][1] || ""
        globals.avatar = value[6][1] || ""
        globals.status = value[7][1] || ""

        this.setState({isLoading : true,fontLoaded: true,isAgentLogin : value[4][1] != null})
        
      })
      
    // })

    // this.setState({ fontLoaded: true });
  }
  
  render() {
    if(this.state.notification) {
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Origin: {this.state.notification.origin}</Text>
        <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
      </View>
    }
    if (this.state.fontLoaded) {
      if (this.state.isAgentLogin) {
        return (
          <Provider store={store}>
            <AgentNavigator />
          </Provider>
        );
      } else {
        return (
          <Provider store={store}>
            <MainNavigator />
          </Provider>
        )
      }
    } else {
      return null
    }
  }
}


