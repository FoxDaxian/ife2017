import React from 'react';
import { render } from 'react-dom'
import "../static/reset.css";

//引入组件,为了路由
import Index from "./index_page/index_page.jsx";

//这里只是简单的利用react-redux的provider，给所有的组件传递store
render(
	//Index组件是用来匹配路由的入口组件
	<Index />,
	document.getElementById('app')
)
//开发环境下开启热替换
if (module.hot) {
	module.hot.accept(Index, () => {
		render(<Index />, document.getElementById('app'));
	});
}