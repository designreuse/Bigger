function  dynamicChartData(options){
    	var	defaultOptions={
    			elementId:'dynamicmain',
    			myChart:null,
    			chartOptions:{
    				
    				  tooltip : {
    				        trigger: 'axis'
    				    },
    				    legend: {
    				        data:['电压', '电流']
    				    },
    				    toolbox: {
    				        show : false,
    				        feature : {
    				            mark : {show: true},
    				            dataView : {show: true, readOnly: false},
    				            magicType : {show: true, type: ['line', 'bar']},
    				            restore : {show: true},
    				            saveAsImage : {show: true}
    				        }
    				    },
    				    grid:{
    				    	x:40,
    				    	y:30,
    				    	x2:40,
    				    	y2:30
    				    },
    				    dataZoom : {
    				        show : false,
    				        start : 0,
    				        end : 100
    				    },
    				    xAxis : [
    				        {
    				            type : 'category',
    				            boundaryGap : true,
    				            data : (function (){
    				                var now = new Date();
    				                var res = [];
    				                var len = 10;
    				                while (len--) {
    				                    res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
    				                    now = new Date(now - 2000);
    				                }
    				                return res;
    				            })()
    				        }
    				    ],
    				    yAxis : [
    				        {
    				        	
    				        	name : '电压',
    				            type : 'value',
    				            scale: true,
    				            boundaryGap: [0.2, 0.2]
    				        },
    				        {
    				        	
    				        	name : '电流',
    				            type : 'value',
    				            scale: true,
    				            boundaryGap: [0.2, 0.2]
    				        }
    				    ],
    				    series : [
    				        {
    				            name:'电压',
    				            type:'line',
    				            xAxisIndex: 0,
    				            yAxisIndex:0,
    				            data:(function (){
    				                var res = [];
    				                var len = 10;
    				                while (len--) {
    				                    res.push(Math.round(Math.random() * 1000));
    				                }
    				                return res;
    				            })()
    				        },
    				        {
    				            name:'电流',
    				            type:'line',
    				            xAxisIndex: 0,
    				            yAxisIndex: 1,
    				            data:(function (){
    				                var res = [];
    				                var len = 10;
    				                while (len--) {
    				                    res.push(Math.round(Math.random() * 1000));
    				                }
    				                return res;
    				            })()
    				        }
    				    ]
  			   }
    		};
        this.options=$.extend(defaultOptions,options||{});	
        this.initChart();
    }
    dynamicChartData.extend({
    	
    	
    	initChart:function(){
    	    var that = this;

    	    // 使用
    	    require(
                [
                    'echarts',
                     'echarts/chart/line',
                    'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
                ],
                function (ec) {
                    // 基于准备好的dom，初始化echarts图表
                    that.options.myChart = ec.init(document.getElementById(that.options.elementId));
                    that.setOptions();
                }
            );


    		
    		
    	},
    	setOptions:function()
    	{
    		var that=this;
    		that.options.myChart.setOption(that.options.chartOptions);
    	},
    	getMyChart:function()
    	{
    		var that=this;
    		return that.options.myChart;
    		
    	}
    	
    	
    });