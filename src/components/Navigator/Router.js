import React from 'react';
import {StyleSheet, Text, View,AppRegistry, AsyncStorage} from 'react-native';
import {SwitchNavigator, TabNavigator, TabBarBottom,StackNavigator} from 'react-navigation';

import Home from '../../components/Customer/Home/Home'
import CustomerLogin from '../../components/Customer/CustomerLogin/CustomerLogin';
import CustomerSignUp from '../../components/Customer/CustomerSignUp/CustomerSignUp';
import CustomerDashboard from '../../components/Customer/CustomerDashboard/CustomerDashboard';
// import AgentDashboard from '../../components/Customer/AgentDashboard/AgentDashboard';
import CustomerResetPassword from '../../components/Customer/CustomerResetPassword/CustomerResetPassword';
import CustomerProfile from '../../components/Customer/CustomerProfile/CustomerProfile';
import CustomerJobs from '../../components/Customer/CustomerJobs/CustomerJobs';
import CustomerAddress from '../../components/Customer/CustomerAddress/CustomerAddress';
import CustomerDateTime from '../../components/Customer/CustomerDateTime/CustomerDateTime';
import CustomerBaseService from '../../components/Customer/CustomerBaseService/CustomerBaseService';
import CustomerServiceType from '../../components/Customer/CustomerServiceType/CustomerServiceType';
import CustomerAddonService from '../../components/Customer/CustomerAddonService/CustomerAddonService';
import CustomerNewAddress from '../../components/Customer/CustomerNewAddress/CustomerNewAddress';
import CustomerTrabajosDashboard from '../../components/Customer/CustomerTrabajosDashboard/CustomerTrabajosDashboard';
import CustomerJobDetailScreen from '../../components/Customer/CustomerJobDetailScreen/CustomerJobDetailScreen';
import CreateJob from "../../components/Customer/CreateJob/CreateJob";

import AgentSignUp from '../../components/Agent/AgentSignup/AgentSignUp';
import AgentLogin from '../../components/Agent/AgentLogin/AgentLogin';
import AgentResetPassword from '../../components/Agent/AgentResetPassword/AgentResetPassword';

import AgentTabar from "./_AgentTabNavihator";
import CustomerTabbar from "./_CustomerTabNavigator";

export const MainNavigator = SwitchNavigator({
    Home: {screen: Home},
    CustomerLogin: {screen: CustomerLogin},
    AgentLogin: {screen: AgentLogin},
    CustomerSignUp: {screen: CustomerSignUp},
    AgentSignUp: {screen: AgentSignUp},
    // CustomerDashboard: {screen: CustomerDashboard},
    // AgentDashboard: {screen: AgentDashboard},
    AgentTabar : { screen :AgentTabar},
    CustomerTabbar : {screen : CustomerTabbar},
    // CustomerResetPassword: {screen: CustomerResetPassword},
    AgentResetPassword: {screen: AgentResetPassword},
    // CustomerProfile: {screen: CustomerProfile},
    // CustomerJobs: {screen: CustomerJobs},
    // CreateJob: {screen: CreateJob},
    // CustomerAddress: {screen: CustomerAddress},
    // CustomerDateTime: {screen: CustomerDateTime},
    // CustomerBaseService: {screen: CustomerBaseService},
    // CustomerAddonService: {screen: CustomerAddonService},
    // CustomerServiceType: {screen: CustomerServiceType},
    // CustomerNewAddress: {screen: CustomerNewAddress},
    // CustomerTrabajosDashboard :{ screen  : CustomerTrabajosDashboard},
    // CustomerJobDetailScreen : {screen :CustomerJobDetailScreen}
  },{
    // initialRouteName :"Home"
    initialRouteName :"CustomerTabbar"
});

export const AgentNavigator = SwitchNavigator({
    Home: {screen: Home},
    CustomerLogin: {screen: CustomerLogin},
    AgentLogin: {screen: AgentLogin},
    CustomerSignUp: {screen: CustomerSignUp},
    AgentSignUp: {screen: AgentSignUp},
    // CustomerDashboard: {screen: CustomerDashboard},
    // AgentDashboard: {screen: AgentDashboard},
    AgentTabar : { screen :AgentTabar},
    // CustomerTabbar : {screen : CustomerTabbar},
    // CustomerResetPassword: {screen: CustomerResetPassword},
    // AgentResetPassword: {screen: AgentResetPassword},
    // CustomerProfile: {screen: CustomerProfile},
    // CustomerJobs: {screen: CustomerJobs},
    // CreateJob: {screen: CreateJob},
    // CustomerAddress: {screen: CustomerAddress},
    // CustomerDateTime: {screen: CustomerDateTime},
    // CustomerBaseService: {screen: CustomerBaseService},
    // CustomerAddonService: {screen: CustomerAddonService},
    // CustomerServiceType: {screen: CustomerServiceType},
    // CustomerNewAddress: {screen: CustomerNewAddress},
    // CustomerTrabajosDashboard :{ screen  : CustomerTrabajosDashboard},
    // CustomerJobDetailScreen : {screen :CustomerJobDetailScreen}
  },{
    initialRouteName :"AgentTabar"
});

