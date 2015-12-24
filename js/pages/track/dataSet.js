
$(function(){


})
function pageStart_One()
{
 $("select[name='dataSelect']").select2({
	 placeholder : "请选择实时数据",
	 data : []
 });
	 track=	new vehicleTrack();
}
function vehicleTrack(options) {
 var optionsDefault = {
	 fiberId : '098E11E36A024692A257DB72306137FF',
	 timeTicket : 10,// 10秒钟轮询一次
	 fieldsUrl : URLDICTIONARY.fiber,
	 dataUrl:URLDICTIONARY.sensor,
	 vin : vin,
	 data:[],
	 fields:[]
 };
 var that=this;
 new ajaxObject({
	 Url:URLDICTIONARY.vehicleList+"/"+vin,
	 fun:function(data){
			 that.options = $.extend({}, optionsDefault, options || {});
			 that.initPage();
	 }
 });
}
vehicleTrack.extend({
		 initPage : function() {
			 var that = this;
			 new ajaxObject({
				 Url : that.options.fieldsUrl + "/" + that.options.fiberId,
				 fun : function(data) {
					 //$("#column_group").trigger('loading-overlay:hide');
					 if (typeof data == "object") {
						 var column_group = data.column_group;
							that.options.data=[];//置空数据
							that.groupObject(column_group);
							$.fn.select2.defaults.reset();
							console.log("实时数据");
							console.log(that.options.data);
						 $("select[name='dataSelect']").select2({
							 placeholder : "请选择实时数据",
							 data : that.options.data
						 }).on("select2:select", function(e) {
							 var args = JSON.stringify(e.params, function(key, value) {
								 if (value && value.nodeName)
									 return "[DOM node]";
								 if (value instanceof $.Event)
									 return "[$.Event]";
								 return value;
							 });
							 var id = JSON.parse(args).data.id;
							 var text= JSON.parse(args).data.text;
							 console.log(id);
							 $("#dynamicData").append(
									 [ '<div class="col-md-6" id="'+id+'">',
													 '<div class="form-group ">',
											 '<label class="col-sm-7  control-label">'
													 + text + ':</label>',
											 '<label  name ="' + id
													 + '"class="col-sm-5"></label>',
											 '</div></div>' ].join(" "));

						 }).on("select2:unselect", function(e) {
							 var args = JSON.stringify(e.params, function(key, value) {
								 if (value && value.nodeName)
									 return "[DOM node]";
								 if (value instanceof $.Event)
									 return "[$.Event]";
								 return value;
							 });

							 var id = JSON.parse(args).data.id;
							 var text= JSON.parse(args).data.text;
							 $("#dynamicData #"+id).remove();
						 });;

					 }
				 }
			 });
		 },
		 groupObject : function(object) {

			 var that = this;
			 var columns = object.columns;
			 if(object.type)
				 {
						 var tempArray=[];
					 $.each(columns, function(i, field) {//如果有数据
						 that.options.fields.push(field.code);
						 tempArray.push({
							 id:field.code,
							 text:field.title
						 });
					 });
					 if(tempArray.length>0)
						 {
							 that.options.data.push({
									 text:object.name,
									 children: tempArray,
									 elment: HTMLOptGroupElement
							 });
						 }

					 var group = object.groups;//如果有子域，继续查询

							 $.each(group,function(i, field) {
							 if(field.columns.length>0||field.groups.length>0)
								 {
										that.typeData(field);
								 }

						 });

				 }else
					 {
					 var group = object.groups;

					 $.each(group,function(i, field) {
							 if(field.columns.length>0||field.groups.length>0)
								 {
										that.groupObject(field);
								 }
						 });
					 }
		 },
		 typeData:function(object)
		 {
			 var tempArray=[];
			 var that = this;
			 var columns = object.columns;
				 $.each(columns, function(i, field) {
					 that.options.fields.push(field.code);
					 tempArray.push({
						 id:field.code,
						 text:field.title
					 });
				 });
				 if(tempArray.length>0)
				 {
					 that.options.data.push({
							 text:object.name,
							 children: tempArray,
							 elment: HTMLOptGroupElement
					 });
				 }
				 var group = object.groups;
				 $.each(group,function(i, field) {
					 if(field.columns.length>0||field.groups.length>0)
					 {
							that.typeData(field);
					 }
				 });
		 },
		 setCurrentData : function(fields,values) {
			 var that = this;
			 $.each(fields,function(i,field){
				 $("#dynamicData label[name='"+field+"']").html(values[i]);
			 });
		 }

 });
