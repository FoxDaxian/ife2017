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
						// console.log(`访问了${item}`);
						return curValue;
					},
					set:function( newValue ) {
						// console.log(`设置了${item}`);
						if( typeof newValue === "object" ){
							curValue = new Observer(newValue);
						}
						curValue = newValue;
						util(_this.parentObj,item);
					}
				});
			}
		}
	}
}
//递归找爸爸
function util(arr, item) {
	queueObj.notify(item);
	arr.forEach(function(el, i) {
		if( el.son === item ){
			util(arr,el.parent);
			queueObj.notify(el.parent);
		}
	});
}

