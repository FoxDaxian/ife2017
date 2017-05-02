import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import Home from "../components/home/home.jsx";

import LazyBundle from "../util/lazybundle.jsx";//按需加载中间件

require("babel-polyfill");//如果使用了es6/es7的最新的API则加上这句话，以兼容老版本浏览器





class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Route path="/" exact component={Home}></Route>
            <Route path="/suspension" render={(props) => {
              return <LazyBundle {...props} component={System.import("../components/suspension/suspension.jsx")}></LazyBundle>
            }}></Route>
          </div>
        </Router>
      </div>
    );
  }
}

export default IndexPage;