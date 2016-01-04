

function pageStart_Two() {
    cluster.init();
}
var cluster = {

    options: {
        map: null,
        cluster: null,
        markers: [],
        polygons: [],
        infoWindow: null,
        fields: 'ACTIVE_STATUS,SOC'//车辆动态获取车辆信息
    },
    getData: function () {
        var that = this;
        // 随机向地图添加500个标注点
        if (!that.options.map) {
            setTimeout(that.getData, 500);
            return;
        }
        var mapBounds = that.options.map.getBounds();
        var sw = mapBounds.getSouthWest();
        var ne = mapBounds.getNorthEast();
        var lngSpan = Math.abs(sw.lng - ne.lng);
        var latSpan = Math.abs(ne.lat - sw.lat);

        new ajaxObject({
            Url: URLDICTIONARY.cluster + "?zoom=15 ",
            fun: function (data) {
                console.log("聚合");
                console.log(data);

                var vehicles = data[0].vehicles;

                for (var i = 0; i < vehicles.length; i++) {

                    var markerPosition = [vehicles[i].lond,
                            vehicles[i].latd];
                    var marker = new AMap.Marker(
                            {
                                position: markerPosition,

                                offset: {
                                    x: -12.5,
                                    y: -32.5
                                },
                                content: '<div class="info  " style="color: white;"><i class="el el-car info markerActive" aria-hidden="true"></i><div>'
                            });
                    // marker.content = '<i class="el el-car" aria-hidden="true"></i>';
                    marker.extData = "B10018";//vehicles[i].vin;

                    // that
                    // .createInfoWindow(
                    // '车辆唯一编号&nbsp;&nbsp;<span
                    // style="font-size:11px;color:#F00;">548546656878</span>',
                    // "<img
                    // src='http://tpc.googlesyndication.com/simgad/5843493769827749134'
                    // style='position:relative;float:left;margin:0 5px 5px 0;'>地址：
                    // 北京市朝阳区阜通东大街6号院3号楼 东北 8.3 公里<br/>电话：010 64733333<br/><a
                    // onClick='event.preventDefault();cluster.openVehicleDetail(3);
                    // return false;' href='#'>详细信 息</a>");
                    // 鼠标点击marker弹出自定义的信息窗体
                    AMap.event.addListener(
                                    marker,
                                    'click',
                                    function (e) {

                                        var vin = e.target.extData;

                                        $("#vehicleInfo").trigger(
                                                'loading-overlay:show');
                                        var content = [
                                                '<div class="info"><section class=" panel panel-default" style="margin-bottom:0px;">',
                                                '	 <header class="panel-heading">',
                                                '<div class="panel-actions">',
                                                ' <a href="javascript:void(0);"',
                                                'class="panel-action panel-action-dismiss" onClick="cluster.closeInfoWindow();" style="display:block;"  ></a>',
                                                '</div>',
                                                '<span id="panelTitle"></span>&nbsp;&nbsp;<span onClick="event.preventDefault();cluster.openVehicleDetail(\'' + vin + '\'); return false;" style="font-size:11px;color:#F00; cursor:pointer">'
                                                        + vin + '</span>',
                                                '</header>',
                                                '<div class="panel-body"  id="vehicleInfo" data-loading-overlay data-loading-overlay-options=\'{ "startShowing": true }\' style="min-height: 100px; min-width:350px;" >',
                                                '<label class="col-sm-4 control-label">车速： </label> ',
                                                '<label class="col-sm-2 id="SPEED" control-label"></label> ',
                                                '<label class="col-sm-4 control-label">SOC： </label>',
                                                '<label class="col-sm-2 control-label"> </label> ',
                                                '<label class="col-sm-4 control-label">扭矩： </label>',
                                                '<label class="col-sm-2 control-label"></label> ',
                                                '<label class="col-sm-4 control-label">牵引踏板： </label> ',
                                                '<label class="col-sm-2 control-label"> </label> ',
                                                '<label class="col-sm-4 control-label">制动踏板： </label> ',
                                                '<label class="col-sm-2 control-label"> </label> ',
                                                '<label class="col-sm-4 control-label">转速：</label> ',
                                                '<label class="col-sm-2 control-label"></label> ',
                                                '<label class="col-sm-4 control-label">数据时间：</label> ',
                                                '<label class="col-sm-8 control-label"></label> ',
                                                '</div>',
                                                '</section><div class="info-bottom" ><img src="//webapi.amap.com/images/sharp.png"></img><div></div>']
                                                .join(" ");

                                        that.options.infoWindow
                                                .setContent(content);
                                        that.options.infoWindow.open(that.options.map,
                                                e.target.getPosition());
                                        new ajaxObject({
                                            Url: URLDICTIONARY.sensor + "/" + vin,
                                            data: {
                                                field: that.options.fields
                                            },
                                            fun: function (data) {
                                                console.log(data);
                                                if (data.length > 1) {
                                                    var fields = data[0];
                                                    var values = data[1];

                                                    $.each(fields, function (i, field) {
                                                        $("#vehicleInfo label[name='"
                                                                        + field + "']")
                                                                .html(values[i]);
                                                    });
                                                }
                                            }
                                        });
                                    });
                    that.options.markers.push(marker);
                }
                that.addCluster(0);
            }
        });
    },
    initMap: function () {
        var that = this;
        that.options.map = new AMap.Map("mapContainer", {
            resizeEnable: true,
            center: [116.397428, 39.90923],
            zoom: 5,
            mapStyle: 'light'

        });
        // 地图类型切换
        that.options.map.plugin(["AMap.MapType"], function () {
            var type = new AMap.MapType({
                defaultType: 0
            });
            that.options.map.addControl(type);
        });
        // 地图中添加地图操作ToolBar插件
        that.options.map.plugin(["AMap.ToolBar"], function () {
            var toolBar = new AMap.ToolBar();
            that.options.map.addControl(toolBar);
        });

        that.options.infoWindow = new AMap.InfoWindow({
            isCustom: true, // 使用自定义窗体
            offset: new AMap.Pixel(14, -30)
        });
        // 显示中英文对照底图
        that.options.map.setLang('zh_en');// en\'zh_cn
        that.options.map.on('zoomchange', function (e) {
            var zoom = this.getZoom();
            if (zoom == 18) {
                that.options.cluster && that.options.cluster.setMap(null);
                for (var i = 0; i < that.options.markers.length; i++) {
                    that.options.markers[i].setMap(that.options.map);
                }
            } else {
                that.closeInfoWindow();
                that.addCluster(0)
            }
        });
    },
    searchProvince: function (provinceName) {
        var that = cluster;
        // 加载云图层插件
        AMap.service('AMap.DistrictSearch', function () {
            var opts = {
                // subdistrict: 1, //返回下一级行政区
                extensions: 'all', // 返回行政区边界坐标组等具体信息
                level: 'province' // 查询行政级别为 市
            };
            // 实例化DistrictSearch
            district = new AMap.DistrictSearch(opts);
            district.setLevel('district');
            // 行政区查询
            district.search(provinceName, function (status, result) {
                var size = that.options.polygons.length;
                for (var i = 0; i < size; i++) {
                    that.options.polygons[i].setMap(null);
                }
                ;

                var bounds = result.districtList[0].boundaries;
                if (bounds) {
                    for (var i = 0, l = bounds.length; i < l; i++) {
                        // 生成行政区划polygon
                        var polygon = new AMap.Polygon({
                            map: that.options.map,
                            strokeWeight: 1,
                            path: bounds[i],
                            fillOpacity: 0.7,
                            fillColor: '#CCF3FF',
                            strokeColor: '#CC66CC'
                        });
                        that.options.polygons.push(polygon);
                    }
                    // that.options.map.setCity(provinceName);
                    that.options.map.setFitView();// 地图自适应
                    ;// 地图自适应
                }
            });
        });
    },
    addCluster: function (tag) {

        var that = this;
        if (that.options.cluster) {
            that.options.cluster.setMap(null);
        }
        if (tag == 1) {
            var sts = [{
                url: "//developer.amap.com/wp-content/uploads/2014/06/1.png",
                size: new AMap.Size(32, 32),
                offset: new AMap.Pixel(-16, -30)
            }, {
                url: "//developer.amap.com/wp-content/uploads/2014/06/2.png",
                size: new AMap.Size(32, 32),
                offset: new AMap.Pixel(-16, -30)
            }, {
                url: "//developer.amap.com/wp-content/uploads/2014/06/3.png",
                size: new AMap.Size(48, 48),
                offset: new AMap.Pixel(-24, -45),
                textColor: '#CC0066'
            }];
            that.options.map.plugin(["AMap.MarkerClusterer"], function () {
                that.options.cluster = new AMap.MarkerClusterer(
						that.options.map, that.options.markers, {
						    styles: sts
						});
            });
        } else {
            that.options.map.plugin(["AMap.MarkerClusterer"], function () {
                that.options.cluster = new AMap.MarkerClusterer(
						that.options.map, that.options.markers);
                // 自适应视野
                // map.setFitView();
            });
        }
    },
    createInfoWindow: function (title, content) {
        var that = this;
        var info = document.createElement("div");
        info.className = "info";

        // 可以通过下面的方式修改自定义窗体的宽高
        // info.style.width = "400px";

        // 定义顶部标题
        var top = document.createElement("div");
        var titleD = document.createElement("div");
        var closeX = document.createElement("img");
        top.className = "info-top";
        titleD.innerHTML = title;
        closeX.src = "//webapi.amap.com/images/close2.gif";
        closeX.onclick = that.closeInfoWindow;
        top.appendChild(titleD);
        top.appendChild(closeX);
        info.appendChild(top);
        // 定义中部内容
        var middle = document.createElement("div");
        middle.className = "info-middle";
        middle.style.backgroundColor = 'white';
        middle.innerHTML = content;
        info.appendChild(middle);

        // 定义底部内容
        var bottom = document.createElement("div");
        bottom.className = "info-bottom";
        bottom.style.position = 'relative';
        bottom.style.top = '0px';
        bottom.style.margin = '0 auto';
        var sharp = document.createElement("img");
        sharp.src = "//webapi.amap.com/images/sharp.png";
        bottom.appendChild(sharp);
        info.appendChild(bottom);
        return info;
    },
    closeInfoWindow: function () {
        var that = cluster;
        that.options.map.clearInfoWindow();
    },
    init: function () {
        var that = this;
        that.initMap();
        that.getData();

    },
    openVehicleDetail: function (vin) {
        eModal.iframe({
            url: "subMain/main.html?vin=" + vin,
        }, vin);
        return false;
    }
};
