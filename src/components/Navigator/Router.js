import {SwitchNavigator} from 'react-navigation';

import Home from '../../components/Customer/Home/Home';
import CustomerLogin from '../../components/Customer/CustomerLogin/CustomerLogin';
import CustomerSignUp from '../../components/Customer/CustomerSignUp/CustomerSignUp';
import CustomerResetPassword from '../../components/Customer/CustomerResetPassword/CustomerResetPassword';
import CustomerTabbar from "./_CustomerTabNavigator";

import AgentSignUp from '../../components/Agent/AgentSignup/AgentSignUp';
import AgentLogin from '../../components/Agent/AgentLogin/AgentLogin';
import AgentResetPassword from '../../components/Agent/AgentResetPassword/AgentResetPassword';
import AgentTabar from "./_AgentTabNavihator";
import AgentDashboard from "./_AgentTabNavihator";

export const MainNavigator = SwitchNavigator({
  Home: {screen: Home},
  CustomerLogin: {screen: CustomerLogin},
  AgentLogin: {screen: AgentLogin},
  CustomerSignUp: {screen: CustomerSignUp},
  AgentSignUp: {screen: AgentSignUp},
  AgentTabar : { screen: AgentTabar},
  CustomerTabbar : {screen: CustomerTabbar},
  CustomerResetPassword: {screen: CustomerResetPassword},
  AgentResetPassword: {screen: AgentResetPassword},
},{
  initialRouteName :"Home"
});

export const CustomerLoginAuth = SwitchNavigator({
  Home: {screen: Home},
  CustomerLogin: {screen: CustomerLogin},
  AgentLogin: {screen: AgentLogin},
  CustomerSignUp: {screen: CustomerSignUp},
  AgentSignUp: {screen: AgentSignUp},
  AgentTabar : { screen: AgentTabar},
  CustomerTabbar : {screen: CustomerTabbar},
  CustomerResetPassword: {screen: CustomerResetPassword},
  AgentResetPassword: {screen: AgentResetPassword},
},{
  initialRouteName :"CustomerTabbar"
});

export const AgentLoginAuth = SwitchNavigator({
  Home: {screen: Home},
  CustomerLogin: {screen: CustomerLogin},
  AgentLogin: {screen: AgentLogin},
  CustomerSignUp: {screen: CustomerSignUp},
  AgentSignUp: {screen: AgentSignUp},
  AgentTabar : { screen: AgentTabar},
  AgentDashboard : {screen: AgentDashboard},
},{
  initialRouteName :"AgentDashboard"
});