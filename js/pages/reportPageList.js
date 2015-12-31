$(document).ready(function () {


});
// TODO Fix this function.
function clearPage() {
   // $(".sidebar-right-toggle").hide();
}

function pageStart_One() {

    $(".sidebar-right-toggle").show();
    $("#panelTitle").text("报表列表");
    $(window).resize(function () {
        console.log("resize");
        $("#tableserver").bootstrapTable('resetView');
    });
    try {
        reportListDemo.createTable();
    } catch (e) {
        console.log(e);
    }

}

function AddObject_tableserver() {
    eModal.iframe({
        url: "vehicle/add",
    }, "新增车辆数据");
}
function UpdateObject_tableserver() {
    eModal.iframe({
        url: "vehicle/update",
    }, "修改车辆数据");
}
function DeleteObject_tableserver() {
    eModal.iframe({
        url: "vehicle/add",
    }, "删除车辆数据");
}
var reportListDemo = {
    options: {
        url: URLDICTIONARY.reportChart,
        id: '',
        type: 'get',
        data: {},
        dataType: 'json',
        cache: false,
        complete: function (data) {
            console.log(data);
        }
    },
    createTable: function () {
        var that = this;
        object = new dataModelObject({
            viewId: VIEWKEY.reportPage,
            tableId: "#tableserver",
            onDblClickRow: function (item, $element, index) {
                var type = item.chart_type;
                if (item.unid) {
                    that.options.id = item.unid;
                    $("#viewid").html(item.unid);
                    $("input[name='reportName']").val(item.name);

                    that.options.complete = function (data) {
                        console.log(data);
                        var column = JSON.parse(data.grid_column);
                        if (type == "pinciValue" || type == "pinciTime") {
                            that.setPinciHtml(type, column);
                        } else if (type == "pinciValue1"
								|| type == "pinciTime1") {
                            that.setLeijiHtml(type, column);
                        } else if (type == "recent") {
                            that.setShixuHtml(column);
                        } else if (type == "recent1") {
                            debugger;
                            that.setSanDianHtml(column);
                        }

                        console.log(data.grid_column);
                    };
                    that.options = $.extend({}, that.options);
                    that.ajax();

                }
            }
        });
        dataModelObject.staticObject = object;
        if ($(object.viewOptions.tableId).bootstrapTable()) {
            $(object.viewOptions.tableId).bootstrapTable("destroy");
        }
        object.setViewTable();
    },
    setPinciHtml: function (type, data) {

        //$(".active").removeClass("active");

        $("a[href='#popular']").click();
        $.each(data.YKey, function (i, field) {
            $("#popular #" + field).prop("checked", true);
        })
        if (type = "pinciValue") {
            console.log($("#popular input[name='min']").size());
            $("#popular input[name='min']").val(data.pinci.min);
            $("#popular input[name='max']").val(data.pinci.max);
            $("#popular input[name='split']").val(data.pinci.split);
        } else {

            $("#popular input[value= " + data.pinciTime.value + "]").prop(
					"checked", true);

        }

    },
    setLeijiHtml: function (type, data) {
        $("a[href='#popular1']").click();
        $.each(data.YKey, function (i, field) {
            $("#popular1 #" + field).prop("checked", true);
        })
        if (type = "pinciValue") {
            $("#popular1 input[name='min']").val(data.pinci.min);
            $("#popular1 input[name='max']").val(data.pinci.max);
            $("#popular1 input[name='split']").val(data.pinci.split);
        } else {
            $("#popular1 input[value=" + data.pinciTime.value + "]").prop(
					"checked", true);
        }
    },
    setShixuHtml: function (data) {
        $("a[href='#recent']").click();
        $.each(data.YKey, function (i, field) {
            $("#recent #recentY #" + field).prop("checked", true);
        });
        $.each(data.XKey, function (i, field) {
            $("#recent #recentX #" + field).prop("checked", true);
        });
    },
    setSanDianHtml: function (data) {
        debugger;
        $("a[href='#recent1']").click();
        $.each(data.YKey, function (i, field) {
            $("#recent1 #recent1Y #" + field).prop("checked", true);
        });
        $.each(data.XKey, function (i, field) {
            $("#recent1 #recent1X #" + field).prop("checked", true);
        });
    },
    getReport: function (fun) {
        var that = this;
        var tempFormatter = new dataModelObject({
            viewId: VIEWKEY.reportPage,
            search: {
                page_id: 0,
                page_size: 1000
            },
            catche: false,
            fun: function (data, search) {

                console.log(data);
                fun && fun.call(that, data);

            }

        });
        tempFormatter.getViewData();
    },
    idFormatter: function (value, row, index) {
        return ['<a class="like" href="javascript:void(0)" title="Like">',
				'<i class="glyphicon glyphicon-heart"></i>' + value, '</a>']
				.join('');
    },
    idEvents: {
        'click .like': function (e, value, row, index) {
            eModal.iframe({
                url: "vehicle/track",
            }, "单车-轨迹");
        }
    },
    ajax: function () {

        var that = this;
        // console.log(options);
        // options.data=options
        jQuery.ajax({
            url: that.options.url + "/" + that.options.id,
            type: that.options.type,
            data: that.options.data,
            dataType: that.options.dataType,

            cache: that.options.cache | false,

            success: function (data, textStatus, XMLHttpRequest) {
                // console.log(XMLHttpRequest.status);
                // console.log("success");
                var dateStr = XMLHttpRequest.getResponseHeader('Location');
                // console.log(dateStr);
                if (XMLHttpRequest.status == 201) {
                    $("#viewid").html(
							dateStr.substr(dateStr.lastIndexOf('/') + 1));
                    // console.log("viewid");
                }
                // var dateStr = xhr.getResponseHeader('Location');
                // console.log(dateStr);
                // alert(xhr.getResponseHeader('Content-Length') + ' bytes');
                // alert(JSON.stringify(data));
                // 拼接 轨迹数组
                // data.name="修改为视图4";

                // dataModel.options_updateView.data=data;
                if (typeof (that.options.complete) == "function") {
                    that.options.complete
							&& that.options.complete.call(that, data);
                }

                // 数据应用
                // alert(JSON.stringify(lngLatArray));
                // alert(JSON.stringify(datetimeArray));

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(textStatus);

                // var dateStr = XMLHttpRequest.getResponseHeader('Location');
                // console.log(dateStr);
                // alert(textStatus);
            }
        });
    }

};