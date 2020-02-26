import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtCard } from 'taro-ui'
import './report.scss'

import { connect } from '@tarojs/redux'
import { bindActionCreators } from 'redux'

import * as Actions from '../../actions/data'

function mapStateToProps (state) {
  return {
    userList: state.data.userList
  }
}
function mapDispatchToProps (dispatch) {
  return {
    ...bindActionCreators(Actions, dispatch)
  }
}
@connect(mapStateToProps, mapDispatchToProps)
class Report extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {}

  componentDidMount () {
    console.info(this.props.userList)
  }

  componentWillUnmount () {}

  componentDidShow () {}

  componentDidHide () {}

  handleChange (type, value) {
    this.setState({
      [type]: value
    })
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return value
  }

  config = {
    navigationBarTitleText: '报表'
  }

  render () {
    return (
      <View className='report'>
        {this.props.userList.map((item, index) => (
          <AtCard
            key={item}
            // note='小Tips'
            extra={`电话：${item.mobile}`}
            title={`${item.name}${item.sex=='男'?'先生':'小姐'}`}
            // thumb='http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'
          >
            <View>{`选择项目：${item.itemCheckList}`}</View>
            <View>{`选择精油：${item.oilCheckList}`}</View>
            <View>{`重点按摩：${item.keyCheckList}`}</View>
            <View>{`禁止按摩：${item.forbidCheckList}`}</View>
          </AtCard>
        ))}
      </View>
    )
  }
}
export default Report
