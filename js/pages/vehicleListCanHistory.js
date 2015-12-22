$(document).ready(function() {
	

});

function pageStart()
{
	
	$("#panelTitle").text("车辆列表");
	$(window).resize(function() {
		console.log("resize");
		$("#tableserver").bootstrapTable('resetView');
	});
	vehicleListDemo.createTable();
	$('#datetimeStart').datetimepicker({
		language : 'zh-CN',
		format : 'yyyy-mm-dd hh:ii',
		weekStart : 1,
		todayBtn : 1,
		autoclose : 1,
		todayHighlight : 1,
		startView : 2,
		forceParse : 1,
		showMeridian : 1
	});
	$('#datetimeEnd').datetimepicker({
		language : 'zh-CN',
		format : 'yyyy-mm-dd hh:ii',
		weekStart : 1,
		todayBtn : 1,
		autoclose : 1,
		todayHighlight : 1,
		startView : 2,
		forceParse : 1,
		showMeridian : 1
	});
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
var vehicleListDemo = {
	options : {
		search : {
			date_from : "2015-10-02 01:01:00",
			date_to : "2015-11-03 23:01:00",
			page_id : 0,
			page_size : 10
		},
		object : null
	},
	createTable : function() {
		var that = this;
		
		//查询 
		$("#ok").click(function() {
			var start = $("#datetimeStart").val();
			var end = $("#datetimeEnd").val();
			if (start && end) {
				that.options.search.date_from = start;
				that.options.search.date_to=end;
			    that.options.object.viewOptions.search=that.options.search;
			    $("#tableserver").bootstrapTable('refresh');
			}else
			{
				

				new PNotify({
					title: "查询失败",
					text: "开始时间和结束时间不能为空！",
					type: 'info'
				});
			}

		});
		that.options.object = new dataModelObject({
			viewId : VIEWKEY.single_CanHistory,
			tableId : "#tableserver",
			vin : vin,
			onLoadBefore:function(data)
			{
				console.log("before");
				console.log(data);
			var 	tempData=[];
				for(var i=1;i<data.length;i++) {
					
						       var temp =[];
								var tempd=data[i].column;
								$.each(data[0].column,function(j,field){
									temp.push('\"'+field+'\"'+':'+'\"'+tempd[j]+'\"');
									
								});
								
							tempData.push(JSON.parse('{'+temp.join(',')+"}"));	
						
				}
				console.log(tempData);
				return tempData;
			},
			search : that.options.search,
			onDblClickRow : function(item, $element, index) {
				
				// console.log("双击事件");
				// console.log(item);
			}
		});
		dataModelObject.staticObject = that.options.object;
		if ($( that.options.object.viewOptions.tableId).bootstrapTable()) {
			$(that.options.object.viewOptions.tableId).bootstrapTable("destroy");
		}
		that.options.object.setViewTable();
	},
	idFormatter : function(value, row, index) {
		return [ '<a class="like" href="javascript:void(0)" title="Like">',
				'<i class="glyphicon glyphicon-heart"></i>' + value, '</a>' ]
				.join('');
	},
	idEvents : {
		'click .like' : function(e, value, row, index) {
			eModal.iframe({
				url : "vehicle/vehicleInfo?vin=" + value,
			}, "单车-轨迹");
		}
	}

};