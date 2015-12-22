/**
 * @author feng_hai <feng_hai@aliyun.com>
 * 添加页面操作
 */

(function ($) {
    'use strict';

    var OPtionTYPE_NAME = {
        addOption: 'add',
        updateOption: 'update',
        deleteOption: 'delete'

    };

    $.extend($.fn.bootstrapTable.defaults, {
        showPageOption: false,
        // 'json', 'xml', 'png', 'csv', 'txt', 'sql', 'doc', 'excel', 'powerpoint', 'pdf'
        OptionTypes: ['addOption', 'updateOption', 'deleteOption']
    });

    var BootstrapTablePage = $.fn.bootstrapTable.Constructor,
        _initToolbar = BootstrapTablePage.prototype.initToolbar;

    BootstrapTablePage.prototype.initToolbar = function () {
        _initToolbar.apply(this, Array.prototype.slice.apply(arguments));

        var that = this;
    	if (!this.options.showPageOption) {
			return;
	   	}


        if (this.options.showPageOption) {
              var   $btnGroupPage = this.$toolbar.find('>.btn-group');
              var  $pageOPtion= $btnGroupPage.find('div.pageOPtion');

            if (!$pageOPtion.length) {
            	$pageOPtion = $([
                    '<div class="export btn-group">',
                        '<button class="btn btn-default dropdown-toggle" ' +
                            'data-toggle="dropdown" type="button">',
                            '<i class="glyphicon glyphicon-wrench icon-share"></i> ',
                            '<span class="caret"></span>',
                        '</button>',
                        '<ul class="dropdown-menu" role="menu">',
                        '</ul>',
                    '</div>'].join('')).appendTo($btnGroupPage);

                var $menuPage = $pageOPtion.find('.dropdown-menu'),
                OptionTypes = this.options.OptionTypes;

                if (typeof this.options.OptionTypes === 'string') {
                    var types = this.options.OptionTypes.slice(1, -1).replace(/ /g, '').split(',');

                    OptionTypes = [];
                    $.each(types, function (i, value) {
                    	OptionTypes.push(value.slice(1, -1));
                    });
                }
                $.each(OptionTypes, function (i, type) {
                    if (OPtionTYPE_NAME.hasOwnProperty(type)) {
                        $menuPage.append(['<li data-type="' + type + '">',
                                '<a href="javascript:void(0)">',
                                OPtionTYPE_NAME[type],
                                '</a>',
                            '</li>'].join(''));
                    }
                });

                $menuPage.find('li').click(function () {
//                    that.$el.tableExport({
//                        type: $(this).data('type'),
//                        escape: false
//                    });
                 var table_id=that.$el.attr("id");

                	switch($(this).data('type'))
                	{
                	case "addOption":{
                		 var addF=eval("AddObject_"+table_id);
                		if(typeof(addF)=="function")
                			{
                			   addF();
                			}
                		break;
                	}
                	case"updateOption":{
                		var UpdateF=eval("UpdateObject_"+table_id);
                		if(typeof(UpdateF)=="function")
            			{
                			UpdateF();
            			}
                		break;
                	}

                	case"deleteOption":
                		var DeleteF=eval("DeleteObject_"+table_id);
                		if(typeof(DeleteF)=="function")
            			{
                			DeleteF();
            			}
                		break;

                	}

                });
            }
        }
    };
})(jQuery);
