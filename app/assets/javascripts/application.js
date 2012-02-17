// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
//= require jquery
//= require jquery_ujs
//= require_tree ./global/.
//= require ckeditor/ckeditor
function countGripes(){

  $(".result-griper-header").each(function(){
    $(this).html($(".box-gripe").size() + " results!" + "<span></span>");
  });

}
function disableLink(e) {
    // cancels the event
    e.preventDefault();
    return false;
}
$(document).ready(function() {$(".flag").click( function() { var $gripe_box = $(this).closest("div.box-gripe");var $parent_gripe_id = $gripe_box.attr("id");$.post("/flag-gripe",{ id: $parent_gripe_id }, function(data){$gripe_box.html(data);setTimeout(function() {$("#popup-"+$parent_gripe_id).fadeOut('fast');}, 3000);});} );
$("#show_more_gripes_view_all").click(function() {
  $(this).bind('click', disableLink);
  var page_no = parseInt($("#show_more_page_gripe").val());
  $(".loading").show();
  $.ajax({
    type: "GET",
    url: "/show-more-view-all/?page="+ page_no + "&per_page=" + 15,
    success: function(data){
      if(data != 'no gripes'){
        var html = data;
        $.ajax({
          type: "GET",
          url: "/check-gripes/?page="+ page_no + "&per_page=" + 15,
          success: function(data){
            if(data == 'hide'){$(".showmore-button-container-view-all").hide();}
          },
          complete: function(){
            $(html)
          		.hide()
          		.appendTo(".list-gripes")
          		.fadeIn("slow");
            $("#show_more_page_gripe").val(page_no + 1);
            $(".loading").hide();
            $(this).bind('click', disableLink);
          }
        });
      }
      else{
        $(".showmore-button-container-view-all").hide();
      }
    },
    error: function(){
      $(".loading").hide();
      $(this).bind('click', disableLink);
    }
  });
});
$("#show_more_gripes").click(function() {
  $(this).bind('click', disableLink);
  var page_no = parseInt($("#show_more_page_gripe").val());
  $(".loading").show();
  $.ajax({
    type: "GET",
    url: "/show-more/?page="+ page_no + "&per_page=" + 10,
    success: function(data){
      if(data != 'no gripes'){
        var html = data;
        $.ajax({
          type: "GET",
          url: "/check-gripes/?page="+ page_no + "&per_page=" + 10,
          success: function(data){
            if(data == 'hide'){$(".showmore-button-container").hide();}
          },
          complete: function(){
            $(html)
          		.hide()
          		.appendTo(".list-gripes")
          		.fadeIn("slow");
            $("#show_more_page_gripe").val(page_no + 1);
            $(".loading").hide();
            $(this).bind('click', disableLink);
          }
        });
      }
      else{
        $(".showmore-button-container").hide();
      }
    },
    error: function(){
      $(".loading").hide();
      $(this).bind('click', disableLink);
    }
  });
});});