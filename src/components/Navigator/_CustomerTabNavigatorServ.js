import React from 'react';
import {StyleSheet,Text,View} from 'react-native';
import {TabNavigator,TabBarBottom,StackNavigator} from 'react-navigation';

import CustomerDashboardServe from '../../components/Customer/CustomerDashboardServe/CustomerDashboardServe';
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
import CustomerUpdateProfile from "../../components/Customer/CustomerUpdateProfile/CustomerUpdateProfile";
import CustomerUpdateProperties from "../../components/Customer/CustomerUpdateProperties/CustomerUpdateProperties";
import CreateProperties from "../../components/Customer/CreateProperties/CreateProperties";
import CustomerUpdatePassword from "../../components/Customer/CustomerUpdatePassword/CustomerUpdatePassword";
import CustomerReviewScreen from "../../components/Customer/CustomerReviewScreen/CustomerReviewScreen";
import CustomerAgentReviewScreen from "../../components/Customer/CustomerAgentReviewScreen/CustomerAgentReviewScreen";
import CustomerCleaning from "../../components/Customer/CustomerCleaning/CustomerCleaning";

import CustomerLogin from '../../components/Customer/CustomerLogin/CustomerLogin';
import CustomerSignUp from '../../components/Customer/CustomerSignUp/CustomerSignUp';
import ServiceDetail from "../../components/Customer/ServiceDetail/ServiceDetail";
import Frequency from "../../components/Customer/Frequency/Frequency";
import CalenderPick from "../../components/Customer/CalenderPick/CalenderPick";
import DirectionScreen from "../../components/Customer/DirectionScreen/DirectionScreen";
import AddressForm from "../../components/Customer/AddressForm/AddressForm";
import AdditionalDetail from "../../components/Customer/AdditionalDetail/AdditionalDetail";
import CardListScreen from "../../components/Customer/CardListScreen/CardListScreen";
import DetailsListScreen from "../../components/Customer/DetailsListScreen/DetailsListScreen";
import AddCardScreen from "../../components/Customer/AddCardScreen/AddCardScreen";
import AddDetailsScreen from "../../components/Customer/AddDetailsScreen/AddDetailsScreen";
import CommentListScreen from "../../components/Customer/CommentListScreen/CommentListScreen";
import CustomerProfileCardList from "../../components/Customer/CustomerProfileCardList/CustomerProfileCardList";
import CustomerProfileAddCard from "../../components/Customer/CustomerProfileAddCard/CustomerProfileAddCard";
import CustomerBillingList from "../../components/Customer/CustomerBillingList/CustomerBillingList";
import CustomerAddBillingScreen from "../../components/Customer/CustomerAddBillingScreen/CustomerAddBillingScreen";
import PaymentScreen from "../Customer/PaymentScreen/Payment"
import Entypo from '@expo/vector-icons/Entypo';
import Foundation from '@expo/vector-icons/Foundation';

const iconHeight = 20;

//======================================================================
// AgentDashboard StackNavigator
//======================================================================

const HomeDashboard = StackNavigator({
  CustomerDashboardServe : { screen :CustomerDashboardServe},
  CustomerResetPassword : { screen :CustomerResetPassword},
  CustomerProfile : { screen :CustomerProfile},
  CustomerJobs : { screen : CustomerJobs },
  CustomerAddress : { screen : CustomerAddress },
  CustomerDateTime : { screen : CustomerDateTime },
  CustomerBaseService : { screen : CustomerBaseService },
  CustomerServiceType : { screen : CustomerServiceType },
  CustomerAddonService : { screen : CustomerAddonService },
  CustomerNewAddress : { screen : CustomerNewAddress },
  CustomerTrabajosDashboard : { screen : CustomerTrabajosDashboard },
  CustomerJobDetailScreen : { screen : CustomerJobDetailScreen },
  CustomerReviewScreen : { screen : CustomerReviewScreen },
  CustomerAgentReviewScreen : { screen : CustomerAgentReviewScreen },
  CustomerCleaning : { screen : CustomerCleaning },
  CreateJob : { screen : CreateJob },
  ServiceDetail : { screen : ServiceDetail },
  Frequency : { screen : Frequency },
  CalenderPick : { screen : CalenderPick },
  DirectionScreen : { screen : DirectionScreen },
  AddressForm : { screen : AddressForm },
  AdditionalDetail : { screen : AdditionalDetail },
  CardListScreen : { screen : CardListScreen },
  DetailsListScreen : { screen : DetailsListScreen },
  AddCardScreen : { screen : AddCardScreen },
  AddDetailsScreen : { screen : AddDetailsScreen },
  CommentListScreen : { screen : CommentListScreen },
  CustomerProfileCardList : { screen : CustomerProfileCardList },
  CustomerProfileAddCard : { screen : CustomerProfileAddCard },
  CustomerBillingList : { screen : CustomerBillingList },
  CustomerAddBillingScreen : { screen : CustomerAddBillingScreen },
  PaymentScreen : { screen : PaymentScreen },
},{
  navigationOptions:{
    header : null,
    initialRouteName : "CustomerDashboardServe"
  }
})

export default HomeDashboard;

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