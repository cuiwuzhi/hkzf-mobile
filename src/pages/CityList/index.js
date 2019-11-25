import React from 'react'
import {NavBar, Icon} from 'antd-mobile'
import './index.scss'

export default class CityList extends React.Component {
	render() {
		return (
		  <div className="cityList">
			  {/* 顶部导航栏 */}
			  <NavBar
			    className="navbar"
			    mode="light"
			    icon={<i className="iconfont icon-back"></i>}
			    onLeftClick={() => this.props.history.push('/home')}
			  >选择城市</NavBar>
		  </div>
		)
	}
}
