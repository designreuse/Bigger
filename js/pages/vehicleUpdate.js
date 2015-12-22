
$(function(){

	vin=GetQueryString("vin");
	if(vin)
		{
			$("input[name='vin']").attr("disabled","disabled");
			$(".terminal").attr("disabled","disabled");
			new ajaxObject({
				Url:URLDICTIONARY.device_bind+'/vin/'+vin,
				dataType:'text',
				fun:function(data)
				{
					$(".terminal").removeAttr("disabled");
					if(data!=null&&data!='')
						{
						    terminalId=data;
							new ajaxObject({
								Url:URLDICTIONARY.device+"/"+terminalId,
								fun:function(data)
								{
									//console.log("终端详情");
									//console.log(data);
									terminalObject=data;
									setTerminalValue();
								}
							});
						}


				}
			});

		}


});
terminalObject=null;
vehicleObject=null;
function setTerminalValue()
{
	if(terminalObject!=null)
		{
			for(var p in  terminalObject)
			{
				 $("#device input[name='"+p+"']").val(terminalObject[p]);
				 if($("#device select[name='"+p+"']").size()>0)
					 {
			           $("#device select[name='"+p+"']").select2("val", terminalObject[p]);
					 }
			}
		}
}
function setValue()
{
	if(vehicleObject!=null&&vin)
		{
		for(var p in  vehicleObejct)
		{
			 $("input[name='"+p+"']").val(vehicleObejct[p]);
			  if($("#vehicle select[name='"+p+"']").size()>0)

				  {
			  $("#vehicle select[name='"+p+"']").select2("val", vehicleObejct[p]);
				  }
		}

		}else if(vin)
			{
			new ajaxObject({
				Url:URLDICTIONARY.vehicleList+"/"+vin,
				fun:function(data)
				{
					vehicleObejct=data;
					//console.log(vehicleObejct);
					for(var p in  vehicleObejct)
					{
						////console.log(p);
						////console.log(vehicleObejct[p]);
					  $("input[name='"+p+"']").val(vehicleObejct[p]);
					  if($("#vehicle select[name='"+p+"']").size()>0)
						  {
					  $("#vehicle select[name='"+p+"']").select2("val", vehicleObejct[p]);
					}}

				}

			});


			}
}
