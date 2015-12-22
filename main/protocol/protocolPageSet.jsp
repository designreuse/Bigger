<%@ page contentType="text/html; charset=utf-8"%>

<%
	String path = request.getContextPath();
	String basePath;
	if (request.getServerPort() != 80) {
		basePath = "//" + request.getServerName() + ":" + request.getServerPort() + path + "/";
	} else {
		basePath = "//" + request.getServerName() + path + "/";
	}
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">

<html class="fixed sidebar-left-collapsed">
<head>
<base href="<%=basePath%>">

		<title>Tree View | Porto Admin - Responsive HTML5 Template 1.4.2</title>
		<meta name="keywords" content="HTML5 Admin Template" />
		<meta name="description" content="Porto Admin - Responsive HTML5 Template">
		<meta name="author" content="okler.net">

		<!-- Mobile Metas -->
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

		<!-- Web Fonts  -->
		<link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800|Shadows+Into+Light" rel="stylesheet" type="text/css">

		<!-- Vendor CSS -->
		<link rel="stylesheet" href="resources-clear/vendor/bootstrap/css/bootstrap.css" />

		<link rel="stylesheet" href="resources-clear/vendor/font-awesome/css/font-awesome.css" />
		<link rel="stylesheet" href="resources-clear/vendor/magnific-popup/magnific-popup.css" />
		<link rel="stylesheet" href="resources-clear/vendor/bootstrap-datepicker/css/bootstrap-datepicker3.css" />

		<!-- Specific Page Vendor CSS -->
		<link rel="stylesheet" href="resources-clear/vendor/jstree/themes/default/style.css" />

		<!-- Theme CSS -->
		<link rel="stylesheet" href="resources-clear/stylesheets/theme.css" />

		<!-- Skin CSS -->
		<link rel="stylesheet" href="resources-clear/stylesheets/skins/default.css" />

		<!-- Theme Custom CSS -->
		<link rel="stylesheet" href="resources-clear/stylesheets/theme-custom.css">

		<!-- Head Libs -->
		<script src="resources-clear/vendor/modernizr/modernizr.js"></script>
	</head>
	<body>
		<section class="body">
					<!-- start: page -->
					<div class="row">
						<div class="col-md-6">
							<section class="panel">
								<header class="panel-heading">
									<div class="panel-actions">
										<a href="#" class="panel-action panel-action-toggle" data-panel-toggle></a>
										<a href="#" class="panel-action panel-action-dismiss" data-panel-dismiss></a>
									</div>

									<h2 class="panel-title">Basic</h2>
									<p class="panel-subtitle">Interactive tree, basic sample.</p>
								</header>
								<div class="panel-body">
									<div id="treeBasic">
										<ul>
											<li>
												 Root Node
												<ul>
													<li data-jstree='{ "selected" : true }'>
														<a href="#">Selected Node</a>
													</li>
													<li data-jstree='{ "opened" : true }'>
														 Opened Node
														<ul>
															<li data-jstree='{ "disabled" : true }'>
																 Disabled Node
															</li>
															<li data-jstree='{ "type" : "file" }'>
																 Child Node
															</li>
														</ul>
													</li>
													<li data-jstree='{ "icon" : "fa fa-picture-o" }'>
														 Custom Icon
													</li>
													<li data-jstree='{ "icon" : "resources-clear/images/icon.png" }'>
														 Custom Icon Image
													</li>
												</ul>
											</li>
											<li class="colored">
												 Colored
											</li>
											<li class="colored-icon">
												 Colored Icon Only
											</li>
											<li class="folder">
												 Folder Style
											</li>
										</ul>
									</div>
								</div>
							</section>
							<section class="panel">
								<header class="panel-heading">
									<div class="panel-actions">
										<a href="#" class="panel-action panel-action-toggle" data-panel-toggle></a>
										<a href="#" class="panel-action panel-action-dismiss" data-panel-dismiss></a>
									</div>

									<h2 class="panel-title">Ajax</h2>
									<p class="panel-subtitle">You can also use AJAX to populate the tree with HTML your server returns.</p>
								</header>
								<div class="panel-body">
								<div class="col-md-12 col-sm-8 col-xs-8">
								<button class="btn btn-success btn-sm" onclick="demo_create();" type="button"><i class="glyphicon glyphicon-asterisk"></i> Create</button>
								<button class="btn btn-warning btn-sm" onclick="demo_rename();" type="button"><i class="glyphicon glyphicon-pencil"></i> Rename</button>
								<button class="btn btn-danger btn-sm" onclick="demo_delete();" type="button"><i class="glyphicon glyphicon-remove"></i> Delete</button>
							<button class="btn btn-danger btn-sm" onclick="demo_selectAll();" type="button"><i class="glyphicon glyphicon-remove"></i> Delete</button>
					
								</div>
									<div class="col-md-6">
										<h5 class="text-weight-semibold text-dark text-uppercase">HTML</h5>
										<div id="treeAjaxHTML"></div>
									</div>
									<div class="col-md-6">
										<h5 class="text-weight-semibold text-dark text-uppercase">JSON</h5>
										<div id="treeAjaxJSON"></div>
									</div>
								</div>
							</section>
						</div>
						<div class="col-md-6">
							<section class="panel">
								<header class="panel-heading">
									<div class="panel-actions">
										<a href="#" class="panel-action panel-action-toggle" data-panel-toggle></a>
										<a href="#" class="panel-action panel-action-dismiss" data-panel-dismiss></a>
									</div>

									<h2 class="panel-title">Checkbox</h2>
									<p class="panel-subtitle">Checkbox icons in front of each node.</p>
								</header>
								<div class="panel-body">
									<div id="treeCheckbox">
										<ul>
											<li>
												 Root Node
												<ul>
													<li data-jstree='{ "selected" : true }'>
														<a href="#">Selected Node</a>
													</li>
													<li data-jstree='{ "opened" : true }'>
														 Opened Node
														<ul>
															<li data-jstree='{ "disabled" : true }'>
																 Disabled Node
															</li>
															<li data-jstree='{ "type" : "file" }'>
																 Child Node
															</li>
														</ul>
													</li>
													<li data-jstree='{ "icon" : "fa fa-picture-o" }'>
														 Custom Icon
													</li>
													<li data-jstree='{ "icon" : "resources-clear/images/icon.png" }'>
														 Custom Icon Image
													</li>
												</ul>
											</li>
											<li class="colored">
												 Colored
											</li>
											<li class="colored-icon">
												 Colored Icon Only
											</li>
											<li class="folder">
												 Folder Style
											</li>
										</ul>
									</div>
								</div>
							</section>
							<section class="panel">
								<header class="panel-heading">
									<div class="panel-actions">
										<a href="#" class="panel-action panel-action-toggle" data-panel-toggle></a>
										<a href="#" class="panel-action panel-action-dismiss" data-panel-dismiss></a>
									</div>

									<h2 class="panel-title">Drag &amp; Drop</h2>
									<p class="panel-subtitle">Makes it possible to drag and drop tree nodes and rearrange the tree.</p>
								</header>
								<div class="panel-body">
									<div id="treeDragDrop">
										<ul>
											<li>
												 Root Node
												<ul>
													<li data-jstree='{ "selected" : true }'>
														<a href="#">Selected Node</a>
													</li>
													<li data-jstree='{ "opened" : true }'>
														 Opened Node
														<ul>
															<li data-jstree='{ "type" : "file" }'>
																 Child Node
															</li>
															<li data-jstree='{ "type" : "file" }'>
																 Child Node 2
															</li>
															<li data-jstree='{ "type" : "file" }'>
																 Child Node 3
															</li>
														</ul>
													</li>
												</ul>
											</li>
											<li>
												 Root Node 2
											</li>
										</ul>
									</div>
								</div>
							</section>
						</div>
					</div>
					<!-- end: page -->
		</section>
			

		<!-- Vendor -->
		<script src="resources-clear/vendor/jquery/jquery.js"></script>
		<script src="resources-clear/vendor/jquery-browser-mobile/jquery.browser.mobile.js"></script>
		<script src="resources-clear/vendor/bootstrap/js/bootstrap.js"></script>
		<script src="resources-clear/vendor/nanoscroller/nanoscroller.js"></script>
		<script src="resources-clear/vendor/bootstrap-datepicker/js/bootstrap-datepicker.js"></script>
		<script src="resources-clear/vendor/magnific-popup/jquery.magnific-popup.js"></script>
		<script src="resources-clear/vendor/jquery-placeholder/jquery-placeholder.js"></script>
		
		<!-- Specific Page Vendor -->
		<script src="resources-clear/vendor/jstree/jstree.js"></script>
		
		<!-- Theme Base, Components and Settings -->
		<script src="resources-clear/javascripts/theme.js"></script>
		
		<!-- Theme Custom -->
		<script src="resources-clear/javascripts/theme.custom.js"></script>
		
		<!-- Theme Initialization Files -->
		<script src="resources-clear/javascripts/theme.init.js"></script>

		<!-- Examples -->
		<script src="resources-clear/javascripts/ui-elements/examples.treeview.js"></script>
	</body>
</html>