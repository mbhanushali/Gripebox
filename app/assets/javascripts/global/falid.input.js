function checkmail(value) {
var re = /^\w+([\.-]?\w+)*@(((([a-z0-9]{2,})|([a-z0-9][-][a-z0-9]+))[\.][a-z0-9])|([a-z0-9]+[-]?))+[a-z0-9]+\.([a-z]{2}|(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum))$/i;
  if (!value.match(re))
    return false;
  else
    return true;
}

function checkpass(value) {
var re = /^[a-zA-Z0-9_-]{6,18}$/;
  if (!value.match(re))
    return false;
  else
    return true;
}



$(document).ready(function() { 


//, .tabs-block-register .sign-form
  
  

  $(".tabs-block-sign .btn.small").click(function() {
    
    var login = $("body").find(".popup-sign-link #user_login"),
      pass = $("body").find(".popup-sign-link #user_password"),
      username = $("body").find(".popup-sign-link #user_username"),
      user_email = $("body").find(".popup-sign-link #user_email");



    $(".sign-form").prev().hide(); 
    $.ajax({
      type: "POST",
      url: "/check_user_login_param",
      data: {
        "user_login": login.val(),
        "user_password": pass.val()
      },
      success: function() {
        $(".tabs-block-sign .sign-form").submit();
      }, 
      error: function() {
        $(".sign-form").prev().text("Please enter a valid password or email.").fadeIn("slow");
        //login.addClass("field-error");
      }
    });  
    return false;

  });







  $(".tabs-block-register .btn.small").click(function() {

     var pass = $("body").find(".tabs-block-register #user_password"),
         username = $("body").find(".tabs-block-register #user_username"),
         user_email = $("body").find(".tabs-block-register #user_email");
    

    if ( checkmail(user_email.val()) == false ) {
        user_email.addClass("field-error");
        user_email.closest(".sign-form").prev().text("Oops, please enter a valid Email.").fadeIn("slow");    
        return false;
    }else{
        user_email.removeClass("field-error");
        user_email.closest(".sign-form").prev().hide();
    }

    if ( checkpass(pass.val()) == false ) {
        pass.addClass("field-error");
        pass.closest(".sign-form").prev().text("Oops, please enter a valid password.").fadeIn("slow");    
        return false;
    }else{
        pass.removeClass("field-error");
        pass.closest(".sign-form").prev().hide();
    }

     
    if ( (checkpass(pass.val())) ) {
            

        $.ajax({
          type: "POST",
          url: "/check_user_reg_param",
          data: {
            "user_email": user_email.val(),
            "username": username.val()
          },
          success: function(data) {
              
             
            if (data == 'email'){
              $(".sign-form").prev().text("Oops, please enter a valid Email.").fadeIn("slow");
            }
            if (data == 'username'){
              $(".sign-form").prev().text("Oops, please enter a valid Username.").fadeIn("slow");
            }
            if((!data) && ( user_email.val() )   ) {
              $(".tabs-block-register .sign-form").submit();
            }
          }, 
          error: function() {
          }
        });  
          
        pass.removeClass("field-error");
        pass.closest(".sign-form").prev().hide();

        return false;
    
      }




  });

})


/* 

var email = $(this).find("#user_email"),
        pass = $(this).find("#user_password");

      if ( checkmail(email.val()) ) {
        email.removeClass("field-error");
        email.closest(".sign-form").prev().hide();
      }
      else {
        email.addClass("field-error");
        email.closest(".sign-form").prev().text("Oops, please enter a valid email addres.").fadeIn("slow");
        return false;
      }


      if ( checkpass(pass.val()) ) {
        pass.removeClass("field-error");
        pass.closest(".sign-form").prev().hide();
      }
      else {
        pass.addClass("field-error");
        pass.closest(".sign-form").prev().text("Oops, please enter a valid password.").fadeIn("slow");
        return false;
      }
    */