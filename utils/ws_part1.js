// ==================================
// Part 1 - incoming messages, look for type
// ==================================
var ibc = {};
var chaincode = {};
var async = require('async');
var mysql = require('mysql');
var connection = mysql.createConnection({
		host:'localhost',
		user:'root',
		password:'',
		//socketPath : 'H:/xampp/mysql/mysql.sock',
		port:3306,
		database:'morgan'
	});
connection.connect(function(err){
				console.log('--------------------------CONNECT INFORMATION-------------------------------------');
				if(err){
					console.error("database connection failed:" + err.stack);
					return;
				}
				console.log("database connection success!!!");
				console.log('connected as id ' + connection.threadId); 
				console.log('---------------------------------------------------------------------------------\n\n');  
			});
	
var jsSHA=require('jssha');
module.exports.setup = function(sdk, cc){
	ibc = sdk;
	chaincode = cc;
	
	
};

module.exports.process_msg = function(ws, data){
																					
		if(data.type == 'create_account'){
			console.log('----------------------------------Create Account!--------------------------------------');
			chaincode.invoke.create_account([data.ac_id, data.ac_short_name, data.status, data.term_date,
	data.inception_date, data.ac_region, data.ac_sub_region, data.cod_country_domicile, data.liq_method,
	data.contracting_entity, data.mgn_entity, data.ac_legal_name, data.manager_name, data.cod_ccy_base,
	data.long_name, data.mandate_id, data.client_id, data.custodian_name, data.sub_mandate_id, 
	data.transfer_agent_name, data.trust_bank, data.re_trust_bank, data.last_updated_by, 
	data.last_approved_by, data.last_update_date], cb_invoked);	
			
			var value=data.ac_id+data.ac_short_name+data.status+data.term_date+data.inception_date+data.ac_region+data.ac_sub_region+data.cod_country_domicile+data.liq_method+data.contracting_entity+data.mgn_entity+data.ac_legal_name+data.manager_name+data.cod_ccy_base+data.long_name+data.mandate_id+data.client_id+data.custodian_name+data.sub_mandate_id+data.transfer_agent_name+data.trust_bank+data.re_trust_bank+data.last_updated_by+data.last_approved_by+data.last_update_date;
			var sha=new jsSHA("SHA-256","TEXT");
			sha.update(value);
			var sha_value=sha.getHash("HEX");
			console.log("SHA-VALUE: " + sha_value);

			//connection.connect();
			//var benchmark={benchmark_id:data.benchmark_id,id_source:data.id_source,name:data.name,currency:data.currency,benchmark_reference_id:data.benchmark_reference_id,benchmark_reference_id_source:data.benchmark_reference_id_source};
			var  accountAddSql = 'INSERT INTO account(sha_value, ac_id,ac_short_time,status,term_date,inception_date,ac_region,ac_sub_region,cod_country_domicile,liq_method,contracting_entity,mgn_entity,ac_legal_name,manager_name,cod_ccy_base,longname,mandate_id,client_id,custodian_name,sub_mandate_id,transfer_agent_name,trust_bank,re_trust_bank,last_updated_by,last_approved_by,last_update_date) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
			var  accountAddSql_Params = [ sha_value, data.ac_id, data.ac_short_name, data.status, data.term_date,
	data.inception_date, data.ac_region, data.ac_sub_region, data.cod_country_domicile, data.liq_method,
	data.contracting_entity, data.mgn_entity, data.ac_legal_name, data.manager_name, data.cod_ccy_base,
	data.long_name, data.mandate_id, data.client_id, data.custodian_name, data.sub_mandate_id, 
	data.transfer_agent_name, data.trust_bank, data.re_trust_bank, data.last_updated_by, 
	data.last_approved_by, data.last_update_date];

			connection.query(accountAddSql,accountAddSql_Params,function (err, result) {
				
        		if(err){
					console.log('--------------------------INSERT Account----------------------------');
         			console.log('[INSERT ERROR] - ',err.message);
					console.log('--------------------------------------------------------------------\n\n');
        		}else{        
					console.log('--------------------------INSERT Account----------------------------');
					//console.log('INSERT ID:',result.insertId);        
					console.log('INSERT ID:',result);        
					console.log('--------------------------------------------------------------------\n\n');  
				}
			});
			//connection.end();
		
		}
		else if(data.type == 'ac_trade_setup'){
			console.log('----------------------------------Create ac_trade!--------------------------------------');
			chaincode.invoke.ac_trade_setup([ data.ac_id, data.lvts, data.calypso,
	data.aladdin, data.trade_start_date, data.equity, data.fixed_income], cb_invoked);
			
			var value=data.ac_id+data.lvts+data.calypso+data.aladdin+data.trade_start_date+data.equity+data.fixed_income;
			var sha=new jsSHA("SHA-256","TEXT");
			sha.update(value);
			var sha_value=sha.getHash("HEX");
			console.log("SHA-VALUE: " + sha_value);

			//connection.connect();

			//var benchmark={benchmark_id:data.benchmark_id,id_source:data.id_source,name:data.name,currency:data.currency,benchmark_reference_id:data.benchmark_reference_id,benchmark_reference_id_source:data.benchmark_reference_id_source};
			var  ac_tradeAddSql = 'INSERT INTO ac_trade(sha_value,ac_id,lvts,calypso,aladdin,trade_start_date,equity,fixed_income) VALUES(?,?,?,?,?,?,?,?)';
			var  ac_tradeAddSql_Params = [ sha_value, data.ac_id, data.lvts, data.calypso,
	data.aladdin, data.trade_start_date, data.equity, data.fixed_income];

			connection.query(ac_tradeAddSql,ac_tradeAddSql_Params,function (err, result) {
        		if(err){
					console.log('--------------------------INSERT ac_trade----------------------------');
         			console.log('[INSERT ERROR] - ',err.message);
					console.log('-----------------------------------------------------------------\n\n');
        		} else{       
					console.log('--------------------------INSERT ac_trade----------------------------');
					//console.log('INSERT ID:',result.insertId);        
					console.log('INSERT ID:',result);        
					console.log('-----------------------------------------------------------------\n\n');  
				}
			});
			//connection.end();
		}
		else if(data.type == 'ac_benchmark'){
			console.log('----------------------------------Create ac_benchmark!--------------------------------------');
			chaincode.invoke.ac_benchmark([data.ac_id, data.benchmark_id, data.source, data.name,
	data.currency, data.primary_flag, data.start_date, data.end_date, data.benchmark_reference_id,
	data.benchmark_reference_id_source], cb_invoked);

			var value=data.ac_id+data.benchmark_id+data.source+data.name+data.currency+data.primary_flag+data.start_date+data.end_date+data.benchmark_reference_id+data.benchmark_reference_id_source;
			var sha=new jsSHA("SHA-256","TEXT");
			sha.update(value);
			var sha_value=sha.getHash("HEX");	
			console.log("SHA-VALUE: " + sha_value);

			//connection.connect();
			
			//var benchmark={benchmark_id:data.benchmark_id,id_source:data.id_source,name:data.name,currency:data.currency,benchmark_reference_id:data.benchmark_reference_id,benchmark_reference_id_source:data.benchmark_reference_id_source};
			var  ac_benchmarkAddSql = 'INSERT INTO ac_benchmark( sha_value,ac_id,benchmark_id,source,name,currency,primary_flag,start_date,end_date,benchmark_reference_id,benchmark_reference_id_source) VALUES(?,?,?,?,?,?,?,?,?,?,?)';
			var  ac_benchmarkAddSql_Params = [sha_value, data.ac_id, data.benchmark_id, data.source, data.name,
	data.currency, data.primary_flag, data.start_date, data.end_date, data.benchmark_reference_id,
	data.benchmark_reference_id_source];

			connection.query(ac_benchmarkAddSql,ac_benchmarkAddSql_Params,function (err, result) {
        		if(err){
					console.log('--------------------------INSERT ac_benchmark----------------------------');
         			console.log('[INSERT ERROR] - ',err.message);
					console.log('-------------------------------------------------------------------------\n\n');
           		} else{       
					console.log('--------------------------INSERT ac_benchmark----------------------------');
					//console.log('INSERT ID:',result.insertId);        
					console.log('INSERT ID:',result);        
					console.log('-------------------------------------------------------------------------\n\n');  
				}
			});
			//connection.end();
		}
		else if(data.type == 'benchmarks'){
			console.log('----------------------------------Create benchmarks!--------------------------------------');
			chaincode.invoke.benchmarks([data.benchmark_id, data.id_source, data.name, data.currency,
	data.benchmark_reference_id, data.benchmark_reference_id_source], cb_invoked);	
			
			var value=data.benchmark_id+data.id_source+data.name+data.currency+data.benchmark_reference_id+data.benchmark_reference_id_source;
			var sha=new jsSHA("SHA-256","TEXT");
			sha.update(value);
			var sha_value=sha.getHash("HEX");
			console.log("SHA-VALUE: " + sha_value);

			//connection.connect();
			
			//var benchmark={benchmark_id:data.benchmark_id,id_source:data.id_source,name:data.name,currency:data.currency,benchmark_reference_id:data.benchmark_reference_id,benchmark_reference_id_source:data.benchmark_reference_id_source};
			var  benchmarkAddSql = 'INSERT INTO benchmarks(sha_value,benchmark_id,id_source,name,currency,benchmark_reference_id,benchmark_reference_id_source) VALUES(?,?,?,?,?,?,?)';
			var  benchmarkAddSql_Params = [ sha_value, data.benchmark_id, data.id_source, data.name, data.currency, data.benchmark_reference_id, data.benchmark_reference_id_source];

			connection.query(benchmarkAddSql,benchmarkAddSql_Params,function (err, result) {
        		if(err){
					console.log('--------------------------INSERT benchmark-------------------------------');
         			console.log('[INSERT ERROR] - ',err.message);
					console.log('-------------------------------------------------------------------------\n\n');
        		} else{       
					console.log('--------------------------INSERT benchmark----------------------------');
					//console.log('INSERT ID:',result.insertId);        
					console.log('INSERT ID:',result);        
					console.log('----------------------------------------------------------------------\n\n');  
				}
			});
			//connection.end();
		}
		else if (data.type == 'data_view') {
			console.log('view data')
			if (data.data_type == 'account'){
				var selectSQL = 'select * from `account`';
				var arr = [];
				connection.query(selectSQL, function(err, rows) {
    					if (err) throw err;
    					for (var i = 0; i < rows.length; i++) {
        					arr[i] = rows[i];
        					console.log(arr[i])
    					}
    					//app.get('/', function(req, res) {
        					//res.send(arr);
    					//});
				});
			}
			else if (data.data_type == 'ac_trade') {
				var selectSQL = 'select * from `ac_trade`';
				var arr = [];
				connection.query(selectSQL, function(err, rows) {
    					if (err) throw err;
    					for (var i = 0; i < rows.length; i++) {
        					arr[i] = rows[i];
        					console.log(arr[i])
    					}
    					//app.get('/', function(req, res) {
        					//res.send(arr);
    					//});
    				});
			}
			else if (data.data_type == 'ac_benchmark') {
				var selectSQL = 'select * from `ac_benchmark`';
				var arr = [];
				connection.query(selectSQL, function(err, rows) {
    					if (err) throw err;
    					for (var i = 0; i < rows.length; i++) {
        					arr[i] = rows[i];
        					console.log(arr[i])
    					}
    					//app.get('/', function(req, res) {
        					//res.send(arr);
    					//});
				 });
			}
			else if (data.data_type == 'benchmarks') {
				var selectSQL = 'select * from `benchmarks`';
				var arr = [];
				connection.query(selectSQL, function(err, rows) {
    					if (err) throw err;
    					for (var i = 0; i < rows.length; i++) {
        					arr[i] = rows[i];
        					console.log(arr[i])
						sendMsg(arr[i]);
    					}
				});
			}
		}
		else if(data.type == 'get'){
			console.log('get user msg');
			chaincode.query.read(['_allStr'], cb_got_index);
		}
		else if(data.type == 'remove'){
			console.log('removing msg');
			if(data.name){
				chaincode.invoke.delete([data.name]);
			}
		}
		else if(data.type == 'chainstats'){
			console.log('chainstats msg');
			ibc.chain_stats(cb_chainstats);
		} else if(data.type == 'check_decide'){
		
			chaincode.invoke.check_decide([data.checktype, data.checkcont]);
		}
	

	//got the marble index, lets get each marble
	function cb_got_index(e, index){
		if(e != null) console.log('[ws error] did not get user index:', e);
		else{
			try{
				var json = JSON.parse(index);
				var keys = Object.keys(json);
				var concurrency = 1;

				//serialized version
				async.eachLimit(keys, concurrency, function(key, cb) {
					console.log('!', json[key]);
					chaincode.query.read([json[key]], function(e, marble) {
						if(e != null) console.log('[ws error] did not get marble:', e);
						else {
							if(marble) sendMsg({msg: 'marbles', e: e, marble: JSON.parse(marble)});
							cb(null);
						}
					});
				}, function() {
					sendMsg({msg: 'action', e: e, status: 'finished'});
				});
			}
			catch(e){
				console.log('[ws error] could not parse response', e);
			}
		}
	}
	
	function cb_invoked(e, a){
		console.log('response: ', e, a);
	}
	
	//call back for getting the blockchain stats, lets get the block stats now
	function cb_chainstats(e, chain_stats){
		if(chain_stats && chain_stats.height){
			chain_stats.height = chain_stats.height - 1;								//its 1 higher than actual height
			var list = [];
			for(var i = chain_stats.height; i >= 1; i--){								//create a list of heights we need
				list.push(i);
				if(list.length >= 8) break;
			}
			list.reverse();																//flip it so order is correct in UI
			async.eachLimit(list, 1, function(block_height, cb) {						//iter through each one, and send it
				ibc.block_stats(block_height, function(e, stats){
					if(e == null){
						stats.height = block_height;
						sendMsg({msg: 'chainstats', e: e, chainstats: chain_stats, blockstats: stats});
					}
					cb(null);
				});
			}, function() {
			});
		}
	}
	
	//send a message, socket might be closed...
	function sendMsg(json){
		if(ws){
			try{
				ws.send(JSON.stringify(json));
			}
			catch(e){
				console.log('[ws error] could not send msg', e);
			}
		}
	}
};
