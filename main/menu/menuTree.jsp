<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<script type="text/javascript">
<!--
	//-->
	$.include([ '<spring:theme code="jstree"/>' ]);
</script>
<div class="col-md-12 decitonaryTree" style="padding-left: 0px;">
	<div class="btn-group ">

		<button id="createTree" class="btn btn-success btn-sm"
			onclick="demo_rename();" type="button">
			<i class="glyphicon glyphicon-asterisk"></i> 新增
		</button>

	</div>

	<div id="createTreeBody" class="dropdown-menu notification-menu large">
		<div class="notification-title">
			<!-- <span class="pull-right label label-default">3</span> -->
			新增节点
		</div>

		<div class="content">
			<div class="form-group">
				<label class="control-label">名称 <span class="required">*</span></label>

				<input type="text" id="name" class="form-control"
					placeholder="eg.: Can01" required />

			</div>

			<div class="form-group">
				<label class="control-label">节点类型 <span class="required">*</span></label>

				<div class="radio-custom radio-primary">
					<input name="porto_is" id="folderR" aria-required="true"
						required="" type="radio" value="folder"> <label
						for="awesome">文件夹</label>
				</div>
				<div class="radio-custom radio-primary">
					<input name="porto_is" id="fileR" type="radio" value="file">
					<label for="very-awesome">文件</label>
				</div>



			</div>
			<hr></hr>
     <div class="col-md-6">
			<button class="pull-right btn btn-primary btn-block mb-lg "
				onClick="cancel();" type="button">取消</button>
				</div>
				<div class="col-md-6">
			<button class="pull-right btn btn-primary btn-block mb-lg "
				onClick="createRoot();" type="button">保存</button>
				</div>
		</div>
	</div>


	<div id="updateTreeBody" class="dropdown-menu notification-menu large">
		<div class="notification-title">
			<!-- <span class="pull-right label label-default">3</span> -->
			修改节点
		</div>

		<div class="content">
			<div class="form-group">
				<label class="control-label">名称 <span class="required">*</span></label>

				<input type="text" id="name" class="form-control"
					placeholder="eg.: Can01" required />

			</div>

			
			<hr></hr>
<div class="col-md-6">
<button class="pull-right btn btn-primary btn-block mb-lg "
				onClick="cancel();" type="button">取消</button></div>
<div class="col-md-6">
<button class="pull-right btn btn-primary btn-block mb-lg "
				onClick="updateNode();" type="button">保存</button></div>
			
			
		</div>
	</div>

	<div class="btn-group decitonaryTree">

		<button id="updateTree" class="btn btn-warning btn-sm"
			onclick="demo_rename();" type="button">
			<i class="glyphicon glyphicon-pencil"></i> 修改
		</button>

	</div>
	<div class="btn-group decitonaryTree">
		<button class="btn btn-danger btn-sm" onclick="demo_delete();"
			type="button">
			<i class="glyphicon glyphicon-remove"></i> 删除
		</button>
	</div>
	<button class="btn btn-danger btn-sm" style="display: none"
		onclick="demo_selectAll();" type="button">
		<i class="glyphicon glyphicon-remove"></i> Delete
	</button>
</div>
<div class="decitonaryTree">
	<h5 class="text-weight-semibold text-dark text-uppercase">主协议</h5>
	<div id="treeAjaxHTML"></div>
</div>
<script
	src="resources-clear/vendor/jquery-placeholder/jquery-placeholder.js"></script>
<!-- Specific Page Vendor -->
<script src="resources-clear/vendor/jstree/jstree.js"></script>
<!-- Examples -->
<script src="js/pages/dictionaryTree.js"></script>




