function FilterSearchAjax() {

  var  MediaIds = new Array (); 
  $(".filter-media-content input:checked").each(function(){
    MediaIds.push($(this).val());
  });
  if(MediaIds.length == 0)
    MediaIds = '';

  var Power = $(".filter-power-content div.active span").text();

  if ( $(".filter-sort-content .arrow").is(".active") )
    var SortDate = "top";
  else
    var SortDate = "down";  

  var  SortIds = new Array (); 
  $(".filter-sort-content input:checked").each(function(){
      SortIds.push($(this).val());
  }) 
  if(SortIds.length == 0)
    SortIds = '';
  
  var TagsIds = new Array (); 
   $(".filter-tags-content ul li").each(function(){
    TagsIds.push($.trim($(this).text()));
  })
  if(TagsIds.length == 0)
    TagsIds = '';   
    
      
  $.ajax({
    type: "POST",
    url: "/gripe/filter",
    data: {
      "search": $(".search-text").val(),
      "mediaids[]": MediaIds,
      "power": Power,
      "sortdate": SortDate,
      "sortids[]": SortIds,
      "tagsids[]": TagsIds,
      "hidden-userid": $("#hidden-userid").val(),
      "authenticity_token": $("meta[name=csrf-token]").attr('content'),
    },
    success: function(data){
     $("#container #center").html(data);
     renderCheckboxAndInput();
     $(function() {
        $('.widget-gripe-pics a').lightBox();
     });
     renderPlayer();
     boxVoteHover();
    },
    error: function(data){
     //$("#container #center").html(data);
     $("#container").before('<div class="main alerts"><div class="alert-message success" style="display: block;"><div><a href="#" class="close">×</a><p> Sorry there were no results with those filters. </p></div></div></div>');
        CloseAlert();
        AlertTimeClose(); 
        renderPlayer();
    }
  });
};




$(document).ready(function() {

  //var chekInput = $(".filter-media-content input:checked").size(); 
  //if (!chekInput)
  //  $(".filter-media-content input#photos").attr("checked","checked");

  $(".filter-media-content input").change(function() {
    FilterSearchAjax();
  })

  $(".widget-filter-media .bl-clear").live('click', function(){
    $(".filter-media-content .checkboxDiv").removeClass("checkboxOn").addClass("checkboxOff");
    $(".filter-media-content .checkboxDiv input").attr('checked', false);
      FilterSearchAjax();
  });

})
