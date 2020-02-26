import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import {
  AtInput,
  AtCheckbox,
  AtButton,
} from 'taro-ui'
import { connect } from '@tarojs/redux'
import './checkin.scss'
import { updateUser } from '../../actions/data'

@connect(
  ({ data }) => ({
    data
  }),
  dispatch => ({
    updateUser (user) {
      dispatch(updateUser(user))
    }
  })
)
class Checkin extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      name: '',
      mobile: '',
      sex: '男',
      itemCheckList: [],
      oilCheckList: [],
      keyCheckList: [],
      forbidCheckList: []
    }
    this.sexSelector = ['女', '男']
    this.itemOption = [
      {
        value: '泰式古法按摩60分钟',
        label: '泰式古法按摩',
        desc: '60分钟'
      },
      {
        value: '泰式古法按摩90分钟',
        label: '泰式古法按摩',
        desc: '90分钟'
      },
      {
        value: '泰式古法按摩+草药球90分钟',
        label: '泰式古法按摩+草药球',
        desc: '90分钟'
      },
      {
        value: '精油按摩60分钟',
        label: '精油按摩',
        desc: '60分钟'
      },
      {
        value: '精油按摩90分钟',
        label: '精油按摩',
        desc: '90分钟'
      }
    ]
    this.oilOption = [
      {
        value: '柠檬草',
        label: '柠檬草',
        desc: 'Lemongrass'
      },
      {
        value: '茉莉花',
        label: '茉莉花',
        desc: 'Jasmine'
      },
      {
        value: '泰式草药',
        label: '泰式草药',
        desc: 'Thai Herb'
      },
      {
        value: '清爽提神',
        label: '清爽提神',
        desc: 'Refreshing'
      }
    ]
    this.bodyOption = [
      {
        value: '头部',
        label: '头部',
        desc: 'Head'
      },
      {
        value: '颈部',
        label: '颈部',
        desc: 'Neck'
      },
      {
        value: '肩部',
        label: '肩部',
        desc: 'Shoulder'
      },
      {
        value: '背部',
        label: '背部',
        desc: 'Back'
      },
      {
        value: '腰部',
        label: '腰部',
        desc: 'Waist'
      },
      {
        value: '手部',
        label: '手部',
        desc: 'Hands'
      },
      {
        value: '大腿',
        label: '大腿',
        desc: 'Thigh'
      },
      {
        value: '小腿',
        label: '小腿',
        desc: 'Shank'
      },
      {
        value: '脚趾',
        label: '脚趾',
        desc: 'Toe'
      }
    ]
  }
  handleChange (type, value) {
    this.setState({
      [type]: value
    })
  }
  onSubmit () {
    this.props.updateUser(this.state)
    Taro.showModal({
      title: '提示',
      content: '成功保存',
      confirmText: '继续录入',
      cancelText: '到主菜单',
      success: res => {
        if (res.confirm) {
          console.log('用户点击确定')
          Taro.pageScrollTo({
            scrollTop: 0
          })
          this.setState({
            name: '',
            mobile: '',
            sex: '男',
            itemCheckList: [],
            oilCheckList: [],
            keyCheckList: [],
            forbidCheckList: []
          })
        } else if (res.cancel) {
          Taro.navigateTo({
            url: '/pages/index/index'
          })
        }
      }
    })
  }
  onChange = e => {
    this.setState({
      sex: this.sexSelector[e.detail.value]
    })
  }

  config = {
    navigationBarTitleText: '泰悦'
  }

  render () {
    return (
      <View className='checkin'>
        <View className='at-article'>
          <View className='at-article__h1'>客户服务表</View>
          <View className='at-article__content'>
            <View className='at-article__h3'>按摩护理宾客须知：</View>
            <View className='at-article__p'>
              如您有下述任何一种情况或者其他身体状况感到不适，我们建议您在预定按摩Spa前咨询医生建议。
            </View>
            <View className='at-article__p'>
              高血压及心脏病、近期做过任何外科手术、怀孕、月经期
            </View>
            <View className='at-article__section'>
              <View className='at-article__h2'>个人信息</View>
              <AtInput
                name='name'
                title='姓名'
                type='text'
                placeholder='请输入'
                value={this.state.name}
                onChange={this.handleChange.bind(this, 'name')}
              />
              <AtInput
                name='mobile'
                title='联系方式'
                type='text'
                placeholder='请输入'
                value={this.state.mobile}
                onChange={this.handleChange.bind(this, 'mobile')}
              />
              <View className='page-section'>
                <Picker
                  mode='selector'
                  range={this.sexSelector}
                  onChange={this.onChange}
                >
                  <View className='picker'>
                    <Text className='picker__title'>性别</Text>
                    <Text className='picker-content'>{this.state.sex}</Text>
                  </View>
                </Picker>
              </View>
            </View>
            <View className='at-article__section'>
              <View className='at-article__h2'>选择项目</View>
              <AtCheckbox
                options={this.itemOption}
                selectedList={this.state.itemCheckList}
                onChange={this.handleChange.bind(this, 'itemCheckList')}
              />
              <View className='at-article__h2'>选择精油</View>
              <AtCheckbox
                options={this.oilOption}
                selectedList={this.state.oilCheckList}
                onChange={this.handleChange.bind(this, 'oilCheckList')}
              />
              <View className='at-article__h2'>重点按摩部位</View>
              <AtCheckbox
                options={this.bodyOption}
                selectedList={this.state.keyCheckList}
                onChange={this.handleChange.bind(this, 'keyCheckList')}
              />
              <View className='at-article__h2'>禁止按摩部位</View>
              <AtCheckbox
                options={this.bodyOption}
                selectedList={this.state.forbidCheckList}
                onChange={this.handleChange.bind(this, 'forbidCheckList')}
              />
            </View>
          </View>
          <AtButton onClick={this.onSubmit.bind(this)} type='primary'>
            提交
          </AtButton>
        </View>
      </View>
    )
  }
}

export default Checkin
