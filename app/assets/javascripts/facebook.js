$(document).ready(function(){
  code = $("#user_code").val();

  if(code.length > 0){

    $.ajax({
      type: "POST",
      url: "https://graph.facebook.com/oauth/access_token",
      data: {
        'client_secret': '8c55ada2517263f7d88f0f53a4aa6744',
        'redirect_uri': 'http://gripebox.com/account',
        'client_id': '259665494110245',
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
    	$(".facebook_status").html(data);
//      $("#panel-for-facebook-posting").hide();
    },
  });

}
