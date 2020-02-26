// src/actions/counter.js
import { USER } from '../constants/data'

export const updateUserList = (user) => {
  return {
    type: USER,
    user
  }
}

export function updateUser (user) {
  console.info(user);
  return dispatch => {
    dispatch(updateUserList(user))
  }
}
