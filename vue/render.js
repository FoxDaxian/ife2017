function Vue( configOptions ) {
	var el = typeof configOptions.el === "string" ? document.querySelector(configOptions.el) : configOptions.el,
	data = configOptions.data;


	model = new Observer(data);
	model.watch('name', function (newName) {
		console.log('我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。')
		render(el,model);
	});
	console.log(model);
	model.data.user.name = 1


	//替换掉的html模板
	render(el,model);
	
}
function render(el,data) {
	var restHtml = el.innerHTML.replace(/{{.*}}/g,function(res) {
		var key = res.replace(/{{/,"").replace(/}}/,"").split("."),
		tempData = data.data;//这里吧设置了get，set的对象穿进去
		key.forEach(function(el, i ) {
			tempData = tempData[key[i]]
		});
		return tempData;
	});
	el.innerHTML = restHtml;
}
