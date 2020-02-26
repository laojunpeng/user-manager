// src/reducers/counter.js
import { USER } from '../constants/data'

const INITIAL_STATE = {
  userList: []
}

export default function data (state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER:
      return {
        ...state,
        userList: [...state.userList,action.user]
      }
    default:
      return state
  }
}