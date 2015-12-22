$(function() {
	
});

function pageStart()
{
	vehicleMonitoring.initPage();
}
var vehicleMonitoring = {

	initPage : function() {
		
		 var data1= function(){
				
				var data=[];
				for(var i=0;i<50;i++)
					{
					data.push(5+"");
					}
				return data;
			};
			var data2= function(){
				var data=[];
				for(var i=0;i<50;i++)
					{
					data.push(i+"");
					}
				return data;
			};
			
		dyLine1 = new dynamicChartData({
			chartOptions : {

				tooltip : {
					trigger : 'axis'
				},
			
				toolbox : {
					show : false,
					feature : {
						mark : {
							show : true
						},
						dataView : {
							show : true,
							readOnly : false
						},
						magicType : {
							show : true,
							type : [ 'line', 'bar' ]
						},
						restore : {
							show : true
						},
						saveAsImage : {
							show : true
						}
					}
				},
				grid : {
					x : 40,
					y : 30,
					x2 : 40,
					y2 : 30
				},
				dataZoom : {
					show : false,
					start : 0,
					end : 100
				},
				xAxis : [ {
					type : 'category',
					boundaryGap : true,
					data :data2()
				} ],
				yAxis : [ {
					type : 'value',
					axisLabel : {
						formatter : '{value} V'
					}
				} ],
				series : [ {
					name : '电压',
					type : 'bar',
					data :data1(),
					markPoint : {
						data : [ {
							name : '实时电压',
							value : 5,
							xAxis : 1,
							yAxis : 5
						}, {
							name : '实时电压',
							value : 5,
							xAxis : 3,
							yAxis : 5
						} ]
					},
					markLine : {
						data : [ {
							type : 'average',
							name : '平均值'
						} ]
					}
				} ]
			}

		});
	},
	setMarker : function() {

	},
	setLine : function() {
		/*
		 * var option={ lat:'', lng:'' }; option. lat=$(this).attr("lat");
		 * option. lng=$(this).attr("lng"); vehicleAddress.addMarker(option);
		 * return false;
		 */

	},
	setGauge : function() {
		var that = this;
		// console.log(that.datetimeArray[value].engineSpeed * 1);
		// console.log(that.datetimeArray[value].speed * 1);
		/*
		 * option.series[0].data[0].value = that.datetimeArray[value].speed * 1;
		 * option.series[1].data[0].value =
		 * that.datetimeArray[value].engineSpeed * 1;
		 * option.series[2].data[0].value = (Math.random() * 2).toFixed(2) - 0;
		 * option.series[3].data[0].value = (Math.random() * 2).toFixed(2) - 0;
		 * myChart.setOption(option, true);
		 */

	}

}

