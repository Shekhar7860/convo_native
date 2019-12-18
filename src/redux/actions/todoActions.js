"use strict";
import React from "react";

import * as type from "../actionType";

// Add ToDoTYPE
export const addTodoActionType = payload => {
  
    return {
      type: type.ADD_TODO_SUCCESS,
      payload
    };
  };

// Update ToDoTYPE
export const updateTodoActionType = payload => {
    return {
      type: type.UPDATE_TODO_SUCCESS,
      payload
    };
  };

// Delete ToDo TYPE
export const deleteTodoActionType = payload => {
    return {
      type: type.DELETE_TODO_SUCCESS,
      payload
    };
  };
export const readTodoActionType = payload => {
  return {
    type: type.READ_TODO_SUCCESS,
    payload
  };
}
// Add TODO
export const addTodo=(todo)=>{
  
    return (dispatch, getState) => {
        return new Promise((resolve,reject) => {
            if(todo){
                dispatch(addTodoActionType(todo));
                resolve(true)
            }
        })
    };
  }

// UPDATe TODO
export const updateTodo=(todo)=>{
    return (dispatch, getState) => {
        return new Promise((resolve,reject) => {
            if(todo){
                dispatch(updateTodoActionType(todo));
                resolve(true)
            }
        })
    };
  }

// UPDATeTODO
export const deleteTodo=(todo)=>{
    return (dispatch, getState) => {
        return new Promise((resolve,reject) => {
            if(todo){
                dispatch(deleteTodoActionType(todo));
                resolve(true)
            }
        })
    };
  }

// UPDATeTODO
export const readTodo=(todo)=>{
  return (dispatch, getState) => {
      return new Promise((resolve,reject) => {
          if(todo){
              dispatch(readTodoActionType(todo));
              resolve(true)
          }
      })
  };
}