$.ajaxSetup({
    beforeSend: function (XMLHttpRequest) {
        var access_token = ($.cookie('access-token'));
        //console.log(access_token);
        if (access_token) {
            XMLHttpRequest.setRequestHeader("Authorization",
					"Bearer " + access_token);
        } else {
            if (pageName() != "index") {
                window.location.replace("index.html");
            }
        }
    }
});

function checkCookie() {
    var access_token = ($.cookie('access-token'));
    // console.log(access_token);
    if (access_token) {

    } else {
        if (pageName() != "index") {
            window.location.replace("index.html");
        }
    }
}
function pageName() {
    var a = location.href;
    var b = a.split("/");
    var c = b.slice(b.length - 1, b.length).toString(String).split(".");
    return c.slice(0, 1);
}
// 对象动态扩展方法
Function.prototype.extend = function (oContext, bIsStatic) {

    var oThis = (typeof bIsStatic != 'undefined' && bIsStatic) ? this
			: this.prototype;
    for (var prop in oContext) {
        oThis[prop] = oContext[prop];
    }
};

$.extend({
    /**
     * @author feng_hai <feng_hai@aliyun.com> 获取页面的高度和宽度 pageW :页面宽度
     *         pageH :页面高度
     *
     */
    pageSize: function () {

        var xScroll, yScroll;

        if (window.innerHeight && window.scrollMaxY) {

            xScroll = window.innerWidth + window.scrollMaxX;

            yScroll = window.innerHeight + window.scrollMaxY;

        } else {

            if (document.body.scrollHeight > document.body.offsetHeight) { // all
                // but
                // Explorer
                // Mac

                xScroll = document.body.scrollWidth;

                yScroll = document.body.scrollHeight;

            } else { // Explorer Mac...would also work in Explorer 6
                // Strict,
                // Mozilla and Safari

                xScroll = document.body.offsetWidth;

                yScroll = document.body.offsetHeight;

            }

        }

        var windowWidth, windowHeight;

        if (self.innerHeight) { // all except Explorer

            if (document.documentElement.clientWidth) {

                windowWidth = document.documentElement.clientWidth;

            } else {

                windowWidth = self.innerWidth;

            }

            windowHeight = self.innerHeight;

        } else {

            if (document.documentElement
                    && document.documentElement.clientHeight) { // Explorer
                // 6
                // Strict
                // Mode

                windowWidth = document.documentElement.clientWidth;

                windowHeight = document.documentElement.clientHeight;

            } else {

                if (document.body) { // other Explorers

                    windowWidth = document.body.clientWidth;

                    windowHeight = document.body.clientHeight;

                }

            }

        }

        // for small pages with total height less then height of the
        // viewport

        // if (yScroll < windowHeight) {

        pageHeight = windowHeight;

        // } else {

        // pageHeight = yScroll;

        // }

        // for small pages with total width less then width of the
        // viewport

        // if (xScroll < windowWidth) {

        // pageWidth = xScroll;

        // } else {

        pageWidth = windowWidth;

        // }

        PageSize = {
            pageW: pageWidth,
            pageH: pageHeight

        };

        return PageSize;

    },

    getElementLeft: function (element) {
        return $(element).offset().left;

    },
    getElementTop: function (element) {
        return $(element).offset().top;
    },
    getElementBottom: function (element) {

        var pageHight = this.getViewport().height
                - $(element).outerHeight()
                - this.getElementTop(element);
        return pageHight;
    },
    getViewport: function () {
        if (document.compatMode == "BackCompat") {
            return {
                width: document.body.clientWidth,
                height: document.body.clientHeight
            }
        } else {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            }
        }

    },
    includePath: '',
    loadjs: function (files, fun) {
        var j = 0;
        //console.log("start load js");
        $.each(files, function (i, field) {
            new ajaxObject({
                Url: field,
                dataType: 'script',
                cache: true,
                complete: function (data) {
                    //不管是啥了，扔这里。。。
                    j++
                    if (j == files.length) {
                        fun && fun();
                    }
                }
            });

        })
    },
    include: function (file, fun) {
        var files = typeof file == "string" ? [file] : file;
        var j = 0;
        for (var i = 0; i < files.length; i++) {
            var name = files[i].replace(/^\s*|\s*$/g, "");
            var att = name.split('.');
            var ext = att[att.length - 1].toLowerCase();
            var isCSS = ext == "css";
            var tag = isCSS ? "link" : "script";

            var attr = isCSS ? " type='text/css' rel='stylesheet' "
                       : " language='javascript' type='text/javascript' ";
            var link = (isCSS ? "href" : "src") + "='"
                        + $.includePath + name + "'";
            if ($(tag + "[" + link + "]").length == 0)
                document.write("<" + tag + attr + link + "></"
                        + tag + ">");

        }
    }
});

$.fn.serializeJson = function () {
    var serializeObj = {};
    var array = this.serializeArray();
    var str = this.serialize();

    $(array).each(function () {
        if (serializeObj[this.name]) {
            if ($.isArray(serializeObj[this.name])) {
                serializeObj[this.name].push(this.value);
            } else {
                serializeObj[this.name] = [serializeObj[this.name],
                        this.value];
            }
        } else {
            serializeObj[this.name] = this.value;
        }
    });
    return serializeObj;
};

//TODO tableList 页面只有列表
tableList = ["sim_simList",
"menu_menuList",
"terminal_terminalList",
"button_buttonList",
"vehicle_vehicleList",
"device_deviceList",
"role_roleList",
"company_companyList",
"user_userList",
"data_aliasList",
"vehicle_vehicleTypeList",
"vehicle_modelList"];


dictionaryCss = {
    data_dataProtocol: [
           'jsplugin/jstree/themes/default/style.min.css',
           'jsplugin/select2-bootstrap-theme/select2-bootstrap.min.css',
           'jsplugin/select2/css/select2.css',
           'jsplugin/pnotify/pnotify.custom.css',
           'jsplugin/x-editable-master/dist/bootstrap3-editable/css/bootstrap-editable.css'],
    data_dictionary: [
           'jsplugin/select2-bootstrap-theme/select2-bootstrap.min.css',
           'jsplugin/pnotify/pnotify.custom.css',
           'jsplugin/select2/css/select2.css'],
    report_reportSet: ['jsplugin/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker.min.css'],
    report_secondReportSet: ['jsplugin/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker.min.css']
}
//TODO dictionaryJs 页面加载的js
dictionaryJs = {
    sim_simList: ['js/pages/simList.js'],
    menu_menuList: ['js/pages/menuList.js'],
    terminal_terminalList: ['js/pages/terminalList.js'],
    user_track: ["js/pages/dynamicDataChart.js",
			"js/pages/vehicleTrack.js", "js/pages/track/dataSet.js",
			"resources-clear/vendor/select2/js/select2.full.js",
			"resources-clear/vendor/bootstrap-multiselect/bootstrap-multiselect.js"],
    datamodel_dataModelList: [
			"js/pages/dataModelJs.js",
			"jsplugin/pnotify/pnotify.custom.js",
			"jsplugin/bootstrap-confirmation/bootstrap-confirmation.js",
			"jsplugin/x-editable-master/dist/bootstrap3-editable/js/bootstrap-editable.min.js",
			'jsplugin/bootstrap-table-master/dist/extensions/editable/bootstrap-table-editable.js'],//数据视图
    button_buttonList: ['js/pages/buttonList.js'],
    vehicle_vehicleList: ['js/pages/vehicleList.js'],
    device_deviceList: ['js/pages/vehicleList.js'],
    user_default: ['js/pages/vehicleList.js',
	              'js/pages/vehicleCluster.js',
	              'js/pages/echartChina.js'],
    vehicle_cluster: ['js/pages/vehicleList.js',
	                 'js/pages/vehicleCluster.js',
	                 'js/pages/echartChina.js'],
    vehicle_alarmInfo: ['js/pages/vehicleAlarm.js',
	                   'js/pages/vehicleAddress.js'],
    role_roleList: ['js/pages/roleList.js'],
    company_companyList: ['js/pages/companyList.js'],
    user_userList: ['js/pages/userList.js'],
    vehicle_vehicleInfo: ["js/pages/vehicleSingleInfo.js",
	                     "js/pages/dynamicDataChart.js",
	                     "js/pages/gaugePage.js",
	                     "js/pages/chargePie.js"],
    vehicle_monitoring: ["js/pages/track/dataSet.js",
	                    'js/pages/vehicleAddress.js',
	                    "js/pages/dynamicDataChart.js",
	                    "js/pages/vehicleMonitoringLayout.js",
	                    "jsplugin/select2/js/select2.js",
						"jsplugin/bootstrap-multiselect/bootstrap-multiselect.js",
						'//webapi.amap.com/maps?v=1.3&key=ebe4a785f7422ca423062ac0a5ad840e'],
    vehicle_detail: ['js/pages/vehicleDetail.js'],
    vehicle_modelList: ["js/pages/vehicleTypeList.js"],
    vehicle_vehicleTypeList: ["js/pages/vehicleTypeList.js"],
    vehicle_singleMonitoring: ["js/pages/dynamicDataChart.js",
                              "js/pages/vehicleSingleMonitoring.js"],
    vehicle_singleCharge: ['js/pages/vehicleAddress.js',
                           'js/dataView.js',
                           "js/pages/dynamicDataChart.js",
                           "js/pages/chargeManagementLayout.js",
                           "js/pages/vehicleChargeList.js",
                           'jsplugin/bootstrap-table-master/src/bootstrap-table.js',
                           'jsplugin/bootstrap-table-master/src/locale/bootstrap-table-zh-CN.js',
                           '//webapi.amap.com/maps?v=1.3&key=ebe4a785f7422ca423062ac0a5ad840e'
    ],
    vehicle_historyData: ["js/pages/vehicleListCanHistory.js",
                         'js/dataView.js',
                         'jsplugin/bootstrap-table-master/src/bootstrap-table.js',
                         'jsplugin/bootstrap-table-master/src/locale/bootstrap-table-zh-CN.js',
                         'jsplugin/bootstrap-table-master/dist/extensions/toolbar/bootstrap-table-toolbar2.js'],
    vehicle_track: ["js/pages/track/dataSet.js",
                    'js/pages/vehicleAddress.js',
                    "js/pages/dynamicDataChart.js",
                    'jsplugin/slider/bootstrap-slider.min.js',
                    "js/pages/vehicleTrack.js",
                    "jsplugin/select2/js/select2.js",
                    "jsplugin/bootstrap-multiselect/bootstrap-multiselect.js",
                    'jsplugin/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker.min.js',
                    'jsplugin/bootstrap-datetimepicker-master/js/locales/bootstrap-datetimepicker.zh-CN.js',
                    '//webapi.amap.com/maps?v=1.3&key=ebe4a785f7422ca423062ac0a5ad840e'
    ],
    vehicle_faultHistory: [
                          "js/pages/faultHistory.js",
                          'js/dataView.js',
                          'js/pages/vehicleAddress.js',
                          'jsplugin/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker.min.js',
                          'jsplugin/bootstrap-datetimepicker-master/js/locales/bootstrap-datetimepicker.zh-CN.js',
                          'jsplugin/bootstrap-table-master/src/bootstrap-table.js',
                          'jsplugin/bootstrap-table-master/src/locale/bootstrap-table-zh-CN.js',
                          "js/pages/dynamicDataChart.js",
                           '//webapi.amap.com/maps?v=1.3&key=ebe4a785f7422ca423062ac0a5ad840e'
    ],
    data_aliasList: ["js/pages/aliasList.js"
    ],//标准别名
    data_dataProtocol: ["jsplugin/jstree/jstree.min.js",
                       "js/pages/dictionaryList.js",
                       "jsplugin/FormValidation/js/formValidation.js",
                       "jsplugin/FormValidation/js/framework/bootstrap.js",
                       'js/pages/dictionaryTree.js',
                       "jsplugin/select2/js/select2.full.min.js",
                       "jsplugin/pnotify/pnotify.custom.js",
                       "jsplugin/x-editable-master/dist/bootstrap3-editable/js/bootstrap-editable.js",
                       "jsplugin/bootstrap-table-master/dist/extensions/editable/bootstrap-table-editable.js"
    ],
    data_dictionary: ["js/pages/dictionaryManager.js",
                    "jsplugin/pnotify/pnotify.custom.js",
                     "jsplugin/select2/js/select2.full.min.js"],
    report_reportSet: [
                      "js/pages/dynamicDataChart.js",
                      "js/pages/reportpageset.js",
                      "js/pages/reportSet.js",
                      "jsplugin/select2/js/select2.full.min.js",
                      "js/pages/reportPageList.js",
                      "js/pages/reportMenu.js",
                      'jsplugin/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker.js',
                      'jsplugin/bootstrap-datetimepicker-master/js/locales/bootstrap-datetimepicker.zh-CN.js'],
    report_secondReportSet: [
	                        "js/pages/dynamicDataChart.js",
	                        "js/pages/reportpageset.js",
	                        "js/pages/reportSet.js",
	                        "jsplugin/select2/js/select2.full.min.js",
	                        "js/pages/reportPageList.js",
                            "jsplugin/pnotify/pnotify.custom.js",
			                "jsplugin/bootstrap-confirmation/bootstrap-confirmation.js",
	    		            'jsplugin/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker.js',
	  		                'jsplugin/bootstrap-datetimepicker-master/js/locales/bootstrap-datetimepicker.zh-CN.js',
                            "js/pages/fiber/fiberData.js",
                            "js/pages/fiber/vehicleData.js"
    ]
}
//TODO viewkey  列表id定义
VIEWKEY = {
    pinci: '9B21AA20BB6746B9907789200985EDFE',// 报表设置页面和数据页面数据源
    single_CanHistory: '9B21AA20BB6746B9907789200985EDFE',// 单车页面，历史数据页面数据视图key
    // // 视图名称
    reportPage: '2089C7386F294BBEB05ECF3F4B6843F8', // 报表设置页面，报表列表
    dictionaryForField: 'DDEA16347C5F4E95A4543AFFAC85F868',// 数据字典，field 值定义列表
    vehicleList: '07B35DDB62A2438EB929BC8E717C6909',// 车辆列表视图id
    faultHistory: 'D7B2B27A01274B06A11B86120F62E097',// 故障记录，报警历史
    vehicleTrack: "F00515F9917D404DB630069C44204B99",// 轨迹回放
    deviceList: '07B35DDB62A2438EB929BC8E717C6909',// 设备列表，暂时和车辆列表相同
    terminalList: '3C204D10F3CF486A9F26701944845BD9',// 终端列表
    vehicleType: '0A182BF858DA466FBDB2932E6140BEC1',// 车辆类型
    VendorList: '9B554CEB23FB41379053F8153EC53C05',// 终端供应商
    role: '7D290762C92E42528B0F891681461313',// 角色列表
    menu: '8167750163734F85BB0DA46DEEF7A4A7',// 菜单列表
    button: '00C435B3836A43139A6ECB168DD60608',// 按钮列表
    vehicleAlarm: '241DBF32EAE84DC6887854F1900DB8AF',//车辆报警
    alarmNum: 'D7B2B27A01274B06A11B86120F62E097',//报警项
    user: '11CE8555BFAB49A48720F6BA89745561',//用户列表
    alias: 'F2D17719E223430D8F2AE29415AE08CE'//标准别名
}
//TODO loginAPI  登录要访问的接口,接口访问权限
LoginAPIList = [
    'https://api.ttron.cn/bigger/grid',
    'https://api.ttron.cn/bigger/security',
    'https://api.ttron.cn/parrot',
    'https://api.ttron.cn/bigger',
    'https://api.ttron.cn/bigger/chart',
    'https://api.ttron.cn/bigger/vehicle',
    'https://api.ttron.cn/bigger/sim',
    "https://api.ttron.cn/parrot/protocol",
    'https://api.ttron.cn/openid',
    'https://api.ttron.cn/bigger/security/privilege_button_map',
    'https://api.ttron.cn/bigger/security/menu_button_map',
    'https://api.ttron.cn/bigger/security/privilege_menu_map',
    'https://api.ttron.cn/bigger/security/openid_privilege_map',
    'https://api.ttron.cn/bigger/privilege/privilege',
    'https://api.ttron.cn/bigger/security/openid',
    'https://api.ttron.cn/bigger/security/menu',
    'https://api.ttron.cn/parrot/proto_family',
    'https://api.ttron.cn/bigger/model',
    'https://api.ttron.cn/bigger/device',
    'https://api.ttron.cn/sensor/vehicle',
    'https://api.ttron.cn/parrot/protocol',
    'https://api.ttron.cn/bigger/fiber'
];

//TODO  urldictionary 接口定义
URLDICTIONARY = {
    viewkey: 'https://api.ttron.cn/bigger/grid/',// 视图列表地址
    viewHost: 'https://api.ttron.cn',// 新视图地址
    viewHostOld: 'https://api.bigger.com',// 被修改的视图地址
    protocol: 'https://api.ttron.cn/parrot/protocol',// 协议地址
    proto_family: 'https://api.ttron.cn/parrot/proto_family',// 协议族
    reportChart: 'https://api.ttron.cn/bigger/chart',// 图表设置
    fiber: 'https://api.ttron.cn/bigger/fiber',// 数据字典
    vehicleList: 'https://api.ttron.cn/bigger/vehicle',// 车辆信息接口
    simInfo: 'https://api.ttron.cn/bigger/sim',// sim卡信息接口
    device: 'https://api.ttron.cn/bigger/device',// 终端信息接口
    compangy: 'https://api.ttron.cn/openid/domain',// 机构信息接口
    //terminalModel : '',// 终端型号
    vehicleType: 'https://api.ttron.cn/bigger/model',// 车辆类型
    vehicleModel: '',// 车辆型号
    supplierVendorList: 'https://api.ttron.com/bigger/vendor',// 代理商
    device_bind: 'https://api.ttron.cn/bigger/device_bind',// 车辆和终端绑定解绑接口
    sensor: 'https://api.ttron.cn/sensor/vehicle',// 传感器车辆数据获取接口
    cluster: 'https://api.ttron.cn/sensor/vehicle/cluster',// ?zoom=15 车辆聚合接口
    button: 'https://api.ttron.cn/bigger/security/button',
    menu: 'https://api.ttron.cn/bigger/security/menu',
    user: 'https://api.ttron.cn/openid',
    role: 'https://api.ttron.cn/bigger/security/privilege',// 根据角色获取菜单，按钮等E15D221AEC2D4FEC883A95291C4709FB/menu
    privilege_button: 'https://api.ttron.cn/bigger/security/privilege_button_map',// {unbind|bind}
    menu_button: 'https://api.ttron.cn/bigger/security/menu_button_map',// {unbind|bind}
    privilege_menu: 'https://api.ttron.cn/bigger/security/privilege_menu_map',//权限和菜单关联接口
    user_privilege: 'https://api.ttron.cn/bigger/security/openid_privilege_map',//用户和权限关联接口
    privilege_privilege: 'https://api.ttron.cn/bigger/privilege/privilege',// 根据角色获取菜单，按钮等E15D221AEC2D4FEC883A95291C4709FB/menu
    privilegeByuserId: 'https://api.ttron.cn/bigger/security/openid',//${openid}/privilege 通过用户id获取权限数据
    login: 'https://api.ttron.cn/oauth/token',//登录获取令牌
    alias: 'https://api.ttron.cn/parrot/alias',//标准别名
    instant: 'https://api.ttron.cn/parrot/protocol'//${unid}/instant'协议
}
//TODO 访问数据接口定义
function ajaxObject(options) {
    var defaultOptions = {
        Url: '',
        type: 'get',
        dataType: 'json',
        data: {},
        async: true,
        cache: true,
        before: function (data) {
            return data;
        },
        createFun: function (id) {

        },
        fun: function (data) {

        },
        errorFun: function (data) {

        },
        complete: function () {

        }
    }
    this.options = $.extend(defaultOptions, options || {});
    return this.ajax();
}
ajaxObject.extend({
    ajax: function () {
        var that = this;
        jQuery.ajax({
            url: that.options.Url,
            type: that.options.type,
            data: that.options.data,
            dataType: that.options.dataType,
            async: that.options.async,
            cache: that.options.cache | false,
            beforeLoad: that.options.before,
            success: function (data, textStatus, XMLHttpRequest) {
                // console.log(XMLHttpRequest.status);
                // console.log("success");
                var dateStr = XMLHttpRequest.getResponseHeader('Location');
                // console.log(dateStr);
                if (XMLHttpRequest.status == 201) {
                    var id = dateStr.substr(dateStr.lastIndexOf('/') + 1);
                    that.options.createFun(id);
                    // console.log("viewid");
                }
                // var dateStr = xhr.getResponseHeader('Location');
                // console.log(dateStr);
                // alert(xhr.getResponseHeader('Content-Length') + ' bytes');
                // alert(JSON.stringify(data));
                // 拼接 轨迹数组
                // data.name="修改为视图4";

                // dataModel.options_updateView.data=data;
                if (typeof (that.options.fun) == "function") {
                    return that.options.fun
							&& that.options.fun.call(that, data);
                }
                // return data;

                // 数据应用
                // alert(JSON.stringify(lngLatArray));
                // alert(JSON.stringify(datetimeArray));

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(textStatus);
                that.options.errorFun.call(that, XMLHttpRequest.status);
                // var dateStr = XMLHttpRequest.getResponseHeader('Location');
                // console.log(dateStr);
                // alert(textStatus);
            }, complete: function () {
                that.options.complete.call(that);
            }
        });
    }

});

function setCookie(name, value, Days) {

    $.cookie(name, value, { path: '/' });
}

function getCookie(name) {
    $.cookie(name)
}

function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}


function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}


//TODO 日期格式化方法
/**      
 * 对Date的扩展，将 Date 转化为指定格式的String      
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符      
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)      
 * eg:      
 * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423      
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04      
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04      
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04      
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18      
 */
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份         
        "d+": this.getDate(), //日         
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时         
        "H+": this.getHours(), //小时         
        "m+": this.getMinutes(), //分         
        "s+": this.getSeconds(), //秒         
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度         
        "S": this.getMilliseconds() //毫秒         
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}


/**
 * 判断年份是否为润年
 * 
 * @param {Number}
 *            year
 */
function isLeapYear(year) {
    return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
}
/**
 * 获取某一年份的某一月份的天数
 * 
 * @param {Number}
 *            year
 * @param {Number}
 *            month
 */
function getMonthDays(year, month) {
    return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
			|| (isLeapYear(year) ? 29 : 28);
}/**
	 * 获取某年的某天是第几周
	 * 
	 * @param {Number}
	 *            y
	 * @param {Number}
	 *            m
	 * @param {Number}
	 *            d
	 * @returns {Number}
	 */
function getWeekNumber(y, m, d) {
    var now = new Date(y, m - 1, d), year = now.getFullYear(), month = now
			.getMonth(), days = now.getDate();
    // 那一天是那一年中的第多少天
    for (var i = 0; i < month; i++) {
        days += getMonthDays(year, i);
    }

    // 那一年第一天是星期几
    var yearFirstDay = new Date(year, 0, 1).getDay() || 7;

    var week = null;
    if (yearFirstDay == 1) {
        week = Math.ceil(days / yearFirstDay);
    } else {
        days -= (7 - yearFirstDay + 1);
        week = Math.ceil(days / 7) + 1;
    }

    return week;
}

function strToDate(str) {
    var val = Date.parse(str);
    var newDate = new Date(val);
    return newDate;
}
//TODO 动态加载js
/**
@i 加载计数器
@jsArray 要加载的js列表
@fun  加载完成时回调函数
*/
function ajaxLoadJs(options) {
    var defaultOptions = {
        i: 0,
        cache: true,
        jsArray: [],
        fun: function () {

        }
    };
    this.options = $.extend(defaultOptions, options || {});
    this.init();
}
ajaxLoadJs.extend({
    init: function () {
        var that = this;
        that.loadjs();
    },
    loadjs: function () {
        var that = this;
        $.each(that.options.jsArray, function (i, field) {
            new ajaxObject({
                Url: field,
                dataType: 'script',
                cache: that.options.cache,
                complete: function (data) {
                    that.options.i++;
                    if (that.options.i === that.options.jsArray.length) {
                        that.options.fun();
                    }
                }
            });
        });
    }
})




function removejscssfile(filename, filetype) {
    //判断文件类型
    var targetelement = (filetype == "js") ? "script" : (filetype == "css") ? "link" : "none";
    //判断文件名
    var targetattr = (filetype == "js") ? "src" : (filetype == "css") ? "href" : "none";
    var allsuspects = document.getElementsByTagName(targetelement);
    //遍历元素， 并删除匹配的元素
    for (var i = allsuspects.length; i >= 0; i--) {
        if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1)
            allsuspects[i].parentNode.removeChild(allsuspects[i]);
    }
}