$(function() {
	companyId=GetQueryString("companyId");

	$(".company").select2({
		placeholder : "请选择一个父机构",
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
				placeholder : "请选择一个父机构",
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
			$(".company").select2({
				placeholder : "请选择一个机构",
				data : []
			});
		}

	});


});

$(document).ready(
		function() {
			$('#company').formValidation({
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
                 if(companyId)
                	 {
                		new ajaxObject({
        					Url : URLDICTIONARY.compangy+"/"+companyId,
        					data : $form.serialize(),
        					dataType : 'xml',
        					type : "put",
        					fun : function() {
        						////console.log(id);
        						new PNotify({
        							title : "修改机构",
        							text : "修改机构成功",
        							type : 'success'
        						});
        						$form.formValidation('disableSubmitButtons', false);
        						refresh();
        					}

        				});

                	 }else
                		 {


				new ajaxObject({
					Url : URLDICTIONARY.compangy,
					data : $form.serialize(),
					dataType : 'xml',
					type : "post",
					createFun : function(id) {
						companyId=id;
						new PNotify({
							title : "新增机构",
							text : "新增机构成功",
							type : 'success'
						});
						$form.formValidation('disableSubmitButtons', false);
						refresh();
					}

				});
				}

				// Use Ajax to submit form data
				/*
				 * $.post($form.attr('action'), $form .serialize(), function(
				 * result) { //console.log(result); }, 'json');
				 */

				//$form.formValidation('disableSubmitButtons', false) // Enable
																	// the
																	// submit
																	// buttons
			  //  .formValidation('resetForm', true);
			});


		});

function setValue() {
	console.log(companyId);
	if (companyId) {
		new ajaxObject({
			Url : URLDICTIONARY.compangy + "/" + companyId,
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


				}
			}

		});
	}
}


function refresh()
{

	parent.refresh();

}
