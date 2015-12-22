<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<script type="text/javascript">
buttonId= "${buttonId}";
<!--
	//-->
	$.include([ '<spring:theme code="bootstrap-table"/>',
	            '<spring:theme code="select2"/>',
	            '<spring:theme code="select2-bootstrap"/>',
	            '<spring:theme code="bootstrap-multiselect"/>',
	            '<spring:theme code="addOrUpdate"/>']);
</script>

<div class="row">
	<div class="col-md-12">
		<form id="button" action="https://api.ttron.cn/bigger/security/button" class="form-horizontal">
			<section class="panel">
				<header class="panel-heading">
					<div class="panel-actions">
						<a href="#" class="panel-action panel-action-toggle"
							data-panel-toggle></a> <a href="#"
							class="panel-action panel-action-dismiss" data-panel-dismiss></a>
					</div>
					<h2 class="panel-title">按钮信息</h2>
					<p class="panel-subtitle"></p>
				</header>
				<div class="panel-body">
					<div class="form-group">
						<label class="col-sm-4 control-label">按钮名称 <span
							class="required">*</span></label>
						<div class="col-sm-7">
							<input type="text" name="name" class="form-control"
								placeholder="eg.: John Doe" required />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-4 control-label">顺序 <span
							class="required">*</span></label>
						<div class="col-sm-7">
							<input type="text" name="inx" class="form-control"
								placeholder="eg.: John Doe" required />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-4 control-label">所属分组</label>
						<div class="col-sm-7">
							<select name="domain_unid" class="form-control company"
								placeholder="eg.: https://github.com/johndoe"  >
								<option></option>
								</select>
						</div>
									</div>
							<div class="form-group">
						<label class="col-sm-4 control-label">图标<span
							class="required">*</span></label>
						<div class="col-sm-7">
							<input type="text" name="icon_uri" class="form-control"
								placeholder="eg.: John Doe" required />
						</div>
					</div>
							<div class="form-group">
						<label class="col-sm-4 control-label">code<span
							class="required">*</span></label>
						<div class="col-sm-7">
							<input type="text" name="code" class="form-control"
								placeholder="eg.: John Doe" required />
						</div>
					</div>

				
				</div>
				<footer class="panel-footer">
					<div class="row">
						<div class="col-sm-7 col-sm-offset-4">
							<button type="submit" class="btn btn-primary">保存按钮信息</button>
						</div>
					</div>
				</footer>
			</section>
		</form>
	</div>
	<!-- col-md-6 -->
	

<script src="resources-clear/vendor/select2/js/select2.full.js"></script>
<script src="resources-clear/vendor/bootstrap-multiselect/bootstrap-multiselect.js"></script>
<script type="text/javascript" src="js/pages/aliasAdd.js"></script>
