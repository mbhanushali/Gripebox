function filter_input(e)
{
  regexp = /\d/;
  e=e || window.event;
  var target=e.target || e.srcElement;
  var isIE=document.all;

  if (target.tagName.toUpperCase()=='INPUT')
  {
    var code=isIE ? e.keyCode : e.which;
    if (code<32 || e.ctrlKey || e.altKey) return true;

    var char=String.fromCharCode(code);
    if (!regexp.test(char)) return false;
  }
  return true;
}

$(document).ready(function() {
  $(".btn-save-settings").click(function(){  
    if($(this).is(".on"))
    {
      var user_name = $("#user-name").val(),
          user_email = $("#user-email").val(),
          birthday_m = $("#birthday-m").val(),
          birthday_d = $("#birthday-d").val(),
          birthday_y = $("#birthday-y").val(),
          user_gender = $("input[name=gender]:checked").val(),
          user_occupation = $("#user-occupation").val(),
          user_location = $("#user-location").val();

      
          var  email_me = new Array (); 
          $("input[name=email-me]:checked").each(function(){
            email_me.push($(this).val());
          }) 
      
          var  facebook = new Array (); 
          $("input[name=facebook]:checked").each(function(){
            facebook.push($(this).val());
          }) 

          var  twitter = new Array (); 
          $("input[name=twitter]:checked").each(function(){
            twitter.push($(this).val());
          }) 

      $(".status-barSett img").hide();    
      $.ajax({
        type: "POST",
        url: "/account/setting/save",
        data: {
          "authenticity_token": $("meta[name=csrf-token]").attr('content'),
          "username" : user_name,
          "email" : user_email,
          "birthday_m" : birthday_m,
          "birthday_d" : birthday_d,
          "birthday_y" : birthday_y,
          "gender" : user_gender,
          "occupation" : user_occupation,
          "location" : user_location
        },
        success: function(data){
          
          $("#user-email, #user-name").removeClass("inputError");
          $(".status-barSett img").hide();


          if ( data == 'error: username exist'){    

            $("#user-name").addClass("inputError");
            $("#container").before('<div class="main alerts"><div class="alert-message error" style="display: block;"><div><a href="#" class="close">×</a><p> Error: username exist </p></div></div></div>');
            CloseAlert();
            ScrollAlertPosition();
            AlertTimeClose(); 
          }

          if ( data == 'error: email exist'){

            $("#user-email").addClass("inputError");
            $("#container").before('<div class="main alerts"><div class="alert-message error" style="display: block;"><div><a href="#" class="close">×</a><p> Error: email exist </p></div></div></div>');
            CloseAlert();
            ScrollAlertPosition();
            AlertTimeClose(); 
          }
          if (!data){
                  
            $("#container").before('<div class="main alerts"><div class="alert-message success" style="display: block;"><div><a href="#" class="close">×</a><p> Great success!  Your changes are saved.</p></div></div></div>');
              CloseAlert();
              ScrollAlertPosition();
              AlertTimeClose(); 
          }

        },
        beforeSend: function(data){
            $(".status-barSett .loadind").show();
          },
        complete: function(data){
        
        },
        error: function(data){
          $(".status-barSett img").hide();
          //$(".status-barSett .no").show();

        }
      });
    }
    return false;
  });


  $(".btn-change-password").click(function(){  
    $(".status-bar img").hide();

    var current_password = $("#current-password").val(),
        new_password = $("#new-password").val();

    if( $(this).is(".on") ){
        $.ajax({
          type: "POST",
          url: "/account/password",
          data: {
            "authenticity_token": $("meta[name=csrf-token]").attr('content'),
            "current_password" : current_password,
            "new_password" : new_password
          },
          success: function(data){
           
           
          $("#container").before('<div class="main alerts"><div class="alert-message success" style="display: block;"><div><a href="#" class="close">×</a><p> Great success!  Your changes are saved. </p></div></div></div>');
            CloseAlert();
            ScrollAlertPosition();
            AlertTimeClose(); 

          $(".status-bar img").hide();
          //$(".status-bar .good").show();
          },
          beforeSend: function(data){
            $(".status-bar .loadind").show();
          },
          complete: function(data){
          
          },
          error: function(data){
            $(".status-bar img").hide();
            $("#container").before('<div class="main alerts"><div class="alert-message success" style="display: block;"><div><a href="#" class="close">×</a><p> Error </p></div></div></div>');
            CloseAlert();
            ScrollAlertPosition();
            AlertTimeClose();  
        }
        });
    }
    else {

    }    
    return false;
  });

  $(".settings-socialNO input").click(function(){  
    
   

    var  facebook = new Array (); 
    $("input[name=facebook]:checked").each(function(){
      facebook.push($(this).val());
    }) 
    if(facebook.length == 0)
      facebook = '';

    var  twitter = new Array (); 
    $("input[name=twitter]:checked").each(function(){
      twitter.push($(this).val());
    })
    if(twitter.length == 0)
      twitter = '';

    
    $.ajax({
      type: "POST",
      url: "/",
      data: {
        "facebook[]" : facebook,
        "twitter[]" : twitter,
        "email_me[]": email_me
      },
      success: function(data){
       //
      }
    });
  });


  $(".settings-social .email-me input").click(function(){  

    var  val = $(this).val();  
    


    $.ajax({
      type: "POST",
      url: "/account/email_me",
      data: {
        "authenticity_token": $("meta[name=csrf-token]").attr('content'),
        "params" : val,
      },
      success: function(data){
       //
      }
    });

  });


  // Twitter 
  $(".settings-social .twitter-form input").click(function(){  

    var  val = $(this).val();  
      $.ajax({
      type: "POST",
      url: "/account/tw",
      data: {
        "authenticity_token": $("meta[name=csrf-token]").attr('content'),
        "evn" : val,
      },
      success: function(data){
       //
      }
    });

  });

  // Facebook 

  $(".settings-social .facebook-form input").click(function(){  

    var  val = $(this).val();  
      $.ajax({
      type: "POST",
      url: "/account/fb",
      data: {
        "authenticity_token": $("meta[name=csrf-token]").attr('content'),
        "evn" : val,
      },
      success: function(data){
       //
      }
    });

  });


  $("button.delete-account").click(function() {
     
    if(confirm("Delete account?")){
      var id = $(this).closest("#account-settings").attr("account");
      $.ajax({
        type: "POST",
        url: "/account/remove",
        data: {
          "authenticity_token": $("meta[name=csrf-token]").attr('content'),
          "id": id
        },
        success: function(data){
          location.href = "/"
        }
      });
    }

  })

  $("#birthday-m").click(function() {
    $(this).next().show();
  });

  $(".birthday ul").hover(
    function() {$(this).show();},
    function() {$(this).hide();}
  );

  $(".birthday li").click(function() {
    $("#birthday-m").val($(this).text());
    $(".birthday ul").hide();
    btnActiveAccount();
  });

  $(".block-user-info .gender input").live('change', function(e){
    btnActiveAccount();
  });

  $(".block-user-info #user-name, .block-user-info #user-email, .block-user-info #birthday-d, .block-user-info #birthday-y").live('keyup', function(e){
    btnActiveAccount();
  });


  $(".password input").live('keyup', function(e){
    btnActiveAccountPassword();
  });

btnActiveAccount ();

function btnActiveAccount() {

  if( (  $.trim($("#user-name").val()).length > 0 )  
  && ( $.trim($("#birthday-m").val()).length > 0 )   
  && ( $.trim($("#birthday-d").val()).length > 0 )  
  && ( $.trim($("#birthday-y").val()).length > 0 )  
  && ($(".gender div").is(".checkboxOn")) 
  &&  (  checkmail($(".block-user-info #user-email").val() ) )
  ){ 
    $(".btn-save-settings").addClass("on");
    }else{
    $(".btn-save-settings").removeClass("on");
  }

};


function btnActiveAccountPassword() {

  if( (  $.trim($("#current-password").val()).length > 0 )  
  && ( $.trim($("#new-password").val()).length > 0 )   

  ){ 
    $(".btn-change-password").addClass("on");
    }else{
    $(".btn-change-password").removeClass("on");
  }

};

})


