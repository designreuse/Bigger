var chargeManagement = {
	option:{
		data:{},
		myPieChart:null,
		mapObject:null
	},
	mapArr : {//
		lng : 'vqu8686',
		lat : "wk9vmhq",
		datetime : "datime_sys",
		speed : "oj8ipa6",
		engineSpeed : "tl2biqh",
		voltage : 'fhi1uvq',// 电池组总电压
		electricity : "blzh3js",// 电池组总电流
		soc : ''
	},

	setData : function(data) {

		var that = this;

		// 拼接轨迹数组
		$.each(data, function(i, field) {
			if (i > 0) {

				// console
				// .log(that.lngLatArray);

				var date = {
					datetime : field.column[$.inArray(that.mapArr.datetime,
							data[0].column)],
					speed : field.column[$.inArray(that.mapArr.speed,
							data[0].column)],
					engineSpeed : field.column[$.inArray(
							that.mapArr.engineSpeed, data[0].column)],
					voltage : field.column[$.inArray(that.mapArr.voltage,
							data[0].column)],
					electricity : field.column[$.inArray(
							that.mapArr.electricity, data[0].column)],
					soc : field.column[$.inArray(that.mapArr.soc,
							data[0].column)]

				};
				that.option.data=date;
				//that.setPie();
				that.setLine();
			}
		});

		data = null;// 释放内存

	},
	
	setPie:function()
	{
		var that=this;
		//console.log("soc");
		//console.log(that.option.data.soc);
		
		 var value=that.option.data.soc*1;
		pieoption.series[0].data[1].value =value;
		pieoption.series[0].data[0].value =100-value ;
		myChart.setOption(pieoption,true);
	},
	setLine:function()
	{
		var that=this;
	    var myDynamicChart=dyLine1.getMyChart();
	
		// 动态数据接口 addData
		myDynamicChart.addData([ [ 0, // 系列索引
		//Math.round(Math.random() * 1000), // 新增数据
		that.option.data.voltage,
		false, // 新增数据是否从队列头部插入
		false // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
		
		], [ 1, // 系列索引
		that.option.data.electricity, // 新增数据
		false, // 新增数据是否从队列头部插入
		false, // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
		that.option.data.datetime // 坐标轴标签
		] ]);
		   var myDynamicChart2=dyLine2.getMyChart();
			// 动态数据接口 addData
			myDynamicChart2.addData([ [ 0, // 系列索引
			//Math.round(Math.random() * 1000), // 新增数据
			that.option.data.voltage,
			false, // 新增数据是否从队列头部插入
			false // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
			
			], [ 1, // 系列索引
			that.option.data.electricity, // 新增数据
			false, // 新增数据是否从队列头部插入
			false, // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
			that.option.data.datetime // 坐标轴标签
			] ]);
		
	},
	getCurrentData : function(vin) {
		var thats = this;
		var tempFormatter = new dataModelObject({
			viewId : '65AC304A02DA42CAB3080057F2CCFA4C',
			vin : vin,
			search : {

			},
			catche : false,
			fun : function(data, search) {
				var that = this;
				//console.log("获取到数据");
				//console.log(data);
				var that = this;
				// console.log(data);
				// console.log("列定义");
				//console.log("fields");
			// console.log(that.viewOptions.fields);
				
				var tempArray=[];
				$.each(that.viewOptions.fields, function(i, f) {
					if (f.code) {
						tempArray.push('"'+f.code + '":"' + f.field+'"');
					}

				});
				var tempStr = '{'+tempArray.join(',')+'}';
				//console.log(tempStr);
				$.extend(thats.mapArr, JSON.parse(tempStr));
				//console.log("arr");
				//console.log( JSON.parse(tempStr));
				//console.log(thats.mapArr);
				thats.setData(data);

			}

		});
		tempFormatter.getViewData();
	}
};

$(function (){
	
	
});

function pageStart()
{
	 dyLine1=new dynamicChartData();
	 dyLine2=new dynamicChartData({elementId:"dynamicmain2"});
	 chargeManagement.option.mapObject=new vehicleAddress();
}
// timeTicket&&clearInterval(timeTicket);
//timeTicket = setInterval(function() {
//	chargeManagement.getCurrentData("B10002");
//}, 2000);

function clearPage() {
	//timeTicket && clearInterval(timeTicket);
}