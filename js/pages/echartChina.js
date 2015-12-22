   
function pageStart_Three()
{
	echartChina.init();	
}
var echartChina={
		
		init:function()
		{
			
			var mapWidth=$("#mainMap").parent().width();

			$("#mainMap").height($("#mainMap").parent().width());
			$("#mapC").height($("#mainMap").parent().width());
			   var selectedProvince;
				var myChart = echarts.init(document.getElementById("mainMap"));
				var array = dataResfresh();
				var option={
						tooltip : {
							trigger : 'item',
							formatter : '{b}'
						},
						dataRange : {
							min : 0,
							max : 2500,
							x : 'left',
							y : 'bottom',
							text : [ '高', '低' ], // 文本，默认为数值文本
							calculable : false
						},
						series : [ {
							name : '中国',
							type : 'map',
							tooltip : {
								trigger : 'item',
								formatter : '{a}<br/>{b}:{c}'
							},
							mapType : 'china',
							selectedMode : 'single',
							itemStyle : {
								normal : {
									label : {
										show : false
									}
								},
								emphasis : {
									label : {
										show : false
									}
								}
							},
							data : array
						} ]

					};
					
					myChart.setOption(option);
					var ecConfig = echarts.config;
					myChart.on(ecConfig.EVENT.MAP_SELECTED, function(param) {
						var selected = param.selected;

						var name;
						for (var i = 0, l = option.series[0].data.length; i < l; i++) {
							name = option.series[0].data[i].name;
							option.series[0].data[i].selected = selected[name];
							if (selected[name]) {
								selectedProvince = name;
								
								if(typeof(cluster.searchProvince)=="function")
								{
									cluster.searchProvince&&cluster.searchProvince(name);
								}
							      
							}
						}
						if (typeof selectedProvince == 'undefined') {
							option.series.splice(1);
							option.legend = null;
							option.dataRange = null;
							myChart.setOption(option, true);
							return;
						}

					});
				//数据刷新
				function dataResfresh() {
					var array = [ {
						name : '北京',
						value : Math.round(Math.random() *0),
						selected : false
					}, {
						name : '天津',
						value : Math.round(Math.random() * 0),
						selected : false
					}, {
						name : '上海',
						value : Math.round(Math.random() * 0),
						selected : false
					}, {
						name : '重庆',
						value : Math.round(Math.random() * 0),
						selected : false
					}, {
						name : '河北',
						value : Math.round(Math.random() * 0),
						selected : false
					}, {
						name : '河南',
						value : Math.round(Math.random() * 0),
						selected : false
					}, {
						name : '云南',
						value : Math.round(Math.random() * 0),
						selected : false
					}, {
						name : '辽宁',
						value : Math.round(Math.random() * 0),
						selected : false
					}, {
						name : '黑龙江',
						value : Math.round(Math.random() * 0),
						selected : false
					}, {
						name : '湖南',
						value : Math.round(Math.random() * 0),
						selected : false
					}, {
						name : '安徽',
						value : Math.round(Math.random() * 0),
						selected : false
					}, {
						name : '山东',
						value : Math.round(Math.random() * 0),
						selected : false
					}, {
						name : '新疆',
						value : Math.round(Math.random() * 0),
						selected : false
					}, {
						name : '江苏',
						value : Math.round(Math.random() * 0),
						selected : false
					}, {
						name : '浙江',
						value : Math.round(Math.random() * 0),
						selected : false
					}, {
						name : '江西',
						value : Math.round(Math.random() * 0),
						selected : false
					}, {
						name : '湖北',
						value : Math.round(Math.random() * 0),
						selected : false
					}, {
						name : '广西',
						value : Math.round(Math.random() * 0),
						selected : false
					}, {
						name : '甘肃',
						value : Math.round(Math.random() * 0),
						selected : false
					}, {
						name : '山西',
						value : Math.round(Math.random() * 0),
						selected : false
					}, {
						name : '内蒙古',
						value : Math.round(Math.random() * 0),
						selected : false
					}, {
						name : '陕西',
						value : Math.round(Math.random() * 0),
						selected : false
					}, {
						name : '吉林',
						value : Math.round(Math.random() * 0),
						selected : false
					}, {
						name : '福建',
						value : Math.round(Math.random() * 0),
						selected : false
					}, {
						name : '贵州',
						value : Math.round(Math.random() * 0),
						selected : false
					}, {
						name : '广东',
						value : Math.round(Math.random() * 0),
						selected : false
					}, {
						name : '青海',
						value : Math.round(Math.random() * 0),
						selected : false
					}, {
						name : '西藏',
						value : Math.round(Math.random() * 0),
						selected : false
					}, {
						name : '四川',
						value : Math.round(Math.random() * 0),
						selected : false
					}, {
						name : '宁夏',
						value : Math.round(Math.random() * 0),
						selected : false
					}, {
						name : '海南',
						value : Math.round(Math.random() * 0),
						selected : false
					}, {
						name : '台湾',
						value : Math.round(Math.random() * 0),
						selected : false
					}, {
						name : '香港',
						value : Math.round(Math.random() * 0),
						selected : false
					}, {
						name : '澳门',
						value : Math.round(Math.random() * 0),
						selected : false
					} ];

					if (selectedProvince != "undefined") {
						for (var i = 0; i < array.length; i++) {
							if (array[i].name == selectedProvince) {
								array[i].selected = true;
								break;
							}
						}
					}
					return array;
				}
				
				window.onresize = myChart.resize;
			
		}
}

       