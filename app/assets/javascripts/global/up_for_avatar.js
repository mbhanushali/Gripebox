function StyleButtonAvatar() {
  $(".settings-user #user_avatar").each(function(){
    $(".settings-user #user_avatar").filestyle({
      image: "/assets/one.png",
      imageheight : 26,
      imagewidth : 130,
      width : 130,
      pathClass: "fileImg"
    });
  });
};

function parseIframeAvatar() {
  var data = $("#file-upload-iframe").contents().text();


      if(data.length > 0){
        $.ajax({
          type: "POST",
          url: "/account/avatar",
          data: {
            "authenticity_token": $("meta[name=csrf-token]").attr('content'),
          },
          success: function(data){
            $(".settings-user .img-box").html(data).removeClass("ldng");
          },
        });
      }
};

function fileUploadAvatar(){

  var expansion_for_gipre_img = ['jpg','jpeg','gif','png'];

      path  = $(".settings-user .file-upload-source").val(),
      expansion = path.match(/\.([^\.]+)$/);
  

  if( (status == 'image') && ($.inArray(expansion[1], expansion_for_gipre_img) == -1 ) ){
    alert("No file img pls 'jpg','jpeg','gif','png','ico','bmp' !");
    return false;
  }
  else
  {
    $(".settings-user .img-box").html('<img src="/assets/loading.gif" class="ldng" alt="">');
    $("#file-upload-panel").submit();
  }  

}


$(document).ready(function() {
  StyleButtonAvatar();
  $(".settings-user .file-upload-source").live('change', function() {
    fileUploadAvatar('image');
  });


})

