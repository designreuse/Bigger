/**
 * @author: aperez <aperez@datadec.es>
 * @version: v2.0.0
 * 
 * @update Dennis Hernández <http://djhvscf.github.io/Blog>
 */

!function($) {
	'use strict';

	var firstLoad = false;

	var sprintf = $.fn.bootstrapTable.utils.sprintf;

	var showAvdSearch = function(index, pColumns, searchTitle, searchText, that) {

		var html = [];
		if ($("#" + pColumns[index].field).size() == 0) {

			html.push(sprintf('<div class="form-group pull-left" id="%s">',
					pColumns[index].field));
			html.push(sprintf(
					'<label class="col-sm-4 control-label">%s:</label>',
					pColumns[index].title));
			html.push('<div class="col-sm-6">');
			html
					.push(sprintf(
							'<input type="text" class="form-control input-md" name="%s" placeholder="%s" id="%s">',
							pColumns[index].field, pColumns[index].title,
							pColumns[index].field));
			html.push('</div>');
			html.push('</div>');
			/*
			 * if($("#btnCloseAvd_"+that.options.idTable).size()==0) {
			 * html.push('<div class="form-group pull-left">'); html.push('<div
			 * class="col-sm-2">'); html.push(sprintf('<button type="button"
			 * id="btnCloseAvd%s" class="btn btn-default" >%s</button>', "_" +
			 * that.options.idTable, searchTitle)); html.push('</div>');
			 * html.push('</div>'); html.push('</form>');
			 * 
			 * html.push('</div>'); }
			 */

			$("#advanceSearch").prepend(html.join(''));
			var timeoutId = 0;
			$('#advanceSearch').off('keyup blur', 'input').on('keyup blur',
					'input', function(event) {
						clearTimeout(timeoutId);
						timeoutId = setTimeout(function() {
							that.onColumnAdvancedSearch(event);
						}, that.options.searchTimeOut);
					});
		} else {
			$("#" + pColumns[index].field).remove();
		}

		/*
		 * if (!$("#avdSearchModal" + "_" +
		 * that.options.idTable).hasClass("modal")) { var vModal = sprintf( "<div
		 * id=\"avdSearchModal%s\" class=\"modal fade\" tabindex=\"-1\"
		 * role=\"dialog\" aria-labelledby=\"mySmallModalLabel\"
		 * aria-hidden=\"true\">", "_" + that.options.idTable); vModal += "<div
		 * class=\"modal-dialog modal-xs\">"; vModal += " <div
		 * class=\"modal-content\">"; vModal += " <div class=\"modal-header\">";
		 * vModal += " <button type=\"button\" class=\"close\"
		 * data-dismiss=\"modal\" aria-hidden=\"true\" >&times;</button>";
		 * vModal += sprintf(" <h4 class=\"modal-title\">%s</h4>",
		 * searchTitle); vModal += " </div>"; vModal += " <div
		 * class=\"modal-body modal-body-custom\">"; vModal += sprintf( " <div
		 * class=\"container-fluid\" id=\"avdSearchModalContent%s\"
		 * style=\"padding-right: 0px;padding-left: 0px;\" >", "_" +
		 * that.options.idTable); vModal += " </div>"; vModal += " </div>";
		 * vModal += " </div>"; vModal += " </div>"; vModal += "</div>";
		 * 
		 * $("body").append($(vModal));
		 * 
		 * var vFormAvd = createFormAvd(pColumns, searchText, that), timeoutId =
		 * 0; ;
		 * 
		 * $('#avdSearchModalContent' + "_" + that.options.idTable).append(
		 * vFormAvd.join(''));
		 * 
		 * $('#' + that.options.idForm).off('keyup blur', 'input').on( 'keyup
		 * blur', 'input', function(event) { clearTimeout(timeoutId); timeoutId =
		 * setTimeout(function() { that.onColumnAdvancedSearch(event); },
		 * that.options.searchTimeOut); });
		 * 
		 * $("#btnCloseAvd" + "_" + that.options.idTable).click( function() {
		 * $("#avdSearchModal" + "_" + that.options.idTable) .modal('hide'); });
		 * 
		 * $("#avdSearchModal" + "_" + that.options.idTable).modal(); } else {
		 * $("#avdSearchModal" + "_" + that.options.idTable).modal(); }
		 */
	};

	var createFormAvd = function(pColumns, searchText, that) {
		var htmlForm = [];
		htmlForm.push(sprintf(
				'<form class="form-horizontal" id="%s" action="%s" >',
				that.options.idForm, that.options.actionForm));
		for ( var i in pColumns) {
			var vObjCol = pColumns[i];
			if (!vObjCol.checkbox && vObjCol.visible && vObjCol.searchable) {
				htmlForm.push('<div class="form-group">');
				htmlForm.push(sprintf(
						'<label class="col-sm-4 control-label">%s</label>',
						vObjCol.title));
				htmlForm.push('<div class="col-sm-6">');
				htmlForm
						.push(sprintf(
								'<input type="text" class="form-control input-md" name="%s" placeholder="%s" id="%s">',
								vObjCol.field, vObjCol.title, vObjCol.field));
				htmlForm.push('</div>');
				htmlForm.push('</div>');
			}
		}

		htmlForm.push('</form>');

		return htmlForm;
	};

	$.extend($.fn.bootstrapTable.defaults, {
		advancedSearch : false,
		idForm : 'advancedSearch',
		actionForm : '',
		idTable : undefined,
		onColumnAdvancedSearch : function(field, text) {
			return false;
		}
	});

	$.extend($.fn.bootstrapTable.defaults.icons, {
		advancedSearchIcon : 'glyphicon-chevron-down'
	});

	$.extend($.fn.bootstrapTable.Constructor.EVENTS, {
		'column-advanced-search.bs.table' : 'onColumnAdvancedSearch'
	});

	$.extend($.fn.bootstrapTable.locales, {
		formatAdvancedSearch : function() {
			return 'search';
		},
		formatAdvancedCloseButton : function() {
			return "Close";
		}
	});

	$.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales);

	var BootstrapTable = $.fn.bootstrapTable.Constructor, _initToolbar = BootstrapTable.prototype.initToolbar, _load = BootstrapTable.prototype.load, _initSearch = BootstrapTable.prototype.initSearch;

	BootstrapTable.prototype.initToolbar = function() {
		_initToolbar.apply(this, Array.prototype.slice.apply(arguments));

		if (!this.options.advancedSearch) {
			return;
		}

		var that = this, html = [];

		html
				.push(sprintf(
						'<div name="searchSet" class="columns columns-%s btn-group pull-%s" role="group">',
						this.options.toolbarAlign, this.options.toolbarAlign));
		html.push(sprintf('<button class="dropdown-toggle   btn btn-default%s'
				+ '"   type="button"  title="%s">',
				that.options.iconSize === undefined ? '' : ' btn-'
						+ that.options.iconSize, that.options
						.formatAdvancedSearch()));
		html.push(sprintf('<i class="%s %s"></i>', that.options.iconsPrefix,
				that.options.icons.advancedSearchIcon))
		html.push('</button>');
		html.push('<ul class="dropdown-menu" name="advancedSearch">  ');
		var pColumns = that.columns;
		for ( var i in pColumns) {
			var vObjCol = pColumns[i];
			html
					.push(sprintf(
							'<li data-filter-camera-type="Bravo"><a name="%s" data-toggle="tab" href="#">%s</a></li>',
							i, vObjCol.title));
		}
		html.push('</ul>');
		html.push('</div>');
		html.push(sprintf(
						'<div id="advanceSearch" class="columns columns-%s btn-group pull-%s" role="group">',
						this.options.toolbarAlign, this.options.toolbarAlign));

		that.$toolbar.prepend(html.join(''));
		
		that.$toolbar.find('div[name="searchSet"] button').off('click').on(
				'click',
				function() {
					$(".active").removeClass("active");
					if(that.$toolbar.find('ul[name="advancedSearch"]').is(":hidden"))
						{
					that.$toolbar.find('ul[name="advancedSearch"]').show();
						}else
							{
							  that.$toolbar.find('ul[name="advancedSearch"]').hide();
							}
					
				});
		//$('.dropdown-toggle').dropdown();
	
		that.$toolbar.find('ul[name="advancedSearch"] li a').off('click').on(
				'click',
				function() {
					// console.log($(this).attr("name"));

					//$(this).parent().removeClass("active");
					$(".active").removeClass("active");

					showAvdSearch($(this).attr("name"), that.columns,
							that.options.formatAdvancedSearch(), that.options
									.formatAdvancedCloseButton(), that);

				});
	};

	BootstrapTable.prototype.load = function(data) {
		_load.apply(this, Array.prototype.slice.apply(arguments));

		if (!this.options.advancedSearch) {
			return;
		}

		if (typeof this.options.idTable === 'undefined') {
			return;
		} else {
			if (!firstLoad) {
				var height = parseInt($(".bootstrap-table").height());
				height += 10;
				$("#" + this.options.idTable).bootstrapTable("resetView", {
					height : height
				});
				firstLoad = true;
			}
		}
	};

	BootstrapTable.prototype.initSearch = function() {
		_initSearch.apply(this, Array.prototype.slice.apply(arguments));

		if (!this.options.advancedSearch) {
			return;
		}

		var that = this;
		var fp = $.isEmptyObject(this.filterColumnsPartial) ? null
				: this.filterColumnsPartial;

		this.data = fp ? $
				.grep(
						this.data,
						function(item, i) {
							for ( var key in fp) {
								var fval = fp[key].toLowerCase();
								var value = item[key];
								value = $.fn.bootstrapTable.utils
										.calculateObjectValue(
												that.header,
												that.header.formatters[$
														.inArray(
																key,
																that.header.fields)],
												[ value, item, i ], value);

								if (!($.inArray(key, that.header.fields) !== -1
										&& (typeof value === 'string' || typeof value === 'number') && (value + '')
										.toLowerCase().indexOf(fval) !== -1)) {
									return false;
								}
							}
							return true;
						})
				: this.data;
	};

	BootstrapTable.prototype.onColumnAdvancedSearch = function(event) {
		var text = $.trim($(event.currentTarget).val());
		var $field = $(event.currentTarget)[0].id;

		if ($.isEmptyObject(this.filterColumnsPartial)) {
			this.filterColumnsPartial = {};
		}
		if (text) {
			this.filterColumnsPartial[$field] = text;
		} else {
			delete this.filterColumnsPartial[$field];
		}

		this.options.pageNumber = 1;
		this.onSearch(event);
		this.updatePagination();
		this.trigger('column-advanced-search', $field, text);
	};
}(jQuery);
