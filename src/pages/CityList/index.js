import React from 'react'
import axios from 'axios'
import {getCurrentCity} from '../../utils'
import {NavBar} from 'antd-mobile'
import './index.scss'
// 数据格式化方法
const formatCityList = (list) => {
	const cityList = {}
	list.forEach(item => {
		const first = item.short === 'zq' && item.label === '重庆' ? 'c' : item.short.substr(0, 1)
		if (cityList[first]) {
			cityList[first].push(item)
		} else {
			cityList[first] = [item]
		}
	})
	const cityIndex = Object.keys(cityList).sort()
	return {
		cityList,
		cityIndex
	}
}

export default class CityList extends React.Component {

	componentDidMount() {
		this.getCityList()
	}

	async getCityList() {
		const res = await axios.get('/area/city?level=1')
		const {cityList, cityIndex} = formatCityList(res.data.body)

		// 获取热门城市数据
		const hotRes = await axios.get('/area/hot')
		cityList['hot'] = hotRes.data.body
		cityIndex.unshift('hot')

		// 获取当前定位城市
		const curCity = await getCurrentCity()
		cityList['#'] = [curCity]
		cityIndex.unshift('#')
		console.log(cityIndex)
		console.log(cityList)
	}

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
