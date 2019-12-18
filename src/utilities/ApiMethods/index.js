"use strict";
import React from "react";
import axios from 'axios';
import { BASE_URL } from '../contsants'

// getApiMethod
function getData(url, token) {
  debugger
  return axios.get(`${BASE_URL + url}`, { headers: { 'authorization': 'bearer' + token } })
    .then(function (response) {
      return {
        status: response.data.statusCode,
        success: response.data.data
      }
    })
    .catch(function (error) {
      if (error.response) {
        return {
          status: error.response.data.statusCode,
          failure: error.response.data.message
        }
      } else {
        return {
          failure: 'No internet connection'
        }
      }
    });
}

// postApiMethod
function postData(url, data, token) {
  debugger
  return axios.post(`${BASE_URL + url}`, data, { headers: { 'authorization': 'bearer' + token } })
    .then(function (response) {
      return {
        status: response.data.statusCode,
        success: response.data.data
      }
    })
    .catch(function (error) {
      if (error.response) {
        return {
          status: error.response.data.statusCode,
          failure: error.response.data.message
        }
      } else {
        return {
          failure: 'No internet connection'
        }
      }
    });
}

// forgot password

export const forgotPassword = (url, data) => {
  return withoutToken(url, data)
}


function withoutToken(url, data) {
  debugger
  return axios.post(`${BASE_URL + url}`, data)
    .then(function (response) {
      return {
        status: response.data.statusCode,
        success: response.data.data
      }
    })
    .catch(function (error) {
      if (error.response) {
        return {
          status: error.response.data.statusCode,
          failure: error.response.data.message
        }
      } else {
        return {
          failure: 'No internet connection'
        }
      }
    });
}


// updateProfile

export const updateProfile = (url, data, token) => {
  return postData(url, data, token)
}

// function putData(url, data, token) {
//   debugger
//   return axios.put(`${BASE_URL + url}`, {"deviceToken":data.deviceToken,"_id":data._id}, { headers: { 'authorization': 'bearer' + token } })
//     .then(function (response) {
//       return {
//         status: response.data.statusCode,
//         success: response.data.data
//       }
//     })
//     .catch(function (error) {
//       if (error.response) {
//         return {
//           status: error.response.data.statusCode,
//           failure: error.response.data.message
//         }
//       } else {
//         return {
//           failure: 'No internet connection'
//         }
//       }
//     });
// }



// get convo type list
export const getConvoType = (url, token) => {
  return getData(url, token)
}

// get question list
export const getQuestionList = (url, id, skip, limit, token) => {
  return axios.get(`${BASE_URL + url}?skip=${skip}&limit=${limit}&convoId=${id}`, { headers: { 'authorization': 'bearer' + token } })
    .then(function (response) {
      debugger
      return {
        status: response.data.statusCode,
        success: response.data
      }
    })
    .catch(function (error) {
      if (error.response) {
        return {
          status: error.response.data.statusCode,
          failure: error.response.data.message
        }
      } else {
        return {
          failure: 'No internet connection'
        }
      }
    });
}


// get chat list 

export const getChatList = (url, id, skip, limit, token) => {
  debugger
  return axios.get(`${BASE_URL + url}?_id=${id}&skip=${skip}&limit=${limit}`, { headers: { 'authorization': 'bearer' + token } })
    .then(function (response) {
      debugger
      return {
        status: response.data.statusCode,
        success: response.data
      }
    })
    .catch(function (error) {
      if (error.response) {
        return {
          status: error.response.data.statusCode,
          failure: error.response.data.message
        }
      } else {
        return {
          failure: 'No internet connection'
        }
      }
    });
}

//  uploadImage

export const uploadImage = (url, image, token) => {
  debugger
  let formdata = new FormData();
  formdata.append("file", { uri: image, name: 'image.jpg', type: 'multipart/form-data' })
  return postData(url, formdata, token)
}



// add new Question

// create new question
export const addQuestion = (url, data, token) => {
  debugger
  return postData(url, data, token)
}

// create new convo
export const createNewConvoUser = (url, data, token) => {
  debugger
  return postData(url, data, token)
}

// add sendAnswer list 

export const sendAnswer = (url, data, token) => {
  return postData(url, data, token)
}


export const getUserList = (url, search, skip, limit, token) => {
  return axios.get(`${BASE_URL + url}?skip=${skip}&limit=${limit}&search=${search}`, { headers: { 'authorization': 'bearer' + token } })
    .then(function (response) {
      debugger
      return {
        status: response.data.statusCode,
        success: response.data
      }
    })
    .catch(function (error) {
      if (error.response) {
        return {
          status: error.response.data.statusCode,
          failure: error.response.data.message
        }
      } else {
        return {
          failure: 'No internet connection'
        }
      }
    });
}