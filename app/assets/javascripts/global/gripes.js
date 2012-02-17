function btnEditGripe(gId) {
  var root = $(".box-gripe#"+gId),
      new_gripeTips = root.find(".form-edit-gripe .tips[value!='']").length,
      countTips= root.find(".form-edit-gripe .tips").length;
      
  if( new_gripeTips == countTips ){ 
      $(".form-edit-gripe .save-sett").removeClass("submitOff");
    }else{
      $(".form-edit-gripe .save-sett").addClass("submitOff");
    }
};

function playerInit(elem_id, source){
  $("#" + elem_id).each(function(){
    jwplayer(elem_id).setup({
      'id': 'playerID',
      'width': '641',
      'height': '364',
      'file': source,
      //'image': '/assets/bunny.jpg',
      'skin': '/assets/ccn_skin.xml',
      'modes': [
          //{type: 'html5'},
          {type: 'flash', src: '/assets/player.swf'},
      ],
      //'autostart': 'true',
    });
  });
}

function renderPlayer(){
  $(".media-content").each(function(){
    playerInit($(this).attr('id'), $(this).attr('source'));
  });
}
function boxVoteHover() {

  $(".box-vote").hover(function() {  
    if ( $(this).is(".active") ) {
      $(this).find(".popup-griper-subscriptions span").text("Click here to Unsubscribe to this Gripe.").parent().fadeIn("slow");
    }else{
      $(this).find(".popup-griper-subscriptions span").text("Click here to subscribe to this Gripe.").parent().fadeIn("slow");
    }
  },
  function() {
    $(this).find(".popup-griper-subscriptions").hide();
  });
};

$(document).ready(function() {

  countGripes();

  //playerInit('mediaplayer3');

  renderPlayer();
  boxVoteHover();
  

  $(".box-gripe .expand").live('click', function(){
    var root = $(this).closest(".box-gripe");
    $(this).toggleClass("active");
    root.find(".gripe-content .gripe-preview").toggle("slow").next().toggle("slow");
    root.find(".gripe-content").toggleClass("db");
    root.find(".gripe-expand").toggleClass("no");
    if ( $(this).is(".active"))
      $(this).html("<em>◄ </em> less");
    else  
      $(this).html("more <em> ►</em> ");
  });  


$(".widget-gripe-btns .btn-gripe, .widget-gripe-btns .btn-about-gripebox").live('click', function(){
  if ($(".widget-social-sign-in a").is(".sign-link")) {
   $(".sign-link").click();
   $(".sign-form").prev().text("You must be signed in to do that.").show();
   return false;
  }
});


  $(".box-icons em:not(.active), .box-comments span:not(.active), .box-gripe .expand:not(.active)").live('click', function(){
    var id = $(this).closest(".box-gripe").attr("id"),
        count_views = $("#" + id).find(".views em").text();
    $.ajax({
      type: "POST",
      url: "/gripe_view",
      data: {
        "authenticity_token": $("meta[name=csrf-token]").attr('content'),
        "id" : id
      },
      success: function(data){
       $("#"+id).find(".views em").text((parseInt(count_views) + 1));
      }
    });
  });


  $(".box-content-info a, .gripe-comment-img a").live('click', function(){
    var name = $(this).text();
    window.location = "/search?search-keywords=" + name;
     return false;
  });


  


  $(".gripe-comment-desc a.flag").live('click', function(){
    var id = $(this).closest(".box-gripe").attr("id");
    $.ajax({
      type: "POST",
      url: "/",
      data: {
        "authenticity_token": $("meta[name=csrf-token]").attr('content'),
        "id" : id
      },
      success: function(data){
        $("#container").before('<div class="main alerts"><div class="alert-message success" style="display: block;"><div><a href="#" class="close">×</a><p> Thank you for your concern. We will review this immediately. </p></div></div></div>');
        CloseAlert();
        ScrollAlertPosition();
        AlertTimeClose(); 
      }
    });
    return false;
  });


  if(window.location.search == "?gripes=about"){
    $("#gripe_title").val("Why Gripebox...Why?!");
    $("#gripe_tag_list").val("Gripebox");
  }
  


// if(window.location.href.indexOf('search-keywords') + 1) {
//   var srt;
//   str = window.location.search.replace("?search-keywords=", "");
//   $(".search-form .search-text").val(unescape(str));
//  }

  $(".box-comments span").live('click', function(){

  $(this).toggleClass("active");


   if ($(".widget-social-sign-in a").is(".sign-link")) {
     if ($(this).find("em").text() == 0) {
          $(".sign-link").click(); 
          $(".sign-form").prev().text("You must be signed in to do that.").show();
          return false;
       }
    }

    $(".gripe-list-comment").fadeOut("slow");
    var parent = $(this).closest(".box-gripe").find(".gripe-list-comment");
    if ( parent.is(":visible")  )
      parent.hide();
    else
      parent.show();  
   
  });  

  

  $(".load-next-comment").live('click', function(){
    
    $.ajax({
      type: "GET",
      url: "/",
      data: "add",
      success: function(data){
       //
      },
      beforeSend: function(data){
        $(this).prev().show();
      },
      complete: function(data){
        $(this).prev().hide();
      }
    });
  });

 
  $(".form-new-comment").live('submit', function() {
    
    var valComment  = $(this).find("textarea").val(),
        gripe_id    = $(this).attr("gripe_id"),
        comment_id  = $(this).find(".comm-reply").attr("gripe_id"),
        reply_id    = $(this).attr("reply_id");
        status      = $(this).attr("gripe_status"),
        root        = $(this);
        root_reply  = $(this).closest(".gripe-comment");
    
    var com = '<div class="gripe-comment"><div class="gripe-comment-img"><img src="/assets/img/i1.png" alt=""><span></span><a href="#">NEW</a></div><div class="gripe-comment-content"><div class="gripe-comment-text">'+ valComment +'</div><div class="gripe-comment-desc"><span>1 day ago </span><a href="#" class="flag">flag</a><a href="#" class="comm-reply">reply</a></div></div><div class="clear"></div></div>';  
    var com_r = '<div class="gripe-comment reply"><div class="gripe-comment-img"><img src="/assets/img/i1.png" alt=""><span></span><a href="#">Reply</a></div><div class="gripe-comment-content"><div class="gripe-comment-text">'+ valComment +'</div><div class="gripe-comment-desc"><span>1 day ago </span><a href="#" class="flag">flag</a></div></div><div class="clear"></div></div>';  

    if(valComment.length > 0) {
      
      $.ajax({
        type: "POST",
        url: "/gripe/comment",
        data: {
          "id"                : gripe_id,
          "comment"           : valComment,
          "authenticity_token": $("meta[name=csrf-token]").attr('content'),
          "status"            : status,
          "reply_id"          : reply_id,
        },
        success: function(data){
          if(status == 'reply'){
            root_reply.find("form").remove();
            //root_reply.append(com_r);
            root_reply.append(data);
            root_reply.find(".gripe-comment.reply:last");
          }else{
            //root.after(com);
            root.after(data);
            root.next().hide().show();
          }
          var count_comm = $("#" + gripe_id).find(".box-comments span em").text();
          $("#" + gripe_id).find(".box-comments span em").text(parseInt(count_comm) + 1);
          
          root.find("textarea").val("");
          root.find(".span_val").show();
        },
      });

    }  
    return false;
  })


  $(".comm-reply").live('click',function() {
    if ($(".widget-social-sign-in a").is(".sign-link")) {
      $(".sign-link").click(); 
      $(".sign-form").prev().text("You must be signed in to do that.").show();
      return false;
    }else{
      $(this).closest(".gripe-list-comment").find(".gripe-comment .form-new-comment").remove();
      var gripe_id = $(this).closest(".gripe-list-comment").find(".form-new-comment").attr("gripe_id"),
        reply_id = $(this).attr("reply_id");

      $(this).parent().parent().append('<form gripe_id="'+ gripe_id +'" reply_id="'+ reply_id +'" class="form-new-comment" gripe_status="reply"><textarea default="Don’t hold back.  Comment away!" class="tips"></textarea><input type="submit" value="post comment"><div class="clear"></div></form>');
      renderCheckboxAndInput();
      return false;
    }
   
  })


  $(".box-rate .negative, .box-rate .positive").live('click', function(){
    var mode = $(this).attr("class"),
        id = $(this).closest(".box-gripe").attr("id"),
        val_power =  $(this).closest(".box-gripe").find(".box-power strong").text(),
        root = $(this).closest(".box-gripe").find(".box-power strong");

if ($(".widget-social-sign-in a").is(".sign-link")) {
   $(".sign-link").click();
   $(".sign-form").prev().text("You must be signed in to do that.").show();
   return false;
}else{
    $.ajax({
      type: "POST",
      url: "/gripe/rate",
      data: {
        "authenticity_token": $("meta[name=csrf-token]").attr('content'),
        "mode" : mode,
        "id"   : id
      },
      success: function(data){
        $("#rate-panel-" + id).html(data);
        //root.text( parseInt(val_power) + 1 );
      },
      error: function(data){
        $("#container").before('<div class="main alerts"><div class="alert-message success" style="display: block;"><div><a href="#" class="close">×</a><p> You&#8217;ve already amped / muted </p></div></div></div>');
        CloseAlert();
        ScrollAlertPosition();
        AlertTimeClose(); 
      },
    });
   } 


    $.ajax({
      type: "POST",
      url: "/gripe/power",
      data: {
        "authenticity_token": $("meta[name=csrf-token]").attr('content'),
        "id"   : id
      },
      success: function(data){
        if(data > 0){
          root.removeClass("v-red").addClass("v-green");
        }
        root.text(Math.abs(data));
      }
    });



  });




 $(".box-vote").live('click', function(){

    var gripe_id = $(this).attr('gripe_id'),
        current_elem = $(this);
   
    $(this).find(".popup-griper-subscriptions").hide();    

    if ($(".widget-social-sign-in a").is(".sign-link")) {
       $(".sign-link").click();
       $(".sign-form").prev().text("You must be signed in to do that.").show();
       return false;
    }

    if ( current_elem.is(".active") ) {

      $.ajax({
        type: "POST",
        url: "/gripe/subscription",
        data: {
          "id"   : gripe_id,
          "authenticity_token": $("meta[name=csrf-token]").attr('content'),
        },
        success: function(data){
          current_elem.removeClass("active");
        }
      });

    }else {

      $.ajax({
        type: "POST",
        url: "/gripe/subscription",
        data: {
          "id"   : gripe_id,
          "authenticity_token": $("meta[name=csrf-token]").attr('content'),
        },
        success: function(data){
          current_elem.addClass("active");
        }
      });

    }
   
    //setTimeout(function(){
    //  $(".popup-griper-subscriptions").fadeOut("slow");
    //},3000);

 })


 $(".delete-gripe").live('click', function(){
   
  if(confirm("Delete gripe ?"))
  {
     var id = $(this).closest(".box-gripe").attr("id");
     $.ajax({
      type: "POST",
      url: "/gripes/" + id,
      data: {
        "authenticity_token": $("meta[name=csrf-token]").attr('content'),
        "_method": "delete"
      },
      success: function(data){
        $("#" + id).fadeOut("slow");
      }
     });
  }


  });



  $(".btn-gripe-update").live('click', function(){
 
    if ( $(this).is(".active") ) {
      //clearEditForm();
          $("#file-upload-panel").remove();
      $(this).removeClass("active").next().next().removeClass("active");
      $(this).closest(".box-gripe").find(".form-edit-gripe").hide();
      $(".form-edit-gripe .block").html("");
    }else {
      if(!$(".btn-gripe-update").is(".active") ) {
        $(this).addClass("active").next().next().addClass("active");      
        $(".block-edit-gripe div").removeClass("active");      
      }
    
    }   
  })





function noBgLastEditImg() {
  $(".block-edit-image:last-child").addClass("nobg");
};


function clearEditForm() {
  $("#file-upload-panel").remove();
  $(".box-gripe").find(".list-edit-content").html("");
  $(".box-gripe").find(".list-edit-image .newI, .list-edit-video .newV").parent().parent().remove();

  $(".form-edit-gripe .block, .block-btn-media").hide();
  $(".edit-text, .edit-photo, .edit-video").removeClass("active");
};

  $(".list-edit-image .tips, .list-edit-video .tips, .list-edit-content #val-text").live('keyup', function(e){
    var gId = $(this).closest(".box-gripe").attr("id");
    btnEditGripe(gId);
  });

  $(".form-edit-gripe .cancel").live('click', function(){
    root = $(this).closest(".box-gripe");
    root.find(".form-edit-gripe").hide();
    root.find(".btn-gripe-update, .block-gripe-update").removeClass("active");

    clearEditForm();
  })


  //edit text
  $(".edit-text").live('click', function(){
    if( $(this).is(".active")) {
    }else{
      clearEditForm();

       
      $(this).addClass("active");
      var root = $(this).closest(".box-gripe"),
          gId = root.attr("id");

      root.find(".form-edit-gripe, .list-edit-content").show();         
      root.find(".list-edit-content").html('<textarea default="Add your update." class="tips ed-text" id="val-text"></textarea>');
      renderCheckboxAndInput();
      btnEditGripe(gId);
   }   
  })
  //Save text
  $(".form-edit-gripe .save-sett").live('click', function(){
    var root = $(this).closest(".box-gripe"),
        gripe_id = root.attr("id"),
        ed_text = root.find("#val-text").val();

    if ( ($(".block-gripe-update").is(".active")) && ($(".edit-text").is(".active")) && (root.find(".save-sett").is(":not(.submitOff)") ) ){
      
      $.ajax({
        type: "POST",
        url: "/gripe/update/text",
        data: {
          'id': gripe_id,
          'update': ed_text,
          "authenticity_token": $("meta[name=csrf-token]").attr('content'),
        },
        success: function(data){
          root.find(".expand.active").click();
          root.find(".gripe-content:last").after(data);
          root.find(".btn-gripe-update").removeClass("active").next().next().removeClass("active");

          root.find(".form-edit-gripe").hide();

          root.find(".expand").click();
          $.scrollTo( root.find(".gripe-content:last"), 1200 );
        },
      });
    }

  })

   //edit photo
  $(".edit-photo").live('click', function() {  
    if( ($(this).is(".active")) || ($(this).is(".disabledBtn"))  ) {
    }else{

      clearEditForm();
      var token = $("meta[name=csrf-token]").attr('content'),
          gId = $(this).parent().attr("id"),
          root = $(this).closest(".box-gripe");
          IframeForm = '<form target="file-upload-iframe" name="file-upload-panel" method="post" id="file-upload-panel" enctype="multipart/form-data" action="/uploader" accept-charset="UTF-8"><input type="hidden" value="' +  $("meta[name=csrf-token]").attr('content') + '" name="authenticity_token"><div style="margin:0;padding:0;display:inline"><input type="hidden" value="✓" name="utf8"><input type="hidden" value="' + token + '" name="authenticity_token"></div><input type="file" status="image" name="file[image]" id="file_image" class="file-upload-source"><input type="hidden" value="' + gId + '" name="file[user_id]" id="file_user_id"><input type="submit" value="Save File" name="commit" class="file-upload-submit"><iframe width="500px" frameborder="0" src="about:blank" onload="parseIframeEdit();" name="file-upload-iframe" id="file-upload-iframe" heigth="300px" border="0"></iframe></form>';
          root.find(".gripe-details").before(IframeForm);
          StyleButton();   
      
      $(this).addClass("active");    
      root.find(".form-edit-gripe, .list-edit-image").show();   
      root.find(".block-form-action .save-sett").before('<div class="block-btn-media"><div class="btn-browse">browse</div><div class="btn-embed">embed</div></div>');
      
      noBgLastEditImg();
      renderCheckboxAndInput();
      btnEditGripe(gId);
    }
  })

//edit video
  $(".edit-video").live('click', function(){
     if( ($(this).is(".active")) || ($(this).is(".disabledBtn"))  ) {
      }else{
        clearEditForm();

        var token = $("meta[name=csrf-token]").attr('content'),
          gId = $(this).parent().attr("id"),
          root = $(this).closest(".box-gripe");
          IframeForm = '<form target="file-upload-iframe" name="file-upload-panel" method="post" id="file-upload-panel" enctype="multipart/form-data" action="/uploader" accept-charset="UTF-8"><input type="hidden" value="' +  $("meta[name=csrf-token]").attr('content') + '" name="authenticity_token"><div style="margin:0;padding:0;display:inline"><input type="hidden" value="✓" name="utf8"><input type="hidden" value="' + token + '" name="authenticity_token"></div><input type="file" status="video" name="file[source]" id="file_image" class="file-upload-source"><input type="hidden" value="' + gId + '" name="file[user_id]" id="file_user_id"><input type="submit" value="Save File" name="commit" class="file-upload-submit"><iframe width="500px" frameborder="0" src="about:blank" onload="parseIframeEdit();" name="file-upload-iframe" id="file-upload-iframe" heigth="300px" border="0"></iframe></form>';
          root.find(".gripe-details").before(IframeForm);
          StyleButton();   

        $(this).addClass("active");    
          
        root.find(".form-edit-gripe, .list-edit-video").show();
        root.find(".block-form-action .save-sett").before('<div class="block-btn-media"><div class="btn-browse">browse</div><div class="btn-embed">embed</div></div>');
        
        noBgLastEditImg();
        renderCheckboxAndInput();
        btnEditGripe(gId);
      }
  })



  
  



  $(".form-edit-gripe .bl-delete").live('click',function() {  
      var root = $(this).closest(".block-edit-image");
      root.remove();
  })


  $(".ico-img").live('click', function(){
    $(this).closest(".box-gripe").find(".widget-gripe-video").removeClass("db");
    $(this).parent().next().removeClass("active");
    $(this).parent().toggleClass("active");
    $(this).closest(".box-gripe").find(".widget-gripe-pics").toggleClass("db");
  })

  $(".ico-video").live('click', function(){
    $(this).closest(".box-gripe").find(".widget-gripe-pics").removeClass("db");
    $(this).parent().prev().removeClass("active");
    $(this).parent().toggleClass("active");
    $(this).closest(".box-gripe").find(".widget-gripe-video").toggleClass("db");
  })

});