<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<div id="header-base" class="row">
	<div class="col-md-9">
		<div class="panel panel-default">
			<div class="panel-heading">
				<i class="fa fa-bar-chart-o fa-fw"></i> 基础信息
				<div class="pull-right">
					<div class="btn-group">
						<button type="button"
							class="btn btn-default btn-xs dropdown-toggle"
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
			<div class="panel-body"></div>
			<!-- /.panel-body -->
		</div>
		<!-- /.panel -->
	</div>
	<div class="col-md-3">

		<div class="panel panel-default">
			<div class="panel-heading">
				<i class="fa fa-bar-chart-o fa-fw"></i> 页面主题
				<div class="pull-right">
					<div class="btn-group">
						<button type="button"
							class="btn btn-default btn-xs dropdown-toggle"
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

				<span> <a href="changeTheme?themeName=base">base</a> | <!-- 对应 messages_zh.properties文件-->
					<a href="changeTheme?themeName=bige">bige</a>| <!-- 对应 messages_en.properties文件-->
					<a href="changeTheme?themeName=black">black</a>| <a
					href="changeTheme?themeName=clear">clear</a>| <a
					href="changeTheme?themeName=boxed">boxed</a> <a
					href="changeTheme?themeName=base1">base1</a>
				</span>
			</div>
			<!-- /.panel-body -->
		</div>
		<!-- /.panel -->
		<div class="panel panel-default">
			<div class="panel-heading">
				<i class="fa fa-bar-chart-o fa-fw"></i> 语言
				<div class="pull-right">
					<div class="btn-group">
						<button type="button"
							class="btn btn-default btn-xs dropdown-toggle"
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
				<span> <a href="changeLocale?locale=zh">中文版</a> | <!-- 对应 messages_zh.properties文件-->
					<a href="changeLocale?locale=en">英文版</a> <!-- 对应 messages_en.properties文件-->
				</span>

				<!-- 使用message 标签配置需要显示的国际化文本, 
           code对应国际化文件中对应的键的名称,arguments 对应国际化属性文件中的参数。 -->
				<p>
					<spring:message code="hello" arguments="苏若年,林允熙" />

				</p>

			</div>
			<!-- /.panel-body -->
		</div>
		<!-- /.panel -->
	</div>
</div>