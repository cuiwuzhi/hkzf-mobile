import React from 'react'
import {Carousel, Flex, Grid, WingBlank} from 'antd-mobile'
import './index.scss'
import axios from 'axios'
// 导航栏图片
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'

// 导航菜单数据
const navs = [
	{id: 1, img: Nav1, title: '整租', path: '/home/findHouse'},
	{id: 2, img: Nav2, title: '合租', path: '/home/findHouse'},
	{id: 3, img: Nav3, title: '地图找房', path: '/map'},
	{id: 4, img: Nav4, title: '出租', path: '/home/findHouse'}
]

export default class Index extends React.Component {
	state = {
		APIURL: window.REACT_APP_URL,
		swipers: [], // 轮播图数据
		isSwiperLoaded: false, // 轮播图数据是否加载完成
		groups: [], // 租房小组数据
		news: [] // 新闻资讯数据
	}

	componentDidMount() {
		this.getSwipers()
		this.getGroups()
		this.getNews()
	}

	// 获取轮播图
	async getSwipers() {
		const {data: res} = await axios.get('http://192.168.199.181:8080/home/swiper')
		this.setState({
			swipers: res.body,
			isSwiperLoaded: true
		})
	}

	// 获取租房小组的数据
	async getGroups() {
		const {data: res} = await axios.get('http://192.168.199.181:8080/home/groups', {
			params: {
				area: 'AREA|88cff55c-aaa4-e2e0'
			}
		})
		this.setState({
			groups: res.body
		})
	}

	// 获取最新资讯
	async getNews() {
		const res = await axios.get(`${window.REACT_APP_URL}/home/news?area=AREA%7C88cff55c-aaa4-e2e0`)
		this.setState({
			news: res.data.body
		})
	}

	// 渲染轮播图结构
	renderSwipers() {
		return this.state.swipers.map(item =>
		  <a
			key={item.id}
			href="http://www.alipay.com"
			style={{display: 'inline-block', width: '100%', height: 212}}
		  >
			  <img src={`http://192.168.199.181:8080${item.imgSrc}`} alt="swiper"
			       style={{width: '100%', verticalAlign: 'top'}}/>
		  </a>
		)
	}

	//  渲染导航栏的Item
	renderNavs() {
		return navs.map(item =>
		  <Flex.Item key={item.id} onClick={() => this.props.history.push(item.path)}>
			  <img src={item.img} alt="icon"/>
			  <h2>{item.title}</h2>
		  </Flex.Item>
		)
	}

	// 渲染最新资讯
	renderNews() {
		return this.state.news.map(item => (
		  <div className="news-item" key={item.id}>
			  <div className="imgwrap">
				  <img
					className="img"
					src={`${window.REACT_APP_URL}${item.imgSrc}`}
					alt=""
				  />
			  </div>
			  <Flex className="content" direction="column" justify="between">
				  <h3 className="title">{item.title}</h3>
				  <Flex className="info" justify="between">
					  <span>{item.from}</span>
					  <span>{item.date}</span>
				  </Flex>
			  </Flex>
		  </div>
		))
	}

	render() {
		return (
		  <div className="index">
			  {/* 轮播图 */}
			  <div className="swiper">
				  {this.state.isSwiperLoaded ? (
					<Carousel autoplay infinite>
						{this.renderSwipers()}
					</Carousel>
				  ) : ('')
				  }
			  </div>

			  {/* 导航 */}
			  <Flex className="nav">
				  {this.renderNavs()}
			  </Flex>

			  {/* 租房小组 */}
			  <div className="group">
				  <h3 className="title">
					  租房小组 <span className="more">更多</span>
				  </h3>
				  {/* 宫格组件 */}
				  <Grid
					data={this.state.groups}
					columnNum={2}
					square={false}
					hasLine={false}
					renderItem={item => (
					  <Flex className="group-item" justify="around" key={item.id}>
						  <div className="desc">
							  <p className="title">{item.title}</p>
							  <span className="info">{item.desc}</span>
						  </div>
						  <img src={`http://192.168.199.181:8080${item.imgSrc}`} alt=""/>
					  </Flex>
					)}
				  />
			  </div>

			  {/* 最新资讯 */}
			  <div className="news">
				  <h3 className="group-title">最新资讯</h3>
				  <WingBlank size="md">{this.renderNews()}</WingBlank>
			  </div>
		  </div>
		)
	}

}
