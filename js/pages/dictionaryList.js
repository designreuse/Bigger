
function pageStart()
{	
	$("#panelTitle").text("SIM卡列表");
$(window).resize(function () {
	console.log("resize");
    $("#tableserver").bootstrapTable('resetView');
});
vehicleDictionaryDemo.createTable();


    $('#codeTest').formValidation({
    message: '数据',
    icon: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
        deviceID: {
            message: '终端不可用',
            validators: {
                notEmpty: {
                    message: '终端不能为空'
                },
                stringLength: {
                    min: 11,
                    max: 11,
                    message: '终端为11位数字'
                },
                /*
                 * remote: { url: 'remote.php', message: 'The username is
                 * not available' },
                 */
                regexp: {
                    regexp: /^[0-9]+$/,
                    message: '终端必须为数字'
                }
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
    var ref = $('#treeAjaxHTML').jstree(true), sel = ref.get_selected(true);
    var proctocolId = sel[0].id;

    console.log($form.serialize());
        new ajaxObject({
            Url: URLDICTIONARY.instant + "/" + proctocolId + "/instant",
            data: $form.serialize(),
            type: "put",
            dataType: 'json',
            fun: function (data) {

                // terminalId = id;
                new PNotify({
                    title: "修改按钮",
                    text: "修改按钮成功"+JSON.stringify(data),
                    type: 'success'
                });
                $form.formValidation('disableSubmitButtons', false);

                $('.result-data').html(JSON.stringify(data));
              
            }

        });

    
    // Use Ajax to submit form data

    // Enable the submit buttons
    // .formValidation('resetForm', true);
});
	
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
	eModal.iframe({
		url : "vehicle/add",
	}, "删除车辆数据");
}

function createRow ()
{
	var ref = $('#treeAjaxHTML').jstree(true), sel = ref.get_selected(true);
	
	console.log(sel);
	var parentId='#';
	if (sel.length>0) {
		parentId=sel[0].id;
		if(sel[0].type!="file")
		{
			 new PNotify({
					title: "警告提示",
					text: "你选择的不是承载协议，请选择承载协议",
					type: 'info'
				});
			 return false;
		}
	}else
		{
		 new PNotify({
				title: "警告提示",
				text: "请选择承载协议",
				type: 'info'
			});
		    return false;
		}
	
	var rows=$('#tableserver').bootstrapTable('getSelections');
	 var tree =new  dictionaryTree({
		 protocolId:parentId,
		 data:{
			 proto_unid:parentId,
			 title:'test'
	      },
	      async:true,
	      complete:function(id){
	    	  
	    	  if(rows.length>0)
				 {
				    for(var i=0;i<rows.length;i++)
				    	
				    	{
						   $('#tableserver').bootstrapTable('insertRow', {
								index : 1,
								row :rows[i]
							});
				    	}
				 }else
				 {
				 $('#tableserver').bootstrapTable('insertRow', {
						index : 0,
						row :{
							 name:'test',
							 code:id,
							 proto_unid:parentId
						}
					});
				 
				 }
			 new PNotify({
					title: "新建数据项",
					text: "新建数据项成功",
					type: 'success'
				});
	      }
	 });
	 tree.createField();
}

function deleteRow()
{
	 var rows=$('#tableserver').bootstrapTable('getSelections');
	 console.log(rows);
	 
	 var ids = $.map($('#tableserver').bootstrapTable('getSelections'), function (row) {
		 
		  var tree =new  dictionaryTree({
			  protocolId:  row["proto_unid"],
			  fieldCode:row["code"],
			  async:true,
			  fun:function(){
				  
				  new PNotify({
						title: "数据项删除",
						text: "数据项删除成功",
						type: 'success'
					}); 
			  }
			  
		  });
		  tree.deleteField();
         return row.code;
     });
	console.log(ids);
	$('#tableserver').bootstrapTable('remove',{ 
		    	field: 'code',
                values: ids});
		 
	 
}
var vehicleDictionaryDemo = {
		 protocolId:'',
		createTable : function() {
			var that=this;
			object = new dataModelObject({
				viewId : VIEWKEY.dictionaryForField,
				tableId : "#tableserver",
				tableOptions:{
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
			
				vin:that.protocolId+"/field",
				onLoadBefore:function(data)
				{
					console.log(data);
					if(data&&data.length>0)
						{
					 var tempData=[];
					 
					 
					 $.each(data,function(i,field){
						 console.log(field);
						
				           var tempObject=	  $.extend({}, field,
				        		   {
				        	   code:field.key.code,
				        	   title:field.key.title,
				        	   alias:field.key.alias,
				        	   proto_unid:that.protocolId
				        	   });
				           
						   tempData.push(tempObject); 
						 
					 });
			
					return tempData;
						}
					//return data;
				},
				onEditableSave:function(field, row, oldValue, $el)
				{
					
					 var tree=new dictionaryTree({
						 protocolId:row["proto_unid"],
						 fieldKey:field,
						 fieldValue:row[field],
						 fieldCode:row["code"],
						 async:false,
						 fun:function(data)
						 {
							 new PNotify({
									title: "数据项修改",
									text: "数据项修改成功",
									type: 'success'
								}); 
							 
						 }
					 });
					//dictionaryTree.options.protocolId=row["proto_unid"];
					//dictionaryTree.options.fieldKey=field;
					//dictionaryTree.options.fieldValue=row[field];
					//dictionaryTree.options.fieldCode=row["code"];
					//dictionaryTree.options.async=false;
				    tree.updateField();
				//	row[field]=oldValue;
				//	console.log($el);
					
					return false;
					
				}
			});
			dataModelObject.staticObject=object;
			if($(object.viewOptions.tableId).bootstrapTable())
				{
			      $(object.viewOptions.tableId).bootstrapTable("destroy");
				}
			object.setViewTable();
		},
		updateField:function()
		{
			
		},
		idFormatter:function (value, row, index) {
			return [
					'<a class="like" href="javascript:void(0)" title="Like">',
					'<i class="glyphicon glyphicon-heart"></i>'+value,
					'</a>'
					 ].join('');
		},
	    idEvents :{
				'click .like' : function(e, value, row, index) {
					eModal.iframe({
						url : "vehicle/track",
					}, "单车-轨迹");
				}
		}

	};	