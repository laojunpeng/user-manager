// src/reducers/index.js
import { combineReducers } from 'redux'
import data from './data'
import counter from './counter'

export default combineReducers({
  data,counter
})