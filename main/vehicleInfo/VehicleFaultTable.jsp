<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<script type="text/javascript">
<!--
	//-->
	$
			.include([
					'<spring:theme code="bootstrap-table"/>',
					'<spring:theme code="bootstrap-slider"/>',
					'<spring:theme code="track"/>',
					'js/bootstrapModal/eModal.js',
					'js/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker.min.js',
					'js/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker.min.css',
					'js/bootstrap-datetimepicker-master/locales/bootstrap-datetimepicker.zh-CN.js' ]);
</script>
<div id="toolbar">
	<div class="form-inline" role="form">
		<div class="form-group date">
			<label class="control-label">开始时间: </label> <input type="text"
				class="form-control" id="datetimeStart" />
		</div>
		<div class="form-group date">
			<label class="control-label">结束时间: </label> <input type="text"
				class="form-control" id="datetimeEnd" value="" />
		</div>
		<div class="form-group" style="margin-bottom: -20px;margin-left:10px;">
			<button id="ok" type="submit"
				class=" btn btn-primary btn-block mb-lg"
				style="height: 29px; width:60px;padding:0px;">查询</button>
		</div>

	</div>
</div>

<table id="tableserver" data-toolbar="#toolbar"></table>


<script type='text/javascript' src="js/pages/tableCommon.js"></script>

<script type='text/javascript' src="js/pages/faultHistory.js"></script>
