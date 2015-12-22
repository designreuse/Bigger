<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<script>
$.include([ '<spring:theme code="bootstrap-table"/>'
            , '<spring:theme code="bootstrap-editable"/>'
            ,'<spring:theme code="bootstrap-table-reorder-rows"/>'
            ]);

</script>

<div id="toolbar" >
            <div class="form-inline" role="form">
             <button class="btn btn-success btn-sm" onclick="createRow();" type="button"><i class="glyphicon glyphicon-asterisk"></i> Create</button>
		
		      <button class="btn btn-danger btn-sm" onclick="deleteRow();" type="button"><i class="glyphicon glyphicon-remove"></i> Delete</button>
	    
            </div>
 </div>
<table id="tableserver" data-editable="true" data-toolbar="#toolbar"></table>
  
<script type='text/javascript' src="js/pages/tableCommon.js"></script>
<script type='text/javascript' src="js/pages/aliasList.js"></script>



