<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<script type="text/javascript">
<!--
	//-->
$.include([ '<spring:theme code="bootstrap-table"/>',
			'<spring:theme code="bootstrap-slider"/>',
			'<spring:theme code="track"/>', 'js/bootstrapModal/eModal.js'

	]);
</script>

<table id="alarmServer"></table>


<script type='text/javascript'
	src="js/bootstraptable/bootstrap-table.js"></script>
<script type='text/javascript' src="js/tableExport/tableExport.js"></script>
<script type='text/javascript' src="js/tableExport/jquery.base64.js"></script>
<script type='text/javascript' src="js/tableExport/html2canvas.js"></script>
<script type='text/javascript' src="js/tableExport/jspdf/jspdf.js"></script>
<script type='text/javascript' src="js/tableExport/jspdf/libs/base64.js"></script>
<script type='text/javascript'
	src="js/tableExport/jspdf/libs/sprintf.js"></script>
<script type='text/javascript'
	src="js/tableExport/bootstrap-table-export.js"></script>
<script type='text/javascript'
	src="js/pageOption/bootstrap-table-pageOption.js"></script>
<script type="text/javascript">
	$(document).ready(function() {

		$('#alarmServer').bootstrapTable({
			method : 'get',
			url : 'DemoData/tabledataServer.json',
			cache : false,
			height : 400,
			striped : false,
			pagination : true,
			pageSize : 10,
			pageList : [ 10, 25, 50, 100, 200 ],
			search : true,
			showExport : true,
			showToggle : true,
			showColumns : true,
			showRefresh : true,
			sidePagination : 'server',//è®¾ç½®ä¸ºæå¡å¨ç«¯åé¡µ
			queryParams : queryParams,//åæ°
			totalRows : 0,//æå¡ç«¯åé¡µå¿é¡»è®¾ç½®
			minimumCountColumns : 2,
			clickToSelect : true,
			columns : [ {
				field : 'state',
				checkbox : true
			}, {
				field : 'id',
				title : 'Item ID',
				align : 'right',
				valign : 'bottom',
				visible : false,
				sortable : true
			}, {
				field : 'name',
				title : 'Item Name',
				align : 'center',
				valign : 'middle',
				sortable : true,
				formatter : nameFormatter
			}, {
				field : 'name',
				title : 'Item Name',
				align : 'center',
				valign : 'middle',
				sortable : true,
				formatter : nameFormatter
			}, {
				field : 'price',
				title : 'Item Price',
				align : 'left',
				valign : 'top',
				sortable : true,
				formatter : priceFormatter,
				sorter : priceSorter
			}, {
				field : 'operate',
				title : 'Item Operate',
				align : 'center',
				valign : 'middle',
				clickToSelect : false,
				formatter : operateFormatter
				
			} ]

		});
	});

	function queryParams(params) {
		return params;
	}
</script>
<script>
	
	function nameFormatter(value, row) {
		var icon = row.id % 2 === 0 ? 'glyphicon-star' : 'glyphicon-star-empty'

		return '<i class="glyphicon ' + icon + '"></i> ' + value;
	}

	function priceFormatter(value) {
		// 16777215 == ffffff in decimal
		var color = '#' + Math.floor(Math.random() * 6777215).toString(16);
		return '<div  style="color: ' + color + '">'
				+ '<i class="glyphicon glyphicon-usd"></i>'
				+ value.substring(1) + '</div>';
	}
	function priceSorter(a, b) {
		a = +a.substring(1); // remove $
		b = +b.substring(1);
		if (a > b)
			return 1;
		if (a < b)
			return -1;
		return 0;
	}
	function operateFormatter(value, row, index) {
		return ['<div class="progress">',
		        '<div class="progress-bar progress-bar-danger" role="progressbar"',
				'aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"',
				'style="width: 10%;">',
				'<span >10% </span>',
			'</div>',
		'<div class="progress-bar progress-bar-success" role="progressbar"',
			'aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"',
			'style="width: 65%;">',
			'<span>65% Complete </span>',
		'</div>',
		
		
	'</div>'].join('');
	}

	window.operateEvents = {
		'click .like' : function(e, value, row, index) {
			alert('You click like icon, row: ' + JSON.stringify(row));
			console.log(value, row, index);
		},
		'click .edit' : function(e, value, row, index) {
			alert('You click edit icon, row: ' + JSON.stringify(row));
			console.log(value, row, index);
		},
		'click .remove' : function(e, value, row, index) {
			alert('You click remove icon, row: ' + JSON.stringify(row));
			console.log(value, row, index);
		}
	};
</script>
