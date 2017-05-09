var page = require('webpage').create();

//最终结果
var res = {}

page.onLoadStarted = function () {
	res.time = Date.now();
};

page.open("http://www.jianshu.com/", function(status) {
	if( status ){
		page.render('google_home.jpeg', {format: 'jpeg', quality: '100'});
		res.code = 1;
		res.msg = "抓取成功";
		var evaluateDate = page.evaluate(function() {
			var temp = {},tempArr = [];

			[].slice.call(document.querySelectorAll('.note-list li')).forEach(function( el, i ) {
				var img = el.querySelector('.note-list .have-img .wrap-img img') ? el.querySelector('.note-list .have-img .wrap-img img').src : null;
				tempArr.push({
					title:el.querySelector('body.reader-black-font .container .article .title, body.reader-black-font .main .title, body.reader-black-font .preview .title').innerHTML,
					info:el.querySelector('.note-list .abstract').innerHTML,
					link:el.querySelector('body.reader-black-font .container .article .title, body.reader-black-font .main .title, body.reader-black-font .preview .title').getAttribute("href"),
					pic:img
				});
			});
			temp.dataList = tempArr;
			temp.word = document.title;

			return temp;
		});

		res.time = (Date.now() - res.time) / 1000;

		for( var key in evaluateDate ){
			res[key] = evaluateDate[key]
		}
		console.log(JSON.stringify(res));
	}else{
		console.log("抓取失败");
	}


	setTimeout(function() {
		phantom.exit();
	}, 0);
});