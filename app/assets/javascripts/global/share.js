$(document).ready(function() { 
    

  $(".widget-block-share .box.gray").live('click', function(){
    $(this).prev().show();
  });

  $(".widget-block-share .share").live('click', function(){
    $(this).closest(".list-share").hide();
  });

  $(".addthis_button_compact").remove();

  setTimeout(function(){
    $(".list-share a").each(function() {
    var shareTit = $(this).attr("title");
    $(this).find("span").text(shareTit); 
  });
  },1000);

  $(".list-share").hover(
    function() {$(this).show();},
    function() {$(this).hide();}
  );

});