import EvilIcons from '@expo/vector-icons/EvilIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Moment from 'moment';
import React, { Component } from 'react';
import { Animated, AsyncStorage, Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import * as urls from '../../../constants/api';
import * as globals from '../../../util/globals';

const { width } = Dimensions.get('window');
const styles = require('./CustomerDashboardStyles');
var _this = null;

export default class CustomerDashboard extends Component {
  scrollX = new Animated.Value(0) // this will be the scroll location of our ScrollView
  constructor(props) {
    super(props);
    _this = this
    this.state = {
      servicesTypes: [],
      nextJobs: [],
      pastJobs: [],
      activeSlide: null
    };
    this.getServicesTypes = this.getServicesTypes.bind(this);
    this.getNextJobs = this.getNextJobs.bind(this);
    this.getPastJobs = this.getPastJobs.bind(this);
  }

  static navigateToDetail = (item) => {
    _this.props.navigation.navigate("CustomerJobDetailScreen", { jobData: item.item })
  }

  getServicesTypes = (authToken) => {
    servicesTypesURL = urls.BASE_URL + urls.SERVICE_TYPES;
    fetch(servicesTypesURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${authToken}`
      },
    }).then((response) => response.json()).then((data) => {
      let servicesTypes = data.service_type.data;
      this.setState({ servicesTypes });
    }).catch((error) => this.setState({ errorMessage: error.message }));
  };

  getNextJobs = (authToken) => {
    this.setState({ nextJobs: [] })
    nextJobsURL = urls.BASE_URL + urls.NEXT_JOBS;
    fetch(nextJobsURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${authToken}`
      },
    }).then((response) => response.json()).then((data) => {
      let nextJobs = data.job.data;
      this.setState({ nextJobs });
    }).catch((error) => this.setState({ errorMessage: error.message }));
  };

  getPastJobs = (authToken) => {
    this.setState({ pastJobs: [] })
    pastJobsURL = urls.BASE_URL + urls.PAST_JOBS;
    fetch(pastJobsURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${authToken}`
      },
    }).then((response) => response.json()).then((data) => {
      let pastJobs = data.job.data;
      this.setState({ pastJobs });
    }).catch((error) => this.setState({ errorMessage: error.message }));
  };

  componentDidMount() {
    AsyncStorage.getItem("customerData").then((item) => {
      const data = JSON.parse(item)
      const authToken = data.customer.data.attributes.access_token;
      globals.access_token = authToken;
      this.getServicesTypes(authToken);
      this.getNextJobs(authToken);
      this.getPastJobs(authToken);
    })
  }

  static getJobsAPICall() {
    _this.getNextJobs(globals.access_token);
    _this.getPastJobs(globals.access_token);
  }

  renderPastJobs() {
    let position = Animated.divide(this.scrollX, width);
    return (
      <View>
        <Text style={styles.section_title}>Próximos Trabajos</Text>
        <View style={styles.section_trabajos_container}>
          <ScrollView
            contentContainerStyle={styles.trabajos_container}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            pagingEnabled={true}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: this.scrollX } } }]
            )}
            scrollEventThrottle={16}
          >
            {
              this.state.nextJobs.map((job) => {
                //console.log(job);
                const date = new Date(job.attributes.started_at), locale = "es-ES",
                  month = date.toLocaleString(locale, { month: "long" });
                var end_date = Moment(month).format('l - hh:mm a')
                // var end_date = month.charAt(0).toUpperCase() + month.slice(1) + " " + date.getDate() + " de " + date.getFullYear() + " - " + date.getHours() + ":" + date.getMinutes() + "Hrs"
                var description = ""
                var subDescription = ""
                job.attributes.job_details.map((val, index) => {
                  if (val.service.type_service == "base") {
                    description += val.service.name
                  } else {
                    subDescription += val.service.name + " X " + val.value
                    subDescription += (job.attributes.job_details.length - 1 == index) ? "" : ", "
                  }
                })
                var location = job.attributes.property.data.attributes.name + " " + job.attributes.property.data.attributes.p_street + ", " + job.attributes.property.data.attributes.s_street + ", " + job.attributes.property.data.attributes.city
                return (
                  <View key={job.id} style={styles.trabajos_item}>
                    <View style={styles.renderRowView}>
                      <View style={[styles.listTitleView, { justifyContent: 'space-around' }]}>

                        <Text style={[styles.titleText, { fontWeight: '900' }]}>{job.attributes.job_details[0].service.name || ""}</Text>
                        <Text style={[{ fontSize: 26, fontWeight: '500' }]}>{"$" + job.attributes.total.toFixed(2)}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <EvilIcons name={"location"} size={16} />
                        <Text style={[{ marginLeft: 5, fontSize: 12, fontWeight: '900' }]}>{location}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name={"md-time"} size={16} style={{ marginLeft: 2 }} />
                        <Text style={[styles.textFont, { marginLeft: 6, fontSize: 12 }]} numberOfLines={1}>{end_date}</Text>
                      </View>
                      <View style={styles.subtextViewStyle}>
                        <Text style={[{ marginLeft: 6, fontSize: 16, fontWeight: '900' }]} numberOfLines={1}>Detalle:</Text>
                        {job.attributes.job_details.map((val, index) => {
                          if(val.service.type_service != 'addon'){
                            return (
                              <View style={{ marginVertical: 3, paddingHorizontal: 10, paddingVertical: 1, marginRight: 5 }}>
                                  <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'space-around' }}>
                                    <View style={{width:'16%',marginRight:'1%'}}>
                                    <Ionicons name={"md-checkmark"} size={16} style={{ marginLeft: 2 }} />
                                    </View>
                                    <View style={{width:'84%'}}>
                                    <Text style={[styles.textFont, { fontSize: 12,color:'#000' }]}>{val.service.name + " X " + val.value}</Text>
                                    </View>
                                  </View>
                              </View>
                            )
                          } 
                        })}
                        <Text style={[{ marginLeft: 6, fontSize: 16, fontWeight: '900' }]} numberOfLines={1}>Adicionales:</Text>
                        {job.attributes.job_details.map((val, index) => {
                          if(val.service.type_service == 'addon'){
                            return (
                              <View style={{ marginVertical: 3, paddingHorizontal: 10, paddingVertical: 1, marginRight: 5 }}>
                                  <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'space-around' }}>
                                    <View style={{width:'16%',marginRight:'1%'}}>
                                    <Ionicons name={"md-checkmark"} size={16} style={{ marginLeft: 2 }} />
                                    </View>
                                    <View style={{width:'84%'}}>
                                    <Text style={[styles.textFont, { fontSize: 12,color:'#000' }]}>{val.service.name + " X " + val.value}</Text>
                                    </View>
                                  </View>
                              </View>
                            )
                          } 
                        })}
                      </View>
                    </View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("CustomerJobDetailScreen", { jobData: job })} >
                      <View style={{ borderWidth: 1, borderColor: 'lightgray', borderRadius: 5, paddingVertical: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>{"Ver Detalles"}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })
            }
          </ScrollView>
          <View style={{ flexDirection: 'row' }}>
            {this.state.nextJobs.map((_, i) => {
              let opacity = position.interpolate({
                inputRange: [i - 1, i, i + 1],
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp'
              });
              return (
                <Animated.View key={i} style={{ opacity, height: 10, width: 10, backgroundColor: '#595959', margin: 8, borderRadius: 5 }} />
              );
            })}
          </View>
        </View>
      </View>
    )
  }

  renderPreviousJobs() {
    let position = Animated.divide(this.scrollX, width);
    return (
      <View>
        <Text style={styles.section_title}>Historial de Trabajos</Text>
        <View style={styles.section_trabajos_container}>
          <ScrollView
            contentContainerStyle={styles.trabajos_container}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            pagingEnabled={true}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: this.scrollX } } }]
            )}
            scrollEventThrottle={16}
          >
            {this.state.pastJobs.map((job) => {
              const date = new Date(job.attributes.started_at), locale = "es-ES",
                month = date.toLocaleString(locale, { month: "long" });
              var end_date = Moment(month).format('l - hh:mm a')
              // var end_date = month.charAt(0).toUpperCase() + month.slice(1) + " " + date.getDate() + " de " + date.getFullYear() + " - " + date.getHours() + ":" + date.getMinutes() + "Hrs"
              var description = ""
              var subDescription = ""
              job.attributes.job_details.map((val, index) => {
                if (val.service.type_service == "base") {
                  description += val.service.name
                } else {
                  subDescription += val.service.name + " X " + val.value
                  subDescription += (job.attributes.job_details.length - 1 == index) ? "" : ", "
                }
              })
              var location = job.attributes.property.data.attributes.name + " " + job.attributes.property.data.attributes.p_street + ", " + job.attributes.property.data.attributes.s_street + ", " + job.attributes.property.data.attributes.city
              return (
                <View key={job.id} style={styles.trabajos_item}>
                  <View style={styles.renderRowView}>
                    <View style={[styles.listTitleView,{ justifyContent: 'space-around' }]}>
                        <Text style={[styles.titleText, { fontWeight: '900' }]}>{job.attributes.job_details[0].service.name || ""}</Text>
                        <Text style={[{ fontSize: 26, fontWeight: '500' }]}>{"$" + job.attributes.total.toFixed(2)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <EvilIcons name={"location"} size={16} />
                      <Text style={{marginLeft: 5, fontSize: 12, fontWeight: '900'}}>{location}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 2 }}>
                      <Ionicons name={"md-time"} size={16} />
                      <Text style={{ fontSize: 14, marginLeft: 8 }} numberOfLines={1}>{end_date}</Text>
                    </View>
                    <View style={styles.subtextViewStyle}>
                    <Text style={[{ marginLeft: 6, fontSize: 16, fontWeight: '900' }]} numberOfLines={1}>Detalle:</Text>
                        {job.attributes.job_details.map((val, index) => {
                          if(val.service.type_service != 'addon'){
                            return (
                              <View style={{ marginVertical: 3, paddingHorizontal: 10, paddingVertical: 1, marginRight: 5 }}>
                                  <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'space-around' }}>
                                    <View style={{width:'16%',marginRight:'1%'}}>
                                    <Ionicons name={"md-checkmark"} size={16} style={{ marginLeft: 2 }} />
                                    </View>
                                    <View style={{width:'84%'}}>
                                    <Text style={[styles.textFont, { fontSize: 12,color:'#000' }]}>{val.service.name + " X " + val.value}</Text>
                                    </View>
                                  </View>
                              </View>
                            )
                          } 
                        })}
                        <Text style={[{ marginLeft: 6, fontSize: 16, fontWeight: '900' }]} numberOfLines={1}>Adicionales:</Text>
                        {job.attributes.job_details.map((val, index) => {
                          if(val.service.type_service == 'addon'){
                            return (
                              <View style={{ marginVertical: 3, paddingHorizontal: 10, paddingVertical: 1, marginRight: 5 }}>
                                  <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'space-around' }}>
                                    <View style={{width:'16%',marginRight:'1%'}}>
                                    <Ionicons name={"md-checkmark"} size={16} style={{ marginLeft: 2 }} />
                                    </View>
                                    <View style={{width:'84%'}}>
                                    <Text style={[styles.textFont, { fontSize: 12,color:'#000' }]}>{val.service.name + " X " + val.value}</Text>
                                    </View>
                                  </View>
                              </View>
                            )
                          } 
                        })}
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate("CustomerJobDetailScreen", { jobData: job })} >
                    <View style={{ borderWidth: 1, borderColor: 'lightgray', borderRadius: 5, paddingVertical: 10, alignItems: 'center', justifyContent: 'center' }}>
                      <Text>{"Ver Detalles"}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })
            }
          </ScrollView>
          <View style={{ flexDirection: 'row' }}>
            {this.state.pastJobs.map((_, i) => {
              let opacity = position.interpolate({
                inputRange: [i - 1, i, i + 1],
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp'
              });
              return (
                <Animated.View key={i} style={{ opacity, height: 10, width: 10, backgroundColor: '#595959', margin: 8, borderRadius: 5 }} />
              );
            })}
          </View>
        </View>
      </View>
    )
  }

  noJobview(data = "") {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <Text>{"No tienes trabajos " + data}</Text>
      </View>
    )
  }

  render() {
    // position will be a value between 0 and photos.length - 1 assuming you don't scroll pass the ends of the ScrollView
    let position = Animated.divide(this.scrollX, width);
    return (
      <View style={styles.container}>
        <Image source={require('../../../../assets/img/dashboard-home.png')} style={styles.banner_image} />
        <Image source={require('../../../../assets/img/logo_blanco.gif')} style={styles.logo_image} />
        <ScrollView>
          <Text style={styles.section_title}>Servicios</Text>
          <View style={styles.section_servicios_container}>
            <ScrollView
              contentContainerStyle={styles.servicios_container}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              pagingEnabled={true}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: this.scrollX } } }]
              )}
              scrollEventThrottle={16}
            >
              {
                this.state.servicesTypes.map((serviceType) => {
                  return (
                    <View key={serviceType.id} style={styles.servicios_item}>
                      <TouchableOpacity onPress={() => this.props.navigation.navigate("CustomerCleaning", { serviceType: serviceType })}>
                        <Image source={{ uri: serviceType.attributes.image.url }} style={styles.servicios_item_image} />
                        <Text style={styles.servicios_item_description}>{serviceType.attributes.name}</Text>
                      </TouchableOpacity>
                    </View>
                  );
                })
              }
            </ScrollView>
            <View style={{ flexDirection: 'row' }}>
              {this.state.servicesTypes.map((_, i) => {
                let opacity = position.interpolate({
                  inputRange: [i - 1, i, i + 1],
                  outputRange: [0.3, 1, 0.3],
                  extrapolate: 'clamp'
                });
                return (
                  <Animated.View key={i} style={{ opacity, height: 10, width: 10, backgroundColor: '#595959', margin: 8, borderRadius: 5 }} />
                );
              })}
            </View>
          </View>
          {(this.state.nextJobs.length > 0) ? this.renderPastJobs() : this.noJobview("actuales")}
          {(this.state.pastJobs.length > 0) ? this.renderPreviousJobs() : this.noJobview("pasados")}
        </ScrollView>
      </View>
    );
  }
}
