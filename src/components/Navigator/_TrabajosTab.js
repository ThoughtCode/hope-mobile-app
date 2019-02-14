import React from 'react';
import {StyleSheet,Text,View} from 'react-native';
import {TabNavigator} from 'react-navigation';
import AgentActules from "../Agent/AgentActules/AgentActules";
  
export default TrabajosTab = TabNavigator({
  AgentActules: {
    screen: props => <AgentActules {...props} type={"accepted"} />,
    navigationOptions: {
      borderBottomWidth: 0,
      tabBarLabel: 'Actuales',
      tabBarLabel: ({ tintColor }) => (
        <View style={[styles.tabViewBox]}>
          <Text style={[styles.tabText, { color: tintColor,fontSize :14 }]}>{"Actuales"}</Text>
        </View>
        ),
        tabBarOnPress: ev => {
          AgentActules.jobsApiCall()
          ev.jumpToIndex(ev.scene.index); // This actually allow you to jump to your screen 
        }
      }
    },
    CompletadosList: {
      screen: props => <AgentActules {...props} type={"completed"} />,
      navigationOptions: {
        borderBottomWidth: 0,
        tabBarLabel: 'Completados',
        tabBarLabel :  ({ tintColor }) => (
          <View style={[styles.tabViewBox]}>
            <Text style={[styles.tabText, { color: tintColor,fontSize :14 }]}>{"Completados"}</Text>
          </View>
        ),
        tabBarOnPress: ev => {
          AgentActules.jobsApiCall()
          ev.jumpToIndex(ev.scene.index); // This actually allow you to jump to your screen 
        }
      }
    },
    PostuladosList: {
      screen: props => <AgentActules {...props} type={"postulated"} />,
      navigationOptions: {
        borderBottomWidth: 0,
        tabBarLabel: 'Postulados',
        tabBarLabel :  ({ tintColor }) => (
          <View style={[styles.tabViewBox]}>
            <Text style={[styles.tabText, { color: tintColor ,fontSize :14 }]}>{"Postulados"}</Text>
          </View>
        ),
        tabBarOnPress: ev => {
          AgentActules.jobsApiCall()
          ev.jumpToIndex(ev.scene.index); // This actually allow you to jump to your screen 
        }
      }
    },
  },{
  tabBarOptions: {
    activeTintColor: '#1e67a9',
    inactiveTintColor: '#000',
    style: {
      backgroundColor: '#FFF',
      height: 40,
      paddingRight: 10,
      paddingLeft: 10,
      borderTopWidth: 1,
      borderTopColor: 'gray'
    },
    indicatorStyle: {
      backgroundColor: '#1e67a9',
    },
    showLabel: true,
  },
  initialRouteName: 'AgentActules',
  tabBarPosition: 'top',
  animationEnabled: true,
  swipeEnabled: true
})

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
  