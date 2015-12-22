$(document).ready(function() {

	//pageStart();
});
function pageStart()
{
	$("#panelTitle").text("按钮管理");
	$(window).resize(function () {
		console.log("resize");
        $("#tableserver").bootstrapTable('resetView');
    });
	vehicleListDemo.createTable();
}
function refresh()
{
	$('#tableserver').bootstrapTable('refresh');
}
function AddObject_tableserver() {
	eModal.iframe({
		url : "main/button/add.html?buttonId=",
	}, "新增按钮数据");
}
function UpdateObject_tableserver() {
	var rows=$('#tableserver').bootstrapTable('getSelections');
	if(rows.length>0)
		{
	    var unid=rows[0].unid;
		eModal.iframe({
			url : "main/button/add.html?buttonId="+unid,
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
var vehicleListDemo = {
		createTable : function() {
			object = new dataModelObject({
				viewId : VIEWKEY.button,
				tableId : "#tableserver",
				onLoadBefore:function(data)
				{
					console.log(data);
					return data;

				}
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
