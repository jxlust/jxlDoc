function jsonp(options) {
	options = options || {};
	if (!options.url || !options.callback) {
		throw new Error("参数不合法");
	}
	var callbackName = ('jsonp_' + Math.random()).replace('.', '');
	//创建script标签加入到页面头部
	var oHead = document.getElementsByTagName('head')[0];
	var oS = document.createElement('script');
	oHead.appendChild(oS);
	//创建jsonp回调函数
	window[callbackName] = function(json) {
		//回调执行 清除
		oHead.removeChild(oS);
		//回调成功，清除掉超时定时器
		clearTimeout(oS.timer);
		window[callbackName] = null;
		//执行参数的回调方法
		options.success && options.success(json);
	}
	//send get request
	var params = 'callback=' + callbackName;
	// 				options.data[options.callback] = callbackName;
	// 				params = formatParams(options.data)
	oS.src = options.url + "?" + params;

	//超时处理
	if (options.time) {
		oS.timer = setTimeout(function() {
			window[callbackName] = null;
			oHead.removeChild(oS);
			options.fail && options.fail({
				message: "超时"
			});
		}, options.time)
	}

}

function formatParams(data) {
	var arr = [];
	for (var name in data) {
		arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]))
	}
	return arr.join('&');
}


// 			window['showhh'] = function() {
// 				console.log("show hhhhhs");
// 			}
// 			showhh();
function jsonpTest() {
	var options = {
		url: 'http://127.0.0.1:8088/getJsonpData',
		data: {},
		time: 1000,
		callback: {},
		success: function(data) {
			console.log('data', data);
		},
		fail: function(e) {
			console.log('e', e);
		}
	}
	for (var k in options) {
		console.log(k);
	}
	jsonp(options);
}

function jsonp2(url, params, callback) {
	var funcName = 'jsonp' + Date.now() + Math.random().toString().substr(2, 5)

	if (typeof params === 'object') {
		var tempArr = []
		for (var key in params) {
			var value = params[key]
			tempArr.push(key + '=' + value)
		}
		params = tempArr.join('&')
	}

	var script = document.createElement('script')
	script.src = url + '?' + params + '&callback=' + funcName
	document.body.appendChild(script)

	window[funcName] = function(data) {
		callback(data)
		delete window[funcName]
		document.body.removeChild(script)
	}
}

function myGet(){
	var xhr  = new XMLHttpRequest();
	
}
function myPost(){
	
}
String.prototype.myTrim = function(){
	//去掉开头和结尾的空格
	// g全局匹配
	return this.replace(/(^\s+)|(\s*)$/g,'');
}

Array.prototype.myIsArray = function(){
	if(Array.isArray()){
		return Array.isArray(v);
	}else{
		return Object.prototype.toString.call(v) === '[object Array]';
	}
}
Array.constructor.prototype.myIsArray = function(v){
	if(Array.isArray()){
		return Array.isArray(v);
	}else{
		return Object.prototype.toString.call(v) === '[object Array]';
	}
}