import React from 'react';

// 导入要使用的组件
import {Button} from 'antd-mobile'

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import Home from './pages/Home'
import CityList from './pages/CityList'

function App() {
  return (
    <Router>
      <div className="App">
        <Link to="/home">首页</Link>
        <Link to="/citylist">城市选择</Link>

        <Route path="/home" component={Home} />
        <Route path="/citylist" component={CityList} />
      </div>
    </Router>
  );
}

export default App;
