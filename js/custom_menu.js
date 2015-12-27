var menuJs = function(options) {
	var defaultOptions = {
		currentUrl : '',
		activeClass : 'nav-active',
		expendClass : 'nav-expanded',
		rootClass : 'nav-parent',
		selecedKey : '',
		selecedKey2 : '',
		menuId : '#menu',
		pageTitle : '',
		pageParents : [],
		menuArray : [],
		allmenu : [],
		menuType : "1",
		isCatch: true,
		fun: function ()
		{
		}
	// true 从缓存中获取数据 默认为true
	// 1默认为多车 2代表单车
	};
	this.options = $.extend({}, defaultOptions, options);
	this.initMenu();

};
menuJs.prototype.catchMenu = function() {
	var obj = getCookie("menu");
	//console.log("缓存");
	//console.log(obj);
	if (obj) {
		obj = JSON.parse(obj);
		if ($.isArray(obj)) {
			that.options.menuArray = obj;
			that.createHtml("#");
			that.bindMenuClick();
			that.initP();
			that.selectedMenu();
			//console.log("获取缓存中数据");
			return true;
		}
	}
	return false;
}
menuJs.prototype.initMenu = function() {
	var that = this;
	var isCatchData = that.catchMenu();
	if (isCatchData) {
		return false;
	}

	that.getMenuData(function(menus, menuArray) {
		    that.options.allmenu = menuArray;
			that.getButtonData(function(data) {
				var temp=[];
				$.each(data,function (i,field){

					temp.push(field.menu_unid);
				})
				$.each(menus,function (i,field){

					temp.push(field.unid);
				})
			that.formatMenuData(temp, menuArray);

			////console.log(that.options.menuArray);
			setCookie("menu", JSON.stringify(that.options.menuArray), 1);
			that.createHtml("#");
			that.bindMenuClick();
			that.initP();

			that.options.fun.call(that);
			//that.selectedMenu();

		});
	});

};
menuJs.prototype.selectedMenu = function() {
	var that = this;

	$("." + that.options.activeClass + ",." + that.options.expendClass)
			.removeClass(that.options.activeClass).removeClass(
					that.options.expendClass);
	// 获取当前目录
	that.getCurrentUrl();
	that.getFirstAndSecond();
	// 设置菜单样式
	that.setActive();
	// 设置菜单名称
	// 设置面包屑目录
	that.setTitle();

};
menuJs.prototype.getCurrentUrl = function() {
	var that = this;
	that.options.currentUrl = window.location.pathname;
};
menuJs.prototype.getFirstAndSecond = function() {
	var that = this;
	var path = that.options.currentUrl.split('?')[0].split('/');
	if (path.length > 0) {
		if (isNaN(path[path.length - 1])) {
			that.options.selecedKey = path[path.length - 1];
			if (path.length > 1)
				that.options.selecedKey2 = path[path.length - 2];
		} else {
			if (path.length > 1) {
				that.options.selecedKey = path[path.length - 2];
			}

			if (path.length > 2) {

				that.options.selecedKey2 = path[path.length - 3];
			}

		}
	}
};

menuJs.prototype.setActive = function() {
	var that = this;
	var check = [];
	var checkRoot = [];
	var temp = [];
	if (that.options.selecedKey2) {
		temp = $(" a[href^='" + that.options.selecedKey2 + "/"
				+ that.options.selecedKey + "']");

	} else {
		temp = $(" a[herf^='" + that.options.selecedKey + "']");

	}
	if (temp.length > 0) {
		that.options.pageParents = [];
		that.options.pageTitle = temp;
		check = temp.parents("li");
		checkRoot = temp.parents("." + that.options.rootClass);
		checkRoot.each(function() {
			that.options.pageParents.push($(this).find("a:first"));

		});

		if (check.length > 0) {
			check.addClass(that.options.activeClass);
		}

		if (checkRoot.length > 0) {

			checkRoot.addClass(that.options.activeClass).addClass(
					that.options.expendClass);
		}

	}

};
menuJs.prototype.setTitle = function() {

	var that = this;
	if (that.options.menuType != "1") {
		$(".page-header h2").html(that.options.pageTitle.html());

		$(".breadcrumbs").children().remove();
		$.each(that.options.pageParents, function(i, field) {
			$(".breadcrumbs").append($("<li/>").append(field.clone()));
		});
		$(".breadcrumbs").children('.ti').remove();
		$(".breadcrumbs").append(
				$("<li class='ti'/>").append(that.options.pageTitle.html()));
	}
};
menuJs.extend({
			getButtonData : function(fun) {
				var that = this;
				new ajaxObject({
					Url : URLDICTIONARY.role + '/'
							+ '077F7D4252214C4BB1C1E801680C41D2'
							+ "/button",
					fun : function(data) {
						fun.call(that, data);
					},
					errorFun : function() {

						fun && fun.call(that, []);
					}
				})
			},
			getMenuData : function(fun) {
				var that = this;
				new ajaxObject({
					Url : URLDICTIONARY.menu,
					fun : function(data) {// 获取所有菜单数据
						var menuArray = data;
						new ajaxObject({
							Url : URLDICTIONARY.role + '/'
									+ '077F7D4252214C4BB1C1E801680C41D2'
									+ "/menu",
							fun : function(data) {// 获取菜单数据\

								fun && fun.call(that, data, menuArray);

							},
							errorFun : function() {

								fun && fun.call(that, [], menuArray);
							}
						});
					}
				});

			},
			/*
			 * 根据当前菜单id，查找上级菜单，直到顶部 把当前菜单和以及其上面的所有菜单存入数组 格式化顶部菜单的父id为“#”
			 */
			formatMenuData : function(menus, menuArray) {
				var that = this;
				var tempInt = -1;
				var menuTemp = $.grep(menuArray, function(menuField, i) {

					try{
						if (menuField.super_unid == "null"
							|| menuField.super_unid == ""
							|| menuField.super_unid == "0") {
							menuField.super_unid = "#";
					    }
						var temp=$.grep(menus,function(menu,i){
							      return menu==menuField.unid ;
						});
						if (temp.length>0) {
							return menuField;
						}
					}catch(e){

						//console.log(e);
						//return false;
					}


				});

				//console.log(menuTemp);


				var temp=[];
				$.each(menuTemp,function(i,field){

						 var arr=$.grep(that.options.menuArray,function(f,i){
							 return f.unid==field.unid;
						 });
						 if(arr.length==0)
							 {
							 that.options.menuArray.push(field);
							 if(field.super_unid!="#")
								{
						          temp.push(field.super_unid);
							    }
					}
				});
				if(temp.length>0)
				{
				that.formatMenuData(temp, menuArray);
				}

			},

			createHtml : function(id) {
				var that = this;
				// 根据格式化的菜单数据生成菜单

				var menus = $.grep(that.options.menuArray, function(menu, i) {
					return menu.super_unid == id&&menu.menu_type==that.options.menuType;
				});
				menus.sort(function(fieldA, fieldB) {
					return fieldA.inx*1 - fieldB.inx*1;
				});
				//console.log(menus);
				$.each(menus,function(i, field) {

					if ($("#" + field.unid).size() > 0) {
						return true;
					}
					var url = field.redirect_uri;
					if ($.trim(url) == "#") {
						url = "javascript:void(0);"
					}
					if (field.menu_type == "1"&& field.super_unid != "#") {

							$("#mainMenu").append(['<li id="'
															+ field.unid
															+ '" >',
													'<a href="'
															+ url
															+ '">',
													'<i class="'
															+ field.icon_uri
															+ '" aria-hidden="true"></i>',
													'<span>'
															+ field.name
															+ '</span>',
													'</a>', '</li>' ]
													.join(" "));

					} else if (field.menu_type == "2") {

							if (id == "#") {
									$("#mainMenu").append([
															'<li id="'
																	+ field.unid
																	+ '" >',
															'<a href="'
																	+ url
																	+ '">',
															'<i class="'
																	+ field.icon_uri
																	+ '" aria-hidden="true"></i>',
															'<span>'
																	+ field.name
																	+ '</span>',
															'</a>',
															'</li>' ]
															.join(" "));
									 } else {

										if ($("#" + id).has("ul").length > 0) {
											$("#" + id + " ul").append([
																	'<li id="'
																			+ field.unid
																			+ '">',
																	'<a href="'
																			+ url
																			+ '">',
																	'<i class="'
																			+ field.icon_uri
																			+ '" aria-hidden="true"></i>',
																	'<span>'
																			+ field.name
																			+ '</span>',
																	'</a>',
																	'</li>' ]
																	.join(" "));
										} else {
												$("#" + id).addClass("nav-parent");
												$("#" + id).append([
																		'<ul class="nav nav-children"><li id="'
																				+ field.unid
																				+ '">',
																		'<a href="'
																				+ url
																				+ '">',
																		'<i class="'
																				+ field.icon_uri
																				+ '" aria-hidden="true"></i>',
																		'<span>'
																				+ field.name
																				+ '</span>',
																		'</a>',
																		'</li></ul>' ]
																		.join(" "));

											}

										}
									}
									that.createHtml(field.unid);
								});
			},
			bindMenuClick : function() {
				var that = this;
				$("#mainMenu a[href!='#']").each(function(i, field) {

									var href = $(field).attr("href");

									if (href && href.indexOf("/") > 0) {

										$(this).off("click").on("click",function(e) {


												e.preventDefault();

												var $that = $(this);

												if (typeof clearPage == "function") {
													clearPage();
													delete clearPgae;
													clearPage = null;
												}
												var href = $that.attr("href");
												var hr = href.replace('/','_');

												if (that.options.currentUrl == hr) {
													return  false;
												} else {
													that.options.currentUrl = hr;
												}

												that.options.pageTitle = $that.find("span");

												var checkRoot = $that.parents("."+ that.options.rootClass);

											  that.options.pageParents = [];

												checkRoot.each(function() {
													  		that.options.pageParents.push(
															$(this).find("a:first"));

															});
												that.setTitle();

												var href = $(this).attr("href");

												var $section = $("#mainBody");
												$(".nav-active").removeClass("nav-active");
												$that.parents("li").addClass("nav-active")
																   .parents(".nav-parent")
																   .addClass("nav-active");



												$section.animate({opacity : 0},500,function() {
															pageStart = null;
															pageStart_One = null;
															pageStart_Two = null;
															pageStart_Three = null;
														var index=$.inArray(hr,tableList);
														if(index>-1)
														{
															href="tableLayout";
														}
														//	$section.children().remove();
															$section.load("main/"+href+".html",function() {



																	$("div[include]").each(function(){
																		  var that=this;
                                      $(that).load($(that).attr("include"));
																	});
																	$.loadjs(dictionaryJs[hr],function() {
																		 try{
																			  if (typeof pageStart == "function") {
																					pageStart();
																					delete pageStart;
																					pageStart = null;
																				}
																				if (typeof pageStart_One == "function") {
																					pageStart_One();
																					delete pageStart_One;
																					pageStart_One = null;
																				}
																				if (typeof pageStart_Two == "function") {
																					pageStart_Two();
																					delete pageStart_Two;
																					pageStart_Two = null;
																				}
																				if (typeof pageStart_Three == "function") {
																					pageStart_Three();
																					delete pageStart_Three;
																					pageStart_Three = null;
																				}

																		 } catch(e){
																			 console.log(e);
																		 }

																	});

																 });
														    });

															$section.animate({opacity : 1}, 1000,function() {});

															return false;

												});
									   }

								});

			},
			expand : function($li) {
				var that = this;
				$li.children('ul.nav-children').slideDown('fast', function() {
					$li.addClass('nav-expanded');
					$(this).css('display', '');
					that.ensureVisible($li);
				});
			},
			collapse : function($li) {
				$li.children('ul.nav-children').slideUp('fast', function() {
					$(this).css('display', '');
					$li.removeClass('nav-expanded');
				});
			},
			ensureVisible : function($li) {

				var scroller = $li.offsetParent();
				if (!scroller.get(0)) {
					return false;
				}

				var top = $li.position().top;
				if (top < 0) {
					scroller.animate({
						scrollTop : scroller.scrollTop() + top
					}, 'fast');
				}
			},
			initP : function() {
				var that = this;
				var $items = $('.nav-main li.nav-parent');
				$items.find('> a').on('click',function(ev) {
									var $anchor = $(this), $prev = $anchor
											.closest('ul.nav').find(
													'> li.nav-expanded'), $next = $anchor
											.closest('li');

									if ($anchor.prop('href')) {
										var arrowWidth = parseInt(
												window.getComputedStyle($anchor
														.get(0), ':after').width,
												10) || 0;
										if (ev.offsetX > $anchor.get(0).offsetWidth
												- arrowWidth) {
											ev.preventDefault();
										}
									}

									if ($prev.get(0) !== $next.get(0)) {
										that.collapse($prev);
										that.expand($next);
									} else {
										that.collapse($prev);
									}
						});
			  }

		});
