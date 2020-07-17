const http = require('http');
const url = require('url');
const fs = require('fs');
const template = require('art-template');
const mymodule = require('./mymodule.js');


const comments = [
  {
    name: '张三1',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三2',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三3',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三4',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三5',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  }
]

const server = http.createServer(function(req,res){
	// console.log(req.url);
	var parseObj = url.parse(req.url,true);
	//const {pathname: myurl,query} = url.parse(req.url,true);
	var pathname = parseObj.pathname;
	var query = parseObj.query;
	console.log("pathname:"+pathname);
	if(pathname === '/favicon.ico'){
		return;
		//return res.end('404 not found..');
	}
	if(pathname === '/'){
		console.log('front..');
		fs.readFile('../dist/index.html',(err,data) => {
			if(err){
				console.log(err);
				return res.end('404 not found...');
			}
			res.setHeader('Content-Type','text/html; charset=utf-8');
			//console.log(data.toString());
			
// 			var htmlStr = template.render(data.toString(),{
// 				comments: comments,
// 				test: `h哈哈${mymodule.add(1,3222)}`
// 			})
			return  res.end(data);
		});
	}else if (pathname.indexOf('/public') === 0 || pathname.indexOf('/documents') === 0 ) {
		//访问公开资源文件
		fs.readFile('..'+pathname, (err,data) => {
			if(err){
				return res.end("404 文件没找到");
			}
			return  res.end(data);
		})

	}else if(pathname === '/add'){
		fs.readFile('../views/add.html',(err,data) => {
			if(err){
				return res.end('404 not found');
			}
			res.setHeader('Content-Type','text/html;charset=utf-8');
			return res.end(data);
		});

	}else if(pathname === '/post'){
		var comment = parseObj.query;
		console.log('comment',comment);
		comments.unshift(comment);
		//res.statusCode = 302;
		//res.setHeader('Location','/');
		res.setHeader('Content-Type','application/json; charset=utf-8');
		var data = {
			name: "李白",
			sex: "男",
			age: 18
		}
		res.end(JSON.stringify(data));
	}else if(pathname === '/getJsonpData' ){
		var data = {
			name: "李白",
			sex: "男",
			age: 18
		}
		console.log(query);
		for(var i in query){
			
		}
		var scriptStr = `${query.callback}(${JSON.stringify(data)})`;
		res.end(scriptStr);
		
	}else if(pathname === '/getTestData'){
		 // 添加响应头
		 
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader('Content-Type','application/json; charset=utf-8');
		var data = {
			name: "李白",
			sex: "男",
			age: 18
		}
		res.end(JSON.stringify(comments ));
	}
});

server.on('connect',(req,sltSocket,head) => {
	console.log('连接到服务器...');
})

server.listen('8088',() => {
	console.log('runing...');
});
