$(function () {

})

function pageStart_Two() {
    var reportSets = new reportSet();

    $('#saveView').confirmation({
        title: '你确定新增一个报表模板吗?',
        btnOkClass: 'btn btn-sm btn-danger',
        btnOkLabel: '新增',
        btnOkIcon: 'glyphicon glyphicon-ok',
        btnCancelClass: 'btn btn-sm btn-default',
        btnCancelLabel: '取消',
        btnCancelIcon: 'glyphicon glyphicon-remove',
        onConfirm: function () {
            reportSets.saveOptions();
            return false;
        },
        onCancel: function () {

            return false;
        }
    });
    $('#updateView').confirmation({
        title: '你确定更新报表模板吗?',
        btnOkClass: 'btn btn-sm btn-danger',
        btnOkLabel: '更新视图',
        btnOkIcon: 'glyphicon glyphicon-ok',
        btnCancelClass: 'btn btn-sm btn-default',
        btnCancelLabel: '取消',
        btnCancelIcon: 'glyphicon glyphicon-remove',
        onConfirm: function () {
            reportSets.updateOPtion();
            return false;
        },
        onCancel: function () {

            return false;
        }
    });
    $('#deleteView').confirmation({
        title: '你确认删除当前报表模板吗?',
        btnOkClass: 'btn btn-sm btn-danger',
        btnOkLabel: '删除报表模板',
        btnOkIcon: 'glyphicon glyphicon-ok',
        btnCancelClass: 'btn btn-sm btn-default',
        btnCancelLabel: '取消',
        btnCancelIcon: 'glyphicon glyphicon-remove',
        onConfirm: function () {
            reportSets.deleteOptions();
            return false;
        },
        onCancel: function () {

            return false;
        }
    });
    $('#createView').confirmation({
        title: '你 确定要根据报表模板预览报表吗?',
        btnOkClass: 'btn btn-sm btn-danger',
        btnOkLabel: '确定预览报表',
        btnOkIcon: 'glyphicon glyphicon-ok',
        btnCancelClass: 'btn btn-sm btn-default',
        btnCancelLabel: '取消',
        btnCancelIcon: 'glyphicon glyphicon-remove',
        onConfirm: function () {

            reportSets.getChartSet();

            reportSets.setPinciData();
            return false;
        },
        onCancel: function () {

            return false;
        }
    });
}
function reportSet(options) {
    var defaultOptions = {
        xData: [],
        yData: [],
        pinci: {
            min: 0,
            max: 120,
            split: 10,
        },
        pinciTime: {
            value: ''//
        },
        XKey: [],
        YKey: [],
        chartType: '',
        elementId: 'dynamicmain',
        myChart: null,
        vehicles: ['B10002'],
        date_from: '2015-11-16 03:00:00',
        date_to: '2015-11-17 11:41:00',
        chartOptions: {
            

        }
    };
    this.options = $.extend(defaultOptions, options || {});
    this.initPage();

}

reportSet.extend({
    initPage: function () {
        var that = this;

        // 使用
        require(
            [
                'echarts',
                'echarts/chart/line',
                'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                that.options.myChart = ec.init(document.getElementById(that.options.elementId));
                that.setOptions();
            }
        );
    },
    setOptions: function () {
        var that = this;
        that.options.myChart.setOption(that.options.chartOptions);
    },
    getMyChart: function () {
        var that = this;
        return that.options.myChart;

    },
    getChartSet: function () {
        var that = this;
        that.options.YKey = [];
        var id = $("#chartType >ul>.active>a").attr("href");
        console.log(id);
        if (id == "#popular") {
            that.options.YKey.push($(id + ' #popularY input:checked').attr("id"));
            var xtype = $(id + " ul>.active>a").attr("href");
            // console.log(xtype);
            if (xtype == "#popular11") {
                that.options.chartType = 'pinciValue';
                that.options.pinci.min = $(id).find("[name='min']").val();
                that.options.pinci.max = $(id).find("[name='max']").val();
                that.options.pinci.split = $(id).find("[name='split']").val();
            } else {
                that.options.chartType = 'pinciTime';
                that.options.pinciTime.value = $(xtype + ' input[name="pinci_time"]:checked').val();
            }
        } else if (id == "#recent") {
            that.options.chartType = 'recent';
            // 获取y轴数据关键字
            that.options.YKey.push($(id + ' #recentY input:checked').attr("id"));
            that.options.XKey.push('datime_sys');

        } else if (id == "recent1") {
            that.options.chartType = 'recent1';
            // 获取y轴数据关键字
            that.options.YKey.push($(id + ' #recentY input:checked').attr("id"));
            that.options.XKey.push('datime_sys');

        } else if (id == "#popular1") {
            that.options.YKey.push($(id + ' #popularY input:checked').attr("id"));
            var xtype = $(id + " ul>.active>a").attr("href");
            console.log(xtype);
            if (xtype == "#popular21") {
                that.options.chartType = 'pinciValue1';
                that.options.pinci.min = $(id).find("[name='min']").val();
                that.options.pinci.max = $(id).find("[name='max']").val();
                that.options.pinci.split = $(id).find("[name='split']").val();
            } else {
                that.options.chartType = 'pinciTime1';
                that.options.pinciTime.value = $(xtype + ' input[name="pinci_time"]:checked').val();
            }
        }
    },
    getData: function () {
        var that = this;
        that.getChartSet();
        var data = [];
        that.options.xData = [];
        that.options.yData = [];
        if (that.options.chartType == "pinciValue"
				|| that.options.chartType == "pinciValue1") {
            var min = that.options.pinci.min * 1;
            var max = that.options.pinci.max * 1;
            var split = that.options.pinci.split * 1;
            for (var i = min; i < max; i = i + split) {
                var tempInt = i + split;
                if (tempInt > max) {
                    tempInt = max;
                    console.log(tempInt);
                }
                data.push({
                    start: i,
                    end: tempInt
                });

            }
            that.options.xData = data;
            // that.setOptions();

        } else if (that.options.chartType == "pinciTime"
				|| that.options.chartType == "pinciTime1") {

            console.log(that.options.pinciTime.value);
            switch (that.options.pinciTime.value) {

                case 'hour': {
                    for (var i = 1; i < 24; i++) {
                        that.options.xData.push(i);
                    }
                    break;

                }
                case 'week': {
                    that.options.xData = ['0', '1', '2', '3', '4', '5', '6', ]
                    break;
                }
                case 'week1': {
                    for (var i = 1; i < 54; i++) {
                        that.options.xData.push(i);
                    }

                    break;
                }
                case 'month': {
                    for (var i = 1; i <= 12; i++) {
                        that.options.xData.push(i);
                    }
                    break;
                }
            }

        }
    },
    saveOptions: function () {
        var that = this;
        that.getData();
        var name = $("input[name='reportName']").val();
        var content = JSON.stringify({

            xData: that.options.xData,
            yData: that.options.yData,
            pinci: {
                min: that.options.pinci.min,
                max: that.options.pinci.max,
                split: that.options.pinci.split,

            },
            pinciTime: {
                value: that.options.pinciTime.value,//

            },
            XKey: that.options.XKey,
            YKey: that.options.YKey,
            chartType: that.options.chartType,
            elementId: 'dynamicmain'

        });

        var options = {
            Url: URLDICTIONARY.reportChart,
            type: 'post',
            data: {
                name: name,
                grid_column: content,
                chart_type: that.options.chartType
            },
            dataType: 'xml',
            cache: false,
            fun: function (data) {
                that.notifications("新增图表", '新增图表成功，你可以在图表列表中查看或生成数据了！');
                $('#tableserver').bootstrapTable('refresh');

            }


        }

        that.ajax(options);

    },
    updateOPtion: function () {
        var that = this;
        that.getData();
        var name = $("input[name='reportName']").val();

        var content = JSON.stringify({

            xData: that.options.xData,
            yData: that.options.yData,
            pinci: {
                min: that.options.pinci.min,
                max: that.options.pinci.max,
                split: that.options.pinci.split,

            },
            pinciTime: {
                value: that.options.pinciTime.value,//

            },
            XKey: that.options.XKey,
            YKey: that.options.YKey,
            chartType: that.options.chartType,
            elementId: 'dynamicmain'

        });
        var id = $("#viewid").html();
        var options = {
            Url: URLDICTIONARY.reportChart + "/" + id,
            type: 'put',
            data: {
                name: name,
                grid_column: content,
                chart_type: that.options.chartType
            },
            dataType: 'xml',
            cache: false,
            fun: function (data) {
                that.notifications("修改图表", '修改图表成功，你可以在图表列表中查看或生成数据了！');
                $('#tableserver').bootstrapTable('refresh');

            }


        }
        that.ajax(options);

    },
    deleteOptions: function () {
        var that = this;
        var id = $("#viewid").html();
        var options = {
            Url: URLDICTIONARY.reportChart + "/" + id,
            type: 'delete',
            data: {
                unid: id
            },
            dataType: 'xml',
            cache: false,
            fun: function (data) {
                that.notifications("删除图表", '删除图表成功！');
                $('#tableserver').bootstrapTable('refresh');
            }
        }
        that.ajax(options);
    },
    notifications: function (title, content) {

        new PNotify({
            title: title,
            text: content,
            type: 'success'
        });
    },
    ajax: function (options) {
        var that = this;
        //console.log(options);
        //options.data=options
        jQuery.ajax({
            url: options.Url,
            type: options.type,
            data: options.data,
            dataType: options.dataType,
            cache: options.cache | false,
            success: function (data, textStatus, XMLHttpRequest) {
                //console.log(XMLHttpRequest.status);
                //console.log("success");
                var dateStr = XMLHttpRequest.getResponseHeader('Location');
                //console.log(dateStr);
                if (XMLHttpRequest.status == 201) {
                    $("#viewid").html(dateStr.substr(dateStr.lastIndexOf('/') + 1));
                    //console.log("viewid");
                }
                // var dateStr = xhr.getResponseHeader('Location');
                //console.log(dateStr);
                //alert(xhr.getResponseHeader('Content-Length') + ' bytes');
                //alert(JSON.stringify(data));
                //拼接 轨迹数组
                //data.name="修改为视图4";

                //dataModel.options_updateView.data=data;
                if (typeof (options.fun) == "function") {
                    options.fun && options.fun.call(that, data);
                }

                //数据应用
                //alert(JSON.stringify(lngLatArray));
                //alert(JSON.stringify(datetimeArray));

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(textStatus);

                //var dateStr = XMLHttpRequest.getResponseHeader('Location');
                //console.log(dateStr);
                //alert(textStatus);
            }
        });
    },
    setPinciData: function () {
        var that = this;
        var data = [];
        that.options.xData = [];
        that.options.yData = [];
        //debugger;
        console.log(that.options.chartType);

        if (that.options.chartType == "pinciValue"
				|| that.options.chartType == "pinciValue1") {
            var min = that.options.pinci.min * 1;
            var max = that.options.pinci.max * 1;
            var split = that.options.pinci.split * 1;
            for (var i = min; i < max; i = i + split) {
                var tempInt = i + split;
                if (tempInt > max) {
                    tempInt = max;
                    console.log(tempInt);
                }
                data.push({
                    start: i,
                    end: tempInt
                });

            }
            that.options.xData = data;
            // that.setOptions();

        } else if (that.options.chartType == "pinciTime"
				|| that.options.chartType == "pinciTime1") {
            console.log(that.options.pinciTime.value);
            switch (that.options.pinciTime.value) {
                case 'hour': {
                    for (var i = 1; i < 24; i++) {
                        that.options.xData.push(i);
                    }
                    break;

                }
                case 'week': {
                    that.options.xData = ['0', '1', '2', '3', '4', '5', '6', ]
                    break;
                }
                case 'week1': {
                    for (var i = 1; i < 54; i++) {
                        that.options.xData.push(i);
                    }

                    break;
                }
                case 'month': {
                    for (var i = 1; i <= 12; i++) {
                        that.options.xData.push(i);
                    }
                    break;
                }
            }

        }



        if (that.options.xData.length > 0 || that.options.XKey.length > 0) {
            that.createReport();
        }
    },
    createReport: function () {

        var that = this;

        var report = new reportPageSet({
            xObject: {
                reportType: that.options.chartType,
                data: that.options.xData,
                xTimeKey: 'datime_sys',// 表示用那个时间基准值
                xTimeType: that.options.pinciTime.value, //
                dataKey: that.options.XKey
                // 时序图分析
            },
            yObject: {
                dataKey: that.options.YKey
            },
            vehicles: that.options.vehicles,
            date_from: that.options.date_from,
            date_to: that.options.date_to,
            dataFunction: function (data) {// 初始化前格式化数据
                console.log(data);
                return data;
            },
            analysisDataEnd: function (map, search) {
                // 分析完成
                var xdata = [];
                var ydata = [];
                var name = '';
                legend = [];
                console.log("数据");
                console.log(map);
                var tempArray = [];
                for (var obj in map) {
                    legend.push(obj);
                    name = obj;
                    var xdata = map[obj].xArray;
                    console.log(xdata);
                    for (var prop in map[obj].yArray) {

                        ydata = map[obj].yArray[prop];
                    }

                    tempArray.push({
                        name: name,
                        type: 'bar',
                        data: ydata,
                        markPoint: {
                            data: [{
                                type: 'max',
                                name: '最大值'
                            }, {
                                type: 'min',
                                name: '最小值'
                            }]
                        },
                        markLine: {
                            data: [{
                                type: 'average',
                                name: '平均值'
                            }]
                        }
                    });

                }

                console.log(name);
                console.log(xdata);
                console.log(ydata);

                that.options.myChart.clear();
                that.options.myChart.setOption({
                    title: {
                        text: '速度',
                        subtext: '纯属虚构'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: legend
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {
                                show: true
                            },
                            dataView: {
                                show: true,
                                readOnly: false
                            },
                            magicType: {
                                show: true,
                                type: ['line', 'bar']
                            },
                            restore: {
                                show: true
                            },
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    calculable: true,
                    xAxis: [{
                        type: 'category',
                        data: xdata
                    }],
                    yAxis: [{
                        type: 'value'
                    }],
                    series: tempArray

                });

            }
        });

        report.initData();
    }

});
