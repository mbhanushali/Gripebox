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
$(document).ready(function() {$(".flag").click( function() { var $gripe_box = $(this).closest("div.box-gripe");var $parent_gripe_id = $gripe_box.attr("id");$.post("/flag-gripe",{ id: $parent_gripe_id }, function(data){$gripe_box.html(data);setTimeout(function() {$("#popup-"+$parent_gripe_id).fadeOut('fast');}, 3000);});} );});