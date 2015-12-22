$(function (){
	vehicleMonosomicAnalysis.initPage();
});
var vehicleMonosomicAnalysis={
		
		initPage:function()
		{
			 dyLine1=new dynamicChartData();	
		},
        setMarker:function()
        {
        	
        	
        }
		,setLine:function()
		{
			/*var option={ lat:'',
				     lng:''
					};
			option. lat=$(this).attr("lat");
			option. lng=$(this).attr("lng");
			vehicleAddress.addMarker(option);
			return false;*/
			
		}
		,
		setGauge:function ()
		{
			var that = this;
			//console.log(that.datetimeArray[value].engineSpeed * 1);
			//console.log(that.datetimeArray[value].speed * 1);
		/*	option.series[0].data[0].value = that.datetimeArray[value].speed * 1;
			option.series[1].data[0].value = that.datetimeArray[value].engineSpeed * 1;
			option.series[2].data[0].value = (Math.random() * 2).toFixed(2) - 0;
			option.series[3].data[0].value = (Math.random() * 2).toFixed(2) - 0;
			myChart.setOption(option, true);*/
			
		}
		
}