const phantom = require('phantom');
//全局安装 node-dev
const express = require("express");
const app = express();



app.use("/",function( res, req ) {
	var phInstance,sitepage,
	res = {}
	phantom.create()
	.then(instance => {
		phInstance = instance;
		return instance.createPage();
	})
	.then(page => {
		sitepage = page;
		return page.open('http://jianshu.com');
	})
	.then(status => {
		sitepage.evaluate(function() {
			var res = {},
			img = null,
			tempArr = [];
			[].slice.call(document.querySelectorAll('.note-list li'),0,10).forEach(function( el, i ) {
				img = el.querySelector('.wrap-img img') ? el.querySelector('.wrap-img img').src : null;
				tempArr.push({
					title:el.querySelector('.title').innerHTML,
					articalInfo:el.querySelector('.abstract').innerHTML,
					author:el.querySelector('.blue-link').innerHTML,
				thumbnail:img,//缩略图
				publishTime:el.querySelector('.time').innerHTML,
				tag:el.querySelector('.meta [target="_blank"]').innerHTML,
			});
			});
			res.code = 1;
			res.dataList = tempArr;
			return res;
		}).then(function(result){
			//到这里，可以传到模板里进行渲染，或者直接输出成接口
			req.send(result.dataList);
			
			phInstance.exit();
		});
	})
});
app.listen(3000,function() {
	console.log("ok");
});