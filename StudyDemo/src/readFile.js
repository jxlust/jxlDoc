var fs = require('fs');

var mymodule = require('./mymodule.js');

console.log(mymodule.my);

fs.readFile('./main.js',function(err,data){
	if(err){
		console.log("读文件失败");
	}else{
		console.log(data.toString());	
	}
	
});
var test = require('./test.js');
