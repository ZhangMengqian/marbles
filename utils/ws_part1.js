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
			
			var value=data.ac_id+data.ac_short_name+data.ac_status+data.term_date+data.inception_date+data.ac_region+data.ac_sub_region+data.cod_country_domicile+data.liq_method+data.contracting_entity+data.mgn_entity+data.ac_legal_name+data.manager_name+data.cod_ccy_base+data.long_name+data.mandate_id+data.client_id+data.custodian_name+data.sub_mandate_id+data.transfer_agent_name+data.trust_bank+data.re_trust_bank+data.last_updated_by+data.last_approved_by+data.last_update_date;
			var sha=new jsSHA("SHA-256","TEXT");
			sha.update(value);
			var sha_value=sha.getHash("HEX");
			console.log("SHA-VALUE: " + sha_value);

			//connection.connect();
			//var benchmark={benchmark_id:data.benchmark_id,id_source:data.id_source,name:data.name,currency:data.currency,benchmark_reference_id:data.benchmark_reference_id,benchmark_reference_id_source:data.benchmark_reference_id_source};
			var  accountAddSql = 'INSERT INTO account(sha_value, ac_id,ac_short_time,status,term_date,inception_date,ac_region,ac_sub_region,cod_country_domicile,liq_method,contracting_entity,mgn_entity,ac_legal_name,manager_name,cod_ccy_base,longname,mandate_id,client_id,custodian_name,sub_mandate_id,transfer_agent_name,trust_bank,re_trust_bank,last_updated_by,last_approved_by,last_update_date) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
			var  accountAddSql_Params = [ sha_value, data.ac_id, data.ac_short_name, data.ac_status, data.term_date,
	data.inception_date, data.ac_region, data.ac_sub_region, data.cod_country_domicile, data.liq_method,
	data.contracting_entity, data.mgn_entity, data.ac_legal_name, data.manager_name, data.cod_ccy_base,
	data.long_name, data.mandate_id, data.client_id, data.custodian_name, data.sub_mandate_id, 
	data.transfer_agent_name, data.trust_bank, data.re_trust_bank, data.last_updated_by, 
	data.last_approved_by, data.last_update_date];

			connection.query(accountAddSql,accountAddSql_Params,function (err, result) {
        		if(err){
					console.log('--------------------------FAIL INSERT Account----------------------------');
         			console.log('[INSERT ERROR] - ',err.message);
					console.log('--------------------------------------------------------------------\n\n');
        		}else{        
					console.log('--------------------------SUCCESS INSERT Account----------------------------');
					//console.log('INSERT ID:',result.insertId);        
					console.log('INSERT ID:',result);

					var indexingAddSQL = 'INSERT INTO indexing(hash_value, type) VALUES(?,?)';
					var indexingAddSql_Params = [ sha_value, 'account'];
					connection.query(indexingAddSQL, indexingAddSql_Params, function(err, result) {
						console.log('---------INSERT INDEXING--------------');
						if(err){		// insert error, delete from the account
                            console.log('[INSERT ERROR] - ',err.message);
                            //delete
                            var deleteSQL = 'delete from account where sha_value = '+sha_value;
                            conn.query(deleteSQL, function (err0, res0) {
                                if (err0) console.log(err0);
                                console.log("DELETE Return ==> ");
                                console.log(res0);
                            });
						}else{
                            console.log('[INSERT SUCCESS] \n ');
                            console.log('INSERT ID:',result);
                            chaincode.invoke.create_account([data.ac_id, data.ac_short_name, data.ac_status, data.term_date,
                                data.inception_date, data.ac_region, data.ac_sub_region, data.cod_country_domicile, data.liq_method,
                                data.contracting_entity, data.mgn_entity, data.ac_legal_name, data.manager_name, data.cod_ccy_base,
                                data.long_name, data.mandate_id, data.client_id, data.custodian_name, data.sub_mandate_id,
                                data.transfer_agent_name, data.trust_bank, data.re_trust_bank, data.last_updated_by,
                                data.last_approved_by, data.last_update_date, sha_value], cb_invoked);
						}
					});
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
						sendMsg({msg: 'account', sha_value:arr[i].sha_value, ac_id:arr[i].ac_id, ac_short_name:arr[i].ac_short_name, status:arr[i].status, term_date:arr[i].term_date,
	inception_date:arr[i].inception_date, ac_region: arr[i].ac_region, ac_sub_region:arr[i].ac_sub_region, cod_country_domicile:arr[i].cod_country_domicile, liq_method:arr[i].liq_method,
	contracting_entity:arr[i].contracting_entity, mgn_entity:arr[i].mgn_entity, ac_legal_name:arr[i].ac_legal_name, manager_name:arr[i].manager_name, cod_ccy_base:arr[i].cod_ccy_base,
	long_name:arr[i].long_name, mandate_id:arr[i].mandate_id, client_id:arr[i].client_id, custodian_name:arr[i].custodian_name, sub_mandate_id:arr[i].sub_mandate_id, 
	transfer_agent_name:arr[i].transfer_agent_name, trust_bank:arr[i].trust_bank, re_trust_bank:arr[i].re_trust_bank, last_updated_by:arr[i].last_updated_by, 
	last_approved_by:arr[i].last_approved_by, last_update_date:arr[i].last_update_date});
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
						sendMsg({msg: 'ac_trade', sha_value:arr[i].sha_value, ac_id:arr[i].ac_id, lvts:arr[i].lvts, calypso:arr[i].calypso,
	aladdin:arr[i].aladdin, trade_start_date:arr[i].trade_start_date, equity:arr[i].equity, fixed_income:arr[i].fixed_income});
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
						sendMsg({msg: 'ac_benchmark', sha_value:arr[i].sha_value, ac_id:arr[i].ac_id, benchmark_id:arr[i].benchmark_id, source:arr[i].source, name:arr[i].name, currency:arr[i].currency,
	primary_flag:arr[i].primary_flag, start_date:arr[i].start_date, end_date:arr[i].end_date, benchmark_reference_id:arr[i].benchmark_reference_id, benchmark_reference_id_source:arr[i].benchmark_reference_id_source});
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
        					console.log(arr[i]);
						sendMsg({msg: 'benchmarks', sha_value:arr[i].sha_value, benchmark_id:arr[i].benchmark_id, id_source:arr[i].id_source, name:arr[i].name, currency:arr[i].currency,
	benchmark_reference_id:arr[i].benchmark_reference_id, benchmark_reference_id_source:arr[i].benchmark_reference_id_source});
    					}
				});
			}
		}
		else if (data.type == 'untreated') {				// recheck first
			console.log('--------------get untreated account now--------------------------');
			if (data.table_name == 'account'){
                console.log('----------------------------recheck account first-------------------------------');
                var chain_hash = [];
                var str = chaincode.invoke.get_account(["hash"], cb_invoked);
                console.log(str.length);
				var obj = str.parseJSON();
				console.log(obj.hash);
                //chain_hash = ibc.chain_stats(get_chainstats);
				console.log("data "+chain_hash.length);
				for( var i=0; i<chain_hash.length; i++){
					console.log('----------CHECK THE DATA  NO.'+i);
                    var hash = chain_hash[i];		// get hash from the blockchain
                    console.log(hash);
                    var indexingSelectSQL = 'SELECT `type` FROM `indexing` WHERE `hash_value` = ' + hash;
                    var res = '';
                    connection.query(indexingSelectSQL, function(err, rows){
                        console.log('---------------------------SEARCH HASH VALUE IN DB---------------------------');
                        if (err) throw err;
                        if ( rows.length > 0 ) {		// FOUND in table 'indexing'
                            res = rows[0];
                            console.log("success\n");
                            console.log(res);
                            if( res.type == 'account' ){
                                var accountSelectSQL = 'SELECT * FROM `account` WHERE `hash_value` = ' + hash;
                                var row = '';
                                connection.query( accountSelectSQL, function (err, rows) {
                                    if (err) throw err;
                                    if ( rows.length > 0 ) {		// FOUND in table 'account'
                                        row = rows[0];
                                        console.log(row);
                                        var value = row.ac_id + row.ac_short_name + row.status + row.term_date + row.inception_date + row.ac_region + row.ac_sub_region + row.cod_country_domicile + row.liq_method + row.contracting_entity + row.mgn_entity + row.ac_legal_name + row.manager_name + row.cod_ccy_base + row.long_name + row.mandate_id + row.client_id + row.custodian_name + row.sub_mandate_id + row.transfer_agent_name + row.trust_bank + row.re_trust_bank + row.last_updated_by + row.last_approved_by + row.last_update_date;
                                        var sha = new jsSHA("SHA-256","TEXT");
                                        sha.update(value);
                                        var sha_value=sha.getHash("HEX");		// new hash
                                        if ( sha_value != hash ) {			// data change
                                            sendMsg({msg: 'validity', table_name:'account', sha_value:hash});
                                            console.log("SHA-VALUE: " + sha_value);
                                        }
                                    } else {		// data change
                                        console.log('---fail---CAN NOT FOUND HASH in table \'account\'');
										sendMsg({msg: 'validity', table_name: 'unknown', show_location: 'account'});
                                    }
                                })
                            }
                        }else{			// data change
                            console.log('---fail---CAN NOT FOUND HASH in table \'indexing\'');
                            sendMsg({msg: 'validity', table_name: 'unknown', show_location: 'account'});
                        }
                    });
				}


                // get untreated record
				var selectSQL = 'select * from `account` where flag = 0';
				var arr = [];
				connection.query( selectSQL, function (err, rows) {
					if (err) throw err;
					for (var i=0; i<rows.length; i++){
						arr[i] = rows[i];
						console.log(arr[i]);
                        sendMsg({msg: 'untreated_account', sha_value:arr[i].sha_value, ac_id:arr[i].ac_id, ac_short_name:arr[i].ac_short_name, status:arr[i].status, term_date:arr[i].term_date,
                            inception_date:arr[i].inception_date, ac_region: arr[i].ac_region, ac_sub_region:arr[i].ac_sub_region, cod_country_domicile:arr[i].cod_country_domicile, liq_method:arr[i].liq_method,
                            contracting_entity:arr[i].contracting_entity, mgn_entity:arr[i].mgn_entity, ac_legal_name:arr[i].ac_legal_name, manager_name:arr[i].manager_name, cod_ccy_base:arr[i].cod_ccy_base,
                            long_name:arr[i].long_name, mandate_id:arr[i].mandate_id, client_id:arr[i].client_id, custodian_name:arr[i].custodian_name, sub_mandate_id:arr[i].sub_mandate_id,
                            transfer_agent_name:arr[i].transfer_agent_name, trust_bank:arr[i].trust_bank, re_trust_bank:arr[i].re_trust_bank, last_updated_by:arr[i].last_updated_by,
                            last_approved_by:arr[i].last_approved_by, last_update_date:arr[i].last_update_date});
                        }
                });
			}
			else if (data.table_name == 'ac_trade') {
				var selectSQL = 'select * from `ac_trade` where flag = 0';
				var arr = [];
				connection.query( selectSQL, function (err, rows) {
					if(err) throw err;
					for (var i =0; i<rows.length; i++){
						arr[i] = rows[i];
						console.log(arr[i]);
                        sendMsg({msg: 'untreated_ac_trade', sha_value:arr[i].sha_value, ac_id:arr[i].ac_id, lvts:arr[i].lvts, calypso:arr[i].calypso,
                            aladdin:arr[i].aladdin, trade_start_date:arr[i].trade_start_date, equity:arr[i].equity, fixed_income:arr[i].fixed_income});
                    }
				});
			}
			else if (data.table_name == 'ac_benchmark'){
                var selectSQL = 'select * from `ac_benchmark` where flag = 0';
                var arr = [];
                connection.query( selectSQL, function (err, rows) {
                    if(err) throw err;
                    for (var i =0; i<rows.length; i++){
                        arr[i] = rows[i];
                        console.log(arr[i]);
                        sendMsg({msg: 'untreated_ac_benchmark', sha_value:arr[i].sha_value, ac_id:arr[i].ac_id, benchmark_id:arr[i].benchmark_id, source:arr[i].source, name:arr[i].name, currency:arr[i].currency,
                            primary_flag:arr[i].primary_flag, start_date:arr[i].start_date, end_date:arr[i].end_date, benchmark_reference_id:arr[i].benchmark_reference_id, benchmark_reference_id_source:arr[i].benchmark_reference_id_source});
                    }
                });
			}
			else if (data.table_name == 'benchmarks'){
                var selectSQL = 'select * from `benchmarks` where flag = 0';
                var arr = [];
                connection.query( selectSQL, function (err, rows) {
                    if(err) throw err;
                    for (var i =0; i<rows.length; i++){
                        arr[i] = rows[i];
                        console.log(arr[i]);
                        sendMsg({msg: 'untreated_benchmarks', sha_value:arr[i].sha_value, benchmark_id:arr[i].benchmark_id, id_source:arr[i].id_source, name:arr[i].name, currency:arr[i].currency,
                            benchmark_reference_id:arr[i].benchmark_reference_id, benchmark_reference_id_source:arr[i].benchmark_reference_id_source});
                    }
                });
			}

		}
		else if (data.type == 'new') {
			console.log('-----------------get new accepted account now---------------------');
			if(data.table_name == 'account') {
				var selectSQL = 'select * from `account` where flag = 1';
				var arr = [];
                connection.query( selectSQL, function (err, rows) {
                    if (err) throw err;
                    for (var i=0; i<rows.length; i++){
                        arr[i] = rows[i];
                        console.log(arr[i]);
                        sendMsg({msg: 'newAccepted_account', sha_value:arr[i].sha_value, ac_id:arr[i].ac_id, ac_short_name:arr[i].ac_short_name, status:arr[i].status, term_date:arr[i].term_date,
                            inception_date:arr[i].inception_date, ac_region: arr[i].ac_region, ac_sub_region:arr[i].ac_sub_region, cod_country_domicile:arr[i].cod_country_domicile, liq_method:arr[i].liq_method,
                            contracting_entity:arr[i].contracting_entity, mgn_entity:arr[i].mgn_entity, ac_legal_name:arr[i].ac_legal_name, manager_name:arr[i].manager_name, cod_ccy_base:arr[i].cod_ccy_base,
                            long_name:arr[i].long_name, mandate_id:arr[i].mandate_id, client_id:arr[i].client_id, custodian_name:arr[i].custodian_name, sub_mandate_id:arr[i].sub_mandate_id,
                            transfer_agent_name:arr[i].transfer_agent_name, trust_bank:arr[i].trust_bank, re_trust_bank:arr[i].re_trust_bank, last_updated_by:arr[i].last_updated_by,
                            last_approved_by:arr[i].last_approved_by, last_update_date:arr[i].last_update_date});
                    }
                });
			}
			else if (data.table_name == 'ac_trade'){
				var selectSQL = 'select * from `ac_trade` where flag = 1';
				var arr = [];
				connection.query( selectSQL, function (err, rows) {
					if(err)	throw err;
                    for (var i=0; i<rows.length; i++){
                        arr[i] = rows[i];
                        console.log(arr[i]);
                        sendMsg({msg: 'newAccepted_actrade', sha_value:arr[i].sha_value, ac_id:arr[i].ac_id, lvts:arr[i].lvts, calypso:arr[i].calypso,
                            aladdin:arr[i].aladdin, trade_start_date:arr[i].trade_start_date, equity:arr[i].equity, fixed_income:arr[i].fixed_income});
                    }
				} );
			}
			else if (data.table_name == 'ac_benchmark'){
                var selectSQL = 'select * from `ac_benchmark` where flag = 1';
                var arr = [];
                connection.query( selectSQL, function (err, rows) {
                    if(err)	throw err;
                    for (var i=0; i<rows.length; i++){
                        arr[i] = rows[i];
                        console.log(arr[i]);
                        sendMsg({msg: 'newAccepted_acben', sha_value:arr[i].sha_value, ac_id:arr[i].ac_id, benchmark_id:arr[i].benchmark_id, source:arr[i].source, name:arr[i].name, currency:arr[i].currency,
                            primary_flag:arr[i].primary_flag, start_date:arr[i].start_date, end_date:arr[i].end_date, benchmark_reference_id:arr[i].benchmark_reference_id, benchmark_reference_id_source:arr[i].benchmark_reference_id_source});
                    }
                } );
			}
		}
		else if (data.type == 'know_new_record') {
			console.log('-----------------know new record----------------------');
            console.log(data.id);
			if (data.table_name == 'account') {
                var updateSQL = 'update account set flag = 2 where ac_id = ' + data.id;
                connection.query(updateSQL, function (err, res) {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                    console.log("UPDATE Return ==> ");
                    console.log(res);
                });
            }
            else if (data.table_name == 'ac_trade'){
                var updateSQL = 'update ac_trade set flag = 2 where ac_id = ' + data.id;
                connection.query(updateSQL, function (err, res) {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                    console.log("UPDATE Return ==> ");
                    console.log(res);
                });
			}
			else if (data.table_name == 'ac_benchmark'){
                var updateSQL = 'update ac_benchmark set flag = 2 where ac_id = ' + data.id;
                connection.query(updateSQL, function (err, res) {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                    console.log("UPDATE Return ==> ");
                    console.log(res);
                });
			}
		}
		else if(data.type == 'ac_accept') {
            console.log('------------------------------accept the account now---------------------------------');
            console.log(data.ac_id);		// success
            var updateSQL = 'update account set flag = 1 where ac_id = ' + data.ac_id;
            connection.query(updateSQL, function (err, res) {
                if (err){
                	console.log(err);
                	throw err;
                } else {
                    ws.send(JSON.stringify({type:"check_decide", checktype:"Account", checkcont:"accept"}));
				}
                console.log("UPDATE Return ==> ");
                console.log(res);
            });

        }
        else if (data.type == 'actra_accept') {
            console.log('------------------------------accept the account trade now---------------------------------');
            console.log(data.ac_id);
            var updateSQL = 'update ac_trade set flag = 1 where ac_id = ' + data.ac_id;
            connection.query(updateSQL, function (err, res) {
                if (err){
                    console.log(err);
                    throw err;
                } else {
                    ws.send(JSON.stringify({type:"check_decide", checktype:"Ac_trades_setup", checkcont:"accept"}));
                }
                console.log("UPDATE Return ==> ");
                console.log(res);
            });
		}
		else if(data.type == 'acben_accept') {
            console.log('------------------------------accept the account benchmark now---------------------------------');
            console.log(data.ac_id);
            var updateSQL = 'update ac_benchmark set flag = 1 where ac_id = ' + data.ac_id;
            connection.query(updateSQL, function (err, res) {
                if (err){
                    console.log(err);
                    throw err;
                } else {
                    ws.send(JSON.stringify({type:"check_decide", checktype:"Ac_benchmark", checkcont:"accept"}));
                }
                console.log("UPDATE Return ==> ");
                console.log(res);
            });
		}
		else if(data.type == 'bench_accept') {
            console.log('------------------------------accept the benchmarks now---------------------------------');
            console.log(data.id);
            var updateSQL = 'update benchmarks set flag = 1 where benchmark_id = ' + data.id;
            connection.query(updateSQL, function (err, res) {
                if (err){
                    console.log(err);
                    throw err;
                } else {
                    ws.send(JSON.stringify({type:"check_decide", checktype:"Benchmarks", checkcont:"accept"}));
                }
                console.log("UPDATE Return ==> ");
                console.log(res);
            });
		}
        else if(data.type == 'ac_decline') {
			console.log('---------------------------decline the account now--------------------------------');
			console.log(data.ac_id);
			var updateSQL = 'update account set flag = -1 where ac_id = ' + data.ac_id;
            connection.query(updateSQL, function (err, res) {
                if (err){
                    console.log(err);
                    throw err;
                } else {
                    ws.send(JSON.stringify({type:"check_decide", checktype:"Account", checkcont:"decline"}));		// send to blockchain
                }
                console.log("UPDATE Return ==> ");
                console.log(res);
            });
		}
		else if(data.type == 'actra_decline') {
            console.log('---------------------------decline the account trade now--------------------------------');
            console.log(data.ac_id);
            var updateSQL = 'update ac_trade set flag = -1 where ac_id = ' + data.ac_id;
            connection.query(updateSQL, function (err, res) {
                if (err) {
                    console.log(err);
                    throw err;
                } else {
                    ws.send(JSON.stringify({type: "check_decide", checktype: "Ac_trades_setup", checkcont: "decline"}));	// send to blockchain
                }
                console.log("UPDATE Return ==> ");
                console.log(res);
            });
        }
		else if (data.type == 'acben_decline') {
			console.log('---------------------------decline the account benchmark now--------------------------------');
			console.log(data.ac_id);
			var updateSQL = 'update ac_benchmark set flag = -1 where ac_id = ' + data.ac_id;
			connection.query(updateSQL, function (err, res) {
                    if (err){
                        console.log(err);
                        throw err;
                    } else {
                        ws.send(JSON.stringify({type:"check_decide", checktype:"Ac_benchmark", checkcont:"decline"}));	// send to blockchain
                    }
                    console.log("UPDATE Return ==> ");
                    console.log(res);
                });
		}
		else if (data.type == 'bench_decline') {
            console.log('---------------------------decline the benchmarks now--------------------------------');
            console.log(data.id);
            var updateSQL = 'update benchmarks set flag = -1 where benchmark_id = ' + data.id;
            connection.query(updateSQL, function (err, res) {
                if (err){
                    console.log(err);
                    throw err;
                } else {
                    ws.send(JSON.stringify({type:"check_decide", checktype:"Benchmarks", checkcont:"decline"}));	// send to blockchain
                }
                console.log("UPDATE Return ==> ");
                console.log(res);
            });
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
		// else if(data.type == 'recheck'){			turn to untreated
        //
		// 	var chain_data = ibc.chain_stats(get_chainstats);
		// 	console.log("data",chain_data);
		// }
		else if(data.type == 'chainstats'){
			console.log('chainstats msg');
			ibc.chain_stats(cb_chainstats);
			console.log(ibc);
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
							// console.log("------------------------------------------------------------------");
                            // console.log(marble);
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
				if(list.length >= 16) break;
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

    function formatCCID(i, uuid, ccid){								//flip uuid and ccid if deploy, weird i know
	if(i == 1) return uuid;
	return ccid;
    }	
    
    function atb(r) {
	var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    	var o = String(r).replace(/=+$/, "");
    	if (o.length % 4 == 1)throw new t("'atob' failed: The string to be decoded is not correctly encoded.");
    	for (var n, a, i = 0, c = 0, d = ""; a = o.charAt(c++); ~a && (n = i % 4 ? 64 * n + a : a, i++ % 4) ? d += String.fromCharCode(255 & n >> (-2 * i & 6)) : 0)a = e.indexOf(a);
    	return String(d);
    }
    
    function formatPayload(str, ccid){								//create a sllliiiggghhhtttlllllyyy better payload name from decoded payload
	var func = ['init', 'delete', 'write', 'create_account','ac_trade_setup', 'ac_benchmark', 'benchmarks', 'check_decide'];
	str =  str.substring(str.indexOf(ccid) + ccid.length + 4);
	for(var i in func){
		if(str.indexOf(func[i]) >= 0){
			return str.substr(func[i].length);
		}
	}
	return str;
    }

    function execute(someFunction, value1, value2) {
        someFunction(value1, value2);
    }

    function get_chainstats(e, chain_stats){
    	console.log('----------FUNCTION get_chainstats-------');
        var data=[];
    	if(chain_stats && chain_stats.height){
            chain_stats.height = chain_stats.height - 1;								//its 1 higher than actual height
            var list = [];
            for(var i = chain_stats.height; i >= 1; i--){								//create a list of heights we need
                list.push(i);
                if(list.length >= 40) break;
            }
            list.reverse();																//flip it so order is correct in UI
            // var count = 0;
			for(var i=0; i<list.length; i++) {
                chaincode.invoke.readOnly(['hash'], cb_invoked);
                execute(function (block_height,cb) {						//iter through each one, and send it
                    ibc.block_stats(block_height, function (e, stats) {
                        if (e == null) {
                            stats.height = block_height;
                            // sendMsg({msg: 'chainstats', e: e, chainstats: chain_stats, blockstats: stats});
                            if (stats.transactions) {
                                // console.log(stats);
                                // console.log(stats.transactions[0]);
                                console.log(stats.height);
                                var ccid = formatCCID(stats.transactions[0].type, stats.transactions[0].uuid, atb(stats.transactions[0].chaincodeID));
                                var payload = atb(stats.transactions[0].payload);
                                if (ccid) {
                                    var chaindata = formatPayload(payload, ccid);
                                    // data.push(chaindata);
                                    var mydata = chaindata.split(" ");
                                    // console.log( mydata[0] );
                                    data.push(chaindata.slice(-64));
                                    console.log("NO." + data.length + "   " + chaindata.slice(-64));
                                }
                            }
                        }
                        cb(null);
                    });
                    // count++;
                }, list[i].block_height, ibc.cb);
            }
        }
        // while(1){
    		// // console.log(count+"   ");
		// 	if( count>=list.length ) {
		// 		break;
		// 	}
		// }
        console.log('---RETURN HASH ARR---length:'+data.length);
        return data;
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
