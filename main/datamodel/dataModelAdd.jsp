<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<script type="text/javascript">
<!--
	//-->
	$.include([ 
	'js/vendor/bootstrap-datetimepicker.min.css',
	'js/vendor/moment.js',
	'js/vendor/bootstrap-datetimepicker.js',
		'js/FormValidation/js/formValidation.min.js',
	        '<spring:theme code="validationCss"/>',
			'js/FormValidation/js/language/zh_CN.js',
		
			
			'js/FormValidation/js/framework/bootstrap.js'
			
			
			 ]);
</script>

	<div class="row">
						<div class="col-md-6">
							<form id="form" action="forms-validation.html" class="form-horizontal">
								<section class="panel">
									<header class="panel-heading">
										<div class="panel-actions">
											<a href="#" class="panel-action panel-action-toggle" data-panel-toggle></a>
											<a href="#" class="panel-action panel-action-dismiss" data-panel-dismiss></a>
										</div>

										<h2 class="panel-title">终端信息</h2>
										<p class="panel-subtitle">
											车辆和平台通信载体，系统必备信息。
										</p>
									</header>
									<div class="panel-body">
										<div class="form-group">
											<label class="col-sm-3 control-label">终端ID <span class="required">*</span></label>
											<div class="col-sm-9">
												<input type="text" name="fullname" class="form-control" placeholder="eg.: John Doe" required/>
											</div>
										</div>
										<div class="form-group">
											<label class="col-sm-3 control-label">终端型号 <span class="required">*</span></label>
											<div class="col-sm-9">
												<div class="input-group">
													<span class="input-group-addon">
														<i class="fa fa-envelope"></i>
													</span>
													<input type="email" name="email" class="form-control" placeholder="eg.: email@email.com" required/>
												</div>
											</div>
											<div class="col-sm-9">

											</div>
										</div>
										<div class="form-group">
											<label class="col-sm-3 control-label">所属分组</label>
											<div class="col-sm-9">
												<input type="url" name="github" class="form-control" placeholder="eg.: https://github.com/johndoe" />
											</div>
										</div>
										<div class="form-group">
											<label class="col-sm-3 control-label">终端供应商 <span class="required">*</span></label>
											<div class="col-sm-9">
												<textarea name="skills" rows="5" class="form-control" placeholder="Describe your skills" required></textarea>
											</div>
										</div>
									</div>
									<footer class="panel-footer">
										<div class="row">
											<div class="col-sm-9 col-sm-offset-3">
												<button class="btn btn-primary">保存终端信息</button>
											
												<button type="reset" class="btn btn-default">Reset</button>
											</div>
										</div>
									</footer>
								</section>
							</form>
						</div>
						<!-- col-md-6 -->
						<div class="col-md-6">
							<form id="chk-radios-form" action="forms-validation.html">
								<section class="panel">
									<header class="panel-heading">
										<div class="panel-actions">
											<a href="#" class="panel-action panel-action-toggle" data-panel-toggle></a>
											<a href="#" class="panel-action panel-action-dismiss" data-panel-dismiss></a>
										</div>

										<h2 class="panel-title">SIM卡信息</h2>

										<p class="panel-subtitle">
											系统保存和终端绑定的SIM信息，一遍以后停复机或排查使用。
										</p>
									</header>
									<div class="panel-body">
										<div class="form-group">
											<label class="col-sm-3 control-label">SIM卡号 <span class="required">*</span></label>
											<div class="col-sm-9">
												
											</div>
										</div>
										
									</div>
									<footer class="panel-footer">
										<div class="row">
											<div class="col-sm-9 col-sm-offset-3">
												<button class="btn btn-primary">Submit</button>
												<button type="reset" class="btn btn-default">Reset</button>
											</div>
										</div>
									</footer>
								</section>
							</form>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<form id="summary-form" action="forms-validation.html" class="form-horizontal">
								<section class="panel">
									<header class="panel-heading">
										<div class="panel-actions">
											<a href="#" class="panel-action panel-action-toggle" data-panel-toggle></a>
											<a href="#" class="panel-action panel-action-dismiss" data-panel-dismiss></a>
										</div>

										<h2 class="panel-title">车辆信息</h2>
										<p class="panel-subtitle">
											保存车辆属性，方便管理。
										</p>
									</header>
									<div class="panel-body">
										<div class="validation-message">
											<ul></ul>
										</div>
										<div class="form-group">
											<label class="col-sm-3 control-label">VIN <span class="required">*</span></label>
											<div class="col-sm-9">
												<input type="text" name="fullname" class="form-control" title="Plase enter a name." placeholder="eg.: John Doe" required/>
											</div>
										</div>
										<div class="form-group">
											<label class="col-sm-3 control-label">Email <span class="required">*</span></label>
											<div class="col-sm-9">
												<input type="email" name="email" class="form-control" title="Please enter an email address." placeholder="eg.: john@doe.com" required/>
											</div>
										</div>
										<div class="form-group">
											<label class="col-sm-3 control-label">车牌号</label>
											<div class="col-sm-9">
												<input type="url" name="url" title="Please enter a valid url." class="form-control" placeholder="eg.: https://github.com/johndoe" />
											</div>
										</div>
										<div class="form-group">
											<label class="col-sm-3 control-label">车辆编号 <span class="required">*</span></label>
											<div class="col-sm-9">
												<textarea name="resume" rows="5" title="Your resume is too short." class="form-control" placeholder="Enter your resume" required></textarea>
											</div>
										</div>
										<div class="form-group">
											<label class="col-sm-3 control-label">生产编号 <span class="required">*</span></label>
											<div class="col-sm-9">
												<input type="text" name="fullname" class="form-control" title="Plase enter a name." placeholder="eg.: John Doe" required/>
											</div>
										</div>
										<div class="form-group">
											<label class="col-sm-3 control-label">车辆类型<span class="required">*</span></label>
											<div class="col-sm-9">
												<input type="text" name="fullname" class="form-control" title="Plase enter a name." placeholder="eg.: John Doe" required/>
											</div>
										</div>
										<div class="form-group">
											<label class="col-sm-3 control-label">车辆型号<span class="required">*</span></label>
											<div class="col-sm-9">
												<input type="text" name="fullname" class="form-control" title="Plase enter a name." placeholder="eg.: John Doe" required/>
											</div>
										</div>
										<div class="form-group">
											<label class="col-sm-3 control-label">数据字典 <span class="required">*</span></label>
											<div class="col-sm-9">
												<input type="text" name="fullname" class="form-control" title="Plase enter a name." placeholder="eg.: John Doe" required/>
											</div>
										</div>
									</div>
									<footer class="panel-footer">
										<div class="row">
											<div class="col-sm-9 col-sm-offset-3">
												<button class="btn btn-primary">Submit</button>
												<button type="reset" class="btn btn-default">Reset</button>
											</div>
										</div>
									</footer>
								</section>
							</form>
						</div>
						<div class="col-md-6">
							<form id="selects-form" action="forms-validation.html">
								<section class="panel">
									<header class="panel-heading">
										<div class="panel-actions">
											<a href="#" class="panel-action panel-action-toggle" data-panel-toggle></a>
											<a href="#" class="panel-action panel-action-dismiss" data-panel-dismiss></a>
										</div>

										<h2 class="panel-title">批量导入</h2>
										<p class="panel-subtitle">
											下载模板，按规定填写，上传可实现批量导入。
										</p>
									</header>
									<div class="panel-body">
										<div class="form-group">
											<label class="col-sm-3 control-label">Company</label>
											<div class="col-sm-9">
												<select id="company" class="form-control" required>
													<option value="">Choose a Company</option>
													<option value="apple">Apple</option>
													<option value="google">Google</option>
													<option value="microsoft">Microsoft</option>
													<option value="yahoo">Yahoo</option>
												</select>
												<label class="error" for="company"></label>
											</div>
										</div>
										<div class="form-group">
											<label class="col-sm-3 control-label">Browsers</label>
											<div class="col-sm-9">
												<select id="browsers" name="browsers" title="Please select at least one browser" class="form-control" size="5" multiple="multiple" required>
													<option value="chrome">Chrome / Safari</option>
													<option value="ff">Firefox</option>
													<option value="ie">Internet Explorer</option>
													<option value="opera">Opera</option>
												</select>
												<label class="error" for="browsers"></label>
											</div>
										</div>
									</div>
									<footer class="panel-footer">
										<div class="row">
											<div class="col-sm-9 col-sm-offset-3">
												<button class="btn btn-primary">Submit</button>
												<button type="reset" class="btn btn-default">Reset</button>
											</div>
										</div>
									</footer>
								</section>
							</form>
						</div>
					</div>
<script type="text/javascript">
	$(document)
			.ready(
					function() {

						$('#datetimePicker').datetimepicker();
						$('#modelForm')
								.formValidation(
										{
											message : 'This value is not valid',
											icon : {
												valid : 'glyphicon glyphicon-ok',
												invalid : 'glyphicon glyphicon-remove',
												validating : 'glyphicon glyphicon-refresh'
											},
											fields : {
												field : {
													message : 'The username is not valid',
													validators : {
														notEmpty : {
															message : 'The username is required and can\'t be empty'
														},
														stringLength : {
															min : 6,
															max : 30,
															message : 'The username must be more than 6 and less than 30 characters long'
														},
														/*remote: {
														    url: 'remote.php',
														    message: 'The username is not available'
														},*/
														regexp : {
															regexp : /^[a-zA-Z0-9_\.]+$/,
															message : 'The username can only consist of alphabetical, number, dot and underscore'
														}
													}
												},
												title : {
													validators : {
														notEmpty : {
															message : 'The email address is required and can\'t be empty'
														},
														emailAddress : {
															message : 'The input is not a valid email address'
														}
													}
												},
												align : {
													validators : {
														notEmpty : {
															message : 'The password is required and can\'t be empty'
														}
													}
												}
											}
										}).on(
										'success.form.fv',
										function(e) {
											// Prevent form submission
											e.preventDefault();

											// Get the form instance
											var $form = $(e.target);

											// Get the FormValidation instance
											var bv = $form
													.data('formValidation');

											// Use Ajax to submit form data
											$.post($form.attr('action'), $form
													.serialize(), function(
													result) {
												console.log(result);
											}, 'json');
										});

						$('#datetimePicker').on(
								'dp.change dp.show',
								function(e) {
									// Validate the date when user change it
									$('#modelForm').data('formValidation')
											.revalidateField('datetimePicker');
									// You also can call it as following:
									// $('#defaultForm').formValidation('revalidateField', 'datetimePicker');
								});
					});
</script>