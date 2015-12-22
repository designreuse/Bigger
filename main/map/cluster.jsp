<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>My JSP 'Cluster.jsp' starting page</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

<link rel="stylesheet" href="//cache.amap.com/lbs/static/main.css" />
<style type="text/css">
#tip {
	height: 30px;
	background-color: #fff;
	padding-left: 10px;
	padding-right: 10px;
	position: absolute;
	font-size: 12px;
	right: 10px;
	bottom: 20px;
	border-radius: 3px;
	line-height: 30px;
	border: 1px solid #ccc;
}

div.info-top {
	position: relative;
	background: none repeat scroll 0 0 #F9F9F9;
	border-bottom: 1px solid #CCC;
	border-radius: 5px 5px 0 0;
}

div.info-top div {
	display: inline-block;
	color: #333333;
	font-size: 14px;
	font-weight: bold;
	line-height: 31px;
	padding: 0 10px;
}

div.info-top img {
	position: absolute;
	top: 10px;
	right: 10px;
	transition-duration: 0.25s;
}

div.info-top img:hover {
	box-shadow: 0px 0px 5px #000;
}

div.info-middle {
	font-size: 12px;
	padding: 10px;
	line-height: 21px;
}

div.info-bottom {
	height: 0px;
	width: 100%;
	clear: both;
	text-align: center;
}

div.info-bottom img {
	position: relative;
	z-index: 104;
}

#mapContainer {
	height: 100%;
}
.markerActive
{
  background-image: url(css/images/active.png);
  background-repeat: no-repeat;
  height:30px;
  width:24px;
  background-size: contain;
  padding: 4px 4px 4px 5px;
}
#vehicleInfo .control-label
{
   	padding:0px;
}
</style> 


</head>

<body>
	<div id="header-base" class="row-fluid">
		<div class="span12">

			<div class="panel panel-default">
				<div class="panel-heading">
					<i class="el el-map-marker"></i> 地图分布
							<div class="panel-actions">
			<a href="#" class="panel-action panel-action-toggle"
				data-panel-toggle=""></a> <a href="#"
				class="panel-action panel-action-dismiss" data-panel-dismiss=""></a>
		</div>
				</div>
				<!-- /.panel-heading -->
				<div id="mapC" class="panel-body" style="position: relative;min-height:400px;">
					<div id="mapContainer"></div>
				</div>
				<!-- /.panel-body -->
			</div>
			<!-- /.panel -->

		</div>
	</div>



</body>
</html>
