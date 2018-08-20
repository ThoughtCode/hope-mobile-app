import React from 'react';
import {StyleSheet, Text, View,AppRegistry, AsyncStorage} from 'react-native';
import {SwitchNavigator, TabNavigator, TabBarBottom,StackNavigator} from 'react-navigation';

import Home from '../../components/Home/Home'

import CustomerLogin from '../../components/CustomerLogin/CustomerLogin';
import AgentLogin from '../../components/AgentLogin/AgentLogin';
import CustomerSignUp from '../../components/CustomerSignUp/CustomerSignUp';
import AgentSignUp from '../../components/AgentSignup/AgentSignUp';
import CustomerDashboard from '../../components/CustomerDashboard/CustomerDashboard';
// import AgentDashboard from '../../components/AgentDashboard/AgentDashboard';
import CustomerResetPassword from '../../components/CustomerResetPassword/CustomerResetPassword';
import AgentResetPassword from '../../components/AgentResetPassword/AgentResetPassword';
import CustomerProfile from '../../components/CustomerProfile/CustomerProfile';
import CustomerJobs from '../../components/CustomerJobs/CustomerJobs';
import CustomerAddress from '../../components/CustomerAddress/CustomerAddress';
import CustomerDateTime from '../../components/CustomerDateTime/CustomerDateTime';
import CustomerBaseService from '../../components/CustomerBaseService/CustomerBaseService';
import CustomerServiceType from '../../components/CustomerServiceType/CustomerServiceType';
import CustomerAddonService from '../../components/CustomerAddonService/CustomerAddonService';
import CustomerNewAddress from '../../components/CustomerNewAddress/CustomerNewAddress';
import CreateJob from "../../components/CreateJob/CreateJob";

import AgentTrabajosDashboard from "../../components/AgentTrabajosDashboard/AgentTrabajosDashboard";
import AgentProfile from "../../components/AgentProfile/AgentProfile";
import AgentUpdateProfile from "../../components/AgentUpdateProfile/AgentUpdateProfile";
import AgentUpdatePassword from "../../components/AgentUpdatePassword/AgentUpdatePassword";

import AgentJobListScreen from "../../components/AgentJobListScreen/AgentJobListScreen";
import AgentJobDetailScreen from "../../components/AgentJobDetailScreen/AgentJobDetailScreen";
import AgentJobCommentScreen from "../../components/AgentJobCommentScreen/AgentJobCommentScreen";
import AgentReviewScreen from "../../components/AgentReviewScreen/AgentReviewScreen";
import AgentFilterScreen from "../../components/AgentFilterScreen/AgentFilterScreen";

export const AgentNavigator = SwitchNavigator({
    Home: {screen: Home},
    CustomerLogin: {screen: CustomerLogin},
    AgentLogin: {screen: AgentLogin},
    CustomerSignUp: {screen: CustomerSignUp},
    AgentSignUp: {screen: AgentSignUp},
    CustomerDashboard: {screen: CustomerDashboard},
    // AgentDashboard: {screen: AgentDashboard},
    AgentTabar : { screen :AgentTabar},
    CustomerResetPassword: {screen: CustomerResetPassword},
    AgentResetPassword: {screen: AgentResetPassword},
    CustomerProfile: {screen: CustomerProfile},
    CustomerJobs: {screen: CustomerJobs},
    CreateJob: {screen: CreateJob},
    CustomerAddress: {screen: CustomerAddress},
    CustomerDateTime: {screen: CustomerDateTime},
    CustomerBaseService: {screen: CustomerBaseService},
    CustomerAddonService: {screen: CustomerAddonService},
    CustomerServiceType: {screen: CustomerServiceType},
    CustomerNewAddress: {screen: CustomerNewAddress},
  },{
    initialRouteName :"AgentTabar"
});

//======================================================================
// AgentDashboard StackNavigator
//======================================================================

export const AgentDashboard = StackNavigator({
    AgentJobListScreen : { screen :AgentJobListScreen},
    AgentJobDetailScreen : { screen :AgentJobDetailScreen},
    AgentJobCommentScreen : { screen :AgentJobCommentScreen},
    AgentReviewScreen : { screen : AgentReviewScreen },
    AgentFilterScreen : { screen : AgentFilterScreen },
  },{
    navigationOptions:{
      header : null
    }
  })
  

//======================================================================
// AgentTrabajos StackNavigator
//======================================================================

export const AgentTrabajos = StackNavigator({
  AgentTrabajosDashboard : { screen :AgentTrabajosDashboard},
  AgentJobDetailScreen : { screen :AgentJobDetailScreen},
  AgentJobCommentScreen : { screen :AgentJobCommentScreen},
  AgentReviewScreen : { screen : AgentReviewScreen },
},{
  navigationOptions:{
    header : null
  }
})

//======================================================================
// Profile StackNavigator
//======================================================================

export const ProfileStackNavigator = StackNavigator({
  AgentProfile : { screen : AgentProfile },
  AgentUpdateProfile : { screen : AgentUpdateProfile },
  AgentUpdatePassword : { screen : AgentUpdatePassword }
},{
  navigationOptions:{
    header : null
  }
})

const iconHeight = 20;

const AgentTabar = TabNavigator({
  AgentDashboard: {
      screen: AgentDashboard,
      navigationOptions: {
          borderBottomWidth: 0,
          tabBarLabel: 'Home',
          tabBarIcon: ({ tintColor }) => (
              <View style={[styles.tabViewBox]}>
                  <Entypo name="home" style={[styles.tabIcon]} size={iconHeight} color={tintColor} />
                  <Text style={[styles.tabText, { color: tintColor }]}>{"Home"}</Text>
              </View>
          )
      }
  },
  Trabajos: {
    screen: AgentTrabajos,
    navigationOptions: {
        borderBottomWidth: 0,
        tabBarLabel: 'Trabajos',
        tabBarIcon: ({ tintColor }) => (
            <View style={[styles.tabViewBox]}>
                <Foundation name="shopping-bag" style={[styles.tabIcon]} size={iconHeight} color={tintColor} />
                <Text style={[styles.tabText, { color: tintColor }]}>{"Trabajos"}</Text>
            </View>
        )
    }
},
ProfileStackNavigator: {
  screen: ProfileStackNavigator,
  navigationOptions: {
      borderBottomWidth: 0,
      tabBarLabel: 'Perfil',
      tabBarIcon: ({ tintColor }) => (
          <View style={[styles.tabViewBox]}>
              <Entypo name="user" style={[styles.tabIcon]} size={iconHeight} color={tintColor} />
              <Text style={[styles.tabText, { color: tintColor }]}>{"Perfil"}</Text>
          </View>
      )
  }
},
},{
  tabBarOptions: {
      activeTintColor: '#1e67a9',
      inactiveTintColor: 'gray',
      style: {
          backgroundColor: '#FFF',
          height: 49,
          borderTopColor: 'transparent',
          borderTopWidth: 1,
          paddingRight: 10,
          paddingLeft: 10,
          borderTopWidth: 1,
          borderTopColor: 'gray'
      },
      showLabel: false,
      showIcon : true,
  },
  tabBarComponent : TabBarBottom,
  initialRouteName: 'AgentDashboard',
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false
}, []);