
$(document).ready(
		function() {
		
			//pageStart();
		});


function pageStart()
{
	dataModel.InitTable("#tableserver",
			'DemoData/modeldataField.json',
			'DemoData/modeldata.json', function(itme, $element) {

				//console.log(itme);
				//console.log($element);

			});

	dataModel.InitTable("#tableserver2",
			'DemoData/ViewModeldataField.json',
			URLDICTIONARY.viewkey,
			dataModel.dbClickMainView);

	//dataModel.getData();
	// dataModel.deleteView();
	//dataModel.getFields();
	//dataModel.getOriginal();
	$("#metadata a").click(
			function() {
				dataModel.options_Original.Url = $(this).attr("href");
				$("#metadata").click();
				$("#metadataSpan").attr("data",
						dataModel.options_Original.Url)
						.text($(this).html());
				//dataModel.getOriginal();
				$("#tableserver").bootstrapTable("destroy");
				dataModel.InitTable("#tableserver",
						'DemoData/modeldataField.json',
						dataModel.options_Original.Url, function(itme,
								$element) {
						}, function(data) {
							 data=dataModel.initOriField(data);
							 console.log(data);
							 return data;

						});
				return false;
			});


	/*
	Bootstrap Confirmation - CALLBACK
	*/
	$('#saveView').confirmation({
		title 			: '你确定新增一个视图吗?',
		btnOkClass 		: 'btn btn-sm btn-danger',
		btnOkLabel 		: '新增',
		btnOkIcon 		: 'glyphicon glyphicon-ok',
		btnCancelClass 	: 'btn btn-sm btn-default',
		btnCancelLabel 	: '取消',
		btnCancelIcon 	: 'glyphicon glyphicon-remove',
		onConfirm: function() {
			dataModel.addViewButton();
			return false;
		},
		onCancel: function() {
			
			return false;
		}
	});
	$('#updateView').confirmation({
		title 			: '你确定更新视图吗?',
		btnOkClass 		: 'btn btn-sm btn-danger',
		btnOkLabel 		: '更新视图',
		btnOkIcon 		: 'glyphicon glyphicon-ok',
		btnCancelClass 	: 'btn btn-sm btn-default',
		btnCancelLabel 	: '取消',
		btnCancelIcon 	: 'glyphicon glyphicon-remove',
		onConfirm: function() {
			dataModel.updateView();
			return false;
		},
		onCancel: function() {
			
			return false;
		}
	});
	$('#deleteView').confirmation({
		title 			: '你确认删除当前视图吗?',
		btnOkClass 		: 'btn btn-sm btn-danger',
		btnOkLabel 		: '删除视图',
		btnOkIcon 		: 'glyphicon glyphicon-ok',
		btnCancelClass 	: 'btn btn-sm btn-default',
		btnCancelLabel 	: '取消',
		btnCancelIcon 	: 'glyphicon glyphicon-remove',
		onConfirm: function() {
			dataModel.deleteView();
			return false;
		},
		onCancel: function() {
			
			return false;
		}
	});
	$('#createView').confirmation({
		title 			: '你 确定要根据视图生成列表吗?',
		btnOkClass 		: 'btn btn-sm btn-danger',
		btnOkLabel 		: '确定生成列表',
		btnOkIcon 		: 'glyphicon glyphicon-ok',
		btnCancelClass 	: 'btn btn-sm btn-default',
		btnCancelLabel 	: '取消',
		btnCancelIcon 	: 'glyphicon glyphicon-remove',
		onConfirm: function() {
			dataModelDemo. createTable();
			return false;
		},
		onCancel: function() {
			
			return false;
		}
	});

}

var dataModelDemo = {
		
	createTable : function() {
		var options={
				viewId : $("#viewid").html(),
				tableId : "#showtableserver",
				search:{event_type:$("#selcectEvent").val()},
				
				fixedColumns: false,
	            fixedNumber: 0
					
		};
		 	
		//console.log($("input[name='vin']").is(':checked'));
		if($("input[name='vin']").is(':checked'))
			{
			    $.extend(options,{
			    	vin:$("input[name='vin']").val(),
			    	date_from:'2015-10-30T00:10:13',
			    	date_to:'2015-10-30T23:29:13'
			    });
			   
			
			}
		object = new dataModelObject(options);
		dataModelObject.staticObject=object;
		if($(object.viewOptions.tableId).bootstrapTable())
			{
		      $(object.viewOptions.tableId).bootstrapTable("destroy");
			}
		object.setViewTable();
	}

};

	function AddObject_tableserver() {
		eModal.iframe({
			url : "datamodel/dataModelAdd",
		}, "新增模型数据");
	}
	function DeleteObjecttableserver2() {
		var fields = $("#tableserver2").bootstrapTable("getSelections");

		$.each(fields, function(i, field) {
			dataModel.deleteView(field.unid);
		});
	}
	$(function() {

	});

	

	var dataModel = {
		options : {
			Url : URLDICTIONARY.viewkey,
			data : {},
			type : 'get',
			dataType : "json"
		},
		options_fields : {
			Url : URLDICTIONARY.viewkey,
			data : [],
			urlOri :URLDICTIONARY.viewkey,
			dataType : "json",
			type : 'get'

		},
		options_addView : {
			Url : URLDICTIONARY.viewkey,
			data : '',
			dataType : "xml",
			type : 'post'

		},
		options_updateView : {
			Url : '',
			id : '',
			UrlOri : URLDICTIONARY.viewkey,
			data : '',
			type : 'put'

		},
		options_Original : {
			Url : 'https://cube.ttron.cn/bigger/vehicle/metadata',
			data : '',
			dataType : "json",
			type : 'get'

		},
		options_Delete : {

			Url : '',
			data : '',
			urlOri :URLDICTIONARY.viewkey,
			dataType : "xml",
			type : 'delete'
		},
		initOriField:function(data)
		{

			if($.isArray(data) )
				{
				
					
					$.each(data, function(i, field) {
						$.extend(data[i], {
							align:'center',
							visible : true,
							valign : "bottom",
							sortable : true,
							apikey:'unid',
							apiName:'name'
						});
					});
					data.push({
						"field" : "state",
						"checkbox" : true
					});
				

				}else
				{
					var oriData=[];
					
				
					 if($.isArray(data.col_family))
					 {
						 // console.log(data.col_family);
						 $.each(data.col_family, function(i, field) {
								
							   var groupKey=field.name;
							 $.each(field.key,function(keyi,keyfield){
								 
								 var fieldTemp= {
										field:keyfield.code,
									    title:keyfield.title,
									    api_uri:URLDICTIONARY.viewHost+'/sensor/vehicle',
										visible : true,
										valign : "bottom",
										sortable : true,
										align:'center',
										apikey:'unid',
										apiName:'name',
										groupKey:groupKey,
										groupName:groupKey
										
									};
									oriData.push(fieldTemp);
							    });
								 
							 });
							oriData.push({
								"field" : "state",
								"checkbox" : true
							});
						 
							data= oriData; 
					 }
					
					
			    }
			return data;
			
		},
		getData : function() {
			var that = this;
			that.ajax(that.options, function(data) {
				
				//console.log(JSON.stringify(data));
			});
		},
		getFields : function(setView) {

			var that = this;
			that.ajax(that.options_fields, setView);
		},
		setViewTable : function() {
			var that = this;
			var id = that.viewOptions.viewId;
			var tableid = that.viewOptions.tableId;
			if (!id) {
				id = $("#viewid").html();
			}
			if (!tableid) {
				tableid = "#showtableserver";
				$("#showtableserver").bootstrapTable("destroy");

			}

			that.options_fields.Url = that.options_fields.urlOri + id;
			that.getFields(function(data) {
				var that = this;
				var column = data.grid_column;
				var jsonColumn = JSON.parse(column);
				var fields = jsonColumn.columnField;//列定义
				// var columns=jsonColumn.
				var family = jsonColumn.api_family;
				var dataUrl = family[0].url;
				var columns = family[0].columns.join(',');
				//console.log(columns);
				var data = {
					field : columns
				};
				// that.options.data=data;
				that.initBootsTable(tableid, dataUrl, fields, null, null,
						function(params) {

							// var that=dataModel;

							$.extend(params, data);
							// that.options.data={};
							// console.log(params);
							return params;
						});
				//console.log("stse"+test);
			});
			return false;

		},
		getViewData : function() {//根据视图和 查询条件 查找 对应的数据
			var that = this;
			that.options_fields.Url = that.options_fields.urlOri
					+ that.viewOptions.viewId;
			that.getFields(function(data) {
				var column = data.grid_column;
				var jsonColumn = JSON.parse(column);
				var fields = jsonColumn.columnField;//列定义
				// var columns=jsonColumn.
				var family = jsonColumn.api_family;
				var dataUrl = family[0].url;
				var columns = family[0].columns.join(',');
				//console.log(columns);
				var data = {
					field : columns
				};
				if (that.viewOptions.search) {
					$.extend(data, {
						search : that.viewOptions.search
					});
				}
				var options = {
					Url : dataUrl,
					type : "get",
					data : data,
					dataType : "json",
					cache : true
				};

				if (typeof fun == "function") {
					that.ajax(options, function(data) {
						that.viewOptions.fun.call(that, data,
								that.viewOptions.rowIndex,
								that.viewOptions.field);
					});
				}
			});

		},
		getOriginal : function() {
			var that = this;
			that.ajax(that.options_Original, function(data) {

				//console.log(data);
			});

		},
		addView : function(data) {
			var that = this;

			that.options_addView.data = data;
			that.ajax(that.options_addView, function() {
				
				
				dataModel.notifications("新增视图成功",'新增视图成功，你可以在视图列表中查看或生成数据列表了！');	
				$('#tableserver2').bootstrapTable('refresh');

			});
		},
		updateView : function(data) {
			var that = this;
			var options = that.getViewData();
			that.options_updateView.data = options;
			that.options_updateView.Url = that.options_updateView.UrlOri 
					+ $("#viewid").html();
			that.ajax(that.options_updateView, function() {
				dataModel.notifications("修改视图成功",'修改视图成功，你可以在视图列表中查看或生成数据列表了！');	
				$('#tableserver2').bootstrapTable('refresh');
			});

		},
		deleteView : function(id) {
			var that = this;
			if (!id) {
				id = $("#viewid").html();
			}
			that.options_Delete.Url = that.options_Delete.urlOri  + id;
			that.ajax(that.options_Delete, function() {
				dataModel.notifications("删除视图",'删除视图成功，你可以在视图列表中查看或生成数据列表了！');	
				$('#tableserver2').bootstrapTable('refresh');
			});
		},
		notifications:function (title,content)
		{
			
			new PNotify({
				title: title,
				text: content,
				type: 'success'
			});
		},
		ajax : function(options, fun) {
			var that = this;
			//console.log(options);
			//options.data=options
			jQuery.ajax({
				url : options.Url,
				type : options.type,
				data : options.data,
				dataType : options.dataType,

				cache : options.cache | false,

				success : function(data, textStatus, XMLHttpRequest) {
					//console.log(XMLHttpRequest.status);
					//console.log("success");
					var dateStr = XMLHttpRequest.getResponseHeader('Location');
					//console.log(dateStr);
					if (XMLHttpRequest.status == 201) {
						$("#viewid").html(
								dateStr.substr(dateStr.lastIndexOf('/') + 1));
						//console.log("viewid");
					}
					// var dateStr = xhr.getResponseHeader('Location');
					//console.log(dateStr);
					//alert(xhr.getResponseHeader('Content-Length') + ' bytes');
					//alert(JSON.stringify(data));
					//拼接 轨迹数组
					//data.name="修改为视图4";

					//dataModel.options_updateView.data=data;
					if (typeof (fun) == "function") {
						fun && fun.call(that, data);
					}

					//数据应用
					//alert(JSON.stringify(lngLatArray));
					//alert(JSON.stringify(datetimeArray));

				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					console.log(XMLHttpRequest.status);
					console.log(textStatus);

					//var dateStr = XMLHttpRequest.getResponseHeader('Location');
					//console.log(dateStr);
					//alert(textStatus);
				}
			});

		},
		InitTable : function(domId, fieldUrl, dataUrl, dbClick, beforeLoad) {

			var that = this;
			$.ajax({
				method : "GET",
				dataType : "json",
				url : fieldUrl,
				success : function(data, textStatus) {
					that.initBootsTable(domId, dataUrl, data, dbClick,
							beforeLoad);
				}
			});
		},
		initBootsTable : function(domId, dataUrl, cloumns, dbClick, beforeLoad,
				queryParams) {
			var that = this;
			//console.log(dataUrl);
			$(domId).bootstrapTable({
				method : 'get',
				url : dataUrl,
				cache : true,
				data : that.options.data,
				height : 400,
				striped : true,
				pagination : false,
				pageSize : 10,
				pageList : [ 10, 25, 50, 100, 200 ],
				search : true,
				showExport : true,
				showPageOption : true,
				showToggle : true,
				showColumns : true,
				showRefresh : true,
				sidePagination : 'server',//设置服务器端提供数据
				queryParams : queryParams,//拼写参数
				totalRows : 0,//æå¡ç«¯åé¡µå¿
				minimumCountColumns : 2,
				clickToSelect : false,
				onDblClickRow : dbClick,
				columns : cloumns,
				onLoadBefore : beforeLoad,
				reorderableRows:true,
		        fixedColumns: that.options.fixedColumns,
		        fixedNumber:that.options.fixedNumber
		        
				
			});
			$(window, '.content-body').resize(function() {
				$(domId).bootstrapTable('resetView');
			});
			
		},
		checkField : function(field, fields, fieldKey) {
			for ( var i = 0; i < fields.length; i++) {
				if (fields[i][fieldKey] == field) {
					return i;
				}
			}
			return -1;
		},
		destroyView : function() {
			$("#showtableserver").bootstrapTable("destroy");
			$("#tableserver").bootstrapTable("destroy");

			$("input:checkbox").each(function() {
				$(this).removeAttr("checked");
			});

			$("#viewid").html();

		},
		dbClickMainView : function(item, $element) {

			var that = dataModel;
			that.destroyView();
			dataModel.options_fields.Url = that.options_fields.urlOri
					+ item.unid;

			$("[name='viewName']").val(item.name);

			//

			//	$("#tableserver").bootstrapTable("destroy");
			$("#viewid").html(item.unid);

			/*InitTable("#tableserver",
					'DemoData/modeldataField.json',
					dataModel.options_fields.Url, function(
							itme, $element) {

						console.log(itme);
						console.log($element);

					});
			 */

			dataModel.getFields(function(data) {
				//sss console.log(JSON.stringify(data));
				//获取原始Url和名称，为原始select赋值
				var column = data.grid_column;
				var jsonColumn = JSON.parse(column);
				var originalName = jsonColumn.grid_Original.api_name;
				var originalUrl = jsonColumn.grid_Original.api_value.replace(URLDICTIONARY.viewHostOld,URLDICTIONARY.viewHost);

				// console.log(originalUrl);
				$("#metadataSpan").text(originalName);
				$("#metadataSpan").attr("data", originalUrl);
				var formJson = jsonColumn.formJson;
				//对form 赋值
				for ( var i = 0; i < formJson.length; i++) {
					var inputOrselcect = $("input[name=" + formJson[i].name
							+ "],select[name=" + formJson[i].name + "]");
					inputOrselcect.val(formJson[i].value);
					var check = $("input[type=checkbox][name="
							+ formJson[i].name + "]");

					if (check.length > 0) {
						check.prop("checked", true);
						// console.log(check);
					}

				}
				var fields = jsonColumn.columnField;

				//加载原始字段，并选中已选字段
                 that.options.fixedColumns=false;
                 that.options.fixedNumber=2;
				dataModel.InitTable("#tableserver",
						'DemoData/modeldataField.json', originalUrl, function(
								itme, $element) {
							//console.log(itme);
							//console.log($element);

						}, function(data) {
							
							
							 data=dataModel.initOriField(data);
                             var temp=[];
							for ( var i = 0; i < fields.length; i++) {
								var field = fields[i].field;
								var index = dataModel.checkField(field, data,
										"field");
								if (index >= 0) {
									//  console.log(index);
									// console.log(fields[index]);
									temp.push($.extend({},data[index], fields[i]));
									data.splice(index, 1);
								}else
									{
									temp.push(fields[i]);
									}
								
								
								
							}
							$.each(data,function(i,field){
								temp.push(field);	
							})
							
							return temp;
						});

			});
			 that.options.fixedColumns=false;
             that.options.fixedNumber=0;
		},
		getViewData : function() {
			var that = this;
			var dataModels = $("#modelForm").serializeArray();
			var apiName = $("#metadataSpan").text();
			var apiValue = $("#metadataSpan").attr("data");
			var fields = $('#tableserver').bootstrapTable('getSelections');
			//console.log(apiValue);
			var family = [];
			$.each(fields, function(i, field) {
				//console.log(field);
				
				var api_url = field.api_uri;
				if(api_url&&api_url.length>0)
					{
					
				     api_url=api_url.replace(URLDICTIONARY.viewHostOld,URLDICTIONARY.viewHost);
					
					}
				var fieldKey = field.field;
				//console.log(api_url);
				if (api_url) {
					if (family.length == 0) {
						family.push({
							url : api_url,
							columns : [ fieldKey ],
							isTrue : true
						});

					} else {
						var index = that.checkField(api_url, family, "url");
						if (index == -1) {
							family.push({
								url : api_url,
								columns : [ fieldKey ],
								isTrue : false
							});

						} else {
							family[index].columns.push(fieldKey);
						}

					}
				}
			});

			fields.sort(function(a, b) {
				if (a.number < b.number)
					return -1;
				if (a.number > b.number)
					return 1;
				return 0;
				//return 1 or 0 or -1  
			});
			//console.log(family);

			var options = $.extend({
				name : $("[name='viewName']").val()
			}, {
				unid : $("#viewid").html(),
				grid_column : JSON.stringify({
					columnField : fields,
					formJson : dataModels,
					grid_Original : {
						api_name : apiName,
						api_value : apiValue
					},
					api_family : family
				})

			});
			//console.log(options);

			return options;
		},
		addViewButton : function() {
			// console.log(JSON.stringify( $('#tableserver').bootstrapTable('getSelections')));
			// console.log(JSON.stringify($("#modelForm").serializeArray()));

			var that = this;
			var options = that.getViewData();
			//console.log(JSON.stringify(options));

			dataModel.addView(options);

			return false;
		},
		change : function(value, $index, $field) {
			var strRow;
			if (value == "true" || value == "false" || !isNaN(value)) {
				strRow = '{\"' + $field + '\":' + value + '}';
			} else {
				strRow = '{\"' + $field + '\":\"' + value + '\"}';
			}
			var rows = JSON.parse(strRow);
			$('#tableserver').bootstrapTable("updateRow", {
				index : $index,
				refresh : false,
				row : rows
			});

		},
		queryParams : function(params) {

			var that = dataModel;

			$.extend(params, that.options.data);
			// that.options.data={};
			//console.log(params);
			return params;
		},
		formatter : {

			nameFormatter : function(value, row, index, field) {
				return '<input name="field"  onchange="dataModel.change(this.value,'
						+ index
						+ ',\''
						+ field
						+ '\');"    value='
						+ value
						+ '  class="form-control">';
			},
			stateFormatter : function(value, row, index, field) {
				// alert(field);
				//console.log(row);
				//if (value) {
				//change("true", index, field);
				//	return {
				//disabled: true,
				//		checked : true
				//	};
				//	}
				return value;
			},
			priceFormatter : function(value) {
				// 16777215 == ffffff in decimal
				var color = '#'
						+ Math.floor(Math.random() * 6777215).toString(16);
				return '<div  style="color: ' + color + '">'
						+ '<i class="glyphicon glyphicon-usd"></i>'
						+ value.substring(1) + '</div>';
			},
			priceSorter : function(a, b) {
				a = +a.substring(1); // remove $
				b = +b.substring(1);
				if (a > b)
					return 1;
				if (a < b)
					return -1;
				return 0;
			},
			operateFormatter : function(value, row, index) {
				return [
						'<a class="like" href="javascript:void(0)" title="Like">',
						'<i class="glyphicon glyphicon-heart"></i>',
						'</a>',
						'<a class="edit ml10" href="javascript:void(0)" title="Edit">',
						'<i class="glyphicon glyphicon-edit"></i>',
						'</a>',
						'<a class="remove ml10" href="javascript:void(0)" title="Remove">',
						'<i class="glyphicon glyphicon-remove"></i>', '</a>' ]
						.join('');
			},
			operateEvents : {
				'click .like' : function(e, value, row, index) {

					alert('You click like icon, row: ' + JSON.stringify(row));
					console.log(value, row, index);
				},
				'click .edit' : function(e, value, row, index) {
					alert('You click edit icon, row: ' + JSON.stringify(row));
					console.log(value, row, index);
				},
				'click .remove' : function(e, value, row, index) {
					alert('You click remove icon, row: ' + JSON.stringify(row));
					console.log(value, row, index);
				}
			}
		}

	};
	
	var vehicleListDemo = {
			createTable : function() {
				
			
				object = new dataModelObject({
					viewId : "07B35DDB62A2438EB929BC8E717C6909",
					tableId : "#tableserver"
				
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
			deleteFormatter:function (value, row, index) {
				return [
						'<a class="like" href="javascript:void(0)" title="Like">',
						'<i class="glyphicon glyphicon-remove"></i>',
						'</a>'
						 ].join('');
			},
		    deleteEvents :{
					'click .like' : function(e, value, row, index) {
						var temp=[];
						temp.push(row.title);
						$('#tableserver').bootstrapTable('remove', {
							field : 'title',
							values :temp
						});
					}
			}
		};	
	
	
	
	function createRow() {
		
			$('#tableserver').bootstrapTable('insertRow', {
				index : 1,
				row : 
					{
						field:'',
					    title:'',
					    api_uri:'',
						visible : true,
						valign : "bottom",
						sortable : true,
						align:'center',
						apikey:'unid',
						apiName:'name',
						groupKey:'',
						groupName:''
					}
				
			});
		
	}

	function deleteRow() {
		var rows = $('#tableserver').bootstrapTable('getSelections');
		console.log(rows);

		var ids = $.map($('#tableserver').bootstrapTable('getSelections'),
				function(row) {
					return row.field;
				});
	
		$('#tableserver').bootstrapTable('remove', {
			field : 'field',
			values : ids
		});
	}