var http = require('http');
var http2 = require('http');
var http3 = require('http');

console.log("server is listening now...");

var ip= new Array();
ip = ['10.100.11.2','10.113.222.118','10.115.200.231'];

var domain = require('domain');

var d = domain.create();
//listening the err event
d.on('error', (err)=> {
    // console.log(err)
    console.log('ok')
})

//server
http.createServer( function (request, response) {
	console.log('------[receive connenction]------- ip = '+request.connection.remoteAddress);
	//ip[request.connection.remoteAddress] = request.connection.remoteAddress;
    response.writeHead( 200, {'Content-Type':'text/plain'});
    response.write( "receive success!");
    response.end();
	var receivedata={};
	request.on("data",function(data){
		var obj = JSON.parse( data.toString() );
		console.log("data:\n"+data+"data.type:"+obj.type);
		if(obj.type=='new_connection'){
		    var new_ip = request.connection.remoteAddress;
			console.log("-------new ip----------" + new_ip);
            ip.push(new_ip);
            console.log("[now all connecting...]");
            ip.forEach(function(value){
                console.log(value);
            });
		}else {
            if(obj.msg=='validity'){
                receivedata['ip_source'] = request.connection.remoteAddress;
                obj['msg'] = 're_validity';
                obj['type'] = 're_validity';
            }
            for (var o in obj) {
                receivedata[o] = obj[o];
                console.log(receivedata[o]);
            }
            var bodyString = JSON.stringify(receivedata);
            var headers = {
                'Content-Type': 'application/json'
                //'Content-Length': bodyString.length
            };
            var options = {
                host: '',
                port: 4000,
                method: 'POST',
                headers: headers
            };
            for(var i in ip){
                console.log("this is "+ip[i]+"--------------");
                d.run(() => {
                    options["host"] = ip[i];
                    var req = http2.request(options,function(res){
                    res.on('data', function(data) {
                        if(data == "success"||data == "This is baozi"){
                            console.log(req.getHeader("Host")+': success!');
                            req.abort();
                        }
                    });
                    req.on('error', function(e) {
                        // TODO: handle error.
                        console.log(req.getHeader("Host")+': error');
                        req.abort();
                    });
                });
                req.setTimeout(500,function(){
                    console.log(req.getHeader("Host")+": error!");
                    req.abort();
                });
                req.write(bodyString);
                req.end();
            })
            }
            console.log('------------------------end a requset--------------------------\n');
        }
	});
	/*
	request.on("end",function(){
		response.writeHead( 200, {'Content-Type':'text/plain'});
		response.write( "receive success!");
		response.end();

		var bodyString = JSON.stringify(receivedata);
		var headers = {
		  'Content-Type': 'application/json'
		  //'Content-Length': bodyString.length
		};
		var options = {
		  host: '',
		  port: 4000,
		  method: 'POST',
		  headers: headers
		};
		for(var i in ip){
			console.log("this is "+ip[i]+"--------------");
			d.run(() => {
				options["host"] = ip[i];
				var req = http2.request(options,function(res){
					res.on('data', function(data) {
						if(data == "success"||data == "This is baozi"){
							console.log(req.getHeader("Host")+': success!');
							req.abort();
						}
					});
					req.on('error', function(e) {
						// TODO: handle error.
						console.log(req.getHeader("Host")+': error');
						req.abort();
					});
				});
				req.setTimeout(500,function(){
					console.log(req.getHeader("Host")+": error!");
					req.abort();
				});
				req.write(bodyString);
				req.end();
			})
		}
		console.log('------------------------end a requset--------------------------\n');
		
	});
	*/
} ).listen(5000,'0.0.0.0');

setInterval(function() {
    var test = {type: 'online'};
    var obj = JSON.stringify(test);
    var headers = {
        'Content-Type': 'application/json'
        // 'Content-Length': obj.length
    };
    var options = {
        host:'',
        port: 4000,
        method: 'POST',
        headers: headers
    };
    for(var i in ip){
        // console.log("this is "+ip[i]+"--------------");
        d.run(() => {
            options["host"] = ip[i];

            var req = http3.request(options,function(res){
                res.on('data', function(data) {
                    if(data == "success"){
                        console.log(req.getHeader("Host")+': online!');
                        req.abort();
                    }
            });
            req.on('error', function(e) {
                console.log(req.getHeader("Host")+': error');
                req.abort();
            });
        });
        req.setTimeout(5000,function(){
            console.log(req.getHeader("Host")+": offline!!");
            var loc;
            for(var j in ip){
                if(req.getHeader("Host")==ip[j]){
                    loc = j;
                    break;
                }
            }
            console.log(ip.splice(loc, 1));
            req.abort();
        });
        req.write(obj);
        req.end();
        })
    }
},10000);