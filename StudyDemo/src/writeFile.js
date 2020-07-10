var fs = require('fs');

fs.writeFile('./写入测试文件.txt','node ssss测试写入aa',{encoding: 'utf-8',flag: 'a'},function(err){
	if (err) throw err;
	console.log('文件已保存');
});