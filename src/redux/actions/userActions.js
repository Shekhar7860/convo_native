"use strict";
import React from "react";
import axios from 'axios';
import * as type from "../actionType";
import { BASE_URL } from '../../utilities/contsants'

// Set Logged User Data
export const setLoggedUserType = payload => {
  return {
    type: type.SET_LOGGED_USER_DATA,
    payload
  };
};


// Set Convo list User Data
export const setConvoListType = payload => {
  return {
    type: type.SET_CONVO_LIST_USER_DATA,
    payload
  };
};


// Set Logged User Data Dispatch
export const setLoggedUserData = (user) => {
  debugger
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      if (user) {
        dispatch(setLoggedUserType(user));
        resolve(true)
      }
    })
  };
}

// Update Logged User Data
export const updateLoggedUserType = payload => {
  return {
    type: type.UPDATE_USER_DATA,
    payload
  };
};


// Update Logged User Data Dispatch
export const updateLoggedUserData = (user) => {
  debugger
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      if (user) {
        dispatch(updateLoggedUserType(user));
        resolve(true)
      }
    })
  };
}


// loginApi and User Data Dispatch
export const loginSignupUser = (url, data) => {
  debugger
  return (dispatch, getState) => {
    return axios.post(BASE_URL + url, data)
      .then(function (response) {
        debugger
        if (response.data.statusCode == "200") {
          dispatch(setLoggedUserType(response.data.data))
          return {
            success: response.data.data,
            status: response.data.statusCode
          }
        } else if (response.data.statusCode == "401") {
          return {
            failure: response.data.message,
            status: response.data.statusCode
          }
        } else {
          return {
            failure: response.data.message,
            status: response.data.statusCode
          }
        }
      })
      .catch(function (error) {

        if (error.response) {
          return {
            status: error.response.data.statusCode,
            failure: error.response.data.message
          }
        }
      })
    // return new Promise((resolve,reject) => {

    // })
  };
}

// Set Toast Message
export const setToastMessage = (message, errorColor) => {

  return {
    type: type.SET_TOAST_MESSAGE,
    toastMessage: message,
    errorColor: errorColor
  };
};

export const setIndicator = loader => {
  return {
    type: type.SET_LOADER,
    loader: loader
  };
};
// Succes Log Out User
export const logOutUser = () => {
  return {
    type: type.LOGOUT_SUCCESS
  };
};
export const logOutUserSuccess = (url, token, lang) => {
  debugger
  let data = {}
  return (dispatch, getState) => {
    return axios.post(BASE_URL + url, data, { headers: { 'authorization': 'bearer' + token } })
      .then(function (response) {
        debugger
        if (response.data.statusCode == "200") {
          dispatch(logOutUser());
          return {
            success: response.data.data,
            status: response.data.statusCode
          }
        } else if (response.data.statusCode == "401") {
          return {
            failure: response.data.message,
            status: response.data.statusCode
          }
        } else {
          return {
            failure: response.data.message,
            status: response.data.statusCode
          }
        }
      })
      .catch(function (error) {
        if (error.response) {
          return {
            status: error.response.data.statusCode,
            failure: error.response.data.message
          }
        }
      })
  }
};

// convoList

export const convoList = (url, search, skip, limit, token) => {
  
  return (dispatch, getState) => {
    return axios.get(`${BASE_URL + url}?skip=${skip}&limit=${limit}&search=${search}`, { headers: { 'authorization': 'bearer' + token } })
      .then(function (response) {
        debugger
        if (response.data.statusCode == "200") {
          dispatch(setConvoListType(response.data))
          return {
            success: response.data,
            status: response.data.statusCode
          }
        } else if (response.data.statusCode == "401") {
          return {
            failure: response.data.message,
            status: response.data.statusCode
          }
        } else {
          return {
            failure: response.data.message,
            status: response.data.statusCode
          }
        }
      })
      .catch(function (error) {

        if (error.response) {
          return {
            status: error.response.data.statusCode,
            failure: error.response.data.message
          }
        }
      })
    // return new Promise((resolve,reject) => {

    // })
  };
  
  
  
  
  // return (dispatch, getState) => {
  //   return new Promise((resolve, reject) => {
  //     dispatch(logOutUser());
  //     resolve(true);
  //   });
  // };
}


export const tokenLogOutUserSuccess = (lang) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(logOutUser());
      resolve(true);
    });
  };
}