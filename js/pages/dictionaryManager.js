function cancel() {
	$("#createTreeBody,#updateTreeBody").hide();
}

$(document).ready(function() {

});

function pageStart() {
	
	$("#createTree").click(function() {
		cancel();
		$("#createTreeBody").show();
	});
	$("#updateTree").click(function() {
		cancel();
		$("#updateTreeBody").show();
	});

	$("#deleteTree").click(function() {
		var id = $(".dictionary").val();
		console.log(id);
		if (id) {
			var fiber = new ajaxObject({
				Url : URLDICTIONARY.fiber + "/" + id,
				type : "delete",
				dataType : 'xml',
				fun : function(data) {
					new PNotify({
						title : "数据字典删除",
						text : "数据字典删除成功",
						type : 'success'
					});

				}
			});
		} else {
			new PNotify({
				title : "数据字典删除",
				text : "请选择一个数据字典",
				type : 'info'
			});

		}

	});
	$("#createTreeBody .save").click(function() {
		var name = $("#createTreeBody .name").val();
		var fiber = new ajaxObject({
			Url : URLDICTIONARY.fiber,
			type : "post",
			data : {
				name : name
			},
			createFun : function(id) {

			}
		});

		cancel();

	});
	$("#updateTreeBody .save").click(function() {
		var name = $("#updateTreeBody .name").val();
		var id = $(".dictionary").val();
		if (id) {
			var fiber = new ajaxObject({
				Url : URLDICTIONARY.fiber + "/" + id,
				type : "put",
				data : {
					name : name
				},
				fun : function(data) {

				}
			});
		}
		;
		cancel();

	})

	$("#panelTitle").text("数据字典列表");
	$(window).resize(function() {
		// console.log("resize");
		// $("#tableserver").bootstrapTable('resetView');
	});
	 vehicleDictionaryDemo.createTable();
	 $(".dictionary").select2({
			placeholder : "Select a state",
			data:[]});
	$(".dictionary").select2({
		placeholder : "Select a state",
		ajax : {
			url : URLDICTIONARY.fiber,
			dataType : 'json',

			data : function(params) {
				// console.log(params);

				return {
					// q: params.term, // search term
					// page: params.page
					level : 0
				};
			},
			processResults : function(data, params) {
				// parse the results into the format expected by Select2
				// since we are using custom formatting functions we do not need
				// to
				// alter the remote JSON data, except to indicate that infinite
				// scrolling can be used
				// params.page = params.page || 1;
				console.log(data);
				var tempArray = [];
				$.each(data, function(i, field) {
					tempArray.push({
						id : field.unid,
						text : field.name
					})

				});

				return {
					results : tempArray,
				// pagination: {
				// more: (params.page * 30) < data.total_count
				// }
				};
			},
			cache : true
		},
		escapeMarkup : function(markup) {
			return markup;
		}// , // let our custom formatter work
		// minimumInputLength: 1

	}).on("select2:select", function(e) {
		var args = JSON.stringify(e.params, function(key, value) {
			if (value && value.nodeName)
				return "[DOM node]";
			if (value instanceof $.Event)
				return "[$.Event]";
			return value;
		});
		console.log(args);
		var id = JSON.parse(args).data.id;
		new ajaxObject({
			Url : URLDICTIONARY.fiber + "/" + id,
			fun : function(data) {

				var mainId = data.root_proto_unid;
				console.log(mainId);
				$(".mainProtocol").select2("val", mainId);
				createDataProtocol(mainId);
			}

		});
		// $(".mainProtocol option:first").prop("selected", 'selected');
		// $(".mainProtocol").select2( "val",
		// '50D75B75FCEE4A2FBA9350C7765CA18E').trigger('change');
		// $(".mainProtocol").empty().append('<option
		// id="'+'50D75B75FCEE4A2FBA9350C7765CA18E'+'"
		// value="'+'50D75B75FCEE4A2FBA9350C7765CA18E'+'">'+'test'+'</option>');
		// $('.mainProtocol').select2('data', {id:
		// '50D75B75FCEE4A2FBA9350C7765CA18E', text: 'Lorem
		// Ipsum'}).trigger('select2:select');

	});

	new ajaxObject({
		Url : URLDICTIONARY.protocol,
		data : {
			level : 0
		},
		fun : function(data) {
			var tempArray = [];
			$.each(data, function(i, field) {
				tempArray.push({
					id : field.unid,
					text : field.name
				})

			});
			$(".mainProtocol").select2({
				placeholder : "Select a state",
				data : tempArray
			}).on("select2:select", function(e) {
				var args = JSON.stringify(e.params, function(key, value) {
					if (value && value.nodeName)
						return "[DOM node]";
					if (value instanceof $.Event)
						return "[$.Event]";
					return value;
				});
				var id = JSON.parse(args).data.id;
				createDataProtocol(id);
			});

		}

	});
}
function createDataProtocol(mainProtocolId) {
	$("#main").nextAll().remove();

	var url = URLDICTIONARY.protocol + "/" + mainProtocolId + "/shadow";
	var shadow = new ajaxObject(
			{
				Url : url,
				fun : function(data) {
					$
							.each(
									data,
									function(i, field) {
										console.log(field);
										$(".form-bordered")
												.append(
														[

																'<div class="form-group">',
																'<label class="col-md-3 control-label">',
																field.key.title,
																'</label>',
																'<div class="col-md-6 dataProtocol">',

																' <select id="'
																		+ field.key.code
																		+ '"',

																' class=" protocolSet form-control populate">',
																'  <option value="" selected="selected"></option>',
																'</select>',

																'</div>',
																'<button  class="btn btn-warning btn-sm bingProtocol"',
																'	onclick="javascript:void(0);" type="button">',
																'	<i class="glyphicon glyphicon-pencil"></i> 绑定协议',
																'</button>',
																'</div>' ]
																.join(" "));

									});

					new ajaxObject({
						Url : URLDICTIONARY.proto_family,
						fun : function(data) {

							var tempArray = [];
							$.each(data, function(i, field) {
								tempArray.push({
									id : field.unid,
									text : field.name
								})

							});
							$(".protocolSet").select2({
								placeholder : "Select a state",
								data : tempArray

							});
							var fiberId = $(".dictionary").val();
							if (fiberId) {
								new ajaxObject({
									Url : URLDICTIONARY.fiber + "/" + fiberId
											+ "/proto_family",
									fun : function(data) {

										var shadow = data.map.entry;
										$.each(shadow, function(i, field) {
											var select = $("#" + field.key);
											if (select.size() > 0) {
												select.select2().select2('val',
														field.value.unid);

											}

											// $("#axffcq5").select2().select2('val','098E11E36A024692A257DB72306137FF')

										});
									}
								});
							}
						}
					});

					// 为新建原始绑定选择事件
					bindProtocolSeleced();

				}
			});
}

function bindProtocolSeleced() {
	$(".bingProtocol").click(
			function() {
				var select = $(this).prev().find("select");

				var dictionaryId = $(".dictionary").val();
				var dictionaryName = $(".dictionary").text()
				var mainProtocol = $(".mainProtocol").val();
				var dataProtocolId = select.val();
				var code = select.attr("id");
				if (dictionaryId && mainProtocol && dataProtocolId && code) {
					var fiber = new ajaxObject({
						Url : URLDICTIONARY.fiber + "/" + dictionaryId,
						type : "put",
						dataType : 'xml',
						data : {
							root_proto_unid : mainProtocol
						},
						fun : function(data) {
							new PNotify({
								title : "主协议和字典绑定",
								text : "主协议和字典绑定成功！",
								type : 'success'
							});

						}
					});

					new ajaxObject({
						Url : URLDICTIONARY.fiber + "/" + dictionaryId
								+ "/proto_family",
						type : "put",
						dataType : 'xml',
						data : {
							prerequisite_code : code,
							proto_family_unid : dataProtocolId
						},
						fun : function(data) {
							new PNotify({
								title : "数据协议和字典绑定",
								text : "数据协议和字典绑定成功！",
								type : 'success'
							});

						}
					});
				}
			})

}

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

}

function createRow() {
	var ref = $('#treeAjaxHTML').jstree(true), sel = ref.get_selected(true);

	console.log(sel);
	var parentId = '#';
	if (sel.length > 0) {
		parentId = sel[0].id;
		if (sel[0].type != "file") {
			new PNotify({
				title : "警告提示",
				text : "你选择的不是承载协议，请选择承载协议",
				type : 'info'
			});
			return false;
		}
	} else {
		new PNotify({
			title : "警告提示",
			text : "请选择承载协议",
			type : 'info'
		});
		return false;
	}

	var rows = $('#tableserver').bootstrapTable('getSelections');
	var tree = new dictionaryTree({
		protocolId : parentId,
		data : {
			proto_unid : parentId,
			title : 'test'
		},
		async : true,
		complete : function(id) {

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
						code : id,
						proto_unid : parentId
					}
				});

			}
			new PNotify({
				title : "新建数据项",
				text : "新建数据项成功",
				type : 'success'
			});
		}
	});
	tree.createField();
}

function deleteRow() {
	var rows = $('#tableserver').bootstrapTable('getSelections');
	console.log(rows);

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
			viewId : VIEWKEY.dictionaryForField,
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