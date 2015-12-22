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
    <title>Editable</title>
    <meta charset="utf-8">
    
    <script type='text/javascript' src="js/jquery-2.1.4.min.js"></script>
    <script type='text/javascript' src="js/Common.js"></script>
    <link rel="stylesheet" href="resources-clear/vendor/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="js/bootstrap-table-master/src/bootstrap-table.css">
    <link rel="stylesheet" href="//rawgit.com/vitalets/x-editable/master/dist/bootstrap3-editable/css/bootstrap-editable.css">
    <link rel="stylesheet" href="../assets/examples.css">
    <link rel="stylesheet" href="//rawgit.com/wenzhixin/bootstrap-table-fixed-columns/master/bootstrap-table-fixed-columns.css">
    <script src="//rawgit.com/isocra/TableDnD/master/js/jquery.tablednd.js"></script>
    <script src="resources-clear/vendor/bootstrap/js/bootstrap.min.js"></script>
    <script src="js/bootstrap-table-master/src/bootstrap-table.js"></script>
    <script src="js/bootstrap-table-master/src/extensions/editable/bootstrap-table-editable.js"></script>
    <script src="//rawgit.com/vitalets/x-editable/master/dist/bootstrap3-editable/js/bootstrap-editable.js"></script>
   <script src="js/bootstrap-table-master/dist/extensions/reorder-rows/bootstrap-table-reorder-rows.js"></script>
    <script src="//rawgit.com/wenzhixin/bootstrap-table-fixed-columns/master/bootstrap-table-fixed-columns.js"></script>

</head>
<body>
    <div class="container">	
        <h1>Editable</h1>
        <table id="table"
           data-toggle="table"
           data-pagination="true"
           data-search="true"
           data-use-row-attr-func="true"
           data-reorderable-rows="true"
           data-fixedColumns="true"
           data-fixedNumber=1
           data-url="DemoData/data1.json">
        <thead>
        <tr>
            <th data-field="id" data-sortable="true"  data-editable="true">ID</th>
            <th data-field="name" data-sortable="true">Item Name</th>
            <th data-field="price" data-sortable="true">Item Price</th>
        </tr>
        </thead>
    </table>
    </div>
</body>
</html>
