<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html lang="en">
<head>
<base href="<%=basePath%>">

<title>ECharts</title>

</head>
<body>
	<!-- 为ECharts准备一个具备大小（宽高）的Dom -->
	<div
		style="height:80px; position:  relative; backgroud-color:red; width:200px;border:1px solid #ccc;padding:10px;">
		<div id="mainMap"
			style="height:80px; position:  relative; backgroud-color:red; width:200px;border:1px solid #ccc;padding:10px;">
		</div>
	</div>

	<script type='text/javascript' src="js/echart/echarts-all.js"></script>
	<script type="text/javascript">
		var myChart;
		var option;
		var ec2;
		var selectedProvince;

		// 使用

		// 基于准备好的dom，初始化echarts图表
		myChart = echarts.init(document.getElementById('mainMap'));
		option = {
			tooltip : {
				trigger : 'item'
			},

			series : [ {
				tooltip : {
					trigger : 'item',
					formatter : '<br/>{a}<br/>{b}:{c}'
				},
				name : '选择器',
				type : 'map',
				mapType : 'china',
				roam : false,
				selectedMode : 'single',
				itemStyle : {
					//normal:{label:{show:true}},
					emphasis : {
						label : {
							show : true
						}
					}
				},
				data : [ {
					name : '北京',
					value : Math.round(Math.random() * 1000),
					selected : false
				}, {
					name : '天津',
					value : Math.round(Math.random() * 1000),
					selected : false
				}, {
					name : '上海',
					value : Math.round(Math.random() * 1000),
					selected : false
				}, {
					name : '重庆',
					value : Math.round(Math.random() * 1000),
					selected : false
				}, {
					name : '河北',
					value : Math.round(Math.random() * 1000),
					selected : false
				}, {
					name : '河南',
					value : Math.round(Math.random() * 1000),
					selected : false
				}, {
					name : '云南',
					value : Math.round(Math.random() * 1000),
					selected : false
				}, {
					name : '辽宁',
					value : Math.round(Math.random() * 1000),
					selected : false
				}, {
					name : '黑龙江',
					value : Math.round(Math.random() * 1000),
					selected : false
				}, {
					name : '湖南',
					value : Math.round(Math.random() * 1000),
					selected : false
				}, {
					name : '安徽',
					value : Math.round(Math.random() * 1000),
					selected : false
				}, {
					name : '山东',
					value : Math.round(Math.random() * 1000),
					selected : false
				}, {
					name : '新疆',
					value : Math.round(Math.random() * 1000),
					selected : false
				}, {
					name : '江苏',
					value : Math.round(Math.random() * 1000),
					selected : false
				}, {
					name : '浙江',
					value : Math.round(Math.random() * 1000),
					selected : false
				}, {
					name : '江西',
					value : Math.round(Math.random() * 1000),
					selected : false
				}, {
					name : '湖北',
					value : Math.round(Math.random() * 1000),
					selected : false
				}, {
					name : '广西',
					value : Math.round(Math.random() * 1000),
					selected : false
				}, {
					name : '甘肃',
					value : Math.round(Math.random() * 1000),
					selected : false
				}, {
					name : '山西',
					value : Math.round(Math.random() * 1000),
					selected : false
				}, {
					name : '内蒙古',
					value : Math.round(Math.random() * 1000),
					selected : false
				}, {
					name : '陕西',
					value : Math.round(Math.random() * 1000),
					selected : false
				}, {
					name : '吉林',
					value : Math.round(Math.random() * 1000),
					selected : false
				}, {
					name : '福建',
					value : Math.round(Math.random() * 1000),
					selected : false
				}, {
					name : '贵州',
					value : Math.round(Math.random() * 1000),
					selected : false
				}, {
					name : '广东',
					value : Math.round(Math.random() * 1000),
					selected : false
				}, {
					name : '青海',
					value : Math.round(Math.random() * 1000),
					selected : false
				}, {
					name : '西藏',
					value : Math.round(Math.random() * 1000),
					selected : false
				}, {
					name : '四川',
					value : Math.round(Math.random() * 1000),
					selected : false
				}, {
					name : '宁夏',
					value : Math.round(Math.random() * 1000),
					selected : false
				}, {
					name : '海南',
					value : Math.round(Math.random() * 1000),
					selected : false
				}, {
					name : '台湾',
					value : Math.round(Math.random() * 1000),
					selected : false
				}, {
					name : '香港',
					value : Math.round(Math.random() * 1000),
					selected : false
				}, {
					name : '澳门',
					value : Math.round(Math.random() * 1000),
					selected : false
				} ]
			} ],
		//animation : false
		};
		myChart.setOption(option);

		$(function() {

			$("#mainMap").hover(function() {
				// 为echarts对象加载数据 
				myChart.showLoading();
				$(this).width(500).height(400);
				$(this).parent().width(500).height(400);
				myChart.clear();
				myChart = echarts.init(document.getElementById("mainMap"));
				setTimeout(refreshG, 500);

			}, function() {

				myChart.showLoading();
				myChart.clear();
				$(this).width(200).height(60);
				$(this).parent().width(200).height(60);
				myChart = echarts.init(document.getElementById("mainMap"));
				setTimeout(refresh, 500);

			});

		});

		function refreshG() {

			var array = dataResfresh();
			myChart.hideLoading();
			myChart.setOption({
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
					calculable : true
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
								show : true
							}
						},
						emphasis : {
							label : {
								show : true
							}
						}
					},
					data : array
				} ]

			});
			var ecConfig = echarts.config;
			myChart.on(ecConfig.EVENT.MAP_SELECTED, function(param) {
				var selected = param.selected;

				var name;
				for (var i = 0, l = option.series[0].data.length; i < l; i++) {
					name = option.series[0].data[i].name;
					option.series[0].data[i].selected = selected[name];
					if (selected[name]) {
						selectedProvince = name;
						
						if(typeof(addProvince)=="function")
					      addProvince&&addProvince(name);
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

		}

		function refresh() {

			myChart.hideLoading();
			myChart.setOption(option);
		}

		//数据刷新
		function dataResfresh() {
			var array = [ {
				name : '北京',
				value : Math.round(Math.random() * 1000),
				selected : false
			}, {
				name : '天津',
				value : Math.round(Math.random() * 1000),
				selected : false
			}, {
				name : '上海',
				value : Math.round(Math.random() * 1000),
				selected : false
			}, {
				name : '重庆',
				value : Math.round(Math.random() * 1000),
				selected : false
			}, {
				name : '河北',
				value : Math.round(Math.random() * 1000),
				selected : false
			}, {
				name : '河南',
				value : Math.round(Math.random() * 1000),
				selected : false
			}, {
				name : '云南',
				value : Math.round(Math.random() * 1000),
				selected : false
			}, {
				name : '辽宁',
				value : Math.round(Math.random() * 1000),
				selected : false
			}, {
				name : '黑龙江',
				value : Math.round(Math.random() * 1000),
				selected : false
			}, {
				name : '湖南',
				value : Math.round(Math.random() * 1000),
				selected : false
			}, {
				name : '安徽',
				value : Math.round(Math.random() * 1000),
				selected : false
			}, {
				name : '山东',
				value : Math.round(Math.random() * 1000),
				selected : false
			}, {
				name : '新疆',
				value : Math.round(Math.random() * 1000),
				selected : false
			}, {
				name : '江苏',
				value : Math.round(Math.random() * 1000),
				selected : false
			}, {
				name : '浙江',
				value : Math.round(Math.random() * 1000),
				selected : false
			}, {
				name : '江西',
				value : Math.round(Math.random() * 1000),
				selected : false
			}, {
				name : '湖北',
				value : Math.round(Math.random() * 1000),
				selected : false
			}, {
				name : '广西',
				value : Math.round(Math.random() * 1000),
				selected : false
			}, {
				name : '甘肃',
				value : Math.round(Math.random() * 1000),
				selected : false
			}, {
				name : '山西',
				value : Math.round(Math.random() * 1000),
				selected : false
			}, {
				name : '内蒙古',
				value : Math.round(Math.random() * 1000),
				selected : false
			}, {
				name : '陕西',
				value : Math.round(Math.random() * 1000),
				selected : false
			}, {
				name : '吉林',
				value : Math.round(Math.random() * 1000),
				selected : false
			}, {
				name : '福建',
				value : Math.round(Math.random() * 1000),
				selected : false
			}, {
				name : '贵州',
				value : Math.round(Math.random() * 1000),
				selected : false
			}, {
				name : '广东',
				value : Math.round(Math.random() * 1000),
				selected : false
			}, {
				name : '青海',
				value : Math.round(Math.random() * 1000),
				selected : false
			}, {
				name : '西藏',
				value : Math.round(Math.random() * 1000),
				selected : false
			}, {
				name : '四川',
				value : Math.round(Math.random() * 1000),
				selected : false
			}, {
				name : '宁夏',
				value : Math.round(Math.random() * 1000),
				selected : false
			}, {
				name : '海南',
				value : Math.round(Math.random() * 1000),
				selected : false
			}, {
				name : '台湾',
				value : Math.round(Math.random() * 1000),
				selected : false
			}, {
				name : '香港',
				value : Math.round(Math.random() * 1000),
				selected : false
			}, {
				name : '澳门',
				value : Math.round(Math.random() * 1000),
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
	</script>
</body>
</html>
