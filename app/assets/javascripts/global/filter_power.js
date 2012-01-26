$(document).ready(function() {

	$(".weak-content-btn, .strong-content-btn").click(function() {
	  $(".filter-power-content div").removeClass("active");
	  $(this).addClass("active");
	  FilterSearchAjax();
	})

	$(".widget-filter-power .bl-clear").click(function() { 
	  $(".weak-content-btn, .strong-content-btn, ").removeClass("active");
	  FilterSearchAjax();
	});

})