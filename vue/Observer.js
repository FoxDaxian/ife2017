// let app2 = new Observer({
//     name: {
//         firstName: 'shaofeng',
//         lastName: 'liang'
//     },
//     age: 25
// });

// app2.$watch('name', function (newName) {
//     console.log('我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。')
// });

// app2.data.name.firstName = 'hahaha';
// // 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。



//订阅-发布
function queue() {
	this.subArr = [];
}
queue.prototype.addSub = function(who, subFn) {
	this.subArr.push({
		who:who,
		subFn:subFn
	});
}
queue.prototype.notify = function(who) {
	this.subArr.forEach(function(el, i) {
		el.who === who && el.subFn();
	});
}
var queueObj = new queue();

//set get
function Observer(data) {
	this.data = data;
	this.convert(data);
}
Observer.prototype.parentObj = [];
Observer.prototype.watch = function(who, cb) {
	queueObj.addSub(who,cb);
}
Observer.prototype.convert = function(data,parentObj) {
	var _this = this;
	for( let item in data ){
		parentObj !== undefined && this.parentObj.push({
			parent:parentObj,
			son:item
		});
		if( data.hasOwnProperty(item) ){
			let curValue = data[item];
			if( typeof curValue === "object" ){
				this.convert(curValue,item);
			}else{
				Object.defineProperty(data,item,{
					enumerable: true,
					configurable: true,
					get:function() {
						console.log(`访问了${item}`);
						return curValue;
					},
					set:function( newValue ) {
						console.log(`设置了${item}`);
						util(_this.parentObj,item);
						if( typeof newValue === "object" ){
							curValue = new Observer(newValue);
						}
						curValue = newValue;
					}
				});
			}
		}
	}
}
//递归找爸爸
function util(arr, item) {
	arr.forEach(function(el, i) {
		if( el.son === item ){
			util(arr,el.parent);
			queueObj.notify(el.parent);
		}
	});
}

