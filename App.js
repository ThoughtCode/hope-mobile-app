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
      isAgentLogin : false
    };
  }

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


