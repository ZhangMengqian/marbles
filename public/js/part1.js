var ws = {};

var tmp_account="";
var tmp_actrade="";
var tmp_acbench="";
var tmp_bench="";

var base_account="";
var base_actrade="";
var base_acbench="";
var base_bench="";

// =================================================================================
// On Load
// =================================================================================
$(document).on('ready', function() {
	connect_to_server();
	// =================================================================================
	// jQuery UI Events
	// =================================================================================
	$('#submit').click(function(){
		var obj = 	{
						type: 'create_account',
						ac_id: $('input[name="ac_id"]').val().replace(' ', ''),
						ac_short_name: $('input[name="ac_short_name"]').val(),
						ac_status: $('input[name="status"]').val(),
						term_date: $('input[name="term_date"]').val(),
						inception_date: $('input[name="inception_date"]').val(),
						ac_region: $('input[name="ac_region"]').val(),
						ac_sub_region: $('input[name="ac_sub_region"]').val(),
						cod_country_domicile: $('input[name="cod_country_domicile"]').val(),
						liq_method: $('input[name="liq_method"]').val(),
						contracting_entity: $('input[name="contract_entity"]').val(),
						mgn_entity: $('input[name="mgn_entity"]').val(),
						ac_legal_name: $('input[name="ac_legal_name"]').val(),
						manager_name: $('input[name="manager_name"]').val(),
						cod_ccy_base: $('input[name="cod_ccy_base"]').val(),
						long_name: $('input[name="long_name"]').val(),
						mandate_id: $('input[name="mandate_id"]').val(),
						client_id: $('input[name="client_id"]').val(),
						custodian_name: $('input[name="custodian_name"]').val(),
						sub_mandate_id: $('input[name="sub_mandate_id"]').val(),
						transfer_agent_name: $('input[name="transfer_agent_name"]').val(),
						trust_bank: $('input[name="trust_bank"]').val(),
						re_trust_bank: $('input[name="re_trust_bank"]').val(),
						last_updated_by: $('input[name="last_updated_by"]').val(),
						last_approved_by: $('input[name="last_approved_by"]').val(),
						last_update_date: $('input[name="last_update_date"]').val()
					};
		if(obj.ac_id){
			console.log('creating user, sending', obj);
			ws.send(JSON.stringify(obj));
			showHomePanel();
			$('#user1wrap').append("<p>Create [account]:"+obj.ac_id+" [short name]:"+obj.ac_short_name+"</p>");	
			
			tmp_account='<div id="acnoti_'+obj.ac_id+'"><p><span style="color:#FF0;">A new account has been created:</span><br>'+
			"[account]:"+obj.ac_id+"<br>[short name]:"+obj.ac_short_name+
			"<br>[status]:"+obj.ac_status+"<br>[term date]:"+obj.term_date+
			"<br>[inception date]:"+obj.inception_date+"<br>[region]:"+obj.ac_region+
			"<br>[sub region]:"+obj.ac_sub_region+"<br>[country domicile]:"+obj.cod_country_domicile+
			"<br>[liq method]:"+obj.liq_method+"<br>[contracting entity]:"+obj.contracting_entity+
			"<br>[mgn entity]:"+obj.mgn_entity+"<br>[account legal name]:"+obj.ac_legal_name+
			"<br>[manager name]:"+obj.manager_name+"<br>[cod_ccy_base]:"+obj.cod_ccy_base+
			"<br>[long name]:"+obj.long_name+"<br>[mandate id]:"+obj.mandate_id+
			"<br>[client id]:"+obj.client_id+"<br>[custodian name]:"+obj.custodian_name+
			"<br>[sub_mandate_id]:"+obj.sub_mandate_id+"<br>[transfer_agent_name]:"+obj.transfer_agent_name+
			"<br>[trust_bank]:"+obj.trust_bank+"<br>[re_trust_bank]:"+obj.re_trust_bank+
			"<br>[last_updated_by]:"+obj.last_updated_by+"<br>[last_approved_by]:"+obj.last_approved_by+
			"<br>[last_update_date]:"+obj.last_update_date+'</p><button type="button" id="del_ac'+obj.ac_id+'">delete</button><hr /></div>';
			// $('#ac_check_notice').append(tmp_account);
			$('#ac_history').append(tmp_account);
			// $('#ac_check_button').show();
		}
		return false;
	});
	
	$('#submit2').click(function(){
		var obj = 	{
						type: 'ac_trade_setup',
						ac_id: $('input[name="t_ac_id"]').val().replace(' ', ''),
						lvts: $('input[name="lvts"]').val(),
						calypso: $('input[name="calypso"]').val(),
						aladdin: $('input[name="aladdin"]').val(),
						trade_start_date: $('input[name="t_start_date"]').val(),
						equity: $('input[name="equity"]').val(),
						fixed_income: $('input[name="fixed_income"]').val()
					};
		if(obj.ac_id){
			console.log('creating user, sending', obj);
			ws.send(JSON.stringify(obj));
			showHomePanel();
			$('#user1wrap').append("<p>account trades:"+obj.ac_id+" [lvts]:"+obj.lvts+"</p>");			

			tmp_actrade='<div id="actranoti_'+obj.ac_id+'"><p><span style="color:#FF0;">An account trade has been created:</span><br>'+
			"[account id]:"+obj.ac_id+"<br>[lvts]:"+obj.lvts+
			"<br>[calypso]:"+obj.calypso+"<br>[aladdin]:"+obj.aladdin+
			"<br>[trade start date]:"+obj.trade_start_date+"<br>[equity]:"+obj.equity+
			'<br>[fixed_income]:'+obj.fixed_income+'</p><button type="button" id="del_actra'+obj.ac_id+'">delete</button><hr /></div>';
			
			// $('#actrade_check_notice').append(tmp_actrade);
			$('#actrade_history').append(tmp_actrade);
			// $('#actrade_check_button').show();
			// $('#actrade_mak_noti').empty();
			
		}
		return false;
	});
	
	$('#submit3').click(function(){
		var obj = 	{
						type: 'ac_benchmark',
						ac_id: $('input[name="ben_ac_id"]').val().replace(' ', ''),
						benchmark_id: $('input[name="aben_id"]').val(),
						source: $('input[name="aben_source"]').val(),
						name: $('input[name="aben_name"]').val(),
						currency: $('input[name="aben_currency"]').val(),
						primary_flag: $('input[name="aben_pri_flag"]').val(),
						start_date: $('input[name="aben_startdate"]').val(),
						end_date: $('input[name="aben_enddate"]').val(),
						benchmark_reference_id: $('input[name="aben_ref_id"]').val(),
						benchmark_reference_id_source: $('input[name="aben_ref_id_src"]').val()
					};
		if(obj.ac_id){
			console.log('creating user, sending', obj);
			ws.send(JSON.stringify(obj));
			showHomePanel();
			$('#user1wrap').append("<p>account benchmarks:"+obj.ac_id+" [benchmark_id]:"+obj.benchmark_id+"</p>");		
		
		    tmp_acbench='<div id="acbennoti_'+obj.ac_id+'"><p><span style="color:#FF0;">An account benchmark has been created:</span><br>'+
			"[account id]:"+obj.ac_id+"<br>[benchmark_id]:"+obj.benchmark_id+
			"<br>[source]:"+obj.source+"<br>[name]:"+obj.name+
			"<br>[currency]:"+obj.currency+"<br>[primary_flag]:"+obj.primary_flag+
			"<br>[start_date]:"+obj.start_date+"<br>[end_date]:"+obj.end_date+
			"<br>[benchmark_reference_id]:"+obj.benchmark_reference_id+"<br>[benchmark_reference_id_source]:"+obj.benchmark_reference_id_source
			+'</p><button type="button" id="del_acben'+obj.ac_id+'">delete</button><hr /></div>';
			
			// $('#acbench_check_noti').append(tmp_acbench);
			$('#acbench_history').append(tmp_acbench);
			//$('#acbench_check_button').show();
			//$('#acbench_mak_noti').empty();
			
		}
		return false;
	});
	
	$('#submit4').click(function(){
		var obj = 	{
						type: 'benchmarks',
						benchmark_id: $('input[name="benchmark_id"]').val().replace(' ', ''),
						id_source: $('input[name="ben_id_src"]').val(),
						name: $('input[name="ben_name"]').val(),
						currency: $('input[name="ben_currency"]').val(),
						benchmark_reference_id: $('input[name="ben_ref_id"]').val(),
						benchmark_reference_id_source: $('input[name="ben_ref_id_src"]').val()
					};
		if(obj.benchmark_id){
			console.log('creating user, sending', obj);
			ws.send(JSON.stringify(obj));
			showHomePanel();
			$('#user1wrap').append("<p>benchmarks:"+obj.benchmark_id+" [name]:"+obj.name+"</p>");		
		
			  tmp_bench='<div id="benchnoti_'+obj.benchmark_id+'"><p><span style="color:#FF0;">An account trade has been created:</span><br>'+
			"[benchmark_id]:"+obj.benchmark_id+"<br>[id_source]:"+obj.id_source+
			"<br>[name]:"+obj.name+"<br>[currency]:"+obj.currency+
			"<br>[benchmark_reference_id]:"+obj.benchmark_reference_id+"<br>[benchmark_reference_id_source]:"+obj.benchmark_reference_id_source
			+'</p><button type="button" id="del_bench'+obj.benchmark_id+'">delete</button><hr /></div>';
		
		    $('#bench_check_noti').append(tmp_bench);
			$('#bench_history').append(tmp_bench);
			$('#bench_check_button').show();
			$('#bench_mak_noti').empty();
		}
		return false;
	});
	
	$('#submit5').click(function(){
		var obj = 	{
						type: 'data_view',
						data_type: $('select[name="data type"]').val()
					};
			console.log(obj.data_type);		
				
		if(obj.data_type){
			console.log('data view request, sending', obj);
			ws.send(JSON.stringify(obj));
		}
		return false;
	});

	$('#create_by_file').click(function(){
        console.log('---------------------CREATE BY A FILE NOW---------------------------');
		var file = document.querySelector('input[type="file"]').files[0];
		console.log(file);
        handleFile(file);
    });

	$('#submit6').click(function(){
		$('#data_history').empty();
	});

	$('#submit7').click(function(){
		var data_type = $('select[name="data type"]').val()
		console.log(data_type)
		if(data_type == 'account'){
			$('#accountselect').fadeIn(300);
			$('#actradeselect').hide();
			$('#acbenchmarkselect').hide();
			$('#benchmarkselect').hide();
		}
		else if(data_type == 'ac_trade'){
			$('#accountselect').hide();
			$('#actradeselect').fadeIn(300);
			$('#acbenchmarkselect').hide();
			$('#benchmarkselect').hide();
		}
		else if(data_type == 'ac_benchmark'){
			$('#accountselect').hide();
			$('#actradeselect').hide();
			$('#acbenchmarkselect').fadeIn(300);
			$('#benchmarkselect').hide();
		}
		else if(data_type == 'benchmarks'){
			$('#accountselect').hide();
			$('#actradeselect').hide();
			$('#acbenchmarkselect').hide();
			$('#benchmarkselect').fadeIn(300);
		}
		
	});
	String.prototype.trim=function(){
　　    		return this.replace(/(^\s*)|(\s*$)/g, "");
　　    }
								
	$('#homeLink').click(function(){
		showHomePanel();
	});

	$('#createLink').click(function(){

	$('#homePanel').hide();
		$('#createPanel').fadeIn(300);
		$('#panel_acBenchmark').hide();
		$('#panel_acTradeSetup').hide();
		$('#panel_benchmark').hide();
		$('#panel_viewer').hide();
	});

	$('#cr_acTradeSetup').click(function(){
		$('#homePanel').hide();
		$('#createPanel').hide();
		$('#panel_acBenchmark').hide();
		$('#panel_acTradeSetup').fadeIn(300);
		$('#panel_benchmark').hide();
		$('#panel_viewer').hide();
	});
	$('#cr_acBenchmark').click(function(){
		$('#homePanel').hide();
		$('#createPanel').hide();
		$('#panel_acBenchmark').fadeIn(300);
		$('#panel_acTradeSetup').hide();
		$('#panel_benchmark').hide();
		$('#panel_viewer').hide();
	});
	$('#cr_benchmark').click(function(){
		$('#homePanel').hide();
		$('#createPanel').hide();
		$('#panel_acBenchmark').hide();
		$('#panel_acTradeSetup').hide();
		$('#panel_benchmark').fadeIn(300);
		$('#panel_viewer').hide();
	});
	$('#cr_viewer').click(function(){
		$('#homePanel').hide();
		$('#createPanel').hide();
		$('#panel_acBenchmark').hide();
		$('#panel_acTradeSetup').hide();
		$('#panel_benchmark').hide();
		$('#panel_viewer').fadeIn(300);
	});
	
   // $('#ac_accept').click(function(){
   // 		// $('#actrade_mak_noti').append(tmp_account);
	// 	// tmp_account="";
	// 	console.log('accepting user, sending', account_obj);
	// 	ws.send(JSON.stringify(account_obj));
	// 	var obj = {
	// 		type: 'ac_accept',
	// 		ac_id:
	// 	};
	// 	// $('#ac_check_notice').empty();
	// 	// $('#ac_check_button').hide();
	// 	$('#user1wrap').append("<p>Account Checker Accepted!</p>");
	// 	ws.send(JSON.stringify({type:"check_decide", checktype:"Account", checkcont:"accept"}));
	// 	showHomePanel();
   // });
	
// 	$('#ac_decline').click(function(){
// 	tmp_account="";
// 	$('#ac_check_notice').empty();
// 	$('#ac_check_button').hide();
// 	$('#user1wrap').append("<p>Account Checker Declined!</p>");
// 	ws.send(JSON.stringify({type:"check_decide", checktype:"Account", checkcont:"decline"}));
// 	showHomePanel();
// });
	
// 	$('#actrade_accept').click(function(){
//   	$('#acbench_mak_noti').append(tmp_actrade);
// 	tmp_actrade="";
// 	$('#actrade_check_notice').empty();
// 	$('#actrade_check_button').hide();
// 	$('#user1wrap').append("<p>Account trade Checker Accepted!</p>");
// 	ws.send(JSON.stringify({type:"check_decide", checktype:"Ac_trades_setup", checkcont:"accept"}));
// 	showHomePanel();
// });

//     $('#actrade_decline').click(function(){
// 	tmp_actrade="";
// 	$('#actrade_check_notice').empty();
// 	$('#actrade_check_button').hide();
// 	$('#user1wrap').append("<p>Account trade Checker Declined!</p>");
// 	ws.send(JSON.stringify({type:"check_decide", checktype:"Ac_trades_setup", checkcont:"decline"}));
// 	showHomePanel();
// });

// 	$('#acbench_accept').click(function(){
//   	$('#bench_mak_noti').append(tmp_acbench);
// 	tmp_acbench="";
// 	$('#acbench_check_noti').empty();
// 	$('#acbench_check_button').hide();
// 	$('#user1wrap').append("<p>Account Benchmark Checker Accepted!</p>");
// 	ws.send(JSON.stringify({type:"check_decide", checktype:"Ac_benchmark", checkcont:"accept"}));
// 	showHomePanel();
// });

//     $('#acbench_decline').click(function(){
// 	tmp_acbench="";
// 	$('#acbench_check_noti').empty();
// 	$('#acbench_check_button').hide();
// 	$('#user1wrap').append("<p>Account Benchmark Checker Declined!</p>");
// 	ws.send(JSON.stringify({type:"check_decide", checktype:"Ac_benchmark", checkcont:"decline"}));
// 	showHomePanel();
// });

//    $('#bench_accept').click(function(){
// 	tmp_bench="";
// 	$('#bench_check_noti').empty();
// 	$('#bench_check_button').hide();
// 	$('#user1wrap').append("<p>Benchmark Checker Accepted!</p>");
// 	ws.send(JSON.stringify({type:"check_decide", checktype:"Benchmarks", checkcont:"accept"}));
// 	showHomePanel();
// });

//     $('#bench_decline').click(function(){
// 	tmp_bench="";
// 	$('#bench_check_noti').empty();
// 	$('#bench_check_button').hide();
// 	$('#user1wrap').append("<p>Benchmark Checker Declined!</p>");
// 	ws.send(JSON.stringify({type:"check_decide", checktype:"Benchmarks", checkcont:"decline"}));
// 	showHomePanel();
// });

    $(document).click(function(e){  //click the button
		var clickid=$(e.target).attr('id');
		if (clickid.indexOf("ac_accept_")>=0) {		// accept the account
            var obj = {
                type: 'ac_accept',
                ac_id: clickid.substr(10)
            };
            console.log('accepting user, sending', obj);
            ws.send(JSON.stringify(obj));
            $('#ac_check_noti_' + clickid.substr(10)).remove();
            $('#user1wrap').append("<p>Account Checker Accepted!</p>");
        }
        else if (clickid.indexOf("ac_decline_")>=0) {		// decline the account
			var obj = {
				type: 'ac_decline',
				ac_id:clickid.substr(11)
			};
			console.log('declining user, sending', obj);
			ws.send(JSON.stringify(obj));
            $('#ac_check_noti_' + clickid.substr(11)).remove();
            $('#user1wrap').append("<p>Account Checker Declined!</p>");
            // showHomePanel();
		}
		else if (clickid.indexOf("actra_accept_")>=0) {		// accept the account trade
			var obj ={
				type: 'actra_accept',
				ac_id: clickid.substr(13)
			};
			console.log('accepting account trade, sending', obj);
			ws.send(JSON.stringify(obj));
			$('#actranoti_' + clickid.substr(13)).remove();
            $('#user1wrap').append("<p>Account trade Checker Accepted!</p>");
		}
		else if (clickid.indexOf("actra_decline_")>=0) {
            var obj = {
                type: 'actra_decline',
                ac_id:clickid.substr(14)
            };
            console.log('declining account trade, sending', obj);
            ws.send(JSON.stringify(obj));
            $('#actranoti_' + clickid.substr(14)).remove();
            $('#user1wrap').append("<p>Account trade Checker Declined!</p>");
            // ws.send(JSON.stringify({type:"check_decide", checktype:"Ac_trades_setup", checkcont:"decline"}));
            // showHomePanel();
		}
		else if (clickid.indexOf("acben_accept_")>=0){
            var obj ={
                type: 'acben_accept',
                ac_id: clickid.substr(13)
            };
            console.log('accepting account benchmark, sending', obj);
            ws.send(JSON.stringify(obj));
            $('#acbennoti_' + clickid.substr(13)).remove();
            $('#user1wrap').append("<p>Account Benchmark Checker Accepted!</p>");
		}
		else if (clickid.indexOf("acben_decline_")>=0){
            var obj = {
                type: 'acben_decline',
                ac_id:clickid.substr(14)
            };
            console.log('declining account benchmark, sending', obj);
            ws.send(JSON.stringify(obj));
            $('#acbennoti_' + clickid.substr(14)).remove();
            $('#user1wrap').append("<p>Account Benchmark Checker Declined!</p>");
            // showHomePanel();
		}
		else if (clickid.indexOf("bench_accept_")>=0) {
            var obj ={
                type: 'bench_accept',
                id: clickid.substr(13)
            };
            console.log('accepting benchmarks, sending', obj);
            ws.send(JSON.stringify(obj));
            $('#benchnoti_' + clickid.substr(13)).remove();
            $('#user1wrap').append("<p>Benchmarks Checker Accepted!</p>");
		}
		else if (clickid.indexOf("bench_decline_")>=0) {
            var obj = {
                type: 'bench_decline',
                id:clickid.substr(14)
            };
            console.log('declining benchmarks, sending', obj);
            ws.send(JSON.stringify(obj));
            $('#benchnoti_' + clickid.substr(14)).remove();
            $('#user1wrap').append("<p>Benchmarks Checker Declined!</p>");
            // showHomePanel();
		}
		else if (clickid.indexOf("del_bench")>=0){
			var delid=clickid.substr(9);
			$("#benchnoti_"+delid).remove();
			$('#user1wrap').append("<p>Benchmark "+delid+" deleted!</p>");	
		}
		else if (clickid.indexOf("del_acben")>=0){
			var delid=clickid.substr(9);
            var obj = {
                type: 'know_new_record',
                table_name: 'ac_benchmark',
                id: delid
            };
            ws.send(JSON.stringify(obj));
			$("#acbennoti_"+delid).remove();
			$('#user1wrap').append("<p>Ac_benchmark "+delid+" deleted!</p>");	
		}
		else if (clickid.indexOf("del_actra")>=0){
			var delid=clickid.substr(9);
			var obj = {
				type: 'know_new_record',
				table_name: 'ac_trade',
				id: delid
			};
            ws.send(JSON.stringify(obj));
			$("#actranoti_"+delid).remove();
			$('#user1wrap').append("<p>Ac_Trade_setup "+delid+" deleted!</p>");	
		}
		else if (clickid.indexOf("del_ac")>=0){
			var delid=clickid.substr(6);
            var obj = {
                type: 'know_new_record',
                table_name: 'account',
                id: delid
            };
            ws.send(JSON.stringify(obj));
			$("#acnoti_"+delid).remove();
			$('#user1wrap').append("<p>Account "+delid+" deleted!</p>");	
		}

	});
	
	//drag and drop marble
	$('#user1wrap, #trashbin').sortable({connectWith: '.sortable'}).disableSelection();
	
	
	$('#user1wrap').droppable({drop:
		function( event, ui ) {
		}
	});
	
	$('#trashbin').droppable({drop:
		function( event, ui ) {
			var id = $(ui.draggable).attr('id');
			if(id){
				console.log('removing user', id);
				var obj = 	{
								type: 'remove',
								name: id,
								v: 1
							};
				//ws.send(JSON.stringify(obj));
				$(ui.draggable).fadeOut();
		
					$(ui.draggable).remove();
				
		//		showHomePanel();
			}
		}

	});
	
	
	// =================================================================================
	// Helper Fun
	// ================================================================================
	//show admin panel page
	function showHomePanel(){
		$('#homePanel').fadeIn(300);
		$('#createPanel').hide();
		$('#panel_acBenchmark').hide();
		$('#panel_acTradeSetup').hide();
		$('#panel_benchmark').hide();
		$('#panel_viewer').hide();
		var part = window.location.pathname.substring(0,3);
		window.history.pushState({},'', part + '/home');						//put it in url so we can f5
		
		console.log('getting new users');
	
		setTimeout(function(){
			//$('#user1wrap').html('');											//reset the panel
			ws.send(JSON.stringify({type: 'get', v: 1}));						//need to wait a bit
			ws.send(JSON.stringify({type: 'chainstats', v: 1}));
			
		}, 1000);
		
	}
	
	
	$('#nav_ac_maker').click(function(){
		$("#nav_ac_maker").css("color","red");
		$("#nav_ac_checker").css("color","white");
		$('#account_maker').show();
		$('#account_checker').hide();
	});

   $('#nav_ac_checker').click(function(){
		$("#nav_ac_maker").css("color","white");
		$("#nav_ac_checker").css("color","red");
		$('#account_maker').hide();
		$('#account_checker').show();

		$('#ac_data_validity_notice').empty();
        $('#ac_check_notice').empty();
       var obj = {
		   type: 'untreated',
		   table_name: 'account'
	   };
       console.log('get untreated account, sending');
       ws.send(JSON.stringify(obj));
    });

    $('#nav_actrade_maker').click(function(){
		$("#nav_actrade_maker").css("color","red");
		$("#nav_actrade_checker").css("color","white");
		$('#actrade_maker').show();
		$('#actrade_checker').hide();

        $('#actrade_mak_noti').empty();
		var obj = {
			type: 'new',
			table_name: 'account'
		};
		console.log('get new accepted account, sending');
		ws.send(JSON.stringify(obj));
	});

   $('#nav_actrade_checker').click(function(){
		$("#nav_actrade_maker").css("color","white");
		$("#nav_actrade_checker").css("color","red");
		$('#actrade_maker').hide();
		$('#actrade_checker').show();

		$('#actrade_check_notice').empty();
       	var obj = {
           type: 'untreated',
           table_name: 'ac_trade'
       	};
       	console.log('get untreated ac_treade, sending');
       	ws.send(JSON.stringify(obj));
   });
	
	$('#nav_acbench_maker').click(function(){
		$("#nav_acbench_maker").css("color","red");
		$("#nav_acbench_checker").css("color","white");
		$('#acbench_maker').show();
		$('#acbench_checker').hide();

		$('#acbench_mak_noti').empty();
		var obj = {
			type: 'new',
			table_name: 'ac_trade'
		};
		console.log('get new accepted account trade information, sending');
        ws.send(JSON.stringify(obj));
	});

    $('#nav_acbench_checker').click(function(){
    	$("#nav_acbench_maker").css("color","white");
		$("#nav_acbench_checker").css("color","red");
		$('#acbench_maker').hide();
		$('#acbench_checker').show();

		$('#acbench_check_noti').empty();
		var obj = {
			type: 'untreated',
			table_name: 'ac_benchmark'
		};
        console.log('get untreated ac_benchmark, sending');
        ws.send(JSON.stringify(obj));
    });

    $('#nav_bench_maker').click(function(){
		$("#nav_bench_maker").css("color","red");
		$("#nav_bench_checker").css("color","white");
		$('#benchmark_maker').show();
		$('#benchmark_checker').hide();

		$('#bench_mak_noti').empty();
		var obj = {
			type: 'new',
			table_name: 'ac_benchmark'
		};
        console.log('get new accepted account trade benchmark information, sending');
        ws.send(JSON.stringify(obj));
	});

   $('#nav_bench_checker').click(function(){
	   $("#nav_bench_maker").css("color","white");
	   $("#nav_bench_checker").css("color","red");
	   $('#benchmark_maker').hide();
	   $('#benchmark_checker').show();

	   $('#bench_check_noti').empty();
       var obj = {
           type: 'untreated',
           table_name: 'benchmarks'
       };
       console.log('get untreated benchmarks, sending');
       ws.send(JSON.stringify(obj));
    });
});

String.prototype.trim=function(){
　　    return this.replace(/(^\s*)|(\s*$)/g, "");
}

function handleFile(files) {
    	if (files.length) {
    	
        var file = files[0];
        var reader = new FileReader();
        if(reader){
        	console.log("data from files",files[0]);
        }
        if (/text\/\w+/.test(file.type)) {
            reader.onload = function() {
				var i=0;
               // $('<pre>' + this.result + '</pre>').appendTo('body');
			   var lists=this.result.split(/[,:;]/);
			   var pos=0;
			   while (true) {
					if (pos>=lists.length) break;
					lists[pos]=lists[pos].trim();
				    if (lists[pos].indexOf('accounts')>=0) {
						var obj = 	{
						type: 'create_account',
						ac_id: lists[pos+1].replace(' ', ''),
						ac_short_name: lists[pos+2].trim(),
						status: lists[pos+3].trim(),
						term_date: lists[pos+4].trim(),
						inception_date: lists[pos+5].trim(),
						ac_region: lists[pos+6].trim(),
						ac_sub_region: lists[pos+7].trim(),
						cod_country_domicile: lists[pos+8].trim(),
						liq_method: lists[pos+9].trim(),
						contracting_entity: lists[pos+10].trim(),
						mgn_entity: lists[pos+11].trim(),
						ac_legal_name: lists[pos+12].trim(),
						manager_name: lists[pos+13].trim(),
						cod_ccy_base: lists[pos+14].trim(),
						long_name: lists[pos+15].trim(),
						mandate_id: lists[pos+16].trim(),
						client_id: lists[pos+17].trim(),
						custodian_name: lists[pos+18].trim(),
						sub_mandate_id: lists[pos+19].trim(),
						transfer_agent_name: lists[pos+20].trim(),
						trust_bank: lists[pos+21].trim(),
						re_trust_bank: lists[pos+22].trim(),
						last_updated_by: lists[pos+23].trim(),
						last_approved_by: lists[pos+24].trim(),
						last_update_date: lists[pos+25].trim()
					    };
						console.log("read line success");
						pos+=26;
						ws.send(JSON.stringify(obj));
						$('#user1wrap').append("<p>account:"+obj.ac_id+" [short name]:"+obj.ac_short_name+"</p>");	
					    	
					    	tmp_account='<div id="acnoti_'+obj.ac_id+'"><p><span style="color:#FF0;">A new account has been created:</span><br>'+
						"[account]:"+obj.ac_id+"<br>[short name]:"+obj.ac_short_name+
						"<br>[status]:"+obj.ac_status+"<br>[term date]:"+obj.term_date+
						"<br>[inception date]:"+obj.inception_date+"<br>[region]:"+obj.ac_region+
						"<br>[sub region]:"+obj.ac_sub_region+"<br>[country domicile]:"+obj.cod_country_domicile+
						"<br>[liq method]:"+obj.liq_method+"<br>[contracting entity]:"+obj.contracting_entity+
						"<br>[mgn entity]:"+obj.mgn_entity+"<br>[account legal name]:"+obj.ac_legal_name+
						"<br>[manager name]:"+obj.manager_name+"<br>[cod_ccy_base]:"+obj.cod_ccy_base+
						"<br>[long name]:"+obj.long_name+"<br>[mandate id]:"+obj.mandate_id+
						"<br>[client id]:"+obj.client_id+"<br>[custodian name]:"+obj.custodian_name+
						"<br>[sub_mandate_id]:"+obj.sub_mandate_id+"<br>[transfer_agent_name]:"+obj.transfer_agent_name+
						"<br>[trust_bank]:"+obj.trust_bank+"<br>[re_trust_bank]:"+obj.re_trust_bank+
						"<br>[last_updated_by]:"+obj.last_updated_by+"<br>[last_approved_by]:"+obj.last_approved_by+
						"<br>[last_update_date]:"+obj.last_update_date+'</p><button type="button" id="del_ac'+obj.ac_id+'">delete</button><hr /></div>';

						// $('#ac_check_notice').append(tmp_account);
						$('#ac_history').append(tmp_account);
						// $('#ac_check_button').show();
					}
					else if (lists[pos].indexOf('account_trades_setup')>=0) {
						var obj = 	{
						type: 'ac_trade_setup',
						ac_id: lists[pos+1].replace(' ', ''),
						lvts: lists[pos+2].trim(),
						calypso: lists[pos+3].trim(),
						aladdin: lists[pos+4].trim(),
						trade_start_date: lists[pos+5].trim(),
						equity: lists[pos+6].trim(),
						fixed_income: lists[pos+7].trim(),
					    };
						console.log("read line success");
						pos+=8;
						ws.send(JSON.stringify(obj));
						$('#user1wrap').append("<p>account trades:"+obj.ac_id+" [lvts]:"+obj.lvts+"</p>");
						
						// $('#user1wrap').append("<p>account trades:"+obj.ac_id+" [lvts]:"+obj.lvts+"</p>");
						tmp_actrade='<div id="actranoti_'+obj.ac_id+'"><p><span style="color:#FF0;">An account trade has been created:</span><br>'+
						"[account id]:"+obj.ac_id+"<br>[lvts]:"+obj.lvts+
						"<br>[calypso]:"+obj.calypso+"<br>[aladdin]:"+obj.aladdin+
						"<br>[trade start date]:"+obj.trade_start_date+"<br>[equity]:"+obj.equity+
						'<br>[fixed_income]:'+obj.fixed_income+'</p><button type="button" id="del_actra'+obj.ac_id+'">delete</button><hr /></div>';

						// $('#actrade_check_notice').append(tmp_actrade);
						$('#actrade_history').append(tmp_actrade);
						// $('#actrade_check_button').show();
						// $('#actrade_mak_noti').empty();
					}
					else if (lists[pos].indexOf('account_benchmarks')>=0) {
					    	var obj = 	{
						type: 'ac_benchmark',
						ac_id: lists[pos+1].replace(' ', ''),
						benchmark_id: lists[pos+2].trim(),
						source: lists[pos+3].trim(),
						name: lists[pos+4].trim(),
						currency: lists[pos+5].trim(),
						primary_flag: lists[pos+6].trim(),
						start_date: lists[pos+7].trim(),
						end_date: lists[pos+8].trim(),
						benchmark_reference_id: lists[pos+9].trim(),
						benchmark_reference_id_source: lists[pos+10].trim()
						};
						console.log("read line success");
						pos+=11;
						ws.send(JSON.stringify(obj));
						$('#user1wrap').append("<p>account trades:"+obj.ac_id+" [lvts]:"+obj.lvts+"</p>");
						
						tmp_acbench='<div id="acbennoti_'+obj.ac_id+'"><p><span style="color:#FF0;">An account benchmark has been created:</span><br>'+
						"[account id]:"+obj.ac_id+"<br>[benchmark_id]:"+obj.benchmark_id+
						"<br>[source]:"+obj.source+"<br>[name]:"+obj.name+
						"<br>[currency]:"+obj.currency+"<br>[primary_flag]:"+obj.primary_flag+
						"<br>[start_date]:"+obj.start_date+"<br>[end_date]:"+obj.end_date+
						"<br>[benchmark_reference_id]:"+obj.benchmark_reference_id+"<br>[benchmark_reference_id_source]:"+obj.benchmark_reference_id_source
						+'</p><button type="button" id="del_acben'+obj.ac_id+'">delete</button><hr /></div>';

						// $('#acbench_check_noti').append(tmp_acbench);
						$('#acbench_history').append(tmp_acbench);
						// $('#acbench_check_button').show();
						// $('#acbench_mak_noti').empty();
					}
					else if (lists[pos].indexOf('benchmarks')>=0) {
						var obj = 	{
						type: 'benchmarks',
						benchmark_id: lists[pos+1].replace(' ', ''),
						id_source: lists[pos+2].trim(),
						name: lists[pos+3].trim(),
						currency: lists[pos+4].trim(),
						benchmark_reference_id: lists[pos+5].trim(),
						benchmark_reference_id_source: lists[pos+6].trim(),
						};
						console.log("read line success");
						pos+=7;
						ws.send(JSON.stringify(obj));
						$('#user1wrap').append("<p>benchmarks:"+obj.benchmark_id+" [name]:"+obj.name+"</p>");
						
						tmp_acbench='<div id="acbennoti_'+obj.ac_id+'"><p><span style="color:#FF0;">An account benchmark has been created:</span><br>'+
						"[account id]:"+obj.ac_id+"<br>[benchmark_id]:"+obj.benchmark_id+
						"<br>[source]:"+obj.source+"<br>[name]:"+obj.name+
						"<br>[currency]:"+obj.currency+"<br>[primary_flag]:"+obj.primary_flag+
						"<br>[start_date]:"+obj.start_date+"<br>[end_date]:"+obj.end_date+
						"<br>[benchmark_reference_id]:"+obj.benchmark_reference_id+"<br>[benchmark_reference_id_source]:"+obj.benchmark_reference_id_source
						+'</p><button type="button" id="del_acben'+obj.ac_id+'">delete</button><hr /></div>';

						// $('#acbench_check_noti').append(tmp_acbench);
						$('#acbench_history').append(tmp_acbench);
						// $('#acbench_check_button').show();
						// $('#acbench_mak_noti').empty();
					}
					else break;
				}
                showHomePanel();
            }
            reader.readAsText(file);
        }
    }
}

// =================================================================================
// Socket Stuff
// =================================================================================
function connect_to_server(){
	var connected = false;
	connect();
	
	function connect(){
		var wsUri = 'ws://' + document.location.hostname + ':' + document.location.port;
		console.log('Connectiong to websocket', wsUri);
		
		ws = new WebSocket(wsUri);
		ws.onopen = function(evt) { onOpen(evt); };
		ws.onclose = function(evt) { onClose(evt); };
		ws.onmessage = function(evt) { onMessage(evt); };
		ws.onerror = function(evt) { onError(evt); };
	}
	
	function onOpen(evt){
		console.log('WS CONNECTED');
		connected = true;
		clear_blocks();
		$('#errorNotificationPanel').fadeOut();
		ws.send(JSON.stringify({type: 'get', v:1}));
		ws.send(JSON.stringify({type: 'chainstats', v:1}));
	}

	function onClose(evt){
		console.log('WS DISCONNECTED', evt);
		connected = false;
		setTimeout(function(){ connect(); }, 5000);					//try again one more time, server restarts are quick
	}

	function onMessage(msg){
		try{
			
			var msgObj = JSON.parse(msg.data);
			if(msgObj.marble){
				console.log('rec', msgObj.msg, msgObj);
			}
			else if(msgObj.msg === 'chainstats'){
			
				console.log('rec', msgObj.msg, ': ledger blockheight', msgObj.chainstats.height, 'block', msgObj.blockstats.height);
				var e = formatDate(msgObj.blockstats.transactions[0].timestamp.seconds * 1000, '%M/%d/%Y &nbsp;%I:%m%P');
		
				$('#blockdate').html('<span style="color:#fff">TIME</span>&nbsp;&nbsp;' + e + ' UTC');
				var temp =  {
								id: msgObj.blockstats.height, 
								blockstats: msgObj.blockstats
							};
				new_block(temp);								//send to blockchain.js
			}
			else if(msgObj.msg === 'account'){
				console.log("accounts from database");
				var hash = $('input[name="hash1"]').is(':checked');
				if(hash){
					console.log('hhh');
				}
				console.log(msgObj.ac_short_name);
				var click = {
						hash: $('input[name="hash1"]').is(':checked'),
						ac_id: $('input[name="ac_id0"]').is(':checked'),
						ac_short_name: $('input[name="ac_short_name0"]').is(':checked'),
						ac_status: $('input[name="status0"]').is(':checked'),
						term_date: $('input[name="term_date0"]').is(':checked'),
						inception_date: $('input[name="inception_date0"]').is(':checked'),
						ac_region: $('input[name="ac_region0"]').is(':checked'),
						ac_sub_region: $('input[name="ac_sub_region0"]').is(':checked'),
						cod_country_domicile: $('input[name="cod_country_domicile0"]').is(':checked'),
						liq_method: $('input[name="liq_method0"]').is(':checked'),
						contracting_entity: $('input[name="contract_entity0"]').is(':checked'),
						mgn_entity: $('input[name="mgn_entity0"]').is(':checked'),
						ac_legal_name: $('input[name="ac_legal_name0"]').is(':checked'),
						manager_name: $('input[name="manager_name0"]').is(':checked'),
						cod_ccy_base: $('input[name="cod_ccy_base0"]').is(':checked'),
						long_name: $('input[name="long_name0"]').is(':checked'),
						mandate_id: $('input[name="mandate_id0"]').is(':checked'),
						client_id: $('input[name="client_id0"]').is(':checked'),
						custodian_name: $('input[name="custodian_name0"]').is(':checked'),
						sub_mandate_id: $('input[name="sub_mandate_id0"]').is(':checked'),
						transfer_agent_name: $('input[name="transfer_agent_name0"]').is(':checked'),
						trust_bank: $('input[name="trust_bank0"]').is(':checked'),
						re_trust_bank: $('input[name="re_trust_bank0"]').is(':checked'),
						last_updated_by: $('input[name="last_updated_by0"]').is(':checked'),
						last_approved_by: $('input[name="last_approved_by0"]').is(':checked'),
						last_update_date: $('input[name="last_update_date0"]').is(':checked')
					};
				var tmp_data = {
						hash: msgObj.sha_value,
						ac_id: msgObj.ac_id,
						ac_short_name: msgObj.ac_short_name,
						ac_status: msgObj.status,
						term_date: msgObj.term_date,
						inception_date: msgObj.inception_date,
						ac_region: msgObj.ac_region,
						ac_sub_region: msgObj.ac_sub_region,
						cod_country_domicile: msgObj.cod_country_domicile,
						liq_method: msgObj.liq_method,
						contracting_entity: msgObj.contracting_entity,
						mgn_entity: msgObj.mgn_entity,
						ac_legal_name: msgObj.ac_legal_name,
						manager_name: msgObj.manager_name,
						cod_ccy_base: msgObj.cod_ccy_base,
						long_name: msgObj.long_name,
						mandate_id: msgObj.mandate_id,
						client_id: msgObj.client_id,
						custodian_name: msgObj.custodian_name,
						sub_mandate_id: msgObj.sub_mandate_id,
						transfer_agent_name: msgObj.transfer_agent_name,
						trust_bank: msgObj.trust_bank,
						re_trust_bank: msgObj.re_trust_bank,
						last_updated_by: msgObj.last_updated_by,
						last_approved_by: msgObj.last_approved_by,
						last_update_date: msgObj.last_update_date
					};
				var title ={
						hash: "[sha_value]:",
						ac_id: "[account]:",
						ac_short_name: "[short name]:",
						ac_status: "[status]:",
						term_date: "[term date]:",
						inception_date: "[inception date]:",
						ac_region: "[region]:",
						ac_sub_region: "[sub region]",
						cod_country_domicile: "[country_domicile]:",
						liq_method: "[liq method]:",
						contracting_entity: "[contracting entity]:",
						mgn_entity: "[mgn entity]:",
						ac_legal_name: "[account legal name]:",
						manager_name: "[manager name]:",
						cod_ccy_base: "[cod_ccy_base]:",
						long_name: "[long name]:",
						mandate_id: "[mandate id]:",
						client_id: "[client id]:",
						custodian_name: "[custodian name]:",
						sub_mandate_id: "[sub_mandate_id]:",
						transfer_agent_name: "[transfer_agent_name]:",
						trust_bank: "[trust bank]:",
						re_trust_bank: "[re_trust_bank]:",
						last_updated_by: "[last_updated_by]:",
						last_approved_by: "[last_approved_by]:",
						last_update_date: "[last_update_date]:"
				}
				base = '<div><hr>';
				for (var s in click){
					// console.log(s);
					// console.log(click[s]);
					if (click[s]){
						base = base + "<br>" + title[s] + tmp_data[s];
					}
				}
				base = base + '<hr /></div>';
				$('#data_history').append(base);
			// 	base_account='<div><hr>'+"[sha_value]:"+msgObj.sha_value+
			// "<br>[account]:"+msgObj.ac_id+"<br>[short name]:"+msgObj.ac_short_name+
			// "<br>[status]:"+msgObj.ac_status+"<br>[term date]:"+msgObj.term_date+
			// "<br>[inception date]:"+msgObj.inception_date+"<br>[region]:"+msgObj.ac_region+
			// "<br>[sub region]:"+msgObj.ac_sub_region+"<br>[country domicile]:"+msgObj.cod_country_domicile+
			// "<br>[liq method]:"+msgObj.liq_method+"<br>[contracting entity]:"+msgObj.contracting_entity+
			// "<br>[mgn entity]:"+msgObj.mgn_entity+"<br>[account legal name]:"+msgObj.ac_legal_name+
			// "<br>[manager name]:"+msgObj.manager_name+"<br>[cod_ccy_base]:"+msgObj.cod_ccy_base+
			// "<br>[long name]:"+msgObj.long_name+"<br>[mandate id]:"+msgObj.mandate_id+
			// "<br>[client id]:"+msgObj.client_id+"<br>[custodian name]:"+msgObj.custodian_name+
			// "<br>[sub_mandate_id]:"+msgObj.sub_mandate_id+"<br>[transfer_agent_name]:"+msgObj.transfer_agent_name+
			// "<br>[trust_bank]:"+msgObj.trust_bank+"<br>[re_trust_bank]:"+msgObj.re_trust_bank+
			// "<br>[last_updated_by]:"+msgObj.last_updated_by+"<br>[last_approved_by]:"+msgObj.last_approved_by+
			// "<br>[last_update_date]:"+msgObj.last_update_date+'<hr /></div>';
			// 	$('#data_history').append(base_account);
			}
			else if(msgObj.msg === 'ac_trade'){
				console.log("actrade from database");
				var click = {

						hash: $('input[name="hash2"]').is(':checked'),
						ac_id: $('input[name="t_ac_id0"]').is(':checked'),
						lvts: $('input[name="lvts0"]').is(':checked'),
						calypso: $('input[name="calypso0"]').is(':checked'),
						aladdin: $('input[name="aladdin0"]').is(':checked'),
						trade_start_date: $('input[name="t_start_date0"]').is(':checked'),
						equity: $('input[name="equity0"]').is(':checked'),
						fixed_income: $('input[name="fixed_income0"]').is(':checked')
					};
				var tmp_data = {
						hash: msgObj.sha_value,
						ac_id: msgObj.ac_id,
						lvts: msgObj.lvts,
						calypso: msgObj.calypso,
						aladdin: msgObj.aladdin,
						trade_start_date: msgObj.trade_start_date,
						equity: msgObj.equity,
						fixed_income: msgObj.fixed_income
					};
				var title ={
						hash: "[sha_value]:",
						ac_id: "[account]:",
						lvts: "[lvts]:",
						calypso: "[calypso]:",
						aladdin: "[aladdin]:",
						trade_start_date: "[trade start date]:",
						equity: "[equity]:",
						fixed_income: "[fixed income]:"
				}
				base = '<div><hr>';
				for (var s in click){
					// console.log(s);
					// console.log(click[s]);
					if (click[s]){
						base = base + "<br>" + title[s] + tmp_data[s];
					}
				}
				base = base + '<hr /></div>';
				$('#data_history').append(base);
			// 	base_actrade='<div><hr>'+"[sha_value]:"+msgObj.sha_value+
			// "<br>[account id]:"+msgObj.ac_id+"<br>[lvts]:"+msgObj.lvts+
			// "<br>[calypso]:"+msgObj.calypso+"<br>[aladdin]:"+msgObj.aladdin+
			// "<br>[trade start date]:"+msgObj.trade_start_date+"<br>[equity]:"+msgObj.equity+
			// '<br>[fixed_income]:'+msgObj.fixed_income+'<hr /></div>';
			// 	$('#data_history').append(base_actrade);
			}
			else if(msgObj.msg === 'ac_benchmark'){
				console.log("ac_benchmarks from database");

				var click = {

						hash: $('input[name="hash3"]').is(':checked'),
						ac_id: $('input[name="ben_ac_id0"]').is(':checked'), 
						benchmark_id: $('input[name="aben_id0"]').is(':checked'),
						source: $('input[name="aben_source0"]').is(':checked'),
						name: $('input[name="aben_name0"]').is(':checked'),
						currency: $('input[name="aben_currency0"]').is(':checked'),
						primary_flag: $('input[name="aben_pri_flag0"]').is(':checked'),
						start_date: $('input[name="aben_startdate0"]').is(':checked'),
						end_date: $('input[name="aben_enddate0"]').is(':checked'),
						benchmark_reference_id: $('input[name="aben_ref_id0"]').is(':checked'),
						benchmark_reference_id_source: $('input[name="aben_ref_id_src0"]').is(':checked')
					};
				var tmp_data = {
						hash: msgObj.sha_value,
						ac_id: msgObj.ac_id,
						benchmark_id: msgObj.benchmark_id,
						source: msgObj.source,
						name: msgObj.name,
						currency: msgObj.currency,
						primary_flag: msgObj.primary_flag,
						start_date: msgObj.start_date,
						end_date: msgObj.end_date,
						benchmark_reference_id: msgObj.benchmark_reference_id,
						benchmark_reference_id_source: msgObj.benchmark_reference_id_source
					};
				var title ={
						hash: "[hash value]:",
						ac_id: "[account]",
						benchmark_id: "[benchmark id]:",
						source: "[source]:",
						name: "[name]:",
						currency: "[currency]:",
						primary_flag: "[primary flag]:",
						start_date: "[start date]:",
						end_date: "[end date]:",
						benchmark_reference_id: "[benchmark reference id]:",
						benchmark_reference_id_source: "[benchmark reference id source]:"
				}
				
				base = '<div><hr>';
				for (var s in click){
					// console.log(s);
					// console.log(click[s]);
					if (click[s]){
						base = base + "<br>" + title[s] + tmp_data[s];
					}
				}
				base = base + '<hr /></div>';
				$('#data_history').append(base);

			// 	base_acbench='<div><hr>'+"[sha_value]:"+msgObj.sha_value+
			// "<br>[account id]:"+msgObj.ac_id+"<br>[benchmark_id]:"+msgObj.benchmark_id+
			// "<br>[source]:"+msgObj.source+"<br>[name]:"+msgObj.name+
			// "<br>[currency]:"+msgObj.currency+"<br>[primary_flag]:"+msgObj.primary_flag+
			// "<br>[start_date]:"+msgObj.start_date+"<br>[end_date]:"+msgObj.end_date+
			// "<br>[benchmark_reference_id]:"+msgObj.benchmark_reference_id+"<br>[benchmark_reference_id_source]:"+msgObj.benchmark_reference_id_source
			// +'<hr /></div>';
			// 	$('#data_history').append(base_acbench);
			}
			else if(msgObj.msg === 'benchmarks'){
				console.log("benchmarks from database");
				
				var click = {

						hash: $('input[name="hash4"]').is(':checked'),
						benchmark_id: $('input[name="benchmark_id0"]').is(':checked'),
						id_source: $('input[name="ben_id_src0"]').is(':checked'),
						name: $('input[name="ben_name0"]').is(':checked'),
						currency: $('input[name="ben_currency0"]').is(':checked'),
						benchmark_reference_id: $('input[name="ben_ref_id0"]').is(':checked'),
						benchmark_reference_id_source: $('input[name="ben_ref_id_src0"]').is(':checked')
				};
				var tmp_data = {
						hash: msgObj.sha_value,
						benchmark_id: msgObj.benchmark_id,
						id_source: msgObj.id_source,
						name: msgObj.name,
						currency: msgObj.currency,
						benchmark_reference_id: msgObj.benchmark_reference_id,
						benchmark_reference_id_source: msgObj.benchmark_reference_id_source
				};
				var title ={
						hash: "[hash value]:",
						benchmark_id: "[benchmark id]:",
						id_source: "[id_source]:",
						name: "[name]:",
						currency: "[currency]:",
						benchmark_reference_id: "[benchmark reference id]:",
						benchmark_reference_id_source: "[benchmark reference id source]:"
				}
				base = '<div><hr>';
				for (var s in click){
					// console.log(s);
					// console.log(click[s]);
					if (click[s]){
						base = base + "<br>" + title[s] + tmp_data[s];
					}
				}
				base = base + '<hr /></div>';
				$('#data_history').append(base);

				// if(hash == 'on'){
				// 	console.log('hhh');
				// }
			// 	base_bench='<div><hr>'+"[sha_value]:"+msgObj.sha_value+"<br>[benchmark_id]:"+msgObj.benchmark_id+"<br>[id_source]:"+msgObj.id_source+
			// "<br>[name]:"+msgObj.name+"<br>[currency]:"+msgObj.currency+
			// "<br>[benchmark_reference_id]:"+msgObj.benchmark_reference_id+"<br>[benchmark_reference_id_source]:"+msgObj.benchmark_reference_id_source+'<hr /></div>';
			// 	$('#data_history').append(base_bench);
			}
			else if(msgObj.msg === 'untreated_account'){
				console.log("untreated account from database");  //ac_check_noti_'+msgObj.ac_id+'
				var un_account = '<div id="ac_check_noti_'+msgObj.ac_id+'"><hr/><span style="color:#FF0;">A new account has been created:</span><br>'+"[sha_value]:"+msgObj.sha_value+
                    "<br>[account]:"+msgObj.ac_id+"<br>[short name]:"+msgObj.ac_short_name+
                    "<br>[status]:"+msgObj.status+"<br>[term date]:"+msgObj.term_date+
                    "<br>[inception date]:"+msgObj.inception_date+"<br>[region]:"+msgObj.ac_region+
                    "<br>[sub region]:"+msgObj.ac_sub_reg+"<br>[contracting entity]:"+msgObj.contracting_entity+
                    "<br>[mgn entity]:"+msgObj.mgn_entityion+"<br>[country domicile]:"+msgObj.cod_country_domicile+
                    "<br>[liq method]:"+msgObj.liq_method+"<br>[account legal name]:"+msgObj.ac_legal_name+
                    "<br>[manager name]:"+msgObj.manager_name+"<br>[cod_ccy_base]:"+msgObj.cod_ccy_base+
                    "<br>[long name]:"+msgObj.long_name+"<br>[mandate id]:"+msgObj.mandate_id+
                    "<br>[client id]:"+msgObj.client_id+"<br>[custodian name]:"+msgObj.custodian_name+
                    "<br>[sub_mandate_id]:"+msgObj.sub_mandate_id+"<br>[transfer_agent_name]:"+msgObj.transfer_agent_name+
                    "<br>[trust_bank]:"+msgObj.trust_bank+"<br>[re_trust_bank]:"+msgObj.re_trust_bank+
                    "<br>[last_updated_by]:"+msgObj.last_updated_by+"<br>[last_approved_by]:"+msgObj.last_approved_by+
                    "<br>[last_update_date]:"+msgObj.last_update_date+
					'<br><button type="button" id="ac_accept_'+msgObj.ac_id+'">accept</button>'+
                    '&nbsp;&nbsp;&nbsp;<button type="button" id="ac_decline_'+msgObj.ac_id+'">decline</button>'+
					'<hr/></div>';
				$('#ac_check_notice').append(un_account);
			}
			else if(msgObj.msg === 'untreated_ac_trade') {
                console.log("untreated ac_trade from database");  //ac_check_noti_'+msgObj.ac_id+'
				var un_ac_trade = '<div id="actranoti_'+msgObj.ac_id+'"><p><span style="color:#FF0;">An account trade has been created:</span><br>'+
                    "[account id]:"+msgObj.ac_id+"<br>[lvts]:"+msgObj.lvts+
                    "<br>[calypso]:"+msgObj.calypso+"<br>[aladdin]:"+msgObj.aladdin+
                    "<br>[trade start date]:"+msgObj.trade_start_date+"<br>[equity]:"+msgObj.equity+
                    '<br>[fixed_income]:'+msgObj.fixed_income+
					'</p><br><button type="button" id="actra_accept_'+msgObj.ac_id+'">accept</button>'+
                    '&nbsp;&nbsp;&nbsp;<button type="button" id="actra_decline_'+msgObj.ac_id+'">decline</button>'+
                    '<hr/></div>';
				$('#actrade_check_notice').append(un_ac_trade);
            }
            else if (msgObj.msg === 'untreated_ac_benchmark') {
				console.log("untreated account benchmark from db");
				var obj = '<div id="acbennoti_'+msgObj.ac_id+'"><p><span style="color:#FF0;">An account benchmark has been created:</span><br>'+
                    "[account id]:"+msgObj.ac_id+"<br>[benchmark_id]:"+msgObj.benchmark_id+
                    "<br>[source]:"+msgObj.source+"<br>[name]:"+msgObj.name+
                    "<br>[currency]:"+msgObj.currency+"<br>[primary_flag]:"+msgObj.primary_flag+
                    "<br>[start_date]:"+msgObj.start_date+"<br>[end_date]:"+msgObj.end_date+
                    "<br>[benchmark_reference_id]:"+msgObj.benchmark_reference_id+"<br>[benchmark_reference_id_source]:"+msgObj.benchmark_reference_id_source +
                    '</p><br><button type="button" id="acben_accept_'+msgObj.ac_id+'">accept</button>'+
                    '&nbsp;&nbsp;&nbsp;<button type="button" id="acben_decline_'+msgObj.ac_id+'">decline</button>'+
                    '<hr/></div>';
				$('#acbench_check_noti').append(obj);
			}
			else if (msgObj.msg === 'untreated_benchmarks') {
                console.log("untreated benchmarks from db");
                var obj = '<div id="benchnoti_'+msgObj.benchmark_id+'"><p><span style="color:#FF0;">An account trade has been created:</span><br>'+
                    "[benchmark_id]:"+msgObj.benchmark_id+"<br>[id_source]:"+msgObj.id_source+
                    "<br>[name]:"+msgObj.name+"<br>[currency]:"+msgObj.currency+
                    "<br>[benchmark_reference_id]:"+msgObj.benchmark_reference_id+"<br>[benchmark_reference_id_source]:"+msgObj.benchmark_reference_id_source +
                    '</p><br><button type="button" id="bench_accept_'+msgObj.benchmark_id+'">accept</button>'+
                    '&nbsp;&nbsp;&nbsp;<button type="button" id="bench_decline_'+msgObj.benchmark_id+'">decline</button>'+
                    '<hr/></div>';
				$('#bench_check_noti').append(obj);
			}
			else if(msgObj.msg === 'newAccepted_account'){
				console.log("new accepted account from database");
                var obj='<div id="acnoti_'+msgObj.ac_id+'"><p><span style="color:#FF0;">A new account has been created:</span><br>'+
                    "[account]:"+msgObj.ac_id+"<br>[short name]:"+msgObj.ac_short_name+
                    "<br>[status]:"+msgObj.ac_status+"<br>[term date]:"+msgObj.term_date+
                    "<br>[inception date]:"+msgObj.inception_date+"<br>[region]:"+msgObj.ac_region+
                    "<br>[sub region]:"+msgObj.ac_sub_region+"<br>[country domicile]:"+msgObj.cod_country_domicile+
                    "<br>[liq method]:"+msgObj.liq_method+"<br>[contracting entity]:"+msgObj.contracting_entity+
                    "<br>[mgn entity]:"+msgObj.mgn_entity+"<br>[account legal name]:"+msgObj.ac_legal_name+
                    "<br>[manager name]:"+msgObj.manager_name+"<br>[cod_ccy_base]:"+msgObj.cod_ccy_base+
                    "<br>[long name]:"+msgObj.long_name+"<br>[mandate id]:"+msgObj.mandate_id+
                    "<br>[client id]:"+msgObj.client_id+"<br>[custodian name]:"+msgObj.custodian_name+
                    "<br>[sub_mandate_id]:"+msgObj.sub_mandate_id+"<br>[transfer_agent_name]:"+msgObj.transfer_agent_name+
                    "<br>[trust_bank]:"+msgObj.trust_bank+"<br>[re_trust_bank]:"+msgObj.re_trust_bank+
                    "<br>[last_updated_by]:"+msgObj.last_updated_by+"<br>[last_approved_by]:"+msgObj.last_approved_by+
                    "<br>[last_update_date]:"+msgObj.last_update_date+'</p><button type="button" id="del_ac'+msgObj.ac_id+'">OK, I know</button><hr /></div>';
                // $('#ac_check_notice').append(tmp_account);
				$('#actrade_mak_noti').append(obj);
			}
			else if(msgObj.msg === 'newAccepted_actrade'){
                console.log("new accepted account_trade from database");
                var obj = '<div id="actranoti_'+msgObj.ac_id+'"><p><span style="color:#FF0;">An account trade has been created:</span><br>'+
                "[account id]:"+msgObj.ac_id+"<br>[lvts]:"+msgObj.lvts+
                "<br>[calypso]:"+msgObj.calypso+"<br>[aladdin]:"+msgObj.aladdin+
                "<br>[trade start date]:"+msgObj.trade_start_date+"<br>[equity]:"+msgObj.equity+
                '<br>[fixed_income]:'+msgObj.fixed_income+'</p><button type="button" id="del_actra'+msgObj.ac_id+'">OK, I know</button><hr /></div>';
                $('#acbench_mak_noti').append(obj);
            }
            else if(msgObj.msg === 'newAccepted_acben') {
                console.log("new accepted account benchmark from database");
                var obj = '<div id="acbennoti_'+msgObj.ac_id+'"><p><span style="color:#FF0;">An account benchmark has been created:</span><br>'+
                    "[account id]:"+msgObj.ac_id+"<br>[benchmark_id]:"+msgObj.benchmark_id+
                    "<br>[source]:"+msgObj.source+"<br>[name]:"+msgObj.name+
                    "<br>[currency]:"+msgObj.currency+"<br>[primary_flag]:"+msgObj.primary_flag+
                    "<br>[start_date]:"+msgObj.start_date+"<br>[end_date]:"+msgObj.end_date+
                    "<br>[benchmark_reference_id]:"+msgObj.benchmark_reference_id+"<br>[benchmark_reference_id_source]:"+msgObj.benchmark_reference_id_source
                    +'</p><button type="button" id="del_acben'+msgObj.ac_id+'">OK, I know</button><hr /></div>';
                $('#bench_mak_noti').append(obj);
			}
            else if(msgObj.msg === 'validity') {
                console.log("account data validity");
                if (msgObj.table_name == 'account') {
                    var account_notice = '<div><hr/><h3>' + "[NOTICE!] Data in Table `account` changed!" + '<br/>' + "[HASH VALUE] " + msgObj.sha_value + '</h3><hr/></div>';
                    $('#ac_data_validity_notice').append(account_notice);
                }
                else if(msgObj.table_name == 'unknown'){
                    var notice = '<div><hr/><h3>' + "[NOTICE!] Data in database changed!" + '</h3><hr/></div>';
                    if(msgObj.show_location == 'account') {
                        $('#ac_data_validity_notice').append(notice);
                    }
				}
            }
            else if(msgObj.msg === 'hash'){
				console.log("------------------------ENTER THE HASH--------------------");
				console.log(msgObj.chain_hash);
                var obj ={
                    type: 'recheck',
                    chain_hash: msgObj.chain_hash ,
					table_name: "account"
                };
                ws.send(JSON.stringify(obj));
			}
			else console.log('rec', msgObj.msg, msgObj);
		}

		catch(e){
			console.log('ERROR', e);
		}
	}

	function onError(evt){
		console.log('ERROR ', evt);
		if(!connected && bag.e == null){											//don't overwrite an error message
		//	$('#errorName').html('Warning');
		//	$('#errorNoticeText').html('Waiting on the node server to open up so we can talk to the blockchain. ');
		//	$('#errorNoticeText').append('This app is likely still starting up. ');
		//	$('#errorNoticeText').append('Check the server logs if this message does not go away in 1 minute. ');
		//	$('#errorNotificationPanel').fadeIn();
		}
	}
}



