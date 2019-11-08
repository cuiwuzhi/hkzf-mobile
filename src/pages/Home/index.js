import React from 'react'
import {Route} from 'react-router-dom'
import {TabBar} from 'antd-mobile'

export default class Home extends React.Component {
	state = {
		selectedTab: 'redTab',
		hidden: false,
		fullScreen: false,
	}

	render() {
		return (
		  <div>
			  <Route path="/home/news"/>

		  </div>
		)
	}
}
