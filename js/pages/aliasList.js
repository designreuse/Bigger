$(document).ready(function() {


});

function pageStart()
{
	$("#panelTitle").text("标准别名");
	$(window).resize(function() {
		console.log("resize");
		$("#tableserver").bootstrapTable('resetView');
	});
	vehicleDictionaryDemo.createTable();
}

function AddObject_tableserver() {
	eModal.iframe({
		url : "data/aliasAdd",
	}, "新增车辆数据");
}
function UpdateObject_tableserver() {
	var rows=$('#tableserver').bootstrapTable('getSelections');
	if(rows.length>0)
		{
	    var unid=rows[0].unid;
		eModal.iframe({
			url : "button/buttonAdd?buttonId="+unid,
		}, "修改按钮数据");
		}else
			{
			new PNotify({
				title : "修改按钮数据",
				text : "请选择一个按钮数据",
				type : 'info'
			});
			}
}
function DeleteObject_tableserver() {
	var rows=$('#tableserver').bootstrapTable('getSelections');
	$.each(rows,function(i,field){
		new ajaxObject({
			Url:URLDICTIONARY.button+"/"+field.unid,
			type:'delete',
			dataType:'xml',
			fun:function(){
				new PNotify({
					title : "删除按钮数据",
					text : "删除按钮数据成功",
					type : 'success'
				});
			}
		});
		refresh();
		
	});
	
}
function refresh()
{
	$('#tableserver').bootstrapTable('refresh');
}

function createRow() {
	var rows = $('#tableserver').bootstrapTable('getSelections');
	if (rows.length > 0) {
		for (var i = 0; i < rows.length; i++)

		{
			$('#tableserver').bootstrapTable('insertRow', {
				index : 1,
				row : rows[i]
			});
		}
	} else {
		$('#tableserver').bootstrapTable('insertRow', {
			index : 0,
			row : {
				name : 'test',
				code : 'id',
				proto_unid : 'parentId'
			}
		});
	}

}

function deleteRow() {
	var rows = $('#tableserver').bootstrapTable('getSelections');


	var ids = $.map($('#tableserver').bootstrapTable('getSelections'),
			function(row) {

				var tree = new dictionaryTree({
					protocolId : row["proto_unid"],
					fieldCode : row["code"],
					async : true,
					fun : function() {

						new PNotify({
							title : "数据项删除",
							text : "数据项删除成功",
							type : 'success'
						});
					}

				});
				tree.deleteField();
				return row.code;
			});
	console.log(ids);
	$('#tableserver').bootstrapTable('remove', {
		field : 'code',
		values : ids
	});

}
var vehicleDictionaryDemo = {
	protocolId : '',
	createTable : function() {
		var that = this;
		object = new dataModelObject({
			viewId : VIEWKEY.alias,
			tableId : "#tableserver",
			tableOptions : {
				cache : true,
				height : 400,
				striped : true,
				pagination : false,
				pageSize : 10,
				search : true,
				showExport : false,
				showPageOption : false,
				showToggle : false,
				showColumns : false,
				showRefresh : false

			},

			vin : that.protocolId + "/field",
			onLoadBefore : function(data) {
				console.log(data);
				if (data && data.length > 0) {
					var tempData = [];

					$.each(data, function(i, field) {
						console.log(field);

						var tempObject = $.extend({}, field, {
							code : field.key.code,
							title : field.key.title,
							alias : field.key.alias,
							proto_unid : that.protocolId
						});

						tempData.push(tempObject);

					});

					return tempData;
				}
				// return data;
			},
			onEditableSave : function(field, row, oldValue, $el) {

				var tree = new dictionaryTree({
					protocolId : row["proto_unid"],
					fieldKey : field,
					fieldValue : row[field],
					fieldCode : row["code"],
					async : false,
					fun : function(data) {
						new PNotify({
							title : "数据项修改",
							text : "数据项修改成功",
							type : 'success'
						});

					}
				});
				// dictionaryTree.options.protocolId=row["proto_unid"];
				// dictionaryTree.options.fieldKey=field;
				// dictionaryTree.options.fieldValue=row[field];
				// dictionaryTree.options.fieldCode=row["code"];
				// dictionaryTree.options.async=false;
				tree.updateField();
				// row[field]=oldValue;
				// console.log($el);

				return false;

			}
		});
		dataModelObject.staticObject = object;
		if ($(object.viewOptions.tableId).bootstrapTable()) {
			$(object.viewOptions.tableId).bootstrapTable("destroy");
		}
		object.setViewTable();
	},
	updateField : function() {

	},
	idFormatter : function(value, row, index) {
		return [ '<a class="like" href="javascript:void(0)" title="Like">',
				'<i class="glyphicon glyphicon-heart"></i>' + value, '</a>' ]
				.join('');
	},
	idEvents : {
		'click .like' : function(e, value, row, index) {
			eModal.iframe({
				url : "vehicle/track",
			}, "单车-轨迹");
		}
	}

};