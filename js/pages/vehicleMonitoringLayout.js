
function pageStart() {
	vehicleMonitoring.initPage();
}
var vehicleMonitoring = {
	option : {
		data : {},
		myPieChart : null,
		timeTicket : null,
		latLng : null,
		dyLine1 : null,
		gauge : null,
		mapObject : null,

		alias : {},
		fields:[],
		vin : vin,
		fieldsUrl : URLDICTIONARY.fiber
	},
	initPage : function() {
		var that = this;
	that.option.dyLine1 = new dynamicChartData();
		that.option.mapObject = new vehicleAddress();
	that.getDataField();

	vehicleMonitoring.getCurrentData(that.option.vin);
	that.option.timeTicket = setInterval(function() {
		vehicleMonitoring.getCurrentData(that.option.vin);
	}, 2000);
	},
	setMarker : function() {
		var that = this;
		if (that.option.latLng) {
			// 打点同时划线 设置为true
			that.option.mapObject.addMarker(that.option.latLng, true);
		}
	}
	,
	setGauge : function() {
		var that = this;

		/*
		 * var option=that.option.gauge.getOption(); if( that.option.data.speed ) {
		 * option.series[0].data[0].value = that.option.data.speed * 1; } if(
		 * that.option.data.engineSpeed ) { option.series[1].data[0].value =
		 * that.option.data.engineSpeed * 1; } option.series[2].data[0].value =
		 * (Math.random() * 2).toFixed(2) - 0; option.series[3].data[0].value =
		 * (Math.random() * 2).toFixed(2) - 0;
		 * that.option.gauge.setOption(option, true);
		 */

	},

	mapArr : {//
		LON : 'vqu8686',
		LAT : "wk9vmhq",
		datetime : "datime_sys",
		SPEED : "oj8ipa6",
		engineSpeed : "tl2biqh",
		voltage : 'fhi1uvq',// 电池组总电压
		electricity : "blzh3js",// 电池组总电流
		SOC : 'SOC'
	},
	setData : function(data) {
		var that = this;
		// 拼接轨迹数组
		$.each(data, function(i, field) {
			if (i > 0) {

				var lng = field.column[$.inArray(that.mapArr.LON,
						data[0].column)] * 1;
				var lat = field.column[$.inArray(that.mapArr.LAT,
						data[0].column)] * 1;
				if (lng && lng != 0 && lat && lat != 0) {
					that.option.latLng = {
						lat : lat,
						lng : lng
					};
					that.setMarker();
				}

				var date = {
					datetime : field.column[$.inArray(that.mapArr.datetime,
							data[0].column)],
					speed : field.column[$.inArray(that.mapArr.SPEED,
							data[0].column)],
					engineSpeed : field.column[$.inArray(
							that.mapArr.engineSpeed, data[0].column)],
					voltage : field.column[$.inArray(that.mapArr.voltage,
							data[0].column)],
					electricity : field.column[$.inArray(
							that.mapArr.electricity, data[0].column)],
					soc : field.column[$.inArray(that.mapArr.SOC,
							data[0].column)]

				};
				that.option.data = date;
				// that.setPie();
				that.setLine();
				// that.setGauge();
			}
		});
		data = null;// 释放内存
	},
	setPie : function() {
		// var that=this;
		// console.log("soc");
		// console.log(that.option.data.soc);

		// var value=that.option.data.soc*1;
		// pieoption.series[0].data[1].value =value;
		// pieoption.series[0].data[0].value =100-value ;
		// myChart.setOption(pieoption,true);
	},
	setLine : function() {
		var that = this;
		var myDynamicChart = that.option.dyLine1.getMyChart();
		// 动态数据接口 addData
		myDynamicChart.addData([ [ 0, // 系列索引
		// Math.round(Math.random() * 1000), // 新增数据
		that.option.data.voltage, false, // 新增数据是否从队列头部插入
		false // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
		], [ 1, // 系列索引
		that.option.data.electricity, // 新增数据
		false, // 新增数据是否从队列头部插入
		false, // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
		that.option.data.datetime // 坐标轴标签
		] ]);

	},
	// 获取数据字典定义的fields
	getfixField : function(object) {
		var that = this;
		var columns = object.columns;
		$.each(columns, function(i, field) {
		    that.option.fields.push(field.code);
			if (field.alias) {
				var temp = {};
				//console.log(field);
				temp[field.alias] = field.code;
				$.extend(that.option.alias, temp);
			}
		});
		var group = object.groups;
		$.each(group, function(i, field) {
			if (field.columns.length > 0 || field.groups.length > 0) {
				that.getfixField(field);
			}
		});

	},
	getDataField : function() {
		var that = this;
		new ajaxObject({
			Url : URLDICTIONARY.vehicleList + "/" + that.option.vin,
			fun : function(data) {// 获取车辆数据字典id
			    var fiberId= data.fiber_unid;
				//var fiberId = '098E11E36A024692A257DB72306137FF';
				// 根据字典id获取数据定义
				new ajaxObject({
					Url : that.option.fieldsUrl + "/" + fiberId,
					fun : function(data) {
						// 获取固定含义的字段
						var column_group = data.column_group;
						that.option.fields=[];
						that.getfixField(column_group);
						//console.log(that.option.alias);

						$.extend(that.mapArr, that.option.alias);
						that.getCurrentData(that.option.vin);

					}

				})

			}
		});

	},
	getCurrentData : function(vin) {
		var that = this;
		if ( that.option.fields.length==0) {
			//that.getDataField();
			return;
		}
		var tempFields = that.option.fields;
		//for ( var f in that.option.alias) {
		//	tempFields.push(that.option.alias[f]);
		//}
		new ajaxObject({
			Url : URLDICTIONARY.sensor + "/" + that.option.vin,
			data : {
				field : tempFields.join(',')
			},
			fun : function(data) {
				that.setData(data);
				//console.log(data);
				that.setCurrentData(data[0].column, data[1].column);
			}

		});
	},
	setCurrentData : function(fields, values) {

		var that = this;
		$.each(fields, function(i, f) {
			$("#dynamicData label[name='" + f + "']").html(values[i]);
		});
	}

}

function clearPage() {
	vehicleMonitoring.option.timeTicket
			&& clearInterval(vehicleMonitoring.option.timeTicket);
}
