function parseIframe() {
  var data = $("#file-upload-iframe").contents().text(),
      json = jQuery.parseJSON(data),
      status = $("#file-upload-panel").attr("status");
      if(data.trim().length > 0){
        if(json.created_at){
          $(".block-edit-image:last .bl-loading").after('<div class="bl-delete">x delete</div>');
          $(".block-edit-image:last .bl-loading").text('');
          if(status == 'img')
          {
            $.ajax({
              type: "POST",
              url: "/uploader/image?id=" + json.id,
              success: function(data){
                $(".block-edit-image:last .bl-img img").attr("src",data).attr("original",json.id).css({"margin":"0"});
                $("#new_gripe .btn-gripe").removeClass("submitNo");
              },
            });
          }
          if(status == 'video'){
            
            $.ajax({
              type: "POST",
              url: "/uploader/image?id=" + json.id,
              success: function(data){
                $(".block-edit-image:last .bl-img img").attr("src",data).attr("original",json.id).css({"margin":"0"});
                $("#new_gripe .btn-gripe").removeClass("submitNo");
              },
            });
          }
        

        }else{      
          //var error = json.source_file_size;
          $(".gripe_master_list_error").val(data);
          $(".block-edit-image:last").html("<div class='error'>" + $(".gripe_master_list_error").val() + "</div>");
          $(".block-edit-image:last").append('<div class="bl-delete">x delete</div>');
          
        }  
      $(".gripe_master .disabled").remove();
      $("#file-upload-panel").removeClass("disabledBtn");       
      }
};

function fileUpload(status){
//alert("val video = " + $("#file_source").val() );
//alert("val img = " + $("#file_image").val() );
  var expansion_for_gipre_img = ['jpg','jpeg','gif','png','ico','bmp'],
      expansion_for_gipre_video = ['mov','mp4','avi','mpeg','m4v'],
      path  = $(".file-upload-source[status='"+ status +"']").val(),
      expansion = path.match(/\.([^\.]+)$/);
  

  if( (status == 'img') && ($.inArray(expansion[1], expansion_for_gipre_img) == -1 ) ){
    alert("No file img pls 'jpg','jpeg','gif','png','ico','bmp' !");
    return false;
  }
  else if ( (status == 'video') && ($.inArray(expansion[1], expansion_for_gipre_video) == -1 ) ){
    alert("No file video pls 'mov','mp4','avi','mpeg','m4v'!");
    return false;
  }  
  else
  {
    //alert("ok");
    
    var block_upload = '<div class="block-edit-image"><div class="bl-img"><img src="/assets/loading.gif" alt=""></div><div class="bl-content"><textarea default="Add are description." class="tips ed-text"></textarea><div class="bl-loading">loading ...</div><div class="clear"></div></div><div class="clear"></div></div>';
   
    $(".gripe_master_list").append(block_upload);
    renderCheckboxAndInput();
    $(".block-edit-image").removeClass("nobg");
    $(".block-edit-image:last").addClass("nobg");

    $("#new_gripe .btn-gripe").addClass("submitNo");
    $("#file-upload-panel").before("<div class ='disabled'> </div>");
    $("#file-upload-panel").addClass("disabledBtn");
    $("#file-upload-panel").attr("status",status);
    $("#file-upload-panel").submit();

  }  

}

$(document).ready(function() {
  
  $(".gripe_master .file-upload-source").live('change', function() {
    fileUpload($(this).attr("status"));
  });

  $(".gripe_master .file-upload-source").click(function() {
    $(".file-upload-source").val('');
  });


  $(".gripe_master #file_image").each(function(){
    $(".gripe_master #file_image").filestyle({
      image: "/assets/ico/input-upload-ico.png",
      imageheight : 27,
      imagewidth : 28,
      width : 28,
      pathClass: "fileImg"
    });
  });

  $(".gripe_master #file_source").each(function(){
    $(".gripe_master #file_source").filestyle({
      image: "/assets/ico/input-upload-ico.png",
      imageheight : 27,
      imagewidth : 32,
      width : 32,
      pathClass: "fileVideo"
    });
  });

  $(".gripe_master_list .bl-delete").live('click',function() {  
      var root = $(this).closest(".block-edit-image");
      root.remove();
  });



function errorStart() {
  CloseAlert();
  ScrollAlertPosition();
  AlertTimeClose();  
};  


  $("#new_gripe").submit(function() {
  var new_gripeTips = $("#new_gripe .tips[value!='']").length,
      new_gripeImg = $(".gripe_master_list .tips[value!='']").length,
      countImg = $(".gripe_master_list .block-edit-image").length;
    if( new_gripeTips < 2 ){
      $("#container").before('<div class="main alerts"><div class="alert-message success" style="display: block;"><div><a href="#" class="close">×</a><p>Please fill out each text field before you continue</p></div></div></div>');
      errorStart();
      return false;
    }

    if( $.trim($("#gripe_title").val()).length == 0 ){
      $("#container").before('<div class="main alerts"><div class="alert-message success" style="display: block;"><div><a href="#" class="close">×</a><p>Please title you gripe before you continue</p></div></div></div>');
      errorStart();
      return false;
    }

    if( $.trim($("#gripe_overview").val()).length == 0 ){
      $("#container").before('<div class="main alerts"><div class="alert-message success" style="display: block;"><div><a href="#" class="close">×</a><p>You forgot to gripe!</p></div></div></div>');
      errorStart();
      return false;
    }

    if( $.trim($("#gripe_tag_list").val()).length == 0 ){
      $("#container").before('<div class="main alerts"><div class="alert-message success" style="display: block;"><div><a href="#" class="close">×</a><p>Please tag your gripe before you continue</p></div></div></div>');
      errorStart();
      return false;
    }

    if( new_gripeImg != countImg) { 
      $("#container").before('<div class="main alerts"><div class="alert-message success" style="display: block;"><div><a href="#" class="close">×</a><p>Please add are description.</p></div></div></div>');
      errorStart();
      return false;
    }//
   
    if( ($("#new_gripe .btn-gripe").is(".submitNo"))  )
    {  
      return false;  
    }
    else{
      var  ResultArray = '',
           index = 1; 
      $(".block-edit-image img").each(function(){
          var id = $(this).attr('original'),
              txt = $(this).parent().parent().find(".ed-text").val(),
              RowValue = id + '::' + txt + ':::';
              ResultArray = ResultArray + RowValue.toString();

        $("#new_gripe .ResultArray").val(ResultArray.toString());
      })
    }

  });

})

