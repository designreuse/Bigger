/*
 * created by 2015-11-8 8:57
 * 用于完成页面地图的打点，划线，聚合等
 * */

function vehicleAddress(options) {
	var defaultOptions = {
	    elementId:'mapAddress',
		markerOptions : {},
		marker : null,
		map : null,
		polyline : null,
		markers : [],
		isFirst:true
	};
	this.options = $.extend(defaultOptions, options || {});
	this.createMap();
}

vehicleAddress.extend({
			createMap : function() {
				var that = this;
				that.options.map = new AMap.Map(
						that.options.elementId,
						{
							resizeEnable : true,
							center : [ 116.397428, 39.90923 ],
							zoom : 13,
							mapStyle : 'light'
							
						});
				// 地图类型切换
				that.options.map.plugin([ "AMap.MapType" ], function() {
					var type = new AMap.MapType({
						defaultType : 0
					});
					that.options.map.addControl(type);
				});
				// 地图中添加地图操作ToolBar插件
				that.options.map.plugin([ "AMap.ToolBar" ], function() {
					var toolBar = new AMap.ToolBar();
					that.options.map.addControl(toolBar);
				});
				that.options.map.setLang('zh_en');// en\'zh_cn

			},
			addMarker : function(markerOption,isLine) {
				var that = this;

				that.options.marker && that.options.marker.setMap(null);
				var lng = 116.405467;
				var lat = 39.907761;
				if (markerOption && markerOption.lat) {
					lat = markerOption.lat;
				}
				if (markerOption && markerOption.lng) {
					lng = markerOption.lng;

				}

				that.options.marker = new AMap.Marker({
					offset : {
						x : -12.5,
						y : -32.5
					},
					content : '<div class="info  " style="color: white;"><i class="el el-car info markerActive" aria-hidden="true"></i><div>',
					position : [ lng, lat ]
				});
				that.options.marker.setMap(that.options.map);
				if(that.options.isFirst)
					{
					that.options.map.setCenter([ lng, lat ]);
					that.options.isFirst=false;
					}
			
				if(isLine)
					{
					that.options.markers.push([ lng, lat ]);
					that.setLine();
				    }
				//console.log(that.options.markers);
			},
			addMarkerToArray : function(lng, lat) {
				var that = this;
				that.options.markers.push([ lng, lat ]);
			},
			addMarkersArray:function(markers)
			{
				that.options.markers=markers;
			},
			setLine : function() {
				var that = this;
			//	console.log(that.options.markers);
				// 在地图上画线
				if (that.options.polyline) {
					// 新线覆盖物属性
					var polylineoptions = {
						visible : that.options.polyline.get('visible'),
						zIndex : 10,
						strokeStyle : "solid",
						strokeColor : "#FF3300",
						strokeOpacity : 0.8,
						strokeWeight : 5,
						isOutline : false,
						path : that.options.markers.slice(0)
					};
					that.options.polyline
							&& that.options.polyline
									.setOptions(polylineoptions);
				} else {
					// 绘制轨迹
					that.options.polyline = new AMap.Polyline({
						map : that.options.map,
						path : that.options.markers.slice(0),
						strokeColor : "#00A", // 线颜色
						strokeOpacity : 1, // 线透明度
						strokeWeight : 3, // 线宽
						strokeStyle : "solid" // 线样式
					});
				}
				//that.options.map.setFitView();
			}
		});
