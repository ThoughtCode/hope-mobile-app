import React from 'react';
import { Alert, AsyncStorage } from 'react-native';
import * as APILIST from '../constants/api';
import * as globals from '../util/globals';
class ImageUpload{

  imageUpload(profiePicture,isAgent){

    var formData = new FormData();
    

    var API = APILIST.CUSTOMERS_PROFILE
    if(isAgent){
      formData.append("[agent][avatar]",profiePicture);
      API = APILIST.UPDATE_PROFILE_PIC
    }else{
      formData.append("[customer][avatar]",profiePicture);
    }
    fetch(APILIST.BASE_URL + API,{
      method : "PUT",
      headers : {
        'Accept': 'application/json',
        'content-type': 'multipart/form-data',
        'Authorization' : 'Bearer ' + globals.access_token || ''
      },
      body: formData
    })
    .then((response) => response.json())
    .then((responseJson) => {
      // AsyncStorage.multiSet([["access_token",response.agent.data.attributes.access_token || ""],
      if(isAgent){
        AsyncStorage.setItem('avatar', responseJson.agent.data.attributes.avatar.url || "").then(()=>{
          globals.avatar = responseJson.agent.data.attributes.avatar.url || ""
        })
      }else{
        globals.avatar = responseJson.customer.data.attributes.avatar.url || ""
      }
      
    })
    .catch((error) => {
      console.error(error);
    });

  }
}

module.exports = new ImageUpload()
