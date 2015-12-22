/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * extensions: https://github.com/vitalets/x-editable
 */

!function ($) {

    'use strict';

    $.extend($.fn.bootstrapTable.defaults, {
        editable: true,
        onEditableInit: function () {
            return false;
        },
        onEditableSave: function (field, row, oldValue, $el) {
            console.log(row);
            console.log(oldValue);
            return false;
        },
        onEditableShown: function (field, row, $el, editable) {
            console.log("shown");
            console.log(row);
            return false;
        },
        onEditableHidden: function (field, row, $el, reason) {
            console.log("hidden");
            console.log(row);
            console.log(reason);
            $el.text(row[field]);
            return false;
        }
    });

    $.extend($.fn.bootstrapTable.Constructor.EVENTS, {
        'editable-init.bs.table': 'onEditableInit',
        'editable-save.bs.table': 'onEditableSave',
        'editable-shown.bs.table': 'onEditableShown',
        'editable-hidden.bs.table': 'onEditableHidden'
    });

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _initTable = BootstrapTable.prototype.initTable,
    _initBody = BootstrapTable.prototype.initBody;

    BootstrapTable.prototype.initTable = function () {
        // $.fn.editable.defaults.mode='inline';
        var that = this;
        _initTable.apply(this, Array.prototype.slice.apply(arguments));

        if (!this.options.editable) {
            return;
        }

        $.each(this.columns, function (i, column) {
            if (!column.editable || column.editable == "false") {

                return;
            }

            var _formatter = $.extend({}, column.formatter);
            column.formatter = function (value, row, index) {
                //console.log(column.dataType);
                var dataType = column.dataType || "text";
                // console.log(dataType);
                var result = typeof (_formatter) == "function" ? _formatter(value, row, index) : value;
                return ['<a href="javascript:void(0)"',
                    ' data-name="' + column.field + '"',
                    ' data-pk="' + row[that.options.idField] + '"',
                    'data-type="' + dataType + '"',
                    'data-value="' + result + '">',
                    '</a>'
                ].join(' ');
            };
        });
    };

    BootstrapTable.prototype.initBody = function () {
        var that = this;
        _initBody.apply(this, Array.prototype.slice.apply(arguments));

        if (!this.options.editable) {
            return;
        }

        $.each(this.columns, function (i, column) {
            if (!column.editable && column.editable == "false") {
                return;
            }
            var options = column.editable;
            if (column.dataType && column.dataType == "select2") {
                var source = column.dataValue;
                if (source) {
                    options = {
                        source: JSON.parse(source),
                        select2: {
                            placeholder: 'Select'
                        }
                    }
                }

                if (column.dataUrl)
                {
                    options = {
                        select2: {
                            placeholder: 'Select Country',
                            allowClear: true,
                            minimumInputLength: 1,
                            id: function (item) {
                                return item.unid;
                            },
                            ajax: {
                                url: URLDICTIONARY.compangy,
                                dataType: 'json',
                                data: function (term, page) {
                                    return { query: term };
                                },
                                results: function (data, page) {
                                    return { results: data };
                                }
                            },
                            formatResult: function (item) {
                                return item.name;
                            },
                            formatSelection: function (item) {
                                return item.name;
                            },
                            initSelection: function (element, callback) {
                                return $.get(URLDICTIONARY.compangy + "/" + element.val(), { query: element.val() }, function (data) {
                                    callback(data);
                                });
                            }
                        }
                    }
                }
            }

            that.$body.find('a[data-name="' + column.field + '"]').editable(options)
                .off('save').on('save', function (e, params) {
                    var data = that.getData(),
                        index = $(this).parents('tr[data-index]').data('index'),
                        row = data[index],
                        oldValue = row[column.field];

                    row[column.field] = params.submitValue;
                    that.trigger('editable-save', column.field, row, oldValue, $(this));
                });
            that.$body.find('a[data-name="' + column.field + '"]').editable(options)
                .off('shown').on('shown', function (e, editable) {
                    var data = that.getData(),
                        index = $(this).parents('tr[data-index]').data('index'),
                        row = data[index];

                    that.trigger('editable-shown', column.field, row, $(this), editable);
                });
            that.$body.find('a[data-name="' + column.field + '"]').editable(options)
                .off('hidden').on('hidden', function (e, reason) {
                    var data = that.getData(),
                        index = $(this).parents('tr[data-index]').data('index'),
                        row = data[index];

                    that.trigger('editable-hidden', column.field, row, $(this), reason);
                });
        });
        this.trigger('editable-init');
    };

}(jQuery);
