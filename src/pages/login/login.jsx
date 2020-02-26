import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton, AtInput, AtMessage } from 'taro-ui'
import './login.scss'

export default class Login extends Component {
  constructor (props) {
    super(props)
    this.state = { account: '', password: '',redirect:'' }
  }

  componentWillMount () {
    let redirect = this.$router.params.redirect;
    if(redirect){
      this.setState({redirect})
    }
  }

  componentDidMount () {
  }

  componentWillUnmount () {

  }

  componentDidShow () {}

  componentDidHide () {}

  handleChange (type, value) {
    this.setState({
      [type]: value
    })
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return value
  }
  onSubmit (event) {
    console.info(this.state.redirect);
    if (this.state.account !== 'test' || this.state.password !== '123123') {
      Taro.atMessage({
        message: '用户名或密码错误',
        type: 'error'
      })
    }else{
      Taro.setStorage({ key: 'authorize', data: 'taiyue' })
      wx.redirectTo({url:this.state.redirect})
    }
  }

  config = {
    navigationBarTitleText: '欢迎'
  }

  render () {
    return (
      <View className='index'>
        <AtMessage />
        <View className='content'>
          <View className='at-article__h2'>泰悦</View>
          <AtInput
            name='value'
            title='用户名'
            type='text'
            placeholder='请输入'
            value={this.state.account}
            onChange={this.handleChange.bind(this, 'account')}
          />
          <AtInput
            name='value'
            title='密码'
            type='password'
            placeholder='请输入'
            value={this.state.password}
            onChange={this.handleChange.bind(this, 'password')}
          />
          <AtButton
            className='btn'
            type='primary'
            onClick={this.onSubmit.bind(this)}
          >
            登录
          </AtButton>
        </View>
      </View>
    )
  }
}
