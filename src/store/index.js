import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'
import Taro from '@tarojs/taro'

const loadState = () => {
  try {
    // 也可以容错一下不支持localStorage的情况下，用其他本地存储
    const serializedState = Taro.getStorageSync('userList')
    if (serializedState === null) {
      return undefined
    } else {
      return JSON.parse(serializedState)
    }
  } catch (err) {
    // ... 错误处理
    return undefined
  }
}

const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)
    Taro.setStorageSync('userList', serializedState)
  } catch (err) {
    // ...错误处理
  }
}
const middlewares = [thunkMiddleware, createLogger()]

export default function configStore () {
  const store = createStore(
    rootReducer,
    loadState(),
    applyMiddleware(...middlewares)
  )
  store.subscribe(() => {
    let state = store.getState()
    saveState(state)
  })
  return store
}
