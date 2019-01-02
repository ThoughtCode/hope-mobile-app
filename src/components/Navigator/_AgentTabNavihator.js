import React from 'react';
import {StyleSheet, Text, View,AppRegistry, AsyncStorage} from 'react-native';
import {SwitchNavigator, TabNavigator, TabBarBottom,StackNavigator} from 'react-navigation';

import AgentTrabajosDashboard from "../../components/Agent/AgentTrabajosDashboard/AgentTrabajosDashboard";
import AgentProfile from "../../components/Agent/AgentProfile/AgentProfile";
import AgentResetPassword from "../../components/Agent/AgentResetPassword/AgentResetPassword"
import AgentUpdateProfile from "../../components/Agent/AgentUpdateProfile/AgentUpdateProfile";
import AgentUpdatePassword from "../../components/Agent/AgentUpdatePassword/AgentUpdatePassword";
import AgentComment from "../../components/Agent/AgentScreenComment/AgentComment";
import AgentCalendar from "../../components/Agent/AgentScreenCalendar/AgentCalendar";
import AgentReport from "../../components/Agent/AgentScreenReport/AgentReport";
import AgentJobListScreen from "../../components/Agent/AgentJobListScreen/AgentJobListScreen";
import AgentJobDetailScreen from "../../components/Agent/AgentJobDetailScreen/AgentJobDetailScreen";
import AgentJobCommentScreen from "../../components/Agent/AgentJobCommentScreen/AgentJobCommentScreen";
import AgentReviewScreen from "../../components/Agent/AgentReviewScreen/AgentReviewScreen";
import AgentFilterScreen from "../../components/Agent/AgentFilterScreen/AgentFilterScreen";

import Entypo from '@expo/vector-icons/Entypo';
import Foundation from '@expo/vector-icons/Foundation';


const iconHeight = 20;

//======================================================================
// AgentDashboard StackNavigator
//======================================================================

const AgentDashboard = StackNavigator({
    AgentJobListScreen : { screen :AgentJobListScreen},
    AgentJobDetailScreen : { screen :AgentJobDetailScreen},
    AgentJobCommentScreen : { screen :AgentJobCommentScreen},
    AgentReviewScreen : { screen : AgentReviewScreen },
    AgentFilterScreen : { screen : AgentFilterScreen },
    AgentResetPassword : { screen : AgentResetPassword },
  },{
    navigationOptions:{
      header : null
    }
  })


//======================================================================
// AgentTrabajos StackNavigator
//======================================================================

const AgentTrabajos = StackNavigator({
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

const ProfileStackNavigator = StackNavigator({
  AgentProfile : { screen : AgentProfile },
  AgentUpdateProfile : { screen : AgentUpdateProfile },
  AgentUpdatePassword : { screen : AgentUpdatePassword },
  AgentComment : { screen : AgentComment },
  AgentCalendar : { screen : AgentCalendar },
  AgentReport : { screen : AgentReport }
},{
  navigationOptions:{
    header : null
  }
})


export default AgentTabar = TabNavigator({
  AgentDashboard: {
      screen: AgentDashboard,
      navigationOptions: {
          borderBottomWidth: 0,
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ tintColor }) => (
              <View style={[styles.tabViewBox]}>
                  <Entypo name="home" style={[styles.tabIcon]} size={iconHeight} color={tintColor} />
                  <Text style={[styles.tabText, { color: tintColor }]}>{"Inicio"}</Text>
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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabText: {
      fontSize: 10,
      fontWeight: "600",
      flex: 4,
    },
    tabViewBox: {
        flex: 1,
        alignItems: "center",
    },
    tabIcon: {
      flex: 5,
      alignSelf: "center",
      marginTop: 7,
      marginBottom: 5
    },
  });
