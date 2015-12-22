<%@ page language="java" import="java.util.*" pageEncoding="ISO-8859-1"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>My JSP 'tetsJson.jsp' starting page</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<script type='text/javascript' src="js/jquery-2.1.4.min.js"></script>
<script type="text/javascript">
	$(document).ready(function() {
		$("#send").click(function() {
			$.ajax({
				type : "get",
				url : "user/showUser?json",
				dataType : "json",
				success : function(data) {
					alert(data.name);
				}
			});
		});
	});
</script>
</head>

<body>
	This is my test json data page.
	<input type="button" value ="test Json" id="send"></input>
	<br>
</body>
</html>
