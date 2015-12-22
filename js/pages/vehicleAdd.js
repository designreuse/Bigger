$(function() {
	
   
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
			setTerminalValue();

		},
		errorFun : function(data) {
			$(".company").select2({
				placeholder : "请选择一个机构",
				data : []
			});
		}

	});
	$("select[name='vendor_unid']").select2({
		placeholder : "请选择供应商",
		data : []
	});
	new ajaxObject({
		Url : URLDICTIONARY.supplierVendorList,
		data : {},
		fun : function(data) {
			var tempArray = [];
			$.each(data, function(i, field) {
				tempArray.push({
					id : field.unid,
					text : field.name
				})

			});
			$("select[name='vendor_unid']").select2({
				placeholder : "请选择供应商",
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
		
			setTerminalValue();

		},
		errorFun : function(data) {
			$("select[name='vendor_unid']").select2({
				placeholder : "请选择供应商",
				data : []
			});
		}

	});

	$("select[name='model_unid']").select2({
		placeholder : "请选择车辆类型",
		data : []
	})
	new ajaxObject({
		Url : URLDICTIONARY.vehicleType,
		data : {},
		fun : function(data) {
			var tempArray = [];
			$.each(data, function(i, field) {
				tempArray.push({
					id : field.unid,
					text : field.name
				})

			});
			$("select[name='model_unid']").select2({
				placeholder : "请选择车辆类型",
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
			setTerminalValue();
		},
		errorFun : function(data) {
			$("select[name='model_unid']").select2({
				placeholder : "请选择车辆型号",
				data : []
			});
		}

	});
	$("select[name='fiber_unid']").select2({
		placeholder : "请选择数据字典",
		data : []
	})
	new ajaxObject({
		Url : URLDICTIONARY.fiber,
		data : {},
		fun : function(data) {
			var tempArray = [];
			$.each(data, function(i, field) {
				tempArray.push({
					id : field.unid,
					text : field.name
				})

			});
			$("select[name='fiber_unid']").select2({
				placeholder : "请选择数据字典",
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
		},
		errorFun : function(data) {
			$("select[name='fiber_unid']").select2({
				placeholder : "请选择数据字典",
				data : []
			});
		}

	});

});

$(document).ready(
		function () {

		    terminalId = '';
			$('#defaultForm').formValidation({
				message : 'SIM卡不可用',
				icon : {
					valid : 'glyphicon glyphicon-ok',
					invalid : 'glyphicon glyphicon-remove',
					validating : 'glyphicon glyphicon-refresh'
				},
				fields : {
					cellphone : {
						message : 'SIM卡不可用',
						validators : {
							notEmpty : {
								message : 'SIM卡不能为空'
							},
							stringLength : {
								min : 11,
								max : 11,
								message : 'SIM卡为11位数字'
							},
							/*
							 * remote: { url: 'remote.php', message: 'The
							 * username is not available' },
							 */
							regexp : {
								regexp : /^[0-9]+$/,
								message : 'SIM卡必须为数字'
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

				new ajaxObject({
					Url : $form.attr('action'),
					data : $form.serialize(),
					dataType : 'xml',
					type : "post",
					createFun : function(id) {
						////console.log(id);

					}

				});

				// Use Ajax to submit form data
				/*
				 * $.post($form.attr('action'), $form .serialize(), function(
				 * result) { //console.log(result); }, 'json');
				 */

				$form.formValidation('disableSubmitButtons', false) // Enable
																	// the
																	// submit
																	// buttons
				.formValidation('resetForm', true);
			});

			$('#device').formValidation({
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
			}).on(
					'success.form.fv',
					function(e) {
						// Prevent form submission
						e.preventDefault();
						// Get the form instance
						var $form = $(e.target);

						// Get the FormValidation instance
						var bv = $form.data('formValidation');
						if (terminalId != '') {
							
							new ajaxObject({
								Url : $form.attr('action')+"/"+terminalId,
								data : $form.serialize(),
								type : "put",
								dataType : 'xml',
								fun : function(data) {

									//terminalId = id;
									if (vin) {

										bind(vin, terminalId, function() {
											new PNotify({
												title : "修改终端",
												text : "修改终端成功",
												type : 'success'
											});
											$form.formValidation(
													'disableSubmitButtons',false);
										});

									} else {
										new PNotify({
											title : "修改终端",
											text : "修改终端成功",
											type : 'success'
										});
										$form.formValidation(
												'disableSubmitButtons', false);
									}
									refresh();
								}

							});
							

						} else {
							new ajaxObject({
								Url : $form.attr('action'),
								data : $form.serialize(),
								type : "post",
								dataType : 'xml',
								createFun : function(id) {

									terminalId = id;
									if (vin) {

										bind(vin, id, function() {
											new PNotify({
												title : "新增终端",
												text : "新增终端成功",
												type : 'success'
											});
											$form.formValidation(
													'disableSubmitButtons',
													false);
										});
                                       
									} else {
										new PNotify({
											title : "新增终端",
											text : "新增终端成功",
											type : 'success'
										});
										$form.formValidation(
												'disableSubmitButtons', false);
									}
									refresh();
								}

							});

						}
						// Use Ajax to submit form data

						// Enable the submit buttons
						// .formValidation('resetForm', true);
					});

			$('#vehicle').formValidation({
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
			}).on(
					'success.form.fv',
					function(e) {
						// Prevent form submission
						e.preventDefault();

						// Get the form instance
						var $form = $(e.target);

						// Get the FormValidation instance
						var bv = $form.data('formValidation');
						if (vin) {
							new ajaxObject({
								Url : $form.attr('action') + "/" + vin,
								data : $form.serialize(),
								dataType : 'xml',
								type : "put",
								fun : function(data) {

									if (terminalId != '') {
										bind(vin, terminalId, function() {
											new PNotify({
												title : "修改车辆信息",
												text : "修改车辆信息成功",
												type : 'success'
											});
											$form.formValidation(
													'disableSubmitButtons',
													false);
											
										});
									} else {
										new PNotify({
											title : "修改车辆信息",
											text : "修改车辆信息成功",
											type : 'success'
										});

										$form.formValidation(
												'disableSubmitButtons', false);
										
									}
									refresh();
								}

							});

						} else {
							new ajaxObject({
								Url : $form.attr('action'),
								data : $form.serialize(),
								dataType : 'xml',
								type : "post",
								createFun : function(id) {
                                     $("input[name='vin']").attr("disabled","disabled");
									vin = id;

									if (terminalId != '') {
										bind(vin, terminalId, function() {
											new PNotify({
												title : "新增车辆信息",
												text : "新增车辆信息成功",
												type : 'success'
											});
											$form.formValidation(
													'disableSubmitButtons',
													false);
											
										})

									} else {
										new PNotify({
											title : "新增车辆信息",
											text : "新增车辆信息成功",
											type : 'success'
										});
										$form.formValidation(
												'disableSubmitButtons', false);
										
									}
									refresh();
								}

							});
						}

						// Enable the submit buttons
						// .formValidation('resetForm', true);
					});

		});

function bind(vin, terminalid, fun) {
	new ajaxObject({
		Url : URLDICTIONARY.device_bind + '/bind',
		type : 'put',
		dataType : 'xml',
		data : {
			vin : vin,
			unid : terminalid
		},
		fun : function(data) {
			//console.log("绑定成功");
			fun();
		}
	});
}

function refresh()
{
	
	parent.refresh();
	
}
