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

<div class="panel panel-default">
	<div class="panel-heading">
		<i class="fa fa-bar-chart-o fa-fw"></i> Area Chart Example
		<div class="pull-right">
			<div class="btn-group">
				<button type="button" class="btn btn-default btn-xs dropdown-toggle"
					data-toggle="dropdown">
					Actions <span class="caret"></span>
				</button>
				<ul class="dropdown-menu pull-right" role="menu">
					<li><a href="#">Action</a></li>
					<li><a href="#">Another action</a></li>
					<li><a href="#">Something else here</a></li>
					<li class="divider"></li>
					<li><a href="#">Separated link</a></li>
				</ul>
			</div>
		</div>
	</div>
	<!-- /.panel-heading -->
	<div class="panel-body">





		<table data-toggle="table" data-url="DemoData/tabledata2.json"
			data-show-columns="true" data-search="true" data-show-refresh="true"
			data-show-toggle="false" data-show-export="true"
			data-pagination="true" data-height="299">
			<thead>
				<tr>
					<th data-field="id">ID</th>
					<th data-field="name">Item Name</th>
					<th data-field="price">Item Price</th>
				</tr>
			</thead>
		</table>

		<table id="table-javascript"></table>
		<table id="table-server"></table>
	</div>
	<!-- /.panel-body -->
</div>
<!-- /.panel -->

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

		$('#table-server').bootstrapTable({
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
				formatter : operateFormatter,
				events : operateEvents
			} ]

		});
	});

	function queryParams(params) {
		return params;
	}
</script>
<script>
	$(function() {

		$('#table-javascript')
				.bootstrapTable(
						{
							method : 'get',
							url : 'DemoData/tabledata2.json',
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
							minimumCountColumns : 2,
							clickToSelect : true,

							columns : [
									{
										field : 'state',
										checkbox : true
									},
									{
										field : 'id',
										title : 'Item ID',
										align : 'right',
										visible : false,
										valign : 'bottom',
										sortable : true,
										formatter : function(value, row, index) {
											return [
													'<a class="like" href="javascript:void(0)" title="Like">',
													'<i class="glyphicon glyphicon-heart"></i>',
													value, '</a>' ].join('');
										},
										events : {
											'click .like' : function(e, value,
													row, index) {

												eModal.iframe(
																{
																	url : "user/default",
																	buttons : [
																			{
																				text : 'Ok',
																				style : 'info',
																				close : true,
																				click : function() {
																					alert(this);
																				}
																			},
																			{
																				text : 'KO',
																				style : 'danger',
																				close : true,
																				click : function() {
																				}
																			} ]
																}, "test");

												eModal.setEModalOptions({
															loadingHtml : '<span class="fa fa-circle-o-notch fa-spin fa-3x text-primary"></span><span class="h4">Loading</span>'

														});

											}
										}
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
										formatter : operateFormatter,
										events : operateEvents
									} ]

						});
	});
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
		return [
				'<a class="like" href="javascript:void(0)" title="Like">',
				'<i class="glyphicon glyphicon-heart"></i>',
				'</a>',
				'<a class="edit ml10" href="javascript:void(0)" title="Edit">',
				'<i class="glyphicon glyphicon-edit"></i>',
				'</a>',
				'<a class="remove ml10" href="javascript:void(0)" title="Remove">',
				'<i class="glyphicon glyphicon-remove"></i>', '</a>' ].join('');
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
