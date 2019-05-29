import {SwitchNavigator} from 'react-navigation';

import Home from '../../components/Customer/Home/Home'
import CustomerLogin from '../../components/Customer/CustomerLogin/CustomerLogin';
import CustomerSignUp from '../../components/Customer/CustomerSignUp/CustomerSignUp';
import CustomerResetPassword from '../../components/Customer/CustomerResetPassword/CustomerResetPassword';
import CustomerTabbar from "./_CustomerTabNavigator";
import CustomerTabbarServ from './_CustomerTabNavigatorServ';

import AgentSignUp from '../../components/Agent/AgentSignup/AgentSignUp';
import AgentLogin from '../../components/Agent/AgentLogin/AgentLogin';
import AgentResetPassword from '../../components/Agent/AgentResetPassword/AgentResetPassword';
import AgentTabar from "./_AgentTabNavihator";

export const MainNavigator = SwitchNavigator({
  Home: {screen: Home},
  CustomerLogin: {screen: CustomerLogin},
  AgentLogin: {screen: AgentLogin},
  CustomerSignUp: {screen: CustomerSignUp},
  AgentSignUp: {screen: AgentSignUp},
  AgentTabar : { screen :AgentTabar},
  CustomerTabbar : {screen : CustomerTabbar},
  CustomerTabbarServ : {screen : CustomerTabbarServ},
  CustomerResetPassword: {screen: CustomerResetPassword},
  AgentResetPassword: {screen: AgentResetPassword},
},{
  initialRouteName :"Home"
});

export const AgentNavigator = SwitchNavigator({
  Home: {screen: Home},
  CustomerLogin: {screen: CustomerLogin},
  AgentLogin: {screen: AgentLogin},
  CustomerSignUp: {screen: CustomerSignUp},
  AgentSignUp: {screen: AgentSignUp},
  AgentTabar : { screen :AgentTabar},
},{
  initialRouteName :"AgentTabar"
});

