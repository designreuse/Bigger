/**
 * 分析数据
 */
function analysisData(options) {
	var defaultOptions = {
		field : '',// 分析字段
		type : '',// 分析类型frequencyRange,frequencyValue,totalAnalysisRange,totalAnalysisValue
		xData:[],
		result : {},
		result : function(result) {

		}
	};
	this.options = $.extend({}, defaultOptions, options);
	this.init();
}
analysisData.extend({

	init : function() {
		var that = this;
		if (type == "frequencyRange") {
			that.frequencyAnalysisRange();
		} else if(type == "frequencyValue") {
			that.frequencyAnalysisValue();
		}else if(type=="totalAnalysisRange"){
			
			that.totalAnalysisRange();
		}else if(type=="totalAnalysisValue")
			{
			 that.totalAnalysisValue();
			}
	},
	frequencyAnalysisVaule:function()
	{
		var that=this;
		//初始化Y轴数据
		$.each(that.xData,function(i,field){
			that.result[field]=0;
		});
		$.each(that.data,function(i,field){
			
		   var index= that.judgementValue(field[that.field]);
		   that.result[that.xData[index]]++;
		});
		that.result.call(that,that,result);
		
	},
	totalAnalysisValue : function() {
		var that=this;
		//初始化Y轴数据
		$.each(that.xData,function(i,field){
			that.result[field]=0;
		});
		$.each(that.data,function(i,field){
			
		   var index= that.judgementValue(field[that.field]);
		   that.result[that.xData[index]]= that.result[that.xData[index]]+field[that.field];
		});
		that.result.call(that,that,result);
	},
	judgementValue:function(value){
		 var that=this;
		$.each(that.xData,function(i,field){
			
			if(value==field)
			{
				 return i;
			}
		});
	    return -1;
		
	},
	frequencyAnalysisRange : function() {
		var that=this;
		//初始化Y轴数据
		$.each(that.xData,function(i,field){
			that.result[field]=0;
		});
		$.each(that.data,function(i,field){
			
		   var index= that.judgementCustom(field[that.field]);
		   that.result[that.xData[index]]++;
		});
		that.result.call(that,that,result);
	},
	judgementRange:function(value){
		 var that=this;
		$.each(that.xData,function(i,field){
			var temapArray=field.split('-');
			if(value*1>=tmepArray[0]*1&&value<=tempArray[1])
				{
				 return i;
				}
		});
	    return -1;
		
	},
	totalAnalysisRange : function() {
		var that=this;
		//初始化Y轴数据
		$.each(that.xData,function(i,field){
			that.result[field]=0;
		});
		$.each(that.data,function(i,field){
			
		   var index= that.judgementCustom(field[that.field]);
		   that.result[that.xData[index]]= that.result[that.xData[index]]+field[that.field];
		});
		that.result.call(that,that,result);
	}
});