$(document).ready(function() {
  $(".widget-top10-griped li:last-child").addClass("nobg");

  $(".tabs-top-griped div").click(function(){
  	$(".widget-top10-griped ul").hide();
  	var rel = $(this).attr("rel");
  	$(".widget-top10-griped ul[rel='"+ rel +"']").fadeIn("slow");		
    $(".tabs-top-griped div").removeClass("active");
    $(this).addClass("active");
  });  


  $(".ul-top-gripes li").click(function(){
    $(".ul-top-gripes li").removeClass("active");
    $(this).addClass("active");


    $.ajax({
      type: "POST",
      url: "/filter_gripe_view",
      data: {
        "authenticity_token": $("meta[name=csrf-token]").attr('content'),
        "sort" : $(this).text()
      },
      success: function(data){
        $(".list-gripes").html(data);
      }
    });


  });  

});