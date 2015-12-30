//TODO fieberData 获取数据协议的定义
/**
@vin 车辆唯一标识
@fiberId 数据字典id
@fields 存储数据字典定义字典信息
*@vin字段和fiberID 字段必须填写一个
@注意：此函数依赖ajaxObject对象
*/
function fiberDataField(options) {
    var defaultOption = {
        vin: '',
        fiberId: '',
        fields: [],
        groupFields: [],//承载有数据的group
        groups: [],//临时变量，承载有type的group
        type: 1, //1 全部， 2有别名的，3数据协议部分
        fun: function (data) { },//仅放回符合条件
        funGroup: function (data)//返回带group的数据
        { },
        errorFun: function ()
        { }
    };
    this.options = $.extend(defaultOption, options || {});
    this.init();
}
fiberDataField.extend({
    init: function () {
       // debugger;
        var that = this;
        if (that.options.fiberId === "") {
            that.getFiberId();
        } else {
            that.getFields();
        }
    },
    getFiberId: function () {
        var that = this;
       // debugger;
       new ajaxObject({
            Url: URLDICTIONARY.vehicleList + "/" + that.options.vin, 
            fun: function (data) {// 获取车辆数据字典id
                var fiberId = data.fiber_unid;
                that.options.fiberId = fiberId;
                that.getFields();
            }
        });
    },
    getFields: function () {
        var that = this;
        new ajaxObject({
            Url: URLDICTIONARY.fiber + "/" + that.options.fiberId,
            dataType: 'json',
            fun: function (data) {
                var column_group = data.column_group;
                console.log(column_group);
                that.options.fields = [];
                if (that.options.type === 1) {
                    that.getfixField(column_group);

                } else if (that.options.type === 2) {
                    that.getfixField(column_group);
                } else {
                    that.getTypeGroup(column_group);
                    $.each(that.options.groups, function (i, field) {
                        that.getfixField(field);
                    });
                }
                that.options.fun.call(that, that.options.fields);
                that.options.funGroup.call(that, that.options.groupFields);
            },
            errorFun: function ()
            {
                that.options.errorFun.call(that);
            }
        });
    },
    getTypeGroup: function (object) {
        var that = this;
        if (object.type) {
            var temp = $.grep(that.options.groups, function (field, i) {
                if (field.code == object.code) {
                    return true;
                } else {
                    return false;
                }
            });
            if (temp.length === 0) {
                that.options.groups.push(object);
            }

        }
        var group = object.groups;
        $.each(group, function (i, field) {
            that.getTypeGroup(field);
        });

    },
    getfixField: function (object) {
        var that = this;
        var columns = object.columns;
        if (columns.length > 0) {
            that.options.groupFields.push(object);
        }
        $.each(columns, function (i, field) {

            if (that.options.type == 1 || that.options.type == 3) {
                var temp = $.grep(that.options.fields, function (field1, i) {
                    if (field1.code == field.code) {
                        return true;
                    } else {
                        return false;
                    }
                });
                if (temp.length === 0) {
                    that.options.fields.push(field);
                }
            } else if (that.options.type === 2) {
                if (field.alias) {
                    var temp = $.grep(that.options.fields, function (field1, i) {
                        if (field1.code == field.code) {
                            return true;
                        } else {
                            return false;
                        }
                    });
                    if (temp.length === 0) {
                        that.options.fields.push(field);
                    }
                }
            }
        });
        var group = object.groups;
        $.each(group, function (i, field) {
            if (field.columns.length > 0 || field.groups.length > 0) {
                that.getfixField(field);
            }
        });
    }
});