$(function() {


  buttonId=GetQueryString("buttonId");
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

	$('#button').formValidation({
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
		if (buttonId != '') {

			new ajaxObject({
				Url : URLDICTIONARY.button + "/" + buttonId,
				data : $form.serialize(),
				type : "put",
				dataType:'xml',
				fun : function(data) {

					// terminalId = id;
					new PNotify({
						title : "修改按钮",
						text : "修改按钮成功",
						type : 'success'
					});
					$form.formValidation('disableSubmitButtons', false);
					refresh();
				}

			});

		} else {
			new ajaxObject({
				Url : URLDICTIONARY.button,
				data : $form.serialize(),
				type : "post",
				dataType:'text',
				createFun : function(id) {

					buttonId = id;

					new PNotify({
						title : "新增按钮",
						text : "新增按钮成功",
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

});

function refresh() {

	parent.refresh();

}
function initTree(data)
{
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
}

function setValue() {
	if (buttonId) {
		new ajaxObject({
			Url : URLDICTIONARY.button + "/" + buttonId,
			fun : function(data) {
				for ( var p in data) {
					if($("input[name='" + p + "']").size()>0)
						{
				        	$("input[name='" + p + "']").val(data[p]);
						}
					if ($("select[name='" + p + "']").size()) {
						$("select[name='" + p + "']").select2();
						$("select[name='" + p + "']").select2('val', data[p]);
					}

				}
			}

		});
	}
}
