
  function close_overlay (){
    $("#overlay").remove();
    $(".bl-popup").hide();
  }
  function overlay () {
    if(!$("body").find("#overlay").is("div"))
      $("body").append("<div id='overlay'></div>");
  }

$(document).ready(function() {

  //popup//
  $(".sign-link").click(function(e){
    $(".bl-popup").hide();

    overlay();
    $(".popup-warning-block").hide();
    $(".popup-sign-link").parent().show();
    return false;
  });
  if ($(".sign-form div").is(".field_with_errors") ) 
    $(".sign-form .letters").addClass("fix");
  

  $(".widget-gripe-video li a").live('click',function(e){
    $(".bl-popup").hide();
    $(".block-video-gripe-display, .block-video-gripe-text").html('');
    overlay();
    $(".popup-video").parent().show();
    var text = $(this).next().text(),
         code_video = $(this).find(".code-video").html();
    
     $(".block-video-gripe-display").html(code_video);
    $(".block-video-gripe-text").html(text);    
    return false;
  });

  if ($(".thank-you").parent().is(".db")) {
     overlay();
     $(".main.alerts").remove();
  }

  if ($(".sign-form").is(".change_your_password")) {
    overlay();
    $(".change-pass").parent().show();
    $(".change-pass").find(".popup-warning-block").show();
  }



  //Embed 
  $(".btn-embed").live('click',function() {  
    
    $(".bl-popup").hide();
    overlay();
    $(".popup-embed").parent().show();

    var type = $(".block-edit-gripe .active").text(),
        body = '';
    $("div.embed-body").html('');
    $(".popup-embed .popup-warning-block").remove();
    $(".popup-embed .embed-ok").addClass("off");
        
    if ( type == 'photo') {
      var body = '<label>Url:</label> <input type="text" default="Enter url" class="tips">';
    }
    if ( type == 'video') {
      var body = '<label>Code:</label> <input type="text" default="Enter embed video" class="tips">';
    }

    $("div.embed-body").append(body);
    renderCheckboxAndInput();
  })

  if( $.trim($(".popup-embed .tips").val()).length > 0 ) 
    $(".popup-embed .embed-ok").removeClass("off");
  else
    $(".popup-embed .embed-ok").addClass("off");
   
  $(".popup-embed  .tips").live('keyup', function(e){
    if( $.trim($(".popup-embed .tips").val()).length > 0 )
    {
      $(".popup-embed .embed-ok").removeClass("off");
    }else{
      $(".popup-embed .embed-ok").addClass("off");
    }
  });


  $(".embed-ok").live('click',function() {   
    if ($(this).is(":not(.off)")) {
      var type = $(".block-edit-gripe .active").text(),
          root = $(".block-edit-gripe .active").closest(".box-gripe"),
          gId = root.attr("id");
      
      if ( type == 'photo') {
        var url = $(".embed-body .tips").val();

        $.ajax({
          type: "POST",
          url: "/check_embed_image",
          data: {
            "embed": url
          },
          success: function(data){

            var block_upload = '<div class="block-edit-image"><div class="bl-img"><img src="'+ url +'" alt="" embed="img" class="newI"></div><div class="bl-content"><textarea default="Add are description." class="tips ed-text"></textarea><div class="bl-delete">x delete</div><div class="clear"></div></div><div class="clear"></div></div>';
            root.find(".list-edit-image").append(block_upload);
            renderCheckboxAndInput();
            root.find(".block-edit-image").removeClass("nobg");
            root.find(".block-edit-image:last").addClass("nobg");
            btnEditGripe(gId);
            $("#overlay").remove();
            $(".bl-popup").hide();

          },
          error: function(data){
            $(".popup-embed .popup-warning-block").remove()
            $(".popup-embed form").before('<div class="popup-warning-block">URL no valid!<span></span></div>');
          },
        });


      }
      if ( type == 'video') {

        var link = $(".embed-body .tips").val();
        var block_upload = '<div class="block-edit-image"><div class="bl-img"><img src="/assets/ico/embed_video_tmb.png" alt="" embed="video" link="'+ link +'"class="newV"></div><div class="bl-content"><textarea default="Add are description." class="tips ed-text"></textarea><div class="bl-delete">x delete</div><div class="clear"></div></div><div class="clear"></div></div>';
        root.find(".list-edit-video").append(block_upload);
        renderCheckboxAndInput();
        root.find(".block-edit-image").removeClass("nobg");
        root.find(".block-edit-image:last").addClass("nobg");
        btnEditGripe(gId);
        $("#overlay").remove();
        $(".bl-popup").hide();
      }
    }
    else{
      //alert("Error");
    }
  });


  



  $("#overlay, .bl-popup .close, .btnClose, .embed-cancel").live('click',function(){
    close_overlay();
  });

  //end popup//

  $(".tabs-sign-link div").click(function(){
    
    $(".popup-warning-block").hide();
    $(".tabs-block-bethink").hide();
    $(".tabs-sign-link div").removeClass("active");
    $(".content-sign-link").removeClass("l").removeClass("r");
    $(".tabs-block-register, .tabs-block-sign").removeClass("db");
    $(this).addClass("active");
    if ( $(this).is(".tabs-sign") ) {
        $(".tabs-block-sign").addClass("db");
        $(".content-sign-link").addClass("l");
      }
    else {
      $(".tabs-block-register").addClass("db");
      $(".content-sign-link").addClass("r");  
      }
  });  

  $(".popup-sign-link .sign-form .bethink").click(function() {
    $(".popup-warning-block").hide();
    if (checkmail($(".popup-sign-link #user_login").val())){
      $(".sign-form").prev().text("Check your email for instructions.").fadeIn("slow");
      
      $.ajax({
        type: "POST",
        url: "/users/password",
        data: {
          "authenticity_token": $("meta[name=csrf-token]").attr('content'),
          "user[email]" : $(".popup-sign-link #user_login").val()
        },
        success: function(data){
         //
        }
      });

    } else {
      $(".tabs-block-sign, .tabs-block-register").removeClass("db");
      $(".tabs-block-bethink").show(); 
    }
    return false;

  })

  $(".tabs-block-bethink .sign-form").submit(function() {
    $(".popup-warning-block").hide();
    if (checkmail($(".tabs-block-bethink #user_email").val())){
      
      $.ajax({
        type: "POST",
        url: "/users/password",
        data: {
          "authenticity_token": $("meta[name=csrf-token]").attr('content'),
          "user[email]" : $(".tabs-block-bethink #user_email").val()
        },
        success: function(data){
          if(data.indexOf('error_explanation') + 1) {
            $(".sign-form").prev().text("Email not found.").fadeIn("slow");
          }
          else {
            $(".sign-form").prev().text("Check your email for instructions.").fadeIn("slow");
          }

        }
      
      });
    } 
    else {
      $(".sign-form").prev().text("Oops, please enter a valid Email.").fadeIn("slow");
    }
    return false;

  });




  $(".change-pass .sign-form").submit(function() {
    $(".popup-warning-block").hide().addClass("nobg");

      var pass1 = $(".change-pass #user_password"),
          pass2 = $(".change-pass #user_password_confirmation");

      pass1.removeClass("field-error"); 
      pass2.removeClass("field-error");

      if ( checkpass(pass1.val()) == false ) {
        pass1.addClass("field-error");
        pass1.closest(".sign-form").prev().removeClass("nobg").html("<em>Oops, please enter a valid password.</em> <span></span>").fadeIn("slow");    
        return false;
      } 

      if ( $.trim(pass2.val()).length == 0 ) { 
          pass2.addClass("field-error");
          pass2.closest(".sign-form").prev().removeClass("nobg").html("<em>Please confirm your new password.</em> <span></span>").fadeIn("slow");    
          return false; 
      }

      if ( checkpass(pass2.val()) == false ) { 
          pass2.addClass("field-error");
          pass2.closest(".sign-form").prev().removeClass("nobg").html("<em>Oops, please enter a valid password.</em> <span></span>").fadeIn("slow");    
          return false; 
      }

      if ( pass1.val() != pass2.val() ) {
        pass1.addClass("field-error");
        pass1.closest(".sign-form").prev().removeClass("nobg").html("<em>Yoor passwords don't match.</em> <span></span>").fadeIn("slow");    
        return false;
      }

  });





})