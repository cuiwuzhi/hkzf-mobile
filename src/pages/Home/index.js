import React from 'react'
import {Route} from 'react-router-dom'
import {TabBar} from 'antd-mobile'
import './index.scss'
import Index from '../Index'
import FindHouse from '../FindHouse'
import News from '../News'
import Profile from '../Profile'

const tabBarItems = [
	{title: '首页', icon: 'icon-ind', path: '/home'},
	{title: '找房', icon: 'icon-findHouse', path: '/home/findHouse'},
	{title: '资讯', icon: 'icon-infom', path: '/home/news'},
	{title: '我的', icon: 'icon-my', path: '/home/profile'}
]

export default class Home extends React.Component {
	state = {
		selectedTab: this.props.location.pathname, // 选中的tab
		contentHeight: document.documentElement.clientHeight || document.body.clientHeight // 当前设备可视区域高度
	}

	componentDidMount() {
	}

	componentDidUpdate(preProps) {
		// 解决路由切换时tab高亮问题
		if (preProps.location.pathname !== this.props.location.pathname) {
			this.setState({
				selectedTab: this.props.location.pathname
			})
		}
	}

	renderTabItem() {
		return tabBarItems.map(item => <TabBar.Item
			title={item.title}
			key={item.title}
			icon={<i className={`iconfont ${item.icon}`}/>}
			selectedIcon={<i className={`iconfont ${item.icon}`}/>}
			selected={this.state.selectedTab === item.path}
			onPress={() => {
				this.setState({
					selectedTab: item.path
				})
				this.props.history.push(item.path)
			}}
		  ></TabBar.Item>
		)
	}

	render() {
		return (
		  <div className="home">
			  <Route exact path="/home" component={Index}/>
			  <Route path="/home/findHouse" component={FindHouse}/>
			  <Route path="/home/news" component={News}/>
			  <Route path="/home/profile" component={Profile}/>
			  <TabBar
				tintColor="#21b97a"
				barTintColor="white"
				noRenderContent={true}
			  >
				  {this.renderTabItem()}
			  </TabBar>
		  </div>
		)
	}
}
