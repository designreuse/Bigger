$(document).ready(function() {
	$("#panelTitle").text("设备列表");
		$(window).resize(function () {
			console.log("resize");
	        $("#tableserver").bootstrapTable('resetView');
	    });
		vehicleListDemo.createTable();
		
});

function AddObject_tableserver() {
	eModal.iframe({
		url : "vehicle/add",
	}, "新增车辆数据");
}
function UpdateObject_tableserver() {
	eModal.iframe({
		url : "vehicle/update",
	}, "修改车辆数据");
}
function DeleteObject_tableserver() {
	eModal.iframe({
		url : "vehicle/add",
	}, "删除车辆数据");
}
var vehicleListDemo = {
		createTable : function() {
			object = new dataModelObject({
				viewId :VIEWKEY.deviceList,
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
					value,
					'</a>'
					 ].join('');
		},
	    idEvents :{
	    	'click .like' : function(e, value, row, index) {
				eModal.iframe({
					url : "vehicle/vehicleInfo?vin="+value,
				}, "单车");
			}
		}

	};	