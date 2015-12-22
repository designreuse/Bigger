<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>

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