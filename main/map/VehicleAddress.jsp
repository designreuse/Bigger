<%@ page language="java" import="java.util.*" pageEncoding="ISO-8859-1"%>
<%
String path = request.getContextPath();
String basePath ;
if(request.getServerPort()!=80)
{
	basePath=  "//"
		+ request.getServerName()  + ":" + request.getServerPort()
		+ path + "/";
}else
{
	basePath=  "//"
			+ request.getServerName()  
			+ path + "/";
}
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>My JSP 'VehicleAddress.jsp' starting page</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<script type="text/javascript">
$.include(['//webapi.amap.com/maps?v=1.3&key=ebe4a785f7422ca423062ac0a5ad840e']);
</script>

</head>
<style>
html,body {
  margin: 0;
  height: 100%;
  width: 100%;
  position: absolute;
}

#mapAddress {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
/*
地图
*/
.markerActive
{
  background-image: url(css/images/active.png);
  background-repeat: no-repeat;
  height:30px;
  width:24px;
  background-size: contain;
  padding: 4px 4px 4px 5px;
}
</style>

<body>
	<div id="mapAddress"></div>
	<script src="js/pages/vehicleAddress.js"></script>
</body>
</html>
