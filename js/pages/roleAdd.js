$(function() {
roleId=	vin=GetQueryString("roleId");
	new ajaxObject({
		Url : URLDICTIONARY.menu,
		fun : function(data) {
			var tempArray = [];
			$.each(data, function(i, field) {

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

	$('#role').formValidation({
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
		if (roleId != '') {

			new ajaxObject({
				Url : URLDICTIONARY.role + "/" + roleId,
				data : $form.serialize(),
				type : "put",
				dataType : 'xml',
				fun : function(data) {

					// terminalId = id;
					new PNotify({
						title : "修改角色",
						text : "修改角色成功",
						type : 'success'
					});
					$form.formValidation('disableSubmitButtons', false);
					refresh();
				}

			});

		} else {
			console.log($form.serialize());
			new ajaxObject({
				Url : URLDICTIONARY.role,
				data : $form.serialize(),
				type : "post",
				dataType : 'xml',
				createFun : function(id) {

					roleId = id;

					new PNotify({
						title : "新增角色",
						text : "新增角色成功",
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

	$('#role_menu').formValidation({
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
	}).on(
			'success.form.fv',
			function(e) {
				// Prevent form submission
				e.preventDefault();
				// Get the form instance
				var $form = $(e.target);

				// Get the FormValidation instance
				var bv = $form.data('formValidation');
				if (roleId != '') {
                    //获取所有节点的方法
					var nodes = $("#treeAjaxHTML").jstree(true).get_json('#', {flat:true});
					var checks=$("#treeAjaxHTML").jstree(true).get_checked(true);

					console.log(checks);
					// var nodes =
					// $("#treeAjaxHTML").jstree(true).get_selected();
					console.log(nodes);
					$.each(nodes, function(i, field) {
						console.log("菜单");
						console.log(field);

						var tempArray = field.id.split('_');
						if (tempArray.length == 2) {
							if (field.state.selected) {
								bindButton(roleId, tempArray[0], tempArray[1],
										false, function() {
									        console.log(tempArray);
											bindButton(roleId, tempArray[0],
													tempArray[1], true,function(){
												// terminalId = id;
												new PNotify({
													title : "修改角色",
													text : "修改角色成功",
													type : 'success'
												});

												$form.formValidation('disableSubmitButtons', false);
											});
										});
							} else {
								bindButton(roleId, tempArray[0], tempArray[1],
										false,function(){
									// terminalId = id;
									new PNotify({
										title : "修改角色",
										text : "修改角色成功",
										type : 'success'
									});

									$form.formValidation('disableSubmitButtons', false);
								});
							}

						} else {
							if (field.state.selected) {
								bindMenu(roleId, field.id, false, function() {
									bindMenu(roleId, field.id, true,function(){

										$form.formValidation('disableSubmitButtons', false);
									});
								});
							} else {
								bindMenu(roleId, field.id, false,function(){
									$form.formValidation('disableSubmitButtons', false);
								});
							}
						}

					});

				}

				// Use Ajax to submit form data

				// Enable the submit buttons
				// .formValidation('resetForm', true);
			});

});

function refresh() {

	parent.refresh();

}
function bindMenu(roleId, menuId, isbind, fun) {
	var options = {
		privilege_unid : roleId,
		menu_unid : menuId
	}
	var bind = 'unbind';
	if (isbind) {
		bind = "bind";
	}
	new ajaxObject({
		Url : URLDICTIONARY.privilege_menu + "/" + bind,
		data : options,
		type : "put",
		dataType : 'xml',
		fun : function(data) {
			var that=this;
			// terminalId = id;


			// refresh();
			fun && fun.call(that,true);
		},
		errorFun : function(data) {
			fun && fun.call(that,true);
		}

	});

}
function bindButton(roleId, menuId, buttonId, isbind, fun) {
	var options = {
		button_unid : buttonId,
		privilege_unid : roleId,
		menu_unid : menuId
	}
	var bind = 'unbind';
	if (isbind) {
		bind = "bind";
	}
	new ajaxObject({
		Url : URLDICTIONARY.privilege_button + "/" + bind,
		data : options,
		type : "put",
		dataType : 'xml',
		fun : function(data) {

			// refresh();
			fun && fun(true);
		},
		errorFun : function(data) {
			fun && fun(false);
		}

	});
}
function initTree(data) {
	console.log(data);
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
		'plugins' : [ 'types', 'dnd', "checkbox" ]
	}).on('loaded.jstree', function() {
		// Do something here...
		setValue();
		setTree();
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

		$("input[name='super_unid']").val(selected.node.id);

	});

}

function getMenu() {
	if (roleId) {
		new ajaxObject({
			Url : URLDICTIONARY.role + "/" + roleId + "/menu",
			fun : function(data) {
				$.each(data, function(i, field) {
					var tree = $("#treeAjaxHTML").jstree(true);
					tree.select_node(tree.get_node(field.unid));
				});
			}
		});

	}
}
function setTree()
{
	if(roleId!='')
		{//设置选中的菜单
		new ajaxObject({
			Url: URLDICTIONARY.role+'/'+roleId+"/menu",
			fun:function(data)
			{
				console.log("获取角色包含的菜单数据");
				console.log(data);
				$.each(data,function(i,field){

					var tree=$("#treeAjaxHTML").jstree(true);
					var node=tree.get_node(field.unid);
					tree.select_node(node);

				});

			}
		})

		}
	var treeJson = $("#treeAjaxHTML").jstree(true).get_json('#', {flat:true});
	//console.log(treeJson);
	//为每个菜单添加按钮数据，并检查按钮是否被权限绑定
	$.each(treeJson,function(i, field) {
						new ajaxObject(
								{
									Url : URLDICTIONARY.menu + "/" + field.id
											+ "/button",
									menuId : field.id,
									fun : function(data) {// 获取菜单下所有按钮
										var that = this;
										//console.log("按钮数据")
										//console.log(that.options.menuId);
										//console.log(data);
										$.each(data,
														function(i, field) {
															var options = {
																parent : that.options.menuId,
																id : that.options.menuId
																		+ "_"
																		+ field.unid,
																text : field.name,
																type : 'file'
															}

															var node = $(
																	"#treeAjaxHTML")
																	.jstree(
																			true)
																	.get_node(
																			that.options.menuId
																					+ "_"
																					+ field.unid);
															if (node) {//判断节点是否存在，如果存在就不添加
																return true;//相当于
															}
															$("#treeAjaxHTML")
																	.jstree(
																			'create_node',
																			that.options.menuId,
																			options,
																			'last',
																			function() {//创建成功后，检查是否被权限绑定

																				if (roleId) {
																					/*
																					 * 获取权限对于的按钮，如果有就选中，如果没有
																					 */
																					new ajaxObject(
																							{
																								Url : URLDICTIONARY.role
																										+ "/"
																										+ roleId
																										+ "/button",
																								menuId:that.options.menuId,
																								fun : function(data) {//获取权限下的所有按钮
																									var that=this;
																									console.log("权限下绑定的按钮");
																									console.log(data);

																									$.each(data,
																													function(
																															i,
																															field) {

																														if (field.menu_unid == that.options.menuId) {
																															var node = $(
																															"#treeAjaxHTML")
																															.jstree(
																																	true)
																															.get_node(
																																	that.options.menuId
																																			+ "_"
																																			+ field.unid);
																															console.log(node);

																															$("#treeAjaxHTML")
																																	.jstree(
																																			true)
																																	.select_node(
																																			node);
																															//return true;//相当于break
																														}

																													});

																								}
																							});
																				}

																			},
																			true);

														});

									}
								});

					});
}
function setValue() {


	if (roleId) {
		new ajaxObject({
			Url : URLDICTIONARY.role + "/" + roleId,
			fun : function(data) {
				console.log(data);
				for ( var p in data) {
					if ($("input[name='" + p + "']").size() > 0) {
						$("input[name='" + p + "']").val(data[p]);
					}
					if ($("select[name='" + p + "']").size() > 0) {
						$("select[name='" + p + "']").select2();
						$("select[name='" + p + "']").select2('val', data[p]);
					}

				}
			}

		});
	}
}
