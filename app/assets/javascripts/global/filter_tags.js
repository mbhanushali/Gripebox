$(document).ready(function() {

  function TagsSplitAjax(str) {
    var arrStr = new Array (),
        finishArr = new Array (); 

    $(".filter-tags-content ul li").each(function(){
      var txt = $.trim($(this).text());
      arrStr.push(txt);
    });

    for (var i = 0; i < str.length; i++ ){
      if($.trim(str[i]).length > 0){
        if( $.inArray(str[i], arrStr) == -1 )
          $(".filter-tags-content ul").prepend('<li> <em class="close"> </em> <span>' + str[i] + '</span> </li>');
      }
    }
    FilterSearchAjax();
    $(".filter-tags-content form input").val('');
  };



  $(".filter-tags-content ul .close").live('click',function() {
    $(this).parent().fadeOut(function() {
      $(this).remove();
      FilterSearchAjax();
    })   
  })

  $(".filter-tags-content form").submit(function() {
    var str = $(".filter-tags-content form input").val();
    if (str.length > 0){
      str = str.split(',');
      TagsSplitAjax(str);
    }
    return false;
  })

  $(".widget-filter-tags .bl-clear").click(function() { 
    $(".filter-tags-content ul li").remove();
    FilterSearchAjax();
  });

}) 