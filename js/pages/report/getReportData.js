function getReportData(options)
{
     var defaultOptions={
    		 viewId : '',
				vin : '',
				fun : function(data, search, vin) {
					// console.log(data);
					/*if (data) {
						var data = that.reportOptions.dataFunction
								.call(that, data);
						that.analysisData(vin, data, search);
						var tempOptions = that.options.mapPageOptions[vin];
						tempOptions.search.page_id = tempOptions.search.page_id
								+ tempOptions.search.page_size;
						that.options.mapPageOptions[vin] = $.extend({},
								tempOptions);
						that.getData(tempOptions);
					}*/
				},
				search : {// 定义页面 大小和页面索引
					page_id : 0,
					page_size : 100,
					date_from : '',
					date_to : ''
				}
     };	
     this.options=$.extend({},defaultOptions,options||{});
     this.init();
}
getReportData.extend({
	init:function(){
		var dm = new dataModelObject(options);
		dm.getViewData();
	}
	
});