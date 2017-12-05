var http = require('http');
var mysql = require('mysql');

console.log("listening now...");

var connection = mysql.createConnection({
		host:'localhost',
		user:'root',
		password:'',
		//socketPath : 'H:/xampp/mysql/mysql.sock',
		port:3306,
		database:'orcl'
	});
	
connection.connect(function(err){
	console.log('--------------------------CONNECT INFORMATION-------------------------------------');
	if(err){
		console.error("database connection failed:" + err.stack);
		return;
	}
	console.log("database connection success!!!");
	console.log('connected as id ' + connection.threadId); 
	console.log('---------------------------------------------------------------------------------');  
});

http.createServer( function (request, response) {
	response.writeHead( 200, {'Content-Type':'text/plain'});
	response.end('This is baozi');
	request.on("data",function(data){
		console.log(data.toString());
		var obj = JSON.parse( data.toString() );
		if(obj.option=='insert'){
			myInsert(obj);
		}
	});
	console.log('---receive connenction----');
    // myInsert("t_product", JSON.stringify(obj));
} ).listen(4000);

function myInsert(data){
	// var jsonData = JSON.parse(data);
	// console.log(jsonData.product_id + jsonData.product_name + jsonData.product_price);
	if(data.table_name == 't_product') {
        var addSql = 'INSERT INTO t_product(product_id, product_name, product_price) VALUES(?,?,?)';
        var addSql_Params = [data.product_id, data["product_name"], data["product_price"]];
    }
	connection.query(addSql,addSql_Params,function (err, result) {
        console.log('--------------------------INSERT benchmark----------------------------');
        if(err){
  			console.log('[INSERT ERROR] - ',err.message);
       	} else{
			console.log('INSERT ID:',result);
        }
        console.log('-------------------------------------------------------------------------');
    });
}