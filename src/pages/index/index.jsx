import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.scss'

export default class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {}

  componentDidMount () {}

  componentWillUnmount () {}

  componentDidShow () {}

  componentDidHide () {}

  navigate (url) {
    Taro.navigateTo({ url: this.authorize() ? url : '/pages/login/login'+'?redirect='+encodeURIComponent(url) })
  }

  authorize () {
    return Taro.getStorageSync('authorize') === 'taiyue'
  }

  config = {
    navigationBarTitleText: '欢迎'
  }

  render () {
    return (
      <View className='index'>
        <View className='at-row'>
          <View
            className='at-col'
            onClick={this.navigate.bind(this, '/pages/checkin/checkin')}
          >
            <AtIcon color='#3F536E' value='numbered-list' size='40'></AtIcon>
            <View className='icon-text'>登记</View>
          </View>
          <View
            className='at-col'
            onClick={this.navigate.bind(this, '/pages/report/report')}
          >
            <AtIcon color='#3F536E' value='folder' size='40'></AtIcon>
            <View className='icon-text'>报表</View>
          </View>
        </View>
      </View>
    )
  }
}
