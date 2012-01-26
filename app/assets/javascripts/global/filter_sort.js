$(document).ready(function() {

  $(".filter-sort-content .arrow .s-top").click(function() { 
    $(".arrow .s-top").parent().addClass("active");  
    FilterSearchAjax();
  })

  $(".filter-sort-content .arrow .s-down").click(function() { 
    $(".arrow .s-down").parent().removeClass("active");  
    FilterSearchAjax();
  })

  $(".filter-sort-content input").change(function() {
    FilterSearchAjax();
  })

  $(".widget-filter-sort .bl-clear").click(function() { 
    $(".filter-sort-content .arrow").removeClass("active");
    $(".filter-sort-content .checkboxDiv").removeClass("checkboxOn").addClass("checkboxOff").find("input").attr('checked', false);
    FilterSearchAjax();
  });

})