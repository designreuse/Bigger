/* Add here all your JS customizations */

$(function(){
	$("#leftbar").click(function(){
		$(".table").bootstrapTable('resetView');
	});
	
	$(".sidebar-right-toggle").hide();
	$(".right-wrapper").css("padding-right",'10px');
	
});