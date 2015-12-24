
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
function vehicleData(options)
{
    var defaultOptions = {
        fields: [],
        fiberId:'',
        vin: '',
        url:URLDICTIONARY.sensor,
        search: {
            page_id: 0,
            page_size:100
        },
        fun: function (data)
        {

        }

    }
    this.options = $.extend(true, defaultOptions, options);
    this.init();
}
vehicleData.extend({
    init: function ()
    {
        var that = this;
        if (that.options.fields.length > 0) {
            that.getVehicleData();
        } else {
            that.getVehicleFields();
        }
    },
    getVehicleFields: function ()
    {
        new fieberDataField({
            fiberId: that.options.fiberId,
            vin: that.options.vin,
            fun: function (data)
            {
                that.options.fields = data;
                that.getVehicleData();
            }
        })

    },
    getVehicleData: function ()
    {
        var that = this;
        var params = $.extend({ field: that.options.fields },that.options.search)
        new ajaxObject({
            Url: that.options.url + "/" + that.options.vin,
            data: {
                field: that.options.fields
            },
            fun: function (data) {
                that.options.fun.call(that, data);
                that.options.search.page_id += that.options.search.page_size;
                that.getVehicleData();
            }
        });
    }
});