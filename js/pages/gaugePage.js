 
    function gaugePage(options)
    {
    	var defaultOptions={
    			elementId:'main',
    			chartOptions:{
    			    tooltip : {
    			        formatter: "{a} <br/>{c} {b}"
    			    },
    			   
    			    toolbox: {
    			        show : true,
    			        feature : {
    			            mark : {show: true},
    			            restore : {show: true},
    			            saveAsImage : {show: true}
    			        }
    			    },
    			    series : [
    			        {
    			            name:'速度',
    			            type:'gauge',
    			            z: 3,
    			            min:0,
    			            max:220,
    			            splitNumber:11,
    			            axisLine: {            // 坐标轴线
    			                lineStyle: {       // 属性lineStyle控制线条样式
    			                    width: 10
    			                }
    			            },
    			            axisTick: {            // 坐标轴小标记
    			                length :15,        // 属性length控制线长
    			                lineStyle: {       // 属性lineStyle控制线条样式
    			                    color: 'auto'
    			                }
    			            },
    			            splitLine: {           // 分隔线
    			                length :20,         // 属性length控制线长
    			                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
    			                    color: 'auto'
    			                }
    			            },
    			            title : {
    			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
    			                    fontWeight: 'bolder',
    			                    fontSize: 10,
    			                    fontStyle: 'italic'
    			                }
    			            },
    			            detail : {
    			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
    			                    fontWeight: 'bolder',
    			                    fontSize: 20
    			                }
    			            },
    			            data:[{value: 40, name: 'km/h'}]
    			        },
    			        {
    			            name:'转速',
    			            type:'gauge',
    			            center : ['25%', '55%'],    // 默认全局居中
    			            radius : '50%',
    			            min:0,
    			            max:7,
    			            endAngle:45,
    			            splitNumber:7,
    			            axisLine: {            // 坐标轴线
    			                lineStyle: {       // 属性lineStyle控制线条样式
    			                    width: 8
    			                 
    			                }
    			            },
    			            axisTick: {            // 坐标轴小标记
    			                length :12,        // 属性length控制线长
    			                lineStyle: {       // 属性lineStyle控制线条样式
    			                    color: 'auto'
    			                }
    			            },
    			            splitLine: {           // 分隔线
    			                length :20,         // 属性length控制线长
    			                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
    			                    color: 'auto'
    			                }
    			            },
    			            pointer: {
    			                width:5
    			            },
    			            title : {
    			                offsetCenter: [0, '-30%'],       // x, y，单位px
    			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
    			                    fontWeight: 'bolder',
    			                    fontSize: 5,
    			                    fontStyle: 'italic'
    			                }
    			            },
    			            
    			            detail : {
    			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
    			                    fontWeight: 'bolder'
    			           
    			                }
    			            },
    			            data:[{value: 1.5, name: 'x1000 r/min'}]
    			        },
    			        {
    			            name:'油表',
    			            type:'gauge',
    			            center : ['75%', '50%'],    // 默认全局居中
    			            radius : '50%',
    			            min:0,
    			            max:2,
    			            startAngle:135,
    			            endAngle:45,
    			            splitNumber:2,
    			            axisLine: {            // 坐标轴线
    			                lineStyle: {       // 属性lineStyle控制线条样式
    			                    color: [[0.2, '#ff4500'],[0.8, '#48b'],[1, '#228b22']], 
    			                    width: 8
    			                }
    			            },
    			            axisTick: {            // 坐标轴小标记
    			                splitNumber:5,
    			                length :10,        // 属性length控制线长
    			                lineStyle: {       // 属性lineStyle控制线条样式
    			                    color: 'auto'
    			                }
    			            },
    			            axisLabel: {
    			                formatter:function(v){
    			                    switch (v + '') {
    			                        case '0' : return 'E';
    			                        case '1' : return 'Gas';
    			                        case '2' : return 'F';
    			                    }
    			                }
    			            },
    			            splitLine: {           // 分隔线
    			                length :15,         // 属性length控制线长
    			                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
    			                    color: 'auto'
    			                }
    			            },
    			            pointer: {
    			                width:2
    			            },
    			            title : {
    			                show: false
    			            },
    			            detail : {
    			                show: false
    			            },
    			            data:[{value: 0.5, name: 'gas'}]
    			        },
    			        {
    			            name:'水表',
    			            type:'gauge',
    			            center : ['75%', '50%'],    // 默认全局居中
    			            radius : '50%',
    			            min:0,
    			            max:2,
    			            startAngle:315,
    			            endAngle:225,
    			            splitNumber:2,
    			            axisLine: {            // 坐标轴线
    			                lineStyle: {       // 属性lineStyle控制线条样式
    			                    color: [[0.2, '#ff4500'],[0.8, '#48b'],[1, '#228b22']], 
    			                    width: 8
    			                }
    			            },
    			            axisTick: {            // 坐标轴小标记
    			                show: false
    			            },
    			            axisLabel: {
    			                formatter:function(v){
    			                    switch (v + '') {
    			                        case '0' : return 'H';
    			                        case '1' : return 'Water';
    			                        case '2' : return 'C';
    			                    }
    			                }
    			            },
    			            splitLine: {           // 分隔线
    			                length :15,         // 属性length控制线长
    			                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
    			                    color: 'auto'
    			                }
    			            },
    			            pointer: {
    			                width:2
    			            },
    			            title : {
    			                show: false
    			            },
    			            detail : {
    			                show: false
    			            },
    			            data:[{value: 0.5, name: 'gas'}]
    			        }
    			    ]
    			},
    			
    			myChart:null
    	};
    	
    	this.options=$.extend(defaultOptions,options||{});
    	this.initPage();	
    	
    }
    gaugePage.extend({
    	initPage:function()
		{
			var that=this;
			that.options.myChart = echarts.init(document.getElementById(that.options.elementId));	
			that.options.myChart.setOption(that.options.chartOptions);
		},
		setOption:function()
		{
			var that=this;
			that.options.myChart.setOption(that.options.chartOptions);
		},
		getOption:function(){
			
			var that=this;
			return that.options.chartOptions;
		}
    });