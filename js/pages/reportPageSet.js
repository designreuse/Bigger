//TODO  报表设置


function reportPageSet(options) {
    var defaultOptions = {
        xObject: {
            reportType: 'pinciTime',//TODO pinciValue 频次图参数配置
            data: [{
                start: 0,
                end: 10
            }, {
                start: 11,
                end: 20
            }],
            xTimeKey: 'datime_sys',// 表示用那个时间基准值
            xTimeType: 'hour',
            dataKey: '' //TODO 时序图分析参数配置
        },
        yObject: {
            dataKey: ['speed']
        },
        vehicles: ['B10002'],
        date_from: '2015-11-16 03:00:00',
        date_to: '2015-11-17 11:41:00',
        dataFunction: function (data) {// 初始化前格式化数据
            return data;
        },
        analysisDataEnd: function (map, search) {
            // 分析完成
            console.log(map);
            console.log(search);
        }

    };
    this.reportOptions = $.extend(true,defaultOptions, options);
}
reportPageSet.extend({
		    options: {
		        data: null,// 原始数据,临时存储
		        map: {},
		        mapPageOptions: {},// 存储查询参数
		        fieldCount: {}
		    },
		    initPage: function () {
		        var that = this;
		        that.getDataFields();
		    },
		    getDataFields: function () {//TODO  获取数据字典的列定义（有别名的）
		        var that = this;
		        var fiberObject = new fiberDataField({
		            fiberId: '098E11E36A024692A257DB72306137FF',
		            type: 2,
		            fun: function (data) {
		                console.log("测试1");
		                console.log(data);
		                that.createReportHtml(data);
		            },
		            funGroup: function (data)
		            {
		                console.log("数据");
		                console.log(data);
		            }
		        });
		    },
		    createReportHtml: function (fields) {
		        var that = this;
		        $.each(fields, function (i, field) {
		            $("#popular #popularY")
                            .append(
                                    [
                                            '<div class="radio-custom radio-primary">',
                                            '<input id="'
                                                    + field.alias
                                                    + '" name="popular" type="radio"',
                                            '	value="awesome" required /> <label for="awesome">'
                                                    + field.title
                                                    + '</label>',
                                            '</div>']
                                            .join(" "));
		            $("#recent>#recentY")
                            .append(
                                    [
                                            '<div class="radio-custom radio-primary">',
                                            '<input id="'
                                                    + field.alias
                                                    + '" name="recentY" type="radio"',
                                            '	value="awesome" required /> <label for="awesome">'
                                                    + field.title
                                                    + '</label>',
                                            '</div>']
                                            .join(" "));
		            $("#recent>#recentX")
                            .append(
                                    [
                                            '<div class="radio-custom radio-primary">',
                                            '<input id="'
                                                    + field.alias
                                                    + '" name="recentX" type="radio"',
                                            '	value="awesome" required /> <label for="awesome">'
                                                    + field.title
                                                    + '</label>',
                                            '</div>']
                                            .join(" "));
		            $("#recent1>#recent1Y")
                            .append(
                                    [
                                            '<div class="radio-custom radio-primary">',
                                            '<input id="'
                                                    + field.alias
                                                    + '" name="recent1Y" type="radio"',
                                            '	value="awesome" required /> <label for="awesome">'
                                                    + field.title
                                                    + '</label>',
                                            '</div>']
                                            .join(" "));
		            $("#recent1>#recent1X")
                            .append(
                                    [
                                            '<div class="radio-custom radio-primary">',
                                            '<input id="'
                                                    + field.alias
                                                    + '" name="recent1X" type="radio"',
                                            '	value="awesome" required /> <label for="awesome">'
                                                    + field.title
                                                    + '</label>',
                                            '</div>']
                                            .join(" "));
		            $("#popular1 #popularY")
                            .append(
                                    [
                                            '<div class="radio-custom radio-primary">',
                                            '<input id="'
                                                    + field.alias
                                                    + '" name="popularY" type="radio"',
                                            '	value="awesome" required /> <label for="awesome">'
                                                    + field.title
                                                    + '</label>',
                                            '</div>']
                                            .join(" "));

		        });
		        // });

		    },
		    initData: function () {
		        var that = this;
		        that.options.fieldCount = {};
		        that.options.mapPageOptions = {};
		        var vins = that.reportOptions.vehicles;
		        for (var i = 0; i < vins.length; i++) {
		            var vin = vins[i];
		            var options = {
		                viewId: VIEWKEY.pinci,
		                vin: vin,
		                fun: function (data, search, vin) {
		                    console.log("原始数据");
		                    console.log(data);
		                    if (data) {
		                        var data = that.reportOptions.dataFunction
										.call(that, data);
		                        that.analysisData(vin, data, search);

		                        var tempOptions = that.options.mapPageOptions[vin];
		                        tempOptions.search.page_id = tempOptions.search.page_id
										+ tempOptions.search.page_size;
		                        that.options.mapPageOptions[vin] = $.extend({},
										tempOptions);
		                        that.getData(tempOptions);
		                    }
		                },
		                search: {// 定义页面 大小和页面索引
		                    page_id: 0,
		                    page_size: 100,
		                    date_from: that.reportOptions.date_from,
		                    date_to: that.reportOptions.date_to
		                }
		            }
		            that.options.mapPageOptions[vin] = $.extend({}, options);
		            that.getData(options);
		        }

		    },
		    getData: function (options) {
		        var that = this;
		        // var options=$.extend(options,{viewId : VIEWKEY.pinci});
		        var dm = new dataModelObject(options);

		        dm.getViewData();
		    },

		    analysisData: function (vin, data, search) {

		        var that = this;
		        if (that.reportOptions.xObject.reportType == 'pinciValue') {
		            that.pinciValueHandle(vin, data, search);
		        } else if (that.reportOptions.xObject.reportType == 'pinciTime') {
		            that.pinciTimeHandle(vin, data, search);
		        } else if (that.reportOptions.xObject.reportType == 'recent') {
		            that.shixuHandle(vin, data, search);
		        } else if (that.reportOptions.xObject.reportType == 'recent1') {
		            that.sandianHandle(vin, data, search);
		        } else if (that.reportOptions.xObject.reportType == 'pinciValue1') {
		            that.leijiValueHandle(vin, data, search);
		        } else if (that.reportOptions.xObject.reportType == 'pinciTime1') {
		            that.leijiTimeHandle(vin, data, search);
		        }
		    },
		    shixuHandle: function (vin, data, search) {

		        var that = this;
		        var tempObject = that.options.map[vin];
		        var xArray = [];
		        var yArray = [];
		        if (tempObject) {
		            xArray = tempObject.xArray;
		            yarray = tempObject.yArray;
		        }
		        var indexX = $.inArray(that.reportOptions.xObject.dataKey[0],
						data[0].column);
		        var indexY = $.inArray(that.reportOptions.yObject.dataKey[0],
						data[0].column);
		        $.each(data,// 遍历数据
				function (j, fieldData) {
				    if (j > 0) {
				        xArray.push(fieldData.column[indexX]);
				        yArray.push(fieldData.column[indexY]);

				    }
				});
		        that.options.map[vin] = {
		            xArray: xArray,
		            yArray: yArray
		        };
		        that.reportOptions.analysisDataEnd.call(that, that.options.map,
						search);

		    },
		    sandianHandle: function (vin, data, search) {
		        var that = this;
		        var tempObject = that.options.map[vin];
		        var xArray = [];
		        var yArray = [];
		        if (tempObject) {
		            xArray = tempObject.xArray;
		            yarray = tempObject.yArray;
		        }
		        var indexX = $.inArray(that.xObject.dataKey[0], data[0].column);
		        var indexY = $.inArray(that.yObject.dataKey[0], data[0].column);
		        $.each(data,// 遍历数据
				function (j, fieldData) {
				    if (j > 0) {
				        xArray.push(fieldData.column[indexX]);
				        yArray.push(fieldData.column[indexY]);

				    }
				});
		        that.options.map[vin] = {
		            xArray: xArray,
		            yArray: yArray
		        };
		        that.reportOptions.analysisDataEnd.call(that, that.options.map,
						search);
		    },
		    leijiValueHandle: function (vin, data, search) {
		        var that = this;
		        var tempObject = that.options.map[vin];
		        var xArray = [];
		        var yArray = [];
		        if (tempObject) {
		            // xArray = tempObject.xArray;
		            yarray = tempObject.yArray;
		        }
		        $.each(that.reportOptions.xObject.data, // 根据x轴分析数据，便利x轴数据
				function (i, field) {
				    xArray.push(field.start + "-" + field.end);
				});
		        $.each(data,// 遍历数据
								function (j, fieldData) {
								    if (j > 0) {
								        $.each(
														that.reportOptions.yObject.dataKey,// 遍历y轴数据，找到数据在第几行
														function (y, fieldKey) {
														    var index = $
																	.inArray(
																			fieldKey,
																			data[0].column);// 数据中包含y轴key
														    if (index > 0) {// 判断是否包含在指定的数组中

														        $
																		.each(
																				that.reportOptions.xObject.data, // 根据x轴分析数据，便利x轴数据
																				function (
																						i,
																						field) {

																				    var temp1 = fieldData.column[index];
																				    if (temp1 == "") {
																				        temp1 = "0";
																				    }

																				    var key = fieldKey;
																				    if (key in that.options.fieldCount) {
																				        // that.options.fieldCount[key]=
																				        // that.options.fieldCount[key]+1;
																				        if (that.options.fieldCount[key].length - 1 < i) {
																				            that.options.fieldCount[key]
																									.push(0);
																				        }
																				    } else {

																				        that.options.fieldCount[key] = [0];
																				    }
																				    if (temp1 * 1 >= field.start * 1
																							&& temp1 * 1 <= field.end * 1) {
																				        that.options.fieldCount[key][i] = that.options.fieldCount[key][i] + 1;

																				    }
																				});
														    }
														});

								    }
								});

		        that.options.map[vin] = {
		            xArray: xArray,
		            yArray: that.options.fieldCount
		        };
		        that.reportOptions.analysisDataEnd.call(that, that.options.map,
						search);
		    },
		    leijiTimeHandle: function (vin, data, search) {
		        var that = this;
		        var tempObject = that.options.map[vin];
		        var xArray = [];
		        var yArray = [];
		        if (tempObject) {
		            // xArray = tempObject.xArray;
		            yarray = tempObject.yArray;
		        }
		        // 获取基准时间在数组中的位置
		        var timeIndex = $.inArray(that.reportOptions.xObject.xTimeKey,
						data[0].column);
		        var type = that.reportOptions.xObject.xTimeType;

		        for (var i = 0; i <= that.reportOptions.xObject.data.length - 1; i++) {
		            if (!that.options.fieldCount["key"]) {
		                that.options.fieldCount["key"] = [];
		            }
		            if (that.options.fieldCount["key"].length - 1 <= i) {
		                that.options.fieldCount["key"].push(0);
		            }
		        }

		        $
						.each(
								data,// 遍历数据
								function (j, fieldData) {
								    /*
									 * $.each(that.reportOptions.yObject.dataKey,//遍历y轴数据，找到数据在第几行
									 * function(y,fieldKey) { var index =
									 * $.inArray(fieldKey,data[0].column);//数据中包含y轴key
									 * if (index > 0) {// 判断是否包含在指定的数组中
									 *  } });
									 */
								    if (j > 0) {
								        $
												.each(
														that.reportOptions.xObject.data, // 根据x轴分析数据，便利x轴数据
														function (i, field) {

														    var temp1 = fieldData.column[timeIndex];
														    var date = strToDate(temp1
																	.replace(
																			/-/g,
																			"/"));
														    var hour = date
																	.getHours();// 0-23点
														    var week = date
																	.getDay();// 0-6
														    var month = date
																	.getMonth() + 1;// 1-12月
														    var week1 = getWeekNumber(
																	date
																			.getYear(),
																	month,
																	date
																			.getDate());

														    if (type == "hour") {
														        if (i + 1 == hour) {
														            that.options.fieldCount["key"][i] = that.options.fieldCount["key"][i] + 1;
														        }
														    } else if (type == "week") {

														        if (i + 1 == week) {
														            that.options.fieldCount["key"][i] = that.options.fieldCount["key"][i] + 1;
														        }
														    } else if (type == "month") {
														        if (i + 1 == month) {
														            that.options.fieldCount["key"][i] = that.options.fieldCount["key"][i] + 1;

														        }

														    } else if (type == "week1") {
														        if (i + 1 == week1) {
														            that.options.fieldCount["key"][i] = that.options.fieldCount["key"][i] + 1;

														        }
														    }
														});
								    }
								});

		        that.options.map[vin] = {
		            xArray: that.reportOptions.xObject.data,
		            yArray: that.options.fieldCount
		        };
		        that.reportOptions.analysisDataEnd.call(that, that.options.map,
						search);
		    },
		    pinciTimeHandle: function (vin, data, search) {
		        var that = this;
		        var tempObject = that.options.map[vin];
		        var xArray = [];
		        var yArray = [];
		        if (tempObject) {
		            // xArray = tempObject.xArray;
		            yarray = tempObject.yArray;
		        }
		        // 获取基准时间在数组中的位置
		        var timeIndex = $.inArray(that.reportOptions.xObject.xTimeKey,
						data[0].column);
		        var type = that.reportOptions.xObject.xTimeType;

		        for (var i = 0; i <= that.reportOptions.xObject.data.length - 1; i++) {
		            if (!that.options.fieldCount["key"]) {
		                that.options.fieldCount["key"] = [];
		            }
		            if (that.options.fieldCount["key"].length - 1 <= i) {
		                that.options.fieldCount["key"].push(0);
		            }
		        }

		        $
						.each(
								data,// 遍历数据
								function (j, fieldData) {
								    /*
									 * $.each(that.reportOptions.yObject.dataKey,//遍历y轴数据，找到数据在第几行
									 * function(y,fieldKey) { var index =
									 * $.inArray(fieldKey,data[0].column);//数据中包含y轴key
									 * if (index > 0) {// 判断是否包含在指定的数组中
									 *  } });
									 */
								    if (j > 0) {
								        $
												.each(
														that.reportOptions.xObject.data, // 根据x轴分析数据，便利x轴数据
														function (i, field) {

														    var temp1 = fieldData.column[timeIndex];
														    var date = strToDate(temp1
																	.replace(
																			/-/g,
																			"/"));
														    var hour = date
																	.getHours();// 0-23点
														    var week = date
																	.getDay();// 0-6
														    var month = date
																	.getMonth() + 1;// 1-12月
														    var week1 = getWeekNumber(
																	date
																			.getYear(),
																	month,
																	date
																			.getDate());

														    if (type == "hour") {
														        if (i + 1 == hour) {
														            that.options.fieldCount["key"][i] = that.options.fieldCount["key"][i] + 1;
														        }
														    } else if (type == "week") {

														        if (i + 1 == week) {
														            that.options.fieldCount["key"][i] = that.options.fieldCount["key"][i] + 1;
														        }
														    } else if (type == "month") {
														        if (i + 1 == month) {
														            that.options.fieldCount["key"][i] = that.options.fieldCount["key"][i] + 1;

														        }

														    } else if (type == "week1") {
														        if (i + 1 == week1) {
														            that.options.fieldCount["key"][i] = that.options.fieldCount["key"][i] + 1;

														        }
														    }
														});
								    }
								});

		        that.options.map[vin] = {
		            xArray: that.reportOptions.xObject.data,
		            yArray: that.options.fieldCount
		        };
		        that.reportOptions.analysisDataEnd.call(that, that.options.map,
						search);
		    },
		    pinciValueHandle: function (vin, data, search) {
		        var that = this;
		        var tempObject = that.options.map[vin];
		        var xArray = [];
		        var yArray = [];
		        if (tempObject) {
		            // xArray = tempObject.xArray;
		            yarray = tempObject.yArray;
		        }
		        $.each(that.reportOptions.xObject.data, // 根据x轴分析数据，便利x轴数据
				function (i, field) {
				    xArray.push(field.start + "-" + field.end);
				});
		        $
						.each(
								data,// 遍历数据
								function (j, fieldData) {
								    if (j > 0) {
								        $
												.each(
														that.reportOptions.yObject.dataKey,// 遍历y轴数据，找到数据在第几行
														function (y, fieldKey) {
														    var index = $
																	.inArray(
																			fieldKey,
																			data[0].column);// 数据中包含y轴key
														    if (index > 0) {// 判断是否包含在指定的数组中

														        $
																		.each(
																				that.reportOptions.xObject.data, // 根据x轴分析数据，便利x轴数据
																				function (
																						i,
																						field) {

																				    var temp1 = fieldData.column[index];
																				    if (temp1 == "") {
																				        temp1 = "0";
																				    }

																				    var key = fieldKey;
																				    if (key in that.options.fieldCount) {
																				        // that.options.fieldCount[key]=
																				        // that.options.fieldCount[key]+1;
																				        if (that.options.fieldCount[key].length - 1 < i) {
																				            that.options.fieldCount[key]
																									.push(0);
																				        }
																				    } else {

																				        that.options.fieldCount[key] = [0];
																				    }
																				    if (temp1 * 1 >= field.start * 1
																							&& temp1 * 1 <= field.end * 1) {
																				        that.options.fieldCount[key][i] = that.options.fieldCount[key][i] + 1;

																				    }
																				});
														    }
														});

								    }
								});

		        that.options.map[vin] = {
		            xArray: xArray,
		            yArray: that.options.fieldCount
		        };
		        that.reportOptions.analysisDataEnd.call(that, that.options.map,
						search);
		    }
		});


$(function () {
    var report = new reportPageSet()
    report.initPage();
     //report.initData();
})