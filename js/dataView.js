function dataModelObject(options) {
    var defaultOptions = {
        viewId: '',
        rowIndex: '',
        filed: '',
        vin: '',
        search: {//定义页面 大小和页面索引 
            page_id: 0,
            page_size: 10
        },
        catche: true,
        tableId: '',
        fun: function (data, index, field) {
        },
        isCreated: false,
        fileds: [],//// 保存需要格式或的列项（自动完成不需要页面设置） 在获取数据的视图中，保存所有列定义
        fieldLock: [],
        fieldLockValue: [],
        dbClickSelected: -1,//存储选中行
        tableOptions: {//默认列表 操作 项
            cache: true,
            height: 400,
            striped: true,
            pagination: true,
            pageSize: 10,
            search: false,
            showExport: false,
            showPageOption: false,
            showToggle: false,
            showColumns: false,
            showRefresh: false
        },

        onLoadBefore: function (data) {
            return data;
        },
        formatter: function (value, row, index, field) {

            return value;
        },
        onEditableSave: function (field, row, oldValue, $el) {
            //console.log(field);
            return false;
        },
        onDblClickRow: function (item, $element, index) {
            /*  var that=this;
			that.viewOptions.dbClickSelected=index;
			//console.log("dbclick");
			//console.log(item);
			//console.log($element);
			$($element).parent().find(".success").removeClass("success");
			$($element).addClass("success");*/
        },
        rowStyle: function (row, index) {
            /*var that=this;
			if(index==that.viewOptions.dbClickSelected)
			{
			return {
				
				classes:"success"
			};
			
			}*/
            return {};
        }


    };
    this.viewOptions = $.extend({}, defaultOptions, options);
}

dataModelObject.extend({
    options: {
        Url: URLDICTIONARY.viewkey,
        data: {},
        type: 'get',
        dataType: "json",
        fields: []
    },
    options_fields: {
        Url: URLDICTIONARY.viewkey,
        data: [],
        urlOri: URLDICTIONARY.viewkey,
        dataType: "json",
        type: 'get'

    },
    setViewTable: function () {
        var that = this;

        var id = that.viewOptions.viewId;
        var tableid = that.viewOptions.tableId;
        if (that.viewOptions.isCreated) {

            $(tableid).bootstrapTable("destroy");
            that.viewOptions.isCreated = false;
        }
        that.options_fields.Url = that.options_fields.urlOri + id;
        that.getFields(function (data) {
            var that = this;
            if (!data) {
                return;
            }
            var column = data.grid_column;

            var jsonColumn = JSON.parse(column);
            //console.log(jsonColumn);

            var form = jsonColumn.formJson;
            for (var i = 0; i < form.length; i++) {

                if (form[i].name == "jsPath") {


                }
                switch (form[i].name) {
                    case "jsPath": {
                        break;
                    }
                    case "cssPath": {
                        break;
                    }

                    case "export": {
                        that.viewOptions.tableOptions.showExport = true;
                        break;
                    }
                    case "search": {
                        that.viewOptions.tableOptions.search = true;
                        break;
                    }
                    case "hide": {
                        that.viewOptions.tableOptions.showColumns = true;
                        break;
                    }
                    case "dataL": {
                        that.viewOptions.tableOptions.showToggle = true;
                        break;
                    }
                    case "edit": {
                        that.viewOptions.tableOptions.showPageOption = true;
                        break;
                    }
                    case "refresh": {
                        that.viewOptions.tableOptions.showRefresh = true;
                        break;
                    }
                    case "detail": {
                        that.viewOptions.tableOptions.advancedSearch = true;
                        break;
                    }
                }

            }

            var fields = jsonColumn.columnField;// 列定义
            that.options.fields = fields;
            // 判断设置的函数当前页面是否存在，如果不存在或有错误记录日志
            $.each(fields, function (i, field) {
                if (field.formatter) {// 判断函数是否存在，如果存
                    try {
                        eval(field.formatter);
                    } catch (e) {
                        console.log(field.formatter + "不存在，请定义");
                    }
                }
            });

            // 保存需要格式或的列项（自动完成不需要页面设置）api是对于管理视图id
            that.viewOptions.fields = $.grep(fields, function (value, i) {
                return value.api && value.api.length > 0;
            });
            var family = jsonColumn.api_family;
            var dataUrl = family[0].url;
            if (that.viewOptions.vin.length > 0) {
                dataUrl += "/" + that.viewOptions.vin;
            }
            var columns = family[0].columns.join(',');
            // console.log(columns);
            var data = {
                field: columns
            };
            if (that.viewOptions.date_from && that.viewOptions.date_to
					&& that.viewOptions.date_from.length > 0
					&& that.viewOptions.date_to.length > 0) {
                $.extend(data, {
                    date_from: that.viewOptions.date_from,
                    date_to: that.viewOptions.date_to
                });

            }
            // that.options.data=data;
            that.initBootsTable(tableid, dataUrl, fields, null, function (data) {
                console.log(data);
                return data;
            }, function (params) {
                that.viewOptions.isCreated = true;
                // var that=dataModel;
                $.extend(that.viewOptions.search, { page_id: params.offset / params.limit, page_size: params.limit });
                $.extend(params, data, that.viewOptions.search);
                // that.options.data={};,page_size
                console.log(params);
                return params;
            });
            // console.log("stse"+test);
        });
        return false;

    },

    getViewData: function () {// 根据视图和 查询条件 查找 对应的数据
        var that = this;
        that.options_fields.Url = that.options_fields.urlOri
				+ that.viewOptions.viewId;
        that.getFields(function (data) {

            var column = data.grid_column;
            var jsonColumn = JSON.parse(column);
            var fields = jsonColumn.columnField;// 列定义
            that.viewOptions.fields = fields;//保存所有的列定义
            // console.log("dd");
            // console.log(that.viewOptions.fields);
            // var columns=jsonColumn.
            var family = jsonColumn.api_family;
            var dataUrl = family[0].url;
            if (that.viewOptions.vin.length > 0) {//
                dataUrl += "/" + that.viewOptions.vin;
            }
            var columns = family[0].columns.join(',');
            // console.log(columns);
            var data = {
                field: columns
            };
            if (that.viewOptions.date_from && that.viewOptions.date_to
					&& that.viewOptions.date_from.length > 0
					&& that.viewOptions.date_to.length > 0) {
                $.extend(data, {
                    date_from: that.viewOptions.date_from,
                    data_to: that.viewOptions.date_to
                });

            }

            if (that.viewOptions.search) {
                $.extend(data, that.viewOptions.search);
            }
            var options = {
                Url: dataUrl,
                type: "get",
                data: data,
                dataType: "json",
                cache: false

            };


            that.ajax(options, function (data) {
                if (typeof that.viewOptions.fun == "function") {
                    // //console.log("ajax 数据");
                    // console.log(data);
                    that.viewOptions.fun.call(that, data,
							that.viewOptions.search, that.viewOptions.vin);
                }
            });

        });

    },
    getFields: function (setView) {

        var that = this;
        that.options_fields.Url = that.options_fields.urlOri + that.viewOptions.viewId;
        that.ajax(that.options_fields, setView);
    },
    ajax: function (options, fun) {
        var that = this;
        // console.log(options);
        // options.data=options
        jQuery.ajax({
            url: options.Url,
            type: options.type,
            data: options.data,
            dataType: options.dataType,

            cache: options.cache || false,

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

                $("#panelBody").trigger('loading-overlay:hide');
                // var dateStr = xhr.getResponseHeader('Location');
                // console.log(dateStr);
                // alert(xhr.getResponseHeader('Content-Length') + ' bytes');
                // alert(JSON.stringify(data));
                // 拼接 轨迹数组
                // data.name="修改为视图4";

                // dataModel.options_updateView.data=data;
                if (typeof (fun) == "function") {
                    fun && fun.call(that, data);
                }

                // 数据应用
                // alert(JSON.stringify(lngLatArray));
                // alert(JSON.stringify(datetimeArray));

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //console.log("errormessage");
                console.log(XMLHttpRequest.status);
                console.log(textStatus);
                //console.log(XMLHttpRequest);
                fun && fun.call(that);
                //console.log(XMLHttpRequest.readyState)
                if (XMLHttpRequest.status == 404) {

                    if (typeof (fun) == "function") {
                        //	fun && fun.call(that);
                    }
                }

                // var dateStr = XMLHttpRequest.getResponseHeader('Location');
                // console.log(dateStr);
                // alert(textStatus);
            },
            complete: function (e, xhr, textStatus) {
                //console.log("结果"+e.status);
                if (e.status === 404) {

                    //alert(e.status);
                }
            },
            statusCode: {
                404: function () {
                    console.debug("404 for ");
                },
                0: function () {
                    //  console.debug("0 for " );
                }
            }
        });

    },
    InitTable: function (domId, fieldUrl, dataUrl, dbClick, beforeLoad) {

        var that = this;
        $.ajax({
            method: "GET",
            dataType: "json",
            url: fieldUrl,
            success: function (data, textStatus) {
                //console.log(data);
                that.initBootsTable(domId, dataUrl, data, dbClick, beforeLoad);
            }
        });
    },
    initBootsTable: function (domId, dataUrl, cloumns, dbClick, beforeLoad,
			queryParams) {
        var that = this;

        var options = $.extend({
            method: 'get',
            url: dataUrl,
            cache: true,
            data: that.options.data,
            height: 400,
            striped: true,
            pagination: true,
            pageSize: 10,
            pageList: [10, 25, 50, 100, 200],
            search: true,
            showExport: false,
            showPageOption: true,
            showToggle: true,
            showColumns: true,
            showRefresh: true,
            sidePagination: 'server',// 设置服务器端提供数据
            queryParams: queryParams,// 拼写参数
            totalRows: 0,
            minimumCountColumns: 2,
            clickToSelect: false,
            onDblClickRow: dbClick,
            columns: cloumns,
            onLoadBefore: function (data) {

                data = that.beforeLoad.call(that, data);
                return data;
            },
            onEditableSave: that.viewOptions.onEditableSave,
            onLoadSuccess: function () {
                that.success.call(dataModelObject.staticObject);
            },
            onDblClickRow: function (item, $element, index) {
                if (typeof dbClick == "function") {
                    dbClick.call(this, item, $element);
                }
                that.viewOptions.onDblClickRow.call(that, item, $element, index);
            },
            rowStyle: function (row, index) {

                return that.viewOptions.rowStyle.call(that, row, index);
            }
        }, that.viewOptions.tableOptions);
        // console.log(dataUrl);
        $(domId).bootstrapTable(options);
        $(domId).bootstrapTable('resetView');
    },
    beforeLoad: function (data) {
        //console.log("before");
        //console.log(data);
        var that = this;
        that.viewOptions.fieldLock = [];

        var data = that.viewOptions.onLoadBefore.call(that, data);
        return data;
    },
    success: function () {
        var that = this;
        $(that.viewOptions.tableId).bootstrapTable('resetView');
        // that.viewOptions.fieldLock=[];
        // console.log("success");
    }

});

dataModelObject.extend({
    staticObject: null,
    notifications: function (title, content) {

        new PNotify({
            title: title,
            text: content,
            type: 'error'
        });
    },

    formatter: function (value, row, index, field, funFor) {
        var that = dataModelObject.staticObject;
        //console.log(value);
        if (!value || value == "null") {

            return "数据项无效";
        }

        // console.log("ddd");
        // console.log(field);
        // console.log(object);
        // object.viewOptions.field=this;
        // console.log(that.viewOptions.fields);

        var tempf = $.grep(that.viewOptions.fields, function (f, i) {

            return f.field == field;

        });

        var isCheck = $
				.inArray(field + "_" + index, that.viewOptions.fieldLock);

        if (tempf.length > 0 && isCheck == -1) {
            //console.log(isCheck);
            //console.log(field + "_" + index);
            //console.log(that.viewOptions.fieldLock);
            // console.log(tempf.length);
            that.viewOptions.fieldLock.push(field + "_" + index);
            that.viewOptions.fieldLockValue.push(value);
            var tempFormatter = new dataModelObject({
                viewId: tempf[0].api,
                rowIndex: index,
                field: field,
                fieldsF: tempf[0],//保存列表中需要格式化列的apikey和apivalue
                search: { search: value },
                vin: value,
                catche: false,
                tableId: that.viewOptions.tableId,
                fun: function (data, search) {
                    value = search.search;
                    // console.log( "数据获取开始1");
                    var thats = this;
                    /*
					 * console.log(data); console.log(index);
					 * console.log(thats); console.log(tableId);
					 */
                    // console.log(thats);
                    //console.log("foramatter开始");
                    //console.log(thats.viewOptions.fieldsF);
                    //console.log(thats.viewOptions.fieldsF.apikey);
                    /*var data = $.grep(data, function(f, i) {

						return value == f[thats.viewOptions.fieldsF.apikey];
					});*/
                    //console.log(data);
                    if (data) {
                        var strRow = '{\"' + thats.viewOptions.field + '\":\"'
								+ data[thats.viewOptions.fieldsF.apiName] + '\"}';
                        // console.log(thats);
                        var rows = JSON.parse(strRow);

                        $(thats.viewOptions.tableId).bootstrapTable(
								"updateRow", {
								    index: thats.viewOptions.rowIndex,
								    refresh: false,
								    row: rows
								});
                    } else {
                        var strRow = '{\"' + thats.viewOptions.field + '\":\"'
								+ "数据加载失败" + '\"}';
                        // console.log(thats);
                        var rows = JSON.parse(strRow);

                        $(thats.viewOptions.tableId).bootstrapTable(
								"updateRow", {
								    index: thats.viewOptions.rowIndex,
								    refresh: false,
								    row: rows
								});
                    }
                    //$(thats.viewOptions.tableId).bootstrapTable('resetView');
                    // that.viewOptions.fieldLock.splice($.inArray(thats.viewOptions.field+"_"+thats.viewOptions.rowIndex,that.viewOptions.fieldLock),1);

                }

            });

            tempFormatter.getViewData();
            return "数据加载中...";

        } else {
            var isCheck = $.inArray(value, that.viewOptions.fieldLockValue);
            if (isCheck != -1) {
                return "数据加载中...";
            }

        }

        return value;
    }

}, true);
