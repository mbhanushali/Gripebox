$(document).ready(function(){
  code = $("#user_code").val();

  if(code.length > 0){

    $.ajax({
      type: "POST",
      url: "https://graph.facebook.com/oauth/access_token",
      data: {
        'client_secret': '9822dc415bf97f509ba41c689628a906',
        'redirect_uri': 'http://dev.gripebox.com/account',
        'client_id': '292822210738107',
        'code': code
      },
      success: function(data){
        setFacebookActivityAccessToken(data.replace("access_token=", ""));
      },
    });

  }
   
});


function setFacebookActivityAccessToken(access_token){

  $.ajax({
    type: "POST",
    url: "/facebook/access_token",
    data: {
      "authenticity_token": $("meta[name=csrf-token]").attr('content'),
      'access_token': access_token,
    },
    success: function(data){
      $("#panel-for-facebook-posting").hide();
    },
  });

}
