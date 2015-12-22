$(function() {
   menuId=GetQueryString("menuId");

	 $("select[name='menu_type']").select2({
 		placeholder : "请选择一个菜单类型",
 		data : [{
			id : 1,
			text : "单车"
		},
		{
			id : 2,
			text : "多车"
		}]
 	});

	new ajaxObject(
			{
				Url : URLDICTIONARY.button,
				fun : function(data) {

					$.each(
									data,
									function(i, field) {
										$("#buttons")
												.append(
														[
																'<label class="col-sm-2 control-label">'
																		+ field.name
																		+ '<span',
																'	class="required"></span></label>',
																'<div class="col-sm-4">',
																'	<input type="checkbox" value="'
																		+ field.unid
																		+ '" name="buttongroup" class="form-control"',
																'		placeholder="eg.: John Doe" required />',
																'</div>' ]
																.join(" "))

									})
					$("#buttons").trigger('loading-overlay:hide');
					getButtons();
				}
			});

	new ajaxObject({
		Url : URLDICTIONARY.menu,
		fun : function(data) {
			var tempArray = [];
			$.each(data, function(i, field) {
				console.log(field);
				var parent=field.super_unid;
				if(parent=="null"||parent==''||parent=="0")
					{
					  parent="#";
					}
				tempArray.push({
					id : field.unid,
					text : field.name,
					parent : parent,
					type : 'folder'
				});
				console.log(tempArray);
			});
			initTree(tempArray);
		}
	});
	$(".company").select2({
		placeholder : "请选择一个机构",
		data : []
	});
	new ajaxObject({
		Url : URLDICTIONARY.compangy,
		data : {},
		fun : function(data) {
			var tempArray = [];
			$.each(data, function(i, field) {
				tempArray.push({
					id : field.unid,
					text : field.name
				})

			});
			$(".company").select2({
				placeholder : "请选择一个机构",
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

			});
			setValue();
			// setTerminalValue();

		},
		errorFun : function(data) {
			setValue();
			$(".company").select2({
				placeholder : "请选择一个机构",
				data : []
			});
		}

	});

	$('#menu').formValidation({
		message : '终端不可用',
		icon : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			deviceID : {
				message : '终端不可用',
				validators : {
					notEmpty : {
						message : '终端不能为空'
					},
					stringLength : {
						min : 11,
						max : 11,
						message : '终端为11位数字'
					},
					/*
					 * remote: { url: 'remote.php', message: 'The username is
					 * not available' },
					 */
					regexp : {
						regexp : /^[0-9]+$/,
						message : '终端必须为数字'
					}
				}
			}
		}
	}).on('success.form.fv', function(e) {
		// Prevent form submission
		e.preventDefault();
		// Get the form instance
		var $form = $(e.target);

		// Get the FormValidation instance
		var bv = $form.data('formValidation');
		if (menuId != '') {

			new ajaxObject({
				Url : URLDICTIONARY.menu + "/" + menuId,
				data : $form.serialize(),
				type : "put",
				dataType : 'xml',
				fun : function(data) {

					// terminalId = id;
					new PNotify({
						title : "修改菜单",
						text : "修改菜单成功",
						type : 'success'
					});
					$form.formValidation('disableSubmitButtons', false);
					refresh();
				}

			});

		} else {
			new ajaxObject({
				Url : URLDICTIONARY.menu,
				data : $form.serialize(),
				type : "post",
				dataType : 'xml',
				createFun : function(id) {

					menuId = id;

					new PNotify({
						title : "新增菜单",
						text : "新增菜单成功",
						type : 'success'
					});
					$form.formValidation('disableSubmitButtons', false);

					refresh();
				}

			});

		}
		// Use Ajax to submit form data

		// Enable the submit buttons
		// .formValidation('resetForm', true);
	});

	$('#buttons-menu')
			.formValidation({
				message : '终端不可用',
				icon : {
					valid : 'glyphicon glyphicon-ok',
					invalid : 'glyphicon glyphicon-remove',
					validating : 'glyphicon glyphicon-refresh'
				},
				fields : {
					deviceID : {
						message : '终端不可用',
						validators : {
							notEmpty : {
								message : '终端不能为空'
							},
							stringLength : {
								min : 11,
								max : 11,
								message : '终端为11位数字'
							},
							/*
							 * remote: { url: 'remote.php', message: 'The
							 * username is not available' },
							 */
							regexp : {
								regexp : /^[0-9]+$/,
								message : '终端必须为数字'
							}
						}
					}
				}
			})
			.on(
					'success.form.fv',
					function(e) {
						// Prevent form submission
						e.preventDefault();
						// Get the form instance
						var $form = $(e.target);

						// Get the FormValidation instance
						var bv = $form.data('formValidation');

						var buttons = $form.serialize();

						if (menuId != '') {

							new ajaxObject(
									{
										Url : URLDICTIONARY.menu + "/" + menuId
												+ "/button",
										errorFun:function(){
											$("input[name='buttongroup']:checked")
											.each(function(i,field){
												var buttonId = $(
														field)
														.val();
												bind(
														menuId,
														buttonId,
														true,
														function(data) {
															$form
																	.formValidation(
																			'disableSubmitButtons',
																			false);
														});

											});

										},
										fun : function(data) {

											// 获取所有的按钮数据
											var tempArray = $.map(data,
													function( field,i) {
														return field.unid;
													});

											//console.log(tempArray);
											$("input[name='buttongroup']:checked")
													.each(
															function(i, field) {
																var buttonId = $(
																		field)
																		.val();
																var index = $
																		.inArray(
																				buttonId,
																				tempArray);
																if (index > -1) {
																	tempArray
																			.splice(
																					index,
																					1);
																}
																$form
																		.formValidation(
																				'disableSubmitButtons',
																				true);

																bind(
																		menuId,
																		buttonId,
																		false,
																		function(data) {
																			bind(
																					menuId,
																					buttonId,
																					true,
																					function(
																							data) {
																						$form
																								.formValidation(
																										'disableSubmitButtons',
																										false);
																					});
																		});

															});
											//console.log(tempArray);

											$.each(tempArray,
													function(i, field) {
												$form
												.formValidation(
														'disableSubmitButtons',
														true);
														bind(menuId, field,
																false,function(){
															console.log(field);
															$form
															.formValidation(
																	'disableSubmitButtons',
																	false);
														});// 解绑
													});
										}
									});

						} else {

							new PNotify({
								title : "添加按钮",
								text : "添加按钮失败，请先添加菜单信息",
								type : 'error'
							});
							$form.formValidation('disableSubmitButtons', false);
						}
						// Use Ajax to submit form data

						// Enable the submit buttons
						// .formValidation('resetForm', true);
					});

});

function refresh() {

	parent.refresh();

}
function clearSelected()
{
	$('#treeAjaxHTML').jstree(true).deselect_all();
	$("#super_unid").val('');
}

function initTree(data) {

	$('#treeAjaxHTML').jstree({
		'core' : {
			'check_callback' : true,
			'data' : data,
		},
		'types' : {
			'default' : {
				'icon' : ' jstree-icon fa fa-folder'
			},
			'file' : {
				'icon' : 'jstree-icon fa fa-file'
			}
		},
		'plugins' : [ 'types', 'dnd']
	}).on('loaded.jstree', function() {
		// Do something here...
		setValue();
	});

	$('#treeAjaxHTML').on('select_node.jstree', function(node, selected) {

		// console.log(selected.node);
		if (selected.node.type == "file") {
			// var tree=new dictionaryTree();
			// tree.options.protocolId=selected.node.id;
			// tree.createField();
			// vehicleDictionaryDemo.protocolId = selected.node.id;
			// vehicleDictionaryDemo.createTable();
		}
		var node=selected.node;
		console.log(selected.node.id);
		$("#super_unid").val(selected.node.id);
		//$('#treeAjaxHTML').jstree(true).deselect_all();
		//$('#treeAjaxHTML').jstree(true).select_node(node);


	});
	$('#treeAjaxHTML').on('deselect_node.jstree', function(node, selected) {

		// console.log(selected.node);
		if (selected.node.type == "file") {
			// var tree=new dictionaryTree();
			// tree.options.protocolId=selected.node.id;
			// tree.createField();
			// vehicleDictionaryDemo.protocolId = selected.node.id;
			// vehicleDictionaryDemo.createTable();
		}
		console.log("dd");
		$("#super_unid").val('');

	});

}
function bind(menuId, buttonId, isbind, fun) {
	var bind = 'unbind';
	if (isbind) {
		bind = 'bind';
	}
	new ajaxObject({
		Url : URLDICTIONARY.menu_button + "/" + bind,
		data : {
			menu_unid : menuId,
			button_unid : buttonId
		},
		type : "put",
		dataType : 'xml',
		fun : function(data) {

			// terminalId = id;
			if (isbind) {
				new PNotify({
					title : "菜单绑定按钮",
					text : "绑定成功",
					type : 'success'
				});
			}
			fun(true);

		},
		errorFun : function(data) {
			fun(false);
		}

	});
}
function getButtons() {
	if (menuId) {
		new ajaxObject({
			Url : URLDICTIONARY.menu + "/" + menuId + "/button",
			fun : function(data) {
				console.log("已选择的按钮：")
				console.log(data);
				$.each(data, function(i, field) {
					$("input[value='" + field.unid + "']")
							.prop("checked", true);
				});
			}
		});
	}
}
function setValue() {
	console.log(menuId);
	if (menuId) {
		new ajaxObject({
			Url : URLDICTIONARY.menu + "/" + menuId,
			fun : function(data) {
				console.log(data);
				for ( var p in data) {
					if ($("input[name='" + p + "']").size() > 0) {
						$("input[name='" + p + "']").val(data[p]);
					}
					if ($("select[name='" + p + "']").size()) {
						$("select[name='" + p + "']").select2();
						$("select[name='" + p + "']").select2('val', data[p]);
					}
					if (p == "super_unid") {

						var tree = $("#treeAjaxHTML").jstree(true);
						tree.select_node(tree.get_node(data[p]));
					} else if (p == "unid") {
						tree.disable_node(tree.get_node(data[p]));
					}

				}
			}

		});
	}
}
