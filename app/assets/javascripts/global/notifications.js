$(document).ready(function() {
  $(".load_older_posts").click(function(){  
    var id = new Array();
    $(this).parent().find('li').each(function(){
      id.push($(this).attr('id'));
    }) 
    
    $.ajax({
      url: "/",
      data: id,
      success: function(data){ 
        //alert(data);
      }
    });
    return false;
  });


  $(".notifications .text a").click(function(){  
    var root = $(this).closest("li"),
        id = root.attr("msg_id");
   
    $.ajax({
      url: "/check_read",
      data: {
        "id" : id,
        "authenticity_token": $("meta[name=csrf-token]").attr('content')
      },
      success: function(data){ 
        root.addClass("read");
        location.href = "/gripes/" + root.attr("link");
      }
    });
    return false;
  });


});