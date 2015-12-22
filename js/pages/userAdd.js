


$(function () {
    userId = GetQueryString("userId");
    /*
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
        });*/

    $("select[name='role']").select2({
        placeholder: "请选择一个角色",
        data: []
    });
    new ajaxObject({
        Url: URLDICTIONARY.role,
        fun: function (data) {
            var tempArray = [];
            $.each(data, function (i, field) {
                tempArray.push({
                    id: field.unid,
                    text: field.name
                })

            });
            $("select[name='role']").select2({
                placeholder: "请选择一个角色",
                data: tempArray
            }).on("select2:select", function (e) {
                var args = JSON.stringify(e.params, function (key, value) {
                    if (value && value.nodeName)
                        return "[DOM node]";
                    if (value instanceof $.Event)
                        return "[$.Event]";
                    return value;
                });
                var id = JSON.parse(args).data.id;

            });
            setRole();

        }

    })



  var $select = $('.company');
  $select.select2({
      placeholder: "请选择一个机构",
      ajax: {
          url: URLDICTIONARY.compangy,
          dataType: 'json',
          delay: 250,
          data: function (params) {
              return {
                  q: params.name, // search term
                  page: params.page
              };
          },
          processResults: function (data, params) {
              console.log(data);
              // parse the results into the format expected by Select2
              // since we are using custom formatting functions we do not need to
              // alter the remote JSON data, except to indicate that infinite
              // scrolling can be used
              params.page = params.page || 1;
              var tempArray = [];
              $.each(data, function (i, field) {
                  tempArray.push({
                      id: field.unid,
                      text: field.name
                  })

              });

              return {
                  results: tempArray,
                  pagination: {
                      more: false
                  }
              };
          },
          cache: true
      },
      escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
      //  minimumInputLength: 1,
      templateResult: function (item) {
          console.log(item);
          return item.text;
      }, // omitted for brevity, see the source of this page
      templateSelection: function (item) {
          return item.text;
      }// omitted for brevity, see the source of this page
  });




   

    
/*
    var $option = $('<option selected>Loading...</option>').val("22ED4E8854C3433B849CE737B754DDC6");

    $select.append($option).trigger('change'); // append the option and update Select2

    $.ajax({ // make the request for the selected data object
        type: 'GET',
        url: URLDICTIONARY.compangy + "/22ED4E8854C3433B849CE737B754DDC6",
        dataType: 'json'
    }).then(function (data) {
        // Here we should have the data object
        $option.text(data.name).val(data.unid); // update the text that is displayed (and maybe even the value)
        $option.removeData(); // remove any caching data that might be associated
        $select.trigger('change'); // notify JavaScript components of possible changes
    });*/
    /*new ajaxObject({
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

	});*/

    $('#user').formValidation({
        message: '终端不可用',
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            name_login: {
                message: '用户名称不可用',
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    /*	stringLength : {
						min : 11,
						max : 11,
						message : '终端为11位数字'
					},

					 * remote: { url: 'remote.php', message: 'The username is
					 * not available' },

					regexp : {
						regexp : /^[0-9]+$/,
						message : '终端必须为数字'
					}*/
                }
            }
        }
    }).on('success.form.fv', function (e) {
        // Prevent form submission
        e.preventDefault();
        // Get the form instance
        var $form = $(e.target);

        // Get the FormValidation instance
        var bv = $form.data('formValidation');
        if (userId != '') {

            new ajaxObject({
                Url: URLDICTIONARY.user + "/" + userId,
                data: $form.serialize(),
                type: "put",
                dataType: 'xml',
                fun: function (data) {

                    // terminalId = id;
                    new PNotify({
                        title: "修改用户信息",
                        text: "修改用户信息成功",
                        type: 'success'
                    });
                    $form.formValidation('disableSubmitButtons', false);
                    refresh();
                }

            });

        } else {
            console.log($form.serialize());
            new ajaxObject({
                Url: URLDICTIONARY.user + "/",
                data: $form.serialize(),
                type: "post",
                dataType: 'xml',
                createFun: function (id) {
                    userId = id;
                    var roleId = $("select[name='role']").val();
                    if (roleId) {
                        new ajaxObject({
                            Url: URLDICTIONARY.user_privilege,
                            data: {
                                openid: userId,
                                privilege_unid: roleId
                            },
                            type: 'put',
                            dataType: 'xml',
                            fun: function () {
                                new PNotify({
                                    title: "新增用户信息",
                                    text: "新增用户信息成功",
                                    type: 'success'
                                });
                                $form.formValidation('disableSubmitButtons', false);
                                refresh();
                            }
                        })
                    } else {
                        new PNotify({
                            title: "新增用户信息",
                            text: "新增用户信息成功-没有绑定权限",
                            type: 'success'
                        });
                        $form.formValidation('disableSubmitButtons', false);
                        refresh();
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
        privilege_unid: roleId,
        menu_unid: menuId
    }
    var bind = 'unbind';
    if (isbind) {
        bind = "bind";
    }
    new ajaxObject({
        Url: URLDICTIONARY.privilege_menu + "/" + bind,
        data: options,
        type: "put",
        dataType: 'xml',
        fun: function (data) {
            var that = this;
            // terminalId = id;


            // refresh();
            fun && fun.call(that, true);
        },
        errorFun: function (data) {
            fun && fun.call(that, true);
        }

    });

}
function setRole() {
    if (userId) {

        new ajaxObject({
            Url: URLDICTIONARY.privilegeByuserId + "/" + userId + "/privilege",
            fun: function (data) {

                if ($("select[name='role']").size() > 0) {
                    $("select[name='role']").select2();
                    $("select[name='role']").select2('val', data.unid);
                }
            }

        });
    }
}

function setValue() {


    if (userId) {
        new ajaxObject({
            Url: URLDICTIONARY.user + "/" + userId,
            fun: function (data) {
                console.log(data);
                for (var p in data) {
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
