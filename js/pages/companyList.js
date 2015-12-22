$(document).ready(function() {



});
function pageStart()
{
	$("#panelTitle").text("机构列表");
	$(window).resize(function () {
		console.log("resize");
        $("#tableserver").bootstrapTable('resetView');
    });
	vehicleListDemo.createTable();
}

function AddObject_tableserver() {
	eModal.iframe({
		url : "main/companyManager/add.html?companyId=",
	}, "新机构数据");
}
function UpdateObject_tableserver() {
	var rows = $('#tableserver').bootstrapTable('getSelections');
	if (rows.length > 0) {
		var unid = rows[0].unid;
		console.log(unid);
		eModal.iframe({
			url : "main/companyManager/add.html?companyId=" + unid,
		}, "修改机构数据");
	} else {
		new PNotify({
			title : "修改机构数据",
			text : "请选择一个机构数据",
			type : 'info'
		});
	}
}
function DeleteObject_tableserver() {
	var rows = $('#tableserver').bootstrapTable('getSelections');
	$.each(rows, function(i, field) {
		new ajaxObject({
			Url : URLDICTIONARY.compangy + "/" + field.unid,
			type : 'delete',
			dataType : 'xml',
			fun : function() {
				new PNotify({
					title : "删除机构数据",
					text : "成功删除机构数据" + field.name,
					type : 'success'
				});
				refresh();
			}
		});

	});

}

var vehicleListDemo = {
		createTable : function() {
			object = new dataModelObject({
				viewId : "747670445548418FB768AF1A28FE59EB",
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
		}

	};
