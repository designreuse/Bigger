
//TODO vehicleData 获取车辆数据
/**
@fields 需要获取数据的字段名称
@数据字典Id
@vin  车辆唯一标识
@url 访问接口地址
@search 查询参数，默认分页展示 每页100条数据
@fun 成功获取数据回调函数
注意：此功能依赖fiberDataField和ajaxObject两个对象
*/
function vehicleData(options) {

    var date = new Date();
    var end = "2015-12-28 15:20:10";//date.format("yyyy-MM-dd HH:mm:ss");
    var start = "2015-12-29 15:20:10";//new Date(date.setDate(date.getDate() - 1)).format("yyyy-MM-dd HH:mm:ss");
  
    console.log(start);
    console.log(end);
    var defaultOptions = {
        fields: [],
        alias: [],
        fiberId: '',
        vin: '',
        type: 2,
        objectData: null,
        url: URLDICTIONARY.sensor,
        pagination: true,
        page: {
            page_id: 0,
            page_size: 1000
        },
        pagiDate: true,
        date: {
            date_from:start,
            date_to:end
        },
        codefun: function (data) {

        },
        aliasfun: function (data) {
        }

    }
    this.options = $.extend(defaultOptions, options || {});
    this.init();
}
vehicleData.extend({
    init: function () {
        var that = this;
        if (that.options.fields.length > 0) {
            that.getVehicleData();
        } else {
            that.getVehicleFields();
        }
    },
    getVehicleFields: function () {
        var that = this;
        // debugger;
        new fiberDataField({
            fiberId: that.options.fiberId,
            vin: that.options.vin,
            type: that.options.type,
            fun: function (data) {
                console.log(data);
                var codes = $.map(data, function (field, i) {
                    return field.code;
                });
                var alias = {};
                $.each(data, function (i, field) {
                   // console.log(field);
                    alias[field.code] = field.alias;
                });
                that.options.fields = codes.join(",");
                that.options.alias = alias;
                that.getVehicleData();
            }
        });
    },
    getVehicleData: function () {
        var that = this;
        var search = { field: that.options.fields };
        if (that.options.pagination) {
            $.extend(search, that.options.page);
        }
        if (that.options.pagiDate) {
            $.extend(search, that.options.date);
        }
        var params = $.extend({ field: that.options.fields }, that.options.search)
        new ajaxObject({
            Url: that.options.url + "/" + that.options.vin,
            data: search,
            fun: function (data) {

                that.options.codefun.call(that, data);
                console.log(that.options.alias);
                //debugger;
                if (data.length > 0)//TODO Code 转 alias
                {
                    $.each(data[0].column, function (i, field) {
                        if (that.options.alias[field]) {
                            data[0].column[i] = that.options.alias[field];
                        }
                    });
                }
                console.log("报表数据");
                console.log(data);
                that.options.aliasfun.call(that, data);
                //console.log(this.options.data);
                //console.log(that.options.search.page_id);
                if (that.options.pagination) {
                    that.options.page.page_id += that.options.page.page_size;
                    if (data.length >= that.options.page.page_size) {
                        that.getVehicleData();
                    }
                }
            }
        });
    }
});