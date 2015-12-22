<%@ page contentType="text/html; charset=utf-8"%>



<div id="sliderb" class="row">

	<div class=" col-dm-5  form-group">

		<div class="input-group date" >
			<input type="text" class="form-control" id="datetimeStart" /> <span
				class="input-group-addon"><span
				class="glyphicon glyphicon-calendar"></span> </span>
		    </div>
	</div>
	<div class=" col-dm-5 form-group">
		<div class="input-group date" >
			<input type="text" class="form-control" id="datetimeEnd"  value=""></input> <span
				class="input-group-addon"><span
				class="glyphicon glyphicon-calendar"></span> </span>
		</div>

	</div>
	<div class="col-dm-2">
		<button type="button" id="search" class="huButton">查询</button>
	</div>
</div>
<div id="mapContainer"></div>
<div class="well" style="">
	<div style="float: left;">
		<button id="tet" type="button" class="back"><i class="fa fa-backward"></i></button>
		<button id="start" class="start">
		<i id="startTitle" class="fa fa-play"></i>	 <span class="badge">1</span>
		</button>
		<button type="button" value="快进" style="margin-right: 20px;" id="jin"
			title="快进" class="go"><i class="fa fa-forward"></i></button>
	</div>
	<div style="margin-left: 200px; vertical-align: middle;">
		<div id="sliderb" class="row-fluid">
			<div class="span12 huProgressBar">
				<input id="ex1" data-slider-id='ex1Slider' type="text"
					data-slider-min="0" data-slider-max="20" data-slider-step="1"
					data-slider-value="0" />
				<!--<div class="huProgressBar2">
					<span>00:00:00</span>
					</div>-->
			</div>
		</div>
	</div>
</div>

<script src="js/pages/vehicleTrack.js"></script>

