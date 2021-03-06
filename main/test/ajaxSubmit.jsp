<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%
	String path = request.getContextPath();
	String basePath;
	if (request.getServerPort() != 80) {
		basePath = "//" + request.getServerName() + ":" + request.getServerPort() + path + "/";
	} else {
		basePath = "//" + request.getServerName() + path + "/";
	}
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html lang="zh">
<head>
	<meta charset="UTF-8">
	<base href="<%=basePath%>">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>åºäºBootstrupçå¼ºå¤§jQueryè¡¨åéªè¯æä»¶|ajaxSubmit_jQueryä¹å®¶-èªç±åäº«jQueryãhtml5ãcss3çæä»¶åº</title>
	<!-- Include the FontAwesome CSS if you want to use feedback icons provided by FontAwesome -->
    <link rel="stylesheet" href="http://libs.useso.com/js/font-awesome/4.2.0/css/font-awesome.min.css" />
    <link rel="stylesheet" href='<spring:theme code="bootstrapCss"/>' />
    <link rel="stylesheet" href="js/FormValidation/css/formValidation.css"/>
	<link rel="stylesheet" type="text/css" href="css/default.css">
	<!--[if IE]>
		<script src="http://libs.useso.com/js/html5shiv/3.7/html5shiv.min.js"></script>
	<![endif]-->
</head>
<body>
	<div class="htmleaf-sidebar">
		<ul>
			<li><span class="fa fa-arrow-right"></span> <a href="index.html">default</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="validators.html">validators</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="ajaxSubmit.html" class="current">ajaxSubmit</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="attribute.html">attribute</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="choice.html">choice</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="collapse.html">collapse</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="container.html">container</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="container2.html">container2</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="container3.html">container3</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="container4.html">container4</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="date.html">date</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="defaultMessage.html">defaultMessage</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="dynamic.html">dynamic</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="dynamic2.html">dynamic2</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="dynamic3.html">dynamic3</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="dynamic4.html">dynamic4</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="enable.html">enable</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="enable2.html">enable2</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="event.html">event</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="event2.html">event2</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="event3.html">event3</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="file.html">file</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="html5.html">html5</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="i18n.html">i18n</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="ignored.html">ignored</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="invisible.html">invisible</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="mailgun.html">mailgun</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="message.html">message</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="multiple.html">multiple</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="multipleAsOne.html">multipleAsOne</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="remote.html">remote</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="reset.html">reset</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="row.html">row</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="selector.html">selector</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="selector2.html">selector2</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="specialName.html">specialName</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="submitHandler.html">submitHandler</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="tab.html">tab</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="tooltip.html">tooltip</a></li>
			<li><span class="fa fa-arrow-right"></span> <a href="typehead.html">typehead</a></li>
		</ul>
	</div>
	<div class="htmleaf-container">
		<header class="htmleaf-header bgcolor-1">
			<h1>åºäºBootstrupçå¼ºå¤§jQueryè¡¨åéªè¯æä»¶ <span>The best jQuery plugin to validate form fields</span></h1>
			<div class="htmleaf-links">
				<a class="htmleaf-icon icon-htmleaf-home-outline" href="http://www.htmleaf.com/" title="jQueryä¹å®¶" target="_blank"><span> jQueryä¹å®¶</span></a>
				<a class="htmleaf-icon icon-htmleaf-arrow-forward-outline" href="http://www.htmleaf.com/jQuery/Form/201505101807.html" title="è¿åä¸è½½é¡µ" target="_blank"><span> è¿åä¸è½½é¡µ</span></a>
			</div>
		</header>

		<div class="container">
		    <div class="row">
		        <div class="col-lg-8 col-lg-offset-2">
		            <div class="page-header">
		                <h2>Using Ajax to submit data</h2>
		            </div>

		            <form id="defaultForm" method="post" class="form-horizontal" action="ajaxSubmit.php">
		                <div class="form-group">
		                    <label class="col-lg-3 control-label">Username</label>
		                    <div class="col-lg-5">
		                        <input type="text" class="form-control" name="username" />
		                    </div>
		                </div>

		                <div class="form-group">
		                    <label class="col-lg-3 control-label">Email address</label>
		                    <div class="col-lg-5">
		                        <input type="text" class="form-control" name="email" />
		                    </div>
		                </div>

		                <div class="form-group">
		                    <label class="col-lg-3 control-label">Password</label>
		                    <div class="col-lg-5">
		                        <input type="password" class="form-control" name="password" />
		                    </div>
		                </div>

		                <div class="form-group">
		                    <div class="col-lg-9 col-lg-offset-3">
		                        <button type="submit" class="btn btn-primary">Sign up</button>
		                    </div>
		                </div>
		            </form>
		        </div>
		    </div>
		</div>
		<div class="related">
		    <h3>å¦æä½ åæ¬¢è¿ä¸ªæä»¶ï¼é£ä¹ä½ å¯è½ä¹åæ¬¢:</h3>
		    <a href="http://www.htmleaf.com/html5/html5muban/201505091801.html">
			  <img src="related/1.jpg" width="300" alt="åºäºBootstrup 3å¯é¢è§çHTML5æä»¶ä¸ä¼ æä»¶"/>
			  <h3>åºäºBootstrup 3å¯é¢è§çHTML5æä»¶ä¸ä¼ æä»¶</h3>
			</a>
			<a href="http://www.htmleaf.com/jQuery/Layout-Interface/201505011764.html">
			  <img src="related/2.jpg" width="300" alt="åºäºbootstrupçååºå¼jQueryæ»å¨æ°é»æä»¶"/>
			  <h3>åºäºbootstrupçååºå¼jQueryæ»å¨æ°é»æä»¶</h3>
			</a>
		</div>
	</div>
	
	<script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/FormValidation/js/formValidation.js"></script>
    <script type="text/javascript" src="js/FormValidation/js/framework/bootstrap.js"></script>
    <script type="text/javascript" src="js/FormValidation/js/language/zh_CN.js"></script>
    <script type="text/javascript">
$(document).ready(function() {
    $('#defaultForm')
        .formValidation({
            message: 'This value is not valid',
            icon: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                username: {
                    message: 'The username is not valid',
                    validators: {
                        notEmpty: {
                            message: 'The username is required and can\'t be empty'
                        },
                        stringLength: {
                            min: 6,
                            max: 30,
                            message: 'The username must be more than 6 and less than 30 characters long'
                        },
                        /*remote: {
                            url: 'remote.php',
                            message: 'The username is not available'
                        },*/
                        regexp: {
                            regexp: /^[a-zA-Z0-9_\.]+$/,
                            message: 'The username can only consist of alphabetical, number, dot and underscore'
                        }
                    }
                },
                email: {
                    validators: {
                        notEmpty: {
                            message: 'The email address is required and can\'t be empty'
                        },
                        emailAddress: {
                            message: 'The input is not a valid email address'
                        }
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: 'The password is required and can\'t be empty'
                        }
                    }
                }
            }
        })
        .on('success.form.fv', function(e) {
            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the FormValidation instance
            var bv = $form.data('formValidation');

            // Use Ajax to submit form data
            $.post($form.attr('action'), $form.serialize(), function(result) {
                console.log(result);
            }, 'json');
        });
});
</script>
</body>
</html>