$(document).ready(function() {
		
		
});

function pageStart_One()
{
	$(window).resize(function () {
		console.log("resize");
        $("#tableserver").bootstrapTable('resetView');
    });
	faultHistory.createTable();
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
var faultHistory = {
		options:{
			mapObject:null,
			gauge:null,
			search : {
				date_from : "2015-10-02 01:01:00",
				date_to : "2015-11-03 23:01:00"
			},
			object : null,
			elementId:'dynamicPie',
			chartOptions:{
				  tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
				    legend: {
				        orient : 'vertical',
				        x : 'left',
				        data:['一级报警','二级报警','三级报警','四级报警','五级报警']
				    },
				    toolbox: {
				        show : true,
				        feature : {
				            mark : {show: true},
				            dataView : {show: true, readOnly: false},
				            magicType : {
				                show: true, 
				                type: ['pie', 'funnel'],
				                option: {
				                    funnel: {
				                        x: '25%',
				                        width: '50%',
				                        funnelAlign: 'center',
				                        max: 1548
				                    }
				                }
				            },
				            restore : {show: true},
				            saveAsImage : {show: true}
				        }
				    },
				    calculable : true,
				    series : [
				        {
				            name:'五级报警',
				            type:'pie',
				            radius : ['50%', '70%'],
				            itemStyle : {
				                normal : {
				                    label : {
				                        show : false
				                    },
				                    labelLine : {
				                        show : false
				                    }
				                },
				                emphasis : {
				                    label : {
				                        show : true,
				                        position : 'center',
				                        textStyle : {
				                            fontSize : '30',
				                            fontWeight : 'bold'
				                        }
				                    }
				                }
				            },
				            data:[
				                {value:335, name:'一级报警'},
				                {value:310, name:'二级报警'},
				                {value:234, name:'三级报警'},
				                {value:135, name:'四级报警'},
				                {value:1548, name:'五级报警'}
				            ]
				        }
				    ]
				
			}
		},
		createTable : function() {
			var that = this;
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
			
			 that.options.mapObject=new vehicleAddress();
			 that.options.gauge=new dynamicChartData(that.options);
			//查询 
			$("#ok").click(function() {
				var start = $("#datetimeStart").val();
				var end = $("#datetimeEnd").val();
				if (start && end) {
					that.options.search.date_from = start;
					that.options.search.date_to;
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
				viewId : "D7B2B27A01274B06A11B86120F62E097",
				tableId : "#tableserver",
				vin : vin,
				search : that.options.search,
				onDblClickRow : function(item, $element, index) {
					var that = this;
					that.viewOptions.dbClickSelected = index;

					$($element).parent().find(".success").removeClass("success");
					$($element).addClass("success");
					var lat = item.latd;
					var lng = item.lond;
					that.options.mapObject.addMarker({

						lat : lat,
						lng : lng
					});
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