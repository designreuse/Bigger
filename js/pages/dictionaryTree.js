window.theme = {};

// Navigation
(function( $ ) {

	'use strict';

	var $items = $( '.nav-main li.nav-parent' );

	function expand( $li ) {
		$li.children( 'ul.nav-children' ).slideDown( 'fast', function() {
			$li.addClass( 'nav-expanded' );
			$(this).css( 'display', '' );
			ensureVisible( $li );
		});
	}

	function collapse( $li ) {
		$li.children('ul.nav-children' ).slideUp( 'fast', function() {
			$(this).css( 'display', '' );
			$li.removeClass( 'nav-expanded' );
		});
	}

	function ensureVisible( $li ) {
		var scroller = $li.offsetParent();
		if ( !scroller.get(0) ) {
			return false;
		}

		var top = $li.position().top;
		if ( top < 0 ) {
			scroller.animate({
				scrollTop: scroller.scrollTop() + top
			}, 'fast');
		}
	}

	$items.find('> a').on('click', function( ev ) {

		var $anchor = $( this ),
			$prev = $anchor.closest('ul.nav').find('> li.nav-expanded' ),
			$next = $anchor.closest('li');

		if ( $anchor.prop('href') ) {
			var arrowWidth = parseInt(window.getComputedStyle($anchor.get(0), ':after').width, 10) || 0;
			if (ev.offsetX > $anchor.get(0).offsetWidth - arrowWidth) {
				ev.preventDefault();
			}
		}

		if ( $prev.get( 0 ) !== $next.get( 0 ) ) {
			collapse( $prev );
			expand( $next );
		} else {
			collapse( $prev );
		}
	});


}).apply( this, [ jQuery ]);

// Skeleton
(function(theme, $) {

	'use strict';

	theme = theme || {};

	var $body		= $( 'body' ),
		$html		= $( 'html' ),
		$window		= $( window ),
		isAndroid	= navigator.userAgent.toLowerCase().indexOf('android') > -1;

	// mobile devices with fixed has a lot of issues when focus inputs and others...
	if ( typeof $.browser !== 'undefined' && $.browser.mobile && $html.hasClass('fixed') ) {
		$html.removeClass( 'fixed' ).addClass( 'scroll' );
	}

	var Skeleton = {

		options: {
			sidebars: {
				menu: '#content-menu',
				left: '#sidebar-left',
				right: '#sidebar-right'
			}
		},

		customScroll: ( !Modernizr.overflowscrolling && !isAndroid && $.fn.nanoScroller !== 'undefined'),

		initialize: function() {
			this
				.setVars()
				.build()
				.events();
		},

		setVars: function() {
			this.sidebars = {};

			this.sidebars.left = {
				$el: $( this.options.sidebars.left )
			};

			this.sidebars.right = {
				$el: $( this.options.sidebars.right ),
				isOpened: $html.hasClass( 'sidebar-right-opened' )
			};

			this.sidebars.menu = {
				$el: $( this.options.sidebars.menu ),
				isOpened: $html.hasClass( 'inner-menu-opened' )
			};

			return this;
		},

		build: function() {

			if ( typeof $.browser !== 'undefined' && $.browser.mobile ) {
				$html.addClass( 'mobile-device' );
			} else {
				$html.addClass( 'no-mobile-device' );
			}

			$html.addClass( 'custom-scroll' );
			if ( this.customScroll ) {
				//console.log(this.customScroll);
				this.buildSidebarLeft();
				this.buildContentMenu();
			}

			this.buildSidebarRight();

			return this;
		},

		events: function() {
			if ( this.customScroll ) {
				this.eventsSidebarLeft();
			}

			this.eventsSidebarRight();
			this.eventsContentMenu();

			if ( typeof $.browser !== 'undefined' && !this.customScroll && isAndroid ) {
				this.fixScroll();
			}

			return this;
		},

		fixScroll: function() {
			var _self = this;

			$window
				.on( 'sidebar-left-opened sidebar-right-toggle', function( e, data ) {
					_self.preventBodyScrollToggle( data.added );
				});
		},

		buildSidebarLeft: function() {
			this.sidebars.left.isOpened = !$html.hasClass( 'sidebar-left-collapsed' ) || $html.hasClass( 'sidebar-left-opened' );

			this.sidebars.left.$nano = this.sidebars.left.$el.find( '.nano' );

			this.sidebars.left.$nano.nanoScroller();
			
			
			return this;
		},

		eventsSidebarLeft: function() {

			var _self = this,
				$nano = this.sidebars.left.$nano;

			var open = function() {
				if ( _self.sidebars.left.isOpened ) {
					return close();
				}

				_self.sidebars.left.isOpened = true;

				$html.addClass( 'sidebar-left-opened' );

				$window.trigger( 'sidebar-left-toggle', {
					added: true,
					removed: false
				});

				$html.on( 'click.close-left-sidebar', function(e) {
					e.stopPropagation();
					close(e);
				});


			};

			var close = function(e) {
				if ( !!e && !!e.target && ($(e.target).closest( '.sidebar-left' ).get(0) || !$(e.target).closest( 'html' ).get(0)) ) {
					e.preventDefault();
					return false;
				} else {

					$html.removeClass( 'sidebar-left-opened' );
					$html.off( 'click.close-left-sidebar' );

					$window.trigger( 'sidebar-left-toggle', {
						added: false,
						removed: true
					});

					_self.sidebars.left.isOpened = !$html.hasClass( 'sidebar-left-collapsed' );

				}
			};

			var updateNanoScroll = function() {
				if ( $.support.transition ) {
					$nano.nanoScroller();
					$nano
						.one('bsTransitionEnd', updateNanoScroll)
						.emulateTransitionEnd(150)
				} else {
					updateNanoScroll();
				}
			};

			var isToggler = function( element ) {
				return $(element).data('fire-event') === 'sidebar-left-toggle' || $(element).parents().data('fire-event') === 'sidebar-left-toggle';
			};

			this.sidebars.left.$el
				.on( 'click', function() {	
					
					updateNanoScroll();
				})
				.on('touchend', function(e) {
					_self.sidebars.left.isOpened = !$html.hasClass( 'sidebar-left-collapsed' ) || $html.hasClass( 'sidebar-left-opened' );
					if ( !_self.sidebars.left.isOpened && !isToggler(e.target) ) {
						e.stopPropagation();
						e.preventDefault();
						open();
					}
				});

			$nano
				.on( 'mouseenter', function() {
					if ( $html.hasClass( 'sidebar-left-collapsed' ) ) {
						$nano.nanoScroller({
							alwaysVisible: true,
							preventPageScrolling: true
						});
					}
				})
				.on( 'mouseleave', function() {
					if ( $html.hasClass( 'sidebar-left-collapsed' ) ) {
						$nano.nanoScroller();
					}
				});

			$window.on( 'sidebar-left-toggle', function(e, toggle) {
				if ( toggle.removed ) {
					$html.removeClass( 'sidebar-left-opened' );
					$html.off( 'click.close-left-sidebar' );
				}
			});

			return this;
		},

		buildSidebarRight: function() {
			this.sidebars.right.isOpened = $html.hasClass( 'sidebar-right-opened' );

			if ( this.customScroll ) {
				this.sidebars.right.$nano = this.sidebars.right.$el.find( '.nano' );

				this.sidebars.right.$nano.nanoScroller({
					alwaysVisible: true,
					preventPageScrolling: true
				});
			}

			return this;
		},

		eventsSidebarRight: function() {
			var _self = this;

			var open = function() {
				if ( _self.sidebars.right.isOpened ) {
					return close();
				}

				_self.sidebars.right.isOpened = true;

				$html.addClass( 'sidebar-right-opened' );

				$window.trigger( 'sidebar-right-toggle', {
					added: true,
					removed: false
				});

				$html.on( 'click.close-right-sidebar', function(e) {
					e.stopPropagation();
					close(e);
				});
			};

			var close = function(e) {
				if ( !!e && !!e.target && ($(e.target).closest( '.sidebar-right' ).get(0) || !$(e.target).closest( 'html' ).get(0)) ) {
					return false;
				}

				$html.removeClass( 'sidebar-right-opened' );
				$html.off( 'click.close-right-sidebar' );

				$window.trigger( 'sidebar-right-toggle', {
					added: false,
					removed: true
				});

				_self.sidebars.right.isOpened = false;
			};

			var bind = function() {
				$('[data-open="sidebar-right"]').on('click', function(e) {
					var $el = $(this);
					e.stopPropagation();

					if ( $el.is('a') )
						e.preventDefault();

					open();
				});
			};

			this.sidebars.right.$el.find( '.mobile-close' )
				.on( 'click', function( e ) {
					e.preventDefault();
					$html.trigger( 'click.close-right-sidebar' );
				});

			bind();

			return this;
		},

		buildContentMenu: function() {
			if ( !$html.hasClass( 'fixed' ) ) {
				return false;
			}

			this.sidebars.menu.$nano = this.sidebars.menu.$el.find( '.nano' );

			this.sidebars.menu.$nano.nanoScroller({
				alwaysVisible: true,
				preventPageScrolling: true
			});

			return this;
		},

		eventsContentMenu: function() {
			var _self = this;

			var open = function() {
				if ( _self.sidebars.menu.isOpened ) {
					return close();
				}

				_self.sidebars.menu.isOpened = true;

				$html.addClass( 'inner-menu-opened' );

				$window.trigger( 'inner-menu-toggle', {
					added: true,
					removed: false
				});

				$html.on( 'click.close-inner-menu', function(e) {

					close(e);
				});

			};

			var close = function(e) {
				var hasEvent,
					hasTarget,
					isCollapseButton,
					isInsideModal,
					isInsideInnerMenu,
					isInsideHTML,
					$target;

				hasEvent = !!e;
				hasTarget = hasEvent && !!e.target;

				if ( hasTarget ) {
					$target = $(e.target);
				}

				isCollapseButton = hasTarget && !!$target.closest( '.inner-menu-collapse' ).get(0);
				isInsideModal = hasTarget && !!$target.closest( '.mfp-wrap' ).get(0);
				isInsideInnerMenu = hasTarget && !!$target.closest( '.inner-menu' ).get(0);
				isInsideHTML = hasTarget && !!$target.closest( 'html' ).get(0);

				if ( (!isCollapseButton && (isInsideInnerMenu || !isInsideHTML)) || isInsideModal ) {
					return false;
				}

				e.stopPropagation();

				$html.removeClass( 'inner-menu-opened' );
				$html.off( 'click.close-inner-menu' );

				$window.trigger( 'inner-menu-toggle', {
					added: false,
					removed: true
				});

				_self.sidebars.menu.isOpened = false;
			};

			var bind = function() {
				$('[data-open="inner-menu"]').on('click', function(e) {
					var $el = $(this);
					e.stopPropagation();

					if ( $el.is('a') )
						e.preventDefault();

					open();
				});
			};

			bind();

			/* Nano Scroll */
			if ( $html.hasClass( 'fixed' ) ) {
				var $nano = this.sidebars.menu.$nano;

				var updateNanoScroll = function() {
					if ( $.support.transition ) {
						$nano.nanoScroller();
						$nano
							.one('bsTransitionEnd', updateNanoScroll)
							.emulateTransitionEnd(150)
					} else {
						updateNanoScroll();
					}
				};

				this.sidebars.menu.$el
					.on( 'click', function() {
						updateNanoScroll();
					});
			}

			return this;
		},

		preventBodyScrollToggle: function( shouldPrevent, $el ) {
			setTimeout(function() {
				if ( shouldPrevent ) {
					$body
						.data( 'scrollTop', $body.get(0).scrollTop )
						.css({
							position: 'fixed',
							top: $body.get(0).scrollTop * -1
						})
				} else {
					$body
						.css({
							position: '',
							top: ''
						})
						.scrollTop( $body.data( 'scrollTop' ) );
				}
			}, 150);
		}

	};

	// expose to scope
	$.extend(theme, {
		Skeleton: Skeleton
	});

}).apply(this, [ window.theme, jQuery ]);





function dictionaryTree(options) {
	var defaultoptions = {
		Url : URLDICTIONARY.protocol,
		type : 'post',
		async : true,
		data : {},
		dataType : 'xml',
		cache : true,
		complete : function(id, data) {
			//console.log(id);
		},
		fun : function(data) {
			console.log(data);
		},
		protocolId : '',
		fieldCode : '',
		fieldKey : '',
		fieldValue : ''
	}

	this.options = $.extend({}, defaultoptions, options || {});
}
dictionaryTree.extend({
	options : {
		Url : URLDICTIONARY.protocol,
		type : 'post',
		async : true,
		data : {},
		dataType : 'xml',
		cache : true,
		complete : function(id, data) {
			//console.log(id);
		},
		fun : function(data) {
			//console.log(data);
		},
		protocolId : '',
		fieldCode : '',
		fieldKey : '',
		fieldValue : ''
	},
	ajax : function(options) {

		var that = this;
		jQuery.ajax({
			url : that.options.Url,
			type : that.options.type,
			data : that.options.data,
			dataType : that.options.dataType,
			async : that.options.async,
			cache : that.options.cache | false,

			success : function(data, textStatus, XMLHttpRequest) {
				// console.log(XMLHttpRequest.status);
				// console.log("success");
				var dateStr = XMLHttpRequest.getResponseHeader('Location');
				// console.log(dateStr);
				if (XMLHttpRequest.status == 201) {
					var id = dateStr.substr(dateStr.lastIndexOf('/') + 1);
					that.options.complete(id, that.options.data);
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
					that.options.fun && that.options.fun.call(that, data);
				}

				// 数据应用
				// alert(JSON.stringify(lngLatArray));
				// alert(JSON.stringify(datetimeArray));

			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				console.log(XMLHttpRequest.status);
				console.log(textStatus);

				// var dateStr = XMLHttpRequest.getResponseHeader('Location');
				// console.log(dateStr);
				// alert(textStatus);
			}
		});
	},
	getAllProtocol : function() {
		var that = this;
		that.options = $.extend(that.options, {
			type : "get",
			Url : URLDICTIONARY.protocol,
			dataType : "json",
			fun : function(data) {
				//console.log("协议列表");
				//console.log(data);
			}
		});
		that.ajax();
	},

	getRootFamily : function() {
		var that = this;

		/*
		 * that.options=$.extend(that.options,{ type:"get",
		 * Url:URLDICTIONARY.proto_family, dataType:"json", fun:function(data) {
		 * console.log("协议族列表"); console.log(data);
		 *  } });
		 */
		that.ajax();
	},
	getProtocolById : function() {
		var that = this;

		that.options = $.extend(that.options, {
			type : "get",
			Url : URLDICTIONARY.protocol + "/" + that.options.protocolId,
			dataType : "json",
			fun : function(data) {
				//console.log("协议明细");
				//console.log(data);
			}
		});
		that.ajax();
	},
	createField : function() {
		var that = this;
		that.options.Url = URLDICTIONARY.protocol + "/"
				+ that.options.protocolId + "/field";
		that.options.type = "post";
		that.options = $.extend(that.options, {});
		that.ajax();

	},
	updateField : function() {
		var that = this;
		that.options.Url = URLDICTIONARY.protocol + "/"
				+ that.options.protocolId + "/field/" + that.options.fieldCode;
		that.options.data[that.options.fieldKey] = that.options.fieldValue;
		that.options.type = "put";
		that.options = $.extend(that.options, {});
		that.ajax();
	},
	deleteField : function() {

		var that = this;
		that.options.Url = URLDICTIONARY.protocol + "/"
				+ that.options.protocolId + "/field/" + that.options.fieldCode;
		that.options.type = "delete";
		that.options = $.extend(that.options, {});
		that.ajax();
	},
	getAllsubProtocol : function(id, treeId) {// id 父协议的id protocols 存放协议的容器数组
		var that = this;
		var subProtocols_f = new dictionaryTree({
			type : "get",
			Url : URLDICTIONARY.proto_family + "/" + id + "/sub_family",
			dataType : "json",
			fun : function(data) {
				//console.log("子协议族");
				//console.log(data);

				$.each(data, function(i, field) {
					var options = {
						id : field.unid,
						text : field.name,
						parent : field.super_unid,
						type : 'folder'
					};
					var ref = $('#treeAjaxHTML').jstree(true);
					setTimeout(function(){
					ref.create_node(id, options, 'last', function() {
						that.getAllsubProtocol(field.unid, "treeAjaxHTML");
					});},50);

				});
			}
		});
		subProtocols_f.ajax();
		var subProtocols = new dictionaryTree({
			type : "get",
			Url : URLDICTIONARY.proto_family + "/" + id + "/sub_proto",
			dataType : "json",
			fun : function(data) {
				$.each(data, function(i, field) {
					var options = {
						id : field.unid,
						text : field.name,
						parent : field.super_unid,
						type : 'file'
					};
					var ref = $('#treeAjaxHTML').jstree(true);
					setTimeout(function(){
					ref.create_node(id, options, 'last', function() {
						// that.getAllsubProtocol(id,"treeAjaxHTML");
					});},50);
				});
				//console.log("子协议族");
				//console.log(data);
			}
		});
		subProtocols.ajax();
	},
	createTreeNode : function(id, treeID, options) {

		var ref = $('#treeAjaxHTML').jstree(true);
		ref.create_node(id, options, 'last', function() {
			//console.log("创建成功1");
		}, false);

	}

});


function pageStart_One()
{
	// Base
	(function(theme, $) {

		'use strict';

		theme = theme || {};

		theme.Skeleton.initialize();

	}).apply(this, [ window.theme, jQuery ]);
	$("#createTree").click(function() {
		$("#createTreeBody").show();
	});
	$("#updateTree").click(function() {
		$("#updateTreeBody").show();
	});

	$('#treeAjaxHTML').jstree({
		'core' : {
			'check_callback' : true,
			'data' : [],
		},
		'types' : {
			'default' : {
				'icon' : ' jstree-icon fa fa-folder'
			},
			'file' : {
				'icon' : 'jstree-icon fa fa-file'
			}
		},
		'plugins' : [ 'types', 'dnd' ]
	});

	$('#treeAjaxHTML').on('select_node.jstree', function(node, selected) {

		//console.log(selected.node);
		if (selected.node.type == "file") {
			// var tree=new dictionaryTree();
			// tree.options.protocolId=selected.node.id;
			// tree.createField();
			vehicleDictionaryDemo.protocolId = selected.node.id;
			vehicleDictionaryDemo.createTable();
		}

	});
	var pro = [];
	var protocols = new dictionaryTree({
		type : "get",
		Url : URLDICTIONARY.proto_family,
		dataType : "json",
		fun : function(data) {
		   
			console.log("协议族列表");
		    console.log(data);
			$.each(data, function(i, field) {
				var id = field.unid;
				//console.log(id);
				var options = {
					id : id,
					text : field.name,
					parent : '#',
					type : 'folder'
				};
				var ref = $('#treeAjaxHTML').jstree(true);
				setTimeout(function(){
					ref.create_node("#", options, 'last', function() {
						protocols.getAllsubProtocol(id, "treeAjaxHTML");
					});
					
				},400 );
				

			});
			//console.log("打印所有协议");
			//console.log(pro);

		}
	});
	// protocols.getAllProtocol();
	protocols.getRootFamily();
}

(function($) {

	

}).apply(this, [ jQuery ]);

function cancel() {
	$("#createTreeBody,#updateTreeBody").hide();
}
function createRoot() {
	var name = $("#name").val();
	var type = $("input[name='porto_is']:checked").val();
	var tree = new dictionaryTree();
	if (type == "folder") {

		var ref = $('#treeAjaxHTML').jstree(true), sel = ref.get_selected();

		var parentId = '#';
		if (sel.length > 0) {
			parentId = sel[0];
		}
		tree.options.Url = URLDICTIONARY.proto_family;
		tree.options.complete = function(id, data) {
			if (typeof data == "object") {
				$("#treeAjaxHTML").jstree('create_node', parentId, {
					'id' : id,
					'text' : data.name
				}, 'last', function() {
				}, true);
				$("#createTree").next().hide();
				new PNotify({
					title : "文件夹创建",
					text : "文件夹创建成功",
					type : 'success'
				});
			}
		};
		var parentId = '#';
		if (sel.length > 0) {
			parentId = sel[0];
		}
		tree.options.data = {
			name : name,
			byte_order : 0,
			super_unid : parentId
		};

	} else {
		tree.options.Url = URLDICTIONARY.protocol;
		tree.options.complete = function(id, data) {
			var ref = $('#treeAjaxHTML').jstree(true), sel = ref.get_selected();
			if (!sel) {

				return;
			}
			var parentId = sel[0];
			// 协议和协议族绑定
			var protocols = new dictionaryTree({
				type : "put",
				Url : URLDICTIONARY.proto_family + "/" + parentId
						+ "/sub_proto",
				dataType : "xml",
				data : {
					proto_unid : id
				},
				fun : function(data) {
					//console.log("绑定成功");

				}
			});

			protocols.getRootFamily();

			if (typeof data == "object") {
				var ref = $('#treeAjaxHTML').jstree(true), sel = ref
						.get_selected();
				sel = ref.create_node(sel, {
					"id" : id,
					"text" : data.name,
					"type" : "file"
				});
				$("#createTree").next().hide();
				new PNotify({
					title : "文件创建",
					text : "文件创建成功",
					type : 'success'
				});
			}

		};
		tree.options.data = {
			name : name,
			byte_order : 0

		};

	}
	tree.options = $.extend(tree.options, {});
	tree.ajax();

}
var protocols = [];

function demo_rename() {
	var ref = $('#treeAjaxHTML').jstree(true), sel = ref.get_selected(true);
	if (!sel) {
		return false;
	}
	$("#updateTreeBody #name").val(sel[0].text);
	//$("#updateTreeBody #fileR").prop("checked", true)
	/*if(sel.type=="file")
		{
		url= URLDICTIONARY.protocol + "/" + id;
		}else
			{
			url= URLDICTIONARY.proto_family + "/" + id;
			
		}
	// ref.edit(sel);
	var tree = new dictionaryTree(
			{
				Url:url,
				type:'get',
				dataType:"json",
				fun:function(data){
					
					var name = data.name;
					$("#updateTreeBody #name").val(name);
					$("#updateTreeBody #fileR").prop("checked", true);
			 }
			});
	 tree.ajax();*/

};

function updateNode()
{
	var ref = $('#treeAjaxHTML').jstree(true), sel = ref.get_selected(true);
	if (!sel) {
		return false;
	}
	var name=$("#updateTreeBody #name").val();
	var id=sel[0].id;
	if(name==sel[0].text)
	{
		return false;
	}
	if(sel[0].type=="file")
	{
	    url= URLDICTIONARY.protocol + "/" + id;
	}else
	{
		url= URLDICTIONARY.proto_family + "/" + id;
	}
// ref.edit(sel);
var tree = new dictionaryTree(
		{
			Url:url,
			type:'put',
			dataType:"json",
			data:{
			name:name||sel.name
			},
			fun:function(){
				new PNotify({
					title : "修改节点",
					text : "修改节点成功",
					type : 'success'
				});
				
			}
		
			
		});
     tree.ajax();
}

function demo_delete() {
	var ref = $('#treeAjaxHTML').jstree(true), sel = ref.get_selected(true);
	if (!sel) {
		return false;
	}
	var type = sel[0].type;
	if (type == "file") {
		deleteFile(sel[0].parent, sel[0].id);
	} else {
		deleteFolder(sel[0].parent, sel[0].id);
	}

};

function deleteFile(parentid, id) {
	var tree = new dictionaryTree({
		Url : URLDICTIONARY.proto_family + "/" + parentid + "/sub_proto",
		type : 'delete',
		dataType : 'xml',
		data : {
			proto_unid : id
		},
		fun : function() {

			var subNode = new dictionaryTree({
				Url : URLDICTIONARY.protocol + "/" + id,
				type : 'delete',
				dataType : 'xml',
				fun : function() {
					ref.delete_node(sel);
					new PNotify({
						title : "删除节点",
						text : "删除节点成功",
						type : 'success'
					});
				}
			});
			subNode.ajax();
		}
	});
	tree.ajax();
}

function deleteFolder(parentid, id) {
	// 获取所有的子节点
	var ref = $('#treeAjaxHTML').jstree(true);
	sel = ref.get_selected(true);
	var test = ref.is_leaf(sel[0]);
	//console.log(test);
	if (!test) {
		new PNotify({
			title : "删除节点",
			text : "删除节点失败，该节点存在子节点！",
			type : 'error'
		});
		return false;
	}
	var tree = new dictionaryTree({
		Url : URLDICTIONARY.proto_family + "/" + id,
		type : 'delete',
		dataType : 'xml',
		fun : function() {
			ref.delete_node(sel);
			new PNotify({
				title : "删除节点",
				text : "删除节点成功",
				type : 'success'
			});
		}

	});
	tree.ajax();
}

function demo_selectAll() {
	var ref = $('#treeAjaxHTML').jstree(true), sel = ref.get_json("#", {
		'flat' : true
	});
	// if(!sel.length) { return false; }
	console.log(sel);
};
