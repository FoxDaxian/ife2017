function Vue( configOptions ) {
	var el = typeof configOptions.el === "string" ? document.querySelector(configOptions.el) : configOptions.el,
	data = configOptions.data,
	watch = configOptions.watch,
	htmlTemp = el.innerHTML;


	model = new Observer(data);
	//遍历watch进行监听
	Object.keys(watch).forEach(function( item, i ) {
		model.watch(item, function () {
			watch[item]();
			render(el,htmlTemp,model);
		});
	});


	//替换掉的html模板
	render(el,htmlTemp,model);
	return model;
	
}
function render(el,htmlTemp,data) {
	var restHtml = htmlTemp.replace(/{{.*}}/g,function(res) {
		var key = res.replace(/{{/,"").replace(/}}/,"").split("."),
		tempData = data.data;//这里吧设置了get，set的对象穿进去
		key.forEach(function( el, i ) {
			tempData = tempData[key[i]]
		});
		return tempData;
	});
	el.innerHTML = restHtml;
}
