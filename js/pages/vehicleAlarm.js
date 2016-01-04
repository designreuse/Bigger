$(document).ready(function() {


});
function pageStart()
{
	$(window).resize(function () {
		console.log("resize");
        $("#tableserver").bootstrapTable('resetView');
    });
	vehicleAlarmNum.createTable();

}
function AddObject_tableserver() {
	eModal.iframe({
		url : "vehicle/add",
	}, "新增车辆数据");
}
function UpdateObject_tableserver() {
	eModal.iframe({
		url : "vehicle/update",
	}, "修改车辆数据");
}
function DeleteObject_tableserver() {
	eModal.iframe({
		url : "vehicle/add",
	}, "删除车辆数据");
}
var vehicleAlarmNum = {
		options:{
			mapObject:null
		},
		createTable : function() {
			 var that=this;
			 that.options.mapObject=new vehicleAddress();

			object = new dataModelObject({
				viewId : VIEWKEY.vehicleAlarm,
				tableId : "#tableserver",
				onDblClickRow:function(item,$element,index)
				{
					  var that=this;
					that.viewOptions.dbClickSelected=index;

					$($element).parent().find(".success").removeClass("success");
					$($element).addClass("success");
					//console.log(item);
					var option={ lat:'',
							     lng:''
								};
					if(item.snapshot.entry)
					{
							$.each(item.snapshot.entry,function(i,f){

								if(f.key=="latd")
									{
									  option.lat=f.value;
									}
								if(f.key=="lond")
									{
									  option.lng=f.value;
									}

							});

							vehicleAlarmNum.options.mapObject.addMarker(option);

            }

					$("#alertMessage").children().each(function(f){
			    		$(this).remove();
			    	});
					var tempFormatter = new dataModelObject({
						viewId :VIEWKEY.alarmNum ,
						vin : item.vin,
						search :{
							page_id : 0,
							page_size : 100,
							event_type:'alert'
							},
						catche : false,
						fun : function(data, search) {
							 var that=this;
							//console.log(data);
							//console.log(f);

						    $.each(data,function(i,f){

						    	$("#alertMessage").append(
						    	['<a href="javascript:void(0);"  onClick="vehicleAlarmNum.addMarker();return false;" lat= "',f.latd,'" lng ="',f.lond,'" class="list-group-item"> <i',
								' class="fa fa-warning fa-fw"></i> ',
								 f.summary,
								' <span',
								' class="pull-right text-muted small"><em>',
								 f.datime_begin,
								' </em> </span>',
					        	'</a> '].join("")
					        	);
						    });

						}

					});
					tempFormatter.getViewData();
				},
				message:function (title,time)
				{

				},
				rowStyle:function (row ,index)
				{
					var that=this;
					if(index==that.viewOptions.dbClickSelected)
					{
					return {

						classes:"success"
					};

					}
					return {};
				}

			});
			dataModelObject.staticObject=object;
			if($(object.viewOptions.tableId).bootstrapTable())
				{
			      $(object.viewOptions.tableId).bootstrapTable("destroy");
				}
			object.setViewTable();
		},
		idFormatter:function (value, row, index) {
			return [
					'<a class="like" href="javascript:void(0)" title="Like">',
					'<i class="glyphicon glyphicon-heart"></i>'+value,
					'</a>'
					 ].join('');
		},
	    idEvents :{
				'click .like' : function(e, value, row, index) {
					eModal.iframe({
						url : "vehicle/track",
					}, "单车-轨迹");
				}
		},
		alarmNum:function(value ,row ,index)
		{
			var num="-";

			$.each(value.entry,function (i,f){

				 if(f.key=="alter_count"){
					 num= f.value+"";
					return num;
			      }
			});

			return num;
		},
		addMarker:function()
		{
			var that=this;
			var option={ lat:'',
				     lng:''
					};
			option. lat=$(this).attr("lat");
			option. lng=$(this).attr("lng");
			that.options.mapObject.addMarker(option);
			return false;
		}


	};
