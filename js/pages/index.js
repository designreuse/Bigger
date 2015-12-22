$(function(){

	$.loadjs(["js/dataView.js",
	          'jsplugin/bootstrap-table-master/src/bootstrap-table.js',
	          'jsplugin/bootstrapModal/eModal.js',
              'jsplugin/tableExport/jquery.base64.js',
             'jsplugin/tableExport/tableExport.js',
              'jsplugin/tableExport/html2canvas.js',
           // 'j_bak/tableExport/jspdf/jspdf.js',
             'jsplugin/tableExport/jspdf/libs/base64.js',
              'jsplugin/tableExport/jspdf/libs/sprintf.js',
             'jsplugin/bootstrap-table-master/src/extensions/export/bootstrap-table-export.js',
          //  'j_bak/bootstrap-table-master/src/extensions/resizable/bootstrap-table-resizable.js',
         //   'j_bak/bootstrap-table-master/dist/extensions/editable/bootstrap-table-editable.js',
            'jsplugin/bootstrap-table-master/dist/extensions/pageOption/bootstrap-table-pageOption.js',
            'jsplugin/bootstrap-table-master/src/locale/bootstrap-table-zh-CN.js',
            'jsplugin/bootstrap-table-master/dist/extensions/toolbar/bootstrap-table-toolbar2.js',
             "js/pages/vehicleList.js",
             "jsplugin/echart/echarts-plain-map.js",
	          "js/pages/echartChina.js",
	          "js/pages/vehicleCluster.js",
	          '//webapi.amap.com/maps?v=1.3&key=ebe4a785f7422ca423062ac0a5ad840e'
	       ]);
});

$('#index').formValidation({
		message : '终端不可用',
		icon : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			login : {
				message : '用户名不可用',
				validators : {
					notEmpty : {
						message : '用户名不能为空'
					}
				}

			},
		password : {
			message : '密码不可用',
			notEmpty : {
				message : '密码不能为空'
			},
			stringLength : {
				min : 6,
				max : 11,
				message : '密码为11位数字'
			}
			/*,regexp : {
				regexp : /^[A-Za-z0-9]+$/,
				message : '终端必须为数字'
			}
		*/

		}
		}
	}).on('success.form.fv', function(e) {
		// Prevent form submission
		e.preventDefault();
		// Get the form instance
		var $form = $(e.target);
		//
		$form.formValidation('disableSubmitButtons', false);
		// Get the FormValidation instance
		var bv = $form.data('formValidation');

		  
		  
			new ajaxObject({
				Url : URLDICTIONARY.login,

				data :{
					grant_type:'password',
					client_id:'597494481295-dd79sund7ef8kr338t87eqajl27spg7a.apps.cube.com',
					client_secret:'daf2333dd314xfd',
					scope: LoginAPIList.join(" "),
					username:$("input[name='login']").val(),
				    password:$("input[name='password']").val()
				},
				type : "post",
				dataType : 'text',
				fun: function(data) {
					var id='';
                    var temp=data.split('&');
                    if(temp.length>0)
                    {
                    	 id=temp[0].split("=")[1];
                    }
                    if(id)
                    	{
							new PNotify({
								title : "登录",
								text : "修改用户信息成功"+id,
								type : 'success'
							});
							$.cookie('access-token',id, {  path: '/' });
							//console.log("cookie");
							//console.log($.cookie('access-token'));
							window.location.replace("main/main.html");
							$form.formValidation('disableSubmitButtons', false);
                    	}//refresh();
				},
				errorFun:function(data)
				{
					new PNotify({
						title : "登录失败",
						text : "用户名不存在或密码错误",
						type : 'error'
					});
					//window.location.replace("user/default");
				}

			});



		// Use Ajax to submit form data

		// Enable the submit buttons
		// .formValidation('resetForm', true);
	});
