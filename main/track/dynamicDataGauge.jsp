<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="ECharts">
<meta name="author" content="kener.linfeng@gmail.com">
<title>ECharts · Example</title>


</head>
<body>
	<!--Step:1 Prepare a dom for ECharts which (must) has size (width & hight)-->
	<!--Step:1 为ECharts准备一个具备大小（宽高）的Dom-->
	<div id="dynamicmain"
		style="height: 100%; width: 100%; background-color: transparent; cursor: default;">

	</div>

	<!--Step:2 Import echarts-all.js-->
	<!--Step:2 引入echarts-all.js-->
	<script src="js/echart/echarts-all.js"></script>

  

</body>

</html>