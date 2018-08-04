import React from 'react';
import { Alert, AsyncStorage } from 'react-native';
import * as APILIST from '../constants/api';
import * as globals from '../util/globals';
class ImageUpload{

  imageUpload(profiePicture){

    var formData = new FormData();
    formData.append("[agent][avatar]",profiePicture);
    fetch(APILIST.BASE_URL + APILIST.UPDATE_PROFILE_PIC,{
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
      console.log("Register Profile pic Response-->"+JSON.stringify(responseJson));
      // AsyncStorage.multiSet([["access_token",response.agent.data.attributes.access_token || ""],
      AsyncStorage.setItem('avatar', responseJson.agent.data.attributes.avatar.url || "").then(()=>{
        globals.avatar = responseJson.agent.data.attributes.avatar.url || ""
      })
    })
    .catch((error) => {
      console.error(error);
    });

  }
}

module.exports = new ImageUpload()
