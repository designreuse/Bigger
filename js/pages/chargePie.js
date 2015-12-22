	


var chargePie={
		options:{
			myChart:null,
			pieoption:null
		},
		initPage:function()
		{
			var that=this;
			var myChart = echarts.init(document.getElementById('chargPie'));
			that.options.myChart=myChart;
			var labelTop = {
				normal : {
					label : {
						show : true,
						position : 'center',
						formatter : '{b}',
						textStyle : {
							baseline : 'bottom'
						}
					},
					labelLine : {
						show : false
					}
				}
			};
			var labelFromatter = {
				normal : {
					label : {
						formatter : function(params) {
							return 100 - params.value + '%'
						},
						textStyle : {
							baseline : 'top'
						}
					}
				},
			}
			var labelBottom = {
				normal : {
					color : '#ccc',
					label : {
						show : true,
						position : 'center'
					},
					labelLine : {
						show : false
					}
				},
				emphasis : {
					color : 'rgba(0,0,0,0)'
				}
			};
			var radius = [ 40, 55 ];
		 that.options.pieoption	 = {

				
				toolbox : {
					show : false,
					feature : {
						dataView : {
							show : true,
							readOnly : false
						},
						magicType : {
							show : true,
							type : [ 'pie', 'funnel' ],
							option : {
								funnel : {
									width : '100%',
									height : '130%',
									itemStyle : {
										normal : {
											label : {
												formatter : function(params) {
													return 'other\n' + params.value
															+ '%\n'
												},
												textStyle : {
													baseline : 'middle'
												}
											}
										},
									}
								}
							}
						},
						restore : {
							show : true
						},
						saveAsImage : {
							show : true
						}
					}
				},
				series : [ {
					type : 'pie',
					center : [ '50%', '50%' ],
					radius : radius,
					x : '0%', // for funnel
					itemStyle : labelFromatter,
					data : [ {
						name : 'other',
						value : 46.0,
						itemStyle : labelBottom
					}, {
						name : 'Charge',
						value : 54,
						itemStyle : labelTop
					} ]
				},

				]
			};
			myChart.setOption(that.options.pieoption);
			
		}
}



