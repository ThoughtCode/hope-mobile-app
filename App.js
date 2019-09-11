import React from 'react';
import {YellowBox, AsyncStorage} from 'react-native';
import {MainNavigator, CustomerLoginAuth, AgentLoginAuth} from './src/components/Navigator/Router.js';
import * as globals from './src/util/globals';

// Redux Store
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './src/reducers';
import {Notifications} from 'expo';
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
      notification : {},
      isAutomaticLoginCustomer : false,
      isAutomaticLoginAgent : false,
    };
  }

  componentDidMount() {
    registerForNotifications();
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = (notification) => {
    console.log(JSON.stringify(notification))
    this.setState({notification: notification});
  };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'helvetica': require('./assets/fonts/HELR45W.ttf'),
    })
    AsyncStorage.getItem("Data").then((item) =>{
      const dataa = JSON.parse(item)
      if(dataa !== null){
        let user_type = Object.keys(dataa)[1];
        console.log("Es ::::::::::::::",user_type)
        if (user_type === "customer") {
          const data = JSON.parse(item)
          globals.id = data.customer.id;
          globals.access_token = data.customer.data.attributes.access_token || "";
          globals.avatar = data.customer.data.attributes.avatar.url;
          globals.first_name = data.customer.data.attributes.first_name || "";
          globals.last_name = data.customer.data.attributes.last_name || "";
          globals.email = data.customer.data.attributes.email || "";
          globals.cell_phone = data.customer.data.attributes.cell_phone || "";
          globals.class_name = data.customer.data.attributes.class_name || "";
          this.setState({isAutomaticLoginCustomer : true})
        }else if(user_type === "agent"){
          const data = JSON.parse(item)
          globals.access_token = data.agent.data.attributes.access_token || '';
          globals.first_name = data.agent.data.attributes.first_name || '';
          globals.last_name = data.agent.data.attributes.last_name || '';
          globals.email = data.agent.data.attributes.email || '';
          globals.password = this.state.password || '';
          globals.cell_phone = data.agent.data.attributes.cell_phone || '';
          globals.status = data.agent.data.attributes.status || '';
          globals.avatar = data.agent.data.attributes.avatar.url || '';
          globals.rewiews_average = data.agent.data.attributes.rewiews_average || '';
          globals.rewiews_count = data.agent.data.attributes.rewiews_count || '';
          globals.class_name = data.agent.data.attributes.class_name || ""
          this.setState({isAutomaticLoginAgent : true})
        }
      }else{
        console.log("ALERTA ALERTA ========= AsyncStorage.getItem is NULL ========= ALERTA ALERTA")
      }
    })
    AsyncStorage.multiGet(['password', 'access_token', 'first_name', 'last_name', 'email', 'cell_phone', 'avatar', 'status', 'birthday', 'id'],(error,value) =>{
      if(value[4][1] != null && value[4][1] != undefined){
        globals.password = value[0][1] || ""
        globals.access_token = value[1][1] || ""
        globals.first_name = value[2][1] || ""
        globals.last_name = value[3][1] || ""
        globals.email = value[4][1] || ""
        globals.cell_phone = value[5][1] || ""
        globals.avatar = value[6][1] || ""
        globals.status = value[7][1] || ""
        globals.birthday = value[8][1] || ""
        globals.id = value[9][1] || ""
      }
      this.setState({isLoading : true,fontLoaded: true,isAgentLogin : value[4][1] != null})
    })
  }
  
  render() {
    if (this.state.fontLoaded) {
      if (this.state.isAutomaticLoginCustomer == true) {
        return (
          <Provider store={store}>
            <CustomerLoginAuth />
          </Provider>
        );
      } else if(this.state.isAutomaticLoginAgent == true){
      return (
          <Provider store={store}>
            <AgentLoginAuth />
          </Provider>
        )
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