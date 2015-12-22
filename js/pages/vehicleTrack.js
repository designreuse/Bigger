$(function() {



});

function pageStart()
{
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
	$("#search").click(

			function() {

				clear();

				// console.log(vin);
				tarck.initPage({
					viewId : VIEWKEY.vehicleTrack,
					startDateTime : $('#datetimeStart').val(),
					endDateTime : $('#datetimeEnd').val(),
					vin : vin

				});
			});

			tarck.initPage();
}


var tarck = {

	options : {
		viewId : '',
		startDateTime : '',
		endDateTime : '',
		vin : '',
		startPage : 0,
		page_id : 0,
		page_size : 100,
		gauge : null,
		latLng : null,
		dyLine1 : null,
		mapObject : null
	},
	mapArr : {//
		LAT : 'vqu8686',
		LAT : "wk9vmhq",
		datetime : "datime_sys",
		speed : "oj8ipa6",
		engineSpeed : "tl2biqh",
		voltage : 'fhi1uvq',// 电池组总电压
		electricity : "blzh3js"// 电池组总电流
	},
	setMarker : function() {
		var that = this;

		if (that.options.latLng && that.options.latLng.lat != 0
				&& that.options.latLng.lng != 0) {
			// 打点同时划线 设置为true

			that.options.mapObject.addMarker(that.options.latLng, false);
		}

	},
	setMapLine : function() {
		var that = this;
		that.options.mapObject.setLine();
	},
	lngLatArray : [],
	datetimeArray : [],
	temp : [],
	setData : function(data) {
		var that = this;
		// 拼接轨迹数组
		$
				.each(
						data,
						function(i, field) {
							if (i > 0) {

								var lng = field.column[$.inArray(
										that.mapArr.LAT, data[0].column)] * 1;
								var lat = field.column[$.inArray(
										that.mapArr.LAT, data[0].column)] * 1;
								if (lng != 0 && lat != 0) {

									var latlng = [ lng, lat ];
									that.lngLatArray.push(latlng);
								} else {
									if (that.lngLatArray.length > 0) {
										that.lngLatArray
												.push(that.lngLatArray[that.lngLatArray.length - 1]);

									}

								}

								// console.log(that.lngLatArray[0]);
								// console.log(that.lngLatArray);
								// console
								// .log(that.lngLatArray);
								if (that.lngLatArray.length > 0) {

									// var date={};
									/*
									 * for(var f in that.mapArr) {
									 * date[f.alias]=field.column[$.inArray(
									 * f.code, data[0].column)]; }
									 */

									var date = {
										datetime : field.column[$.inArray(
												that.mapArr.datetime,
												data[0].column)],
										speed : field.column[$.inArray(
												that.mapArr.speed,
												data[0].column)],
										engineSpeed : field.column[$.inArray(
												that.mapArr.engineSpeed,
												data[0].column)],
										voltage : field.column[$.inArray(
												that.mapArr.voltage,
												data[0].column)],
										electricity : field.column[$.inArray(
												that.mapArr.electricity,
												data[0].column)]

									};

									that.datetimeArray.push(date);

								}
							}
						});
		console.log(that.datetimeArray.length);
		$("#ex1").slider('setAttribute', 'max', that.datetimeArray.length);
		$("#ex1")
				.slider(
						'setAttribute',
						'formatter',
						function(value) {
							that.currentVel = value;
							if (value >= 0) {
								that.options.latLng = {
									lat : that.lngLatArray[value][1],
									lng : that.lngLatArray[value][0]
								}
								that.setMarker();
								that.options.mapObject.options.markers = that.lngLatArray
										.slice(0, value + 1);
								that.setMapLine();
								// 地图点更新
								// 地图线更新
								// 截取已经播放的数组，用于画线
								// that.setGauge && that.setGauge(value);
								that.setDynamic && that.setDynamic(value);
							}
							// console.log(datetimeArray[currentVel]);
							// console.log(that.datetimeArray[that.currentVel]);
							if (that.datetimeArray.length > 0)
								return that.datetimeArray[that.currentVel].datetime;

						});
		data = null;// 释放内存

		// that.notifications("第一次加载成功",'第一次数据加载成功，你可以查询一部分轨迹了');

		// that.initSlider();

		// 数据应用

		// alert(JSON.stringify(lngLatArray));
		// alert(JSON.stringify(datetimeArray));

	},

	stepSpan : 1,
	initSlider : function() {
		var that = this;
		var slider = $('#ex1')
				.slider(
						{
							min : 0,
							max : that.datetimeArray.length - 1,
							value : 0,
							tooltip : 'always',
							formatter : function(value) {
								that.currentVel = value;
								if (value >= 0) {
									that.options.latLng = {
										lat : that.lngLatArray[value][1],
										lng : that.lngLatArray[value][0]
									}
									that.setMarker();
									that.options.mapObject.options.markers = that.lngLatArray
											.slice(0, value + 1);
									that.setMapLine();
									// 地图点更新
									// 地图线更新
									// 截取已经播放的数组，用于画线
									// that.setGauge && that.setGauge(value);
									that.setDynamic && that.setDynamic(value);
								}
								// console.log(datetimeArray[currentVel]);
								// console.log(that.datetimeArray[that.currentVel]);
								if (that.datetimeArray.length > 0)
									return that.datetimeArray[that.currentVel].datetime;

							}
						});

	},
	setSlider : function() {
		// console.log(datetimeArray.length);
		$("#ex1").slider('setAttribute', 'max', this.datetimeArray.length - 1);
		$("#ex1").slider('setValue', 0);

	},

	setGauge : function(value) {
		/*
		 * var that = this; var option = that.options.gauge.getOption();
		 * option.series[0].data[0].value = that.datetimeArray[value].speed * 1;
		 * option.series[1].data[0].value =
		 * that.datetimeArray[value].engineSpeed * 1;
		 * option.series[2].data[0].value = (Math.random() * 2).toFixed(2) - 0;
		 * option.series[3].data[0].value = (Math.random() * 2).toFixed(2) - 0;
		 * that.options.gauge.setOption(option, true);
		 */

	},

	setDynamic : function(value) {
		var that = this;
		var myDynamicChart = that.options.dyLine1.getMyChart();
		// 动态数据接口 addData
		myDynamicChart.addData([ [ 0, // 系列索引
		// Math.round(Math.random() * 1000), // 新增数据
		that.datetimeArray[value].voltage, true, // 新增数据是否从队列头部插入
		false // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
		], [ 1, // 系列索引
		that.datetimeArray[value].electricity, // 新增数据
		false, // 新增数据是否从队列头部插入
		false, // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
		that.datetimeArray[value].datetime // 坐标轴标签
		] ]);
	},
	timeKey : undefined,
	currentVel : 0,
	ltime : 2000,
	startTimer : function() {

		var that = this;
		var time = that.ltime;
		if (that.timeKey == null) {
			that.timekey = setInterval(function() {
				that.currentVel = that.currentVel
						+ $("#ex1").slider('getAttribute', 'step');
				// console.log(that.currentVel);
				// console.log(that.datetimeArray.length - 1);
				if (that.currentVel >= that.datetimeArray.length - 1) {
					that.endTimer();
					that.currentVel = that.datetimeArray.length - 1;
				} else if (that.currentVel <= 0) {
					that.endTimer();
					that.currentVel = 0;
				}
				// console.log(that.currentVel);
				$("#ex1").slider('setValue', that.currentVel);
			}, 2000);
			$("#startTitle").addClass("fa-pause").removeClass("fa-play");
		}
	},
	endTimer : function() {
		$("#startTitle").removeClass("fa-pause").addClass("fa-play");
		this.timekey && clearInterval(this.timekey);
		this.timekey = null;
	},
	initPage : function(option) {

		var that = this;
		that.options.dyLine1 = new dynamicChartData();
		// that.options.gauge = new gaugePage();
		that.options.mapObject = new vehicleAddress();
		that.getDataField();
		if (option) {
			that.options.viewId = option.viewId;
			that.options.vin = option.vin;
			that.options.startDateTime = option.startDateTime;
			that.options.endDateTime = option.endDateTime;
			$.extend(this.options, option);
			this.initData();
		}
		var slider = $('#ex1').slider({

			tooltip : 'always'
		});
		// this.initMarker();
	},

	notifications : function(title, content) {

		new PNotify({
			title : title,
			text : content,
			type : 'success'
		});
	},
	getDataField : function() {
		var that = this;

		$("#tet").click(function() {
			if (that.stepSpan > 1) {
				that.stepSpan = that.stepSpan / 2;
			}
			$("#ex1").slider('setAttribute', 'step', that.stepSpan);
			$(".badge").text(that.stepSpan);
			// velArray.push({id:11,datetime:'2015-09-12 21:15',lat:'',lng:''});
			// $("#ex1").slider('setAttribute','max',velArray.length-1);
			// $("#ex1").slider('setValue',currentVel);
		});

		$("#jin").click(function() {
			if (that.stepSpan == 0)
				that.stepSpan = 1;
			that.stepSpan = that.stepSpan * 2;
			$("#ex1").slider('setAttribute', 'step', that.stepSpan);
			$(".badge").text(that.stepSpan);
		});
		$("#start").click(function() {
			if ($("#startTitle").hasClass("fa-play")) {

				that.startTimer && that.startTimer();

			} else {
				that.endTimer && that.endTimer();
			}
		});
		new ajaxObject({
			Url : URLDICTIONARY.vehicleList + "/" + that.options.vin,
			fun : function(data) {// 获取车辆数据字典id
				// var fiberId= data.fiber_unid;
				var fiberId = '098E11E36A024692A257DB72306137FF';
				// 根据字典id获取数据定义
				new ajaxObject({
					Url : URLDICTIONARY.fiber + "/" + fiberId,
					fun : function(data) {
						// 获取固定含义的字段
						var column_group = data.column_group;
						that.getfixField(column_group);
						console.log(that.option.alias);

						$.extend(that.mapArr, that.option.alias);
						that.initData(that.option.vin);

					}

				})

			}
		});

	},
	option : {
		alias : {}
	},

	// 获取数据字典定义的fields
	getfixField : function(object) {
		var that = this;
		var columns = object.columns;
		$.each(columns, function(i, field) {
			if (field.alias) {
				var temp = {};
				console.log(field);
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
	initData : function() {
		var that = this;
		if (that.options.startDateTime && that.options.endDateTime) {
			if (!that.option.alias.LAT) {
				that.getDataField();
				return;
			}

			var tempFields = [];
			for ( var f in that.option.alias) {
				tempFields.push(that.option.alias[f]);
			}

			var search = $.extend({}, {
				date_from : that.options.startDateTime,
				date_to : that.options.endDateTime,
				page_id : that.options.page_id,
				page_size : that.options.page_size

			}, {
				field : tempFields.join(',')
			});
			console.log(search);
			new ajaxObject({
				Url : URLDICTIONARY.sensor + "/" + that.options.vin,
				data : search,
				fun : function(data) {
					tarck.notifications("第一次加载成功", '加载成功，'
							+ that.options.page_id);
					if (data) {
						that.setData(data);
						that.options.page_id++;
						that.initData();
					}
					// track.setCurrentData(data[0], data[1]);
				}

			});
		}
		/*
		 * var tempFormatter = new dataModelObject({ viewId :
		 * that.options.viewId, vin : that.options.vin,
		 * 
		 * search : { date_from : that.options.startDateTime, date_to :
		 * that.options.endDateTime, page_id : that.options.startPage, page_size :
		 * 100 }, catche : false, fun : function(data, search) { var that =
		 * this; // console.log(data); // console.log("列定义"); //
		 * console.log(that.viewOptions.fields); var tempArray = [];
		 * $.each(that.viewOptions.fields, function(i, f) { if (f.code) {
		 * tempArray.push('"' + f.code + '":"' + f.field + '"'); }
		 * 
		 * });
		 * 
		 * var tempStr = JSON.parse('{' + tempArray.join(',') + '}'); //
		 * console.log(tempStr); // console.log(that.mapArr);
		 * $.extend(that.mapArr, tempStr); that.setData(data);
		 * offPage=tempFormatter.viewOptions.search.page_id+tempFormatter.viewOptions.search.page_size;
		 * tarck.notifications("第一次加载成功", '加载成功，'+offPage); //that.initData();
		 * offPage=tempFormatter.viewOptions.search.page_id+tempFormatter.viewOptions.search.page_size;
		 * $.extend(tempFormatter.viewOptions.search,{page_id:offPage});
		 * tempFormatter.getViewData(); // console.log("tarckmapARR"); //
		 * console.log(tarck.mapArr); }
		 * 
		 * }); tempFormatter.getViewData();
		 */
		// 动态设置最大点数
		// $("#ex1").slider('setAttribute','max',velArray.length-1);
	}
};

$(function() {



});

function clear() {
	tarck.lngLatArray = [];
	tarck.datetimeArray = [];
	tarck.options = $.extend(tarck.options, {
		viewId : '',
		startDateTime : '',
		endDateTime : '',
		vin : '',
		startPage : 0,
		gauge : null,
		latLng : null,
		dyLine1 : null,
		mapObject : null
	});
}
