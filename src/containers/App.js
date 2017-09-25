import React from 'react'
import PropTypes from 'prop-types'

import "normalize.css"
import '../styles/less/index.less'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: [], // 输入的值转换来的数组
      balances: [] // 输出的平衡位置信息
    }
  }

  // 搜索平衡位
  _handleSearch() {
    // state 解构赋值
    const { input } = this.state
    let newBalances = []
    // 遍历需要搜索的数组，从第二位开始到倒数第二位结束
    for (let i = 1; i < input.length - 1; i++) {
      // 获取数组元素左侧的数组
      const leftArr = input.slice(0, i)
      // 获取数组元素右侧的数组
      const rightArr = input.slice(i + 1, input.length)
      // 左侧数组累加
      const leftTotal = leftArr.reduce((total, item) => {
        return total + item
      })
      // 右侧数组累加
      const rightTotal = rightArr.reduce((total, item) => {
        return total + item
      })
      // 如果左侧累加与右侧累加相等，则该位置的元素为平衡位
      if (leftTotal === rightTotal) {
        // 平衡位信息
        const balance = {
          index: i, // 平衡位位置
          value: input[i], // 平衡位的值
          total: leftTotal, // 累加的值
        }
        // 添加平衡位到平衡位数组
        newBalances.push(balance)
      }
    }
    // 设置state
    this.setState({
      balances: newBalances
    })
  }

  // 修改Input内容事件
  _handleInputChange(e) {
    // 获取输入框的值, 以逗号为间隔的字符串
    const value = e.target.value
    // 将字符串转换为数组，并将数组内的字符串转为数字
    const input = value.split(',').map(s => +s)
    // 设置state
    this.setState({input})
  }

  // 渲染组件
  render() {
    const {balances} = this.state
    return (
      <div className="container">
        <div className="form">
          <h5>输入需要寻找平衡位的数组<small>用英文逗号隔开</small></h5>
        <input onChange={this._handleInputChange.bind(this)} className="form-input" placeholder="1,2,3,0,6" type="text"/>
        </div>
        <div className="btn">
          <button type="button" onClick={this._handleSearch.bind(this)} className="button">点击寻找平衡位</button>
        </div>
        <div className="display">
          <ul>
            <li>共有平衡位：{balances.length}个</li>
            <li>
              <ol className="balances">
                {
                  this.state.balances.map((balance, index) => {
                    return (
                      <li key={index}>第{balance.index}位数: {balance.value}</li>
                    )
                  })
                }
              </ol>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

App.propTypes = {}

App.defaultProps = {}

export default App
