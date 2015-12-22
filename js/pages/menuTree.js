
$(function(){
	var tree=new menuTree();
});
function menuTree(options)
{
	var defaultOptions={
			
	};
	this.options=$.extend({},defaultOptions,options||{});
	this.init();
}
menuTree.extend({
	init:function()
	{
		var that=this;
		$('#treeAjaxHTML').jstree({
			'core' : {
				'check_callback' : true,
				'data' : [],
			},
			'types' : {
				'default' : {
					'icon' : ' jstree-icon fa fa-folder'
				},
				'file' : {
					'icon' : 'jstree-icon fa fa-file'
				}
			},
			'plugins' : [ 'types', 'dnd',"checkbox" ]
		});
		
		$('#treeAjaxHTML').on('select_node.jstree', function(node, selected) {

			//console.log(selected.node);
			if (selected.node.type == "file") {
				// var tree=new dictionaryTree();
				// tree.options.protocolId=selected.node.id;
				// tree.createField();
				//vehicleDictionaryDemo.protocolId = selected.node.id;
				//vehicleDictionaryDemo.createTable();
			}

		});
		that.getRoot();
		
	},
	getRoot:function()
	{
		var that=this;
		var ref = $('#treeAjaxHTML').jstree(true);
		new ajaxObject({
			type : "get",
			Url : 'https://api.ttron.cn/openid/domain/metadata',//URLDICTIONARY.proto_family,
			dataType : "json",
			cache:false,
			fun : function(data) {
				console.log(data);
				//console.log("协议族列表");
			//	console.log(data);
				$.each(data, function(i, field) {
					var id = field.unid;
					//console.log(id);
					var options = {
						id : id,
						text : field.name,
						parent : '#',
						type : 'folder'
					};
					console.log(options);
				
					setTimeout(function(){
						ref.create_node("#", options, 'last', function() {
							
							that.getAllsubProtocol(id, "treeAjaxHTML");
							
						});
					},500);
					
				});
				//console.log("打印所有协议");
				//console.log(pro);

			}
		});	
	},
	getAllsubProtocol : function(id, treeId) {// id 父协议的id protocols 存放协议的容器数组
		var that = this;
		
		new ajaxObject({
			type : "get",
			Url : URLDICTIONARY.proto_family + "/" + id + "/sub_family",
			dataType : "json",
			fun : function(data) {
				
				$.each(data, function(i, field) {
					var options = {
						id : field.unid,
						text : field.name,
						parent : field.super_unid,
						type : 'folder'
					};
					var ref = $('#treeAjaxHTML').jstree(true);
					ref.create_node(id, options, 'last', function() {
						that.getAllsubProtocol(field.unid, "treeAjaxHTML");
					});

				});
			}
		});	
		new ajaxObject({
			type : "get",
			Url : URLDICTIONARY.proto_family + "/" + id + "/sub_proto",
			dataType : "json",
			fun : function(data) {
				$.each(data, function(i, field) {
					var options = {
						id : field.unid,
						text : field.name,
						parent : field.super_unid,
						type : 'file'
					};
					var ref = $('#treeAjaxHTML').jstree(true);
					ref.create_node(id, options, 'last', function() {
						// that.getAllsubProtocol(id,"treeAjaxHTML");
					});
				});
			}
		});	
	}
});