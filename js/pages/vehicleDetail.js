function vehicleDtail(options) {
	var optionsDefault = {
		fiberId : '098E11E36A024692A257DB72306137FF',
		timeTicket : 10,// 10秒钟轮询一次
		fieldsUrl : URLDICTIONARY.fiber,
		dataUrl : URLDICTIONARY.sensor,
		vin : vin,
		fields : []
	};
	var that = this;
	new ajaxObject({
		Url : URLDICTIONARY.vehicleList + "/" + vin,
		fun : function(data) {
			// console.log(data);

			// optionsDefault.fiberId= data.fiber_unid;
			that.options = $.extend({}, optionsDefault, options || {});
			that.initPage();

		}

	});

}
vehicleDtail
		.extend({
			initPage : function() {
				var that = this;
				new ajaxObject({
					Url : that.options.fieldsUrl + "/" + that.options.fiberId,
					fun : function(data) {
						$("#column_group").trigger('loading-overlay:hide');
						if (typeof data == "object") {
							var column_group = data.column_group;

							that.groupObject(column_group, "column_group");
							that.getCurrentData();
						}
					}
				});

				/*
				 * $.extend(that.options,options); that.getCurrentData();
				 * that.options.timeTicket = setInterval(function() {
				 * that.getCurrentData(); }, 2000); NProgress.set(90/100);
				 */
			},
			groupObject : function(object, id) {
				console.log("detail");
				console.log(object);
				var that = this;
				var columns = object.columns;
				/*
				 * $.each(columns, function(i, field) {
				 * that.options.fields.push(field.code); $("#" + id).append( [ '<div
				 * class="col-md-4">', '<div class="form-group ">', '<label
				 * class="col-sm-5 control-label">' + field.title + '</label>', '<label
				 * id ="' + field.code + '"class="col-sm-6"></label>', '</div></div>'
				 * ].join(" ")); });
				 */
				
				
				if (object.type) {
					var group = object.groups;

					$.each(
									group,
									function(i, field) {
										if (field.columns.length > 0
												|| field.groups.length > 0) {

											if (field.columns.length > 0) {
												$("#column_group" )
														.append(
																[
																		'<div class="col-md-12">',
																		'<section class="panel panel-default">',
																		' <header class="panel-heading">',
																		'	<div class="panel-actions"',
																		'	<a href="#" class="panel-action panel-action-toggle"',
																		'data-panel-toggle=""></a> <a href="#"',
																		'class="panel-action panel-action-dismiss" data-panel-dismiss=""></a>',
																		'</div>',
																		'<span id="panelTitle">'
																				+ field.name
																				+ '</span>',
																		'</header>',
																		'<div  class="panel-body"  id="'
																				+ id
																				+ i
																				+ '" data-loading-overlay data-loading-overlay-options=\'{ "startShowing": true }\' >',

																		'</div>',
																		'</section></div>' ]
																		.join(" "));
											}

											that.typeData(field, id + i);

										}

									});
				} else {
					var group = object.groups;

					$.each(group,
							function(i, field) {
								if (field.columns.length > 0|| field.groups.length > 0) {
									that.groupObject(field, id + i);

								}
							});

				}

			},
			typeData : function(object, id) {
			console.log(object);
				var that = this;
				var columns = object.columns;
				$.each(columns, function(i, field) {
					that.options.fields.push(field.code);
					$("#" + id).append(
							[
									'<div class="col-md-4">',
									'<div class="form-group ">',
									'<label class="col-sm-5 control-label">'
											+ field.title + ':</label>',
									'<label  id ="' + field.code
											+ '"class="col-sm-6"></label>',
									'</div></div>' ].join(" "));
				});
				var group = object.groups;

				$
						.each(
								group,
								function(i, field) {
									if (field.columns.length > 0
											|| field.groups.length > 0) {
										if (field.columns.length > 0) {
											$("#column_group")
													.append(
															[
																	'<div class="col-md-12">',
																	'<section class="panel panel-default">',
																	' <header class="panel-heading">',
																	'	<div class="panel-actions"',
																	'	<a href="#" class="panel-action panel-action-toggle"',
																	'data-panel-toggle=""></a> <a href="#"',
																	'class="panel-action panel-action-dismiss" data-panel-dismiss=""></a>',
																	'</div>',
																	'<span id="panelTitle">'
																			+ field.name
																			+ '</span>',
																	'</header>',
																	'<div  class="panel-body"  id="'
																			+ id
																			+ i
																			+ '" data-loading-overlay data-loading-overlay-options=\'{ "startShowing": true }\' >',

																	'</div>',
																	'</section></div>' ]
																	.join(" "));
										}
										console.log(field);

										that.typeData(field, id + i);
									}

								});

			},
			getCurrentData : function() {
				var that = this;

				new ajaxObject({
					Url : that.options.dataUrl + "/" + that.options.vin,
					data : {
						field : that.options.fields.join(',')
					},
					fun : function(data) {
						console.log(data);

						$.each(data, function(i, f) {
							if (i > 0) {
								$.each(data[0].column, function(j, field) {
									$("#" + field).html(f.column[j]);
								});
							}
						})
					}
				});

				NProgress.set(1);
				NProgress.remove()

			}

		});

function pageStart() {
	var dtail = new vehicleDtail();
	timeTicket=setInterval(function() {
		dtail.getCurrentData();
	}, 2000);
	NProgress.start();

	$(document).on("click", ".panel-actions", function() {

		console.log("click start");
		var div = $(this).parent().next();

		console.log(div.is(":hidden"));
		// console.log(div.html());
		if (div.is(":hidden")) {
			$(this).parent().removeClass("panel-collapsed");
			div.show(); // 如果元素为隐藏,则将它显现
		} else {
			$(this).parent().addClass("panel-collapsed");
			div.hide(); // 如果元素为显现,则将其隐藏
		}
		return false;

	});

}
function clearPage() {
	timeTicket && clearInterval(timeTicket);
}
