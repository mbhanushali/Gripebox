var file_type = '';
var thumbnail_url = '';
var file_html = '';
var embed_success = false;
var image_url = '';
var progressTrigger;
function parseIframe() {
  var data = $("#file-upload-iframe").contents().text(),
      json = jQuery.parseJSON(data),
      status = $("#file-upload-panel").attr("status");
      if(data.trim().length > 0){
        if(json.created_at){
          $(".block-edit-image:first .bl-loading").after('<div class="bl-delete">x delete</div>');
          $(".block-edit-image:first .bl-loading").text('');
          if(status == 'img')
          {
            $.ajax({
              type: "POST",
              url: "/uploader/image?id=" + json.id,
              success: function(data){
                $(".block-edit-image:first .bl-img img").attr("src",data).attr("original",json.id).css({"margin":"0"});
                $("#new_gripe .btn-gripe").removeClass("submitNo");
                
              },
              beforeSend: function(thisXHR){
              	progressTrigger = setInterval(function(){
              			if(thisXHR.readyState > 2){
              				  var totalBytes = thisXHR.getResponseHeader('Content-length');
              					var dlBytes = thisXHR.responseText.length;
              				}
              		},50);
             	},
             	complete: function(){
             		clearInterval(progressTrigger);
             	}
            });
          }
          if(status == 'video'){
            $.ajax({
              type: "POST",
              url: "/uploader/image?id=" + json.id,
              success: function(data){
                $(".block-edit-image:first .bl-img img").attr("src",data).attr("original",json.id).css({"margin":"0"});
                $("#new_gripe .btn-gripe").removeClass("submitNo");
              },
              beforeSend: function(thisXHR){
              	progressTrigger = setInterval(function(){
              			if(thisXHR.readyState > 2){
              				  var totalBytes = thisXHR.getResponseHeader('Content-length');
              				  alert("Total Bytes: " + totalBytes);
              					var dlBytes = thisXHR.responseText.length;
              					alert(dlBytes);
              				}
              		},10);
             	},
             	complete: function(){
             		clearInterval(progressTrigger);
             	}
            });
          }
        }
        else{      
          //var error = json.source_file_size;
          $(".gripe_master_list_error").val(data);
          $(".block-edit-image:first").html("<div class='error'>" + $(".gripe_master_list_error").val() + "</div>");
          $(".block-edit-image:first").append('<div class="bl-delete">x delete</div>');
          
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
   
    $(".gripe_master_list").prepend(block_upload);
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

function embed_gripes(){
   var embed_gripes = '<div class="block-edit-image nobg"><div class="embed-text">embed</div><div class="bl-content"><span class="span_val" style="display: none; ">Paste your link here.</span><textarea class="tips ed-embed-text" default="Paste your link here." name="embed_text"></textarea></div><span class="gray_embed"><img alt="Gray_arrows" src="/assets/gray_arrows.png"></span><div class="bl-content" style="margin-left: 22px;width:448px;"><div class="bl-loading"></div><div class="bl-delete">x delete</div><div class="clear"></div></div><div class="clear"></div></div>';
   $(".gripe_master_list").prepend(embed_gripes);
   renderCheckboxAndInput();
   var $embed_div = $("div.block-edit-image, rootOfList").first();
   if($(".gripe_master_list .block-edit-image").length > 1){
     $(".block-edit-image").removeClass("nobg");
     $(".block-edit-image:last").addClass("nobg");
   }
   ($embed_div).find("textarea").val("");
   ($embed_div).find(".span_val").show();
}

function openFile(file) {
    var extension = file.substr( (file.lastIndexOf('.') +1) );
    switch(extension) {
        case 'jpg':
        case 'png':
        case 'gif':
        case 'jpeg':
        case 'ico':
        case 'bmp':
            return "image";
        break;
        case 'mov':
        case 'swf':
        case 'wma':
        case 'mp4':
        case 'avi':
        case 'mpeg':
        case 'm4v':
            return "video";
        break;
        default:
            return get_embed_details(file);    
    }

};

function get_embed_details(url, embed_url,type,embed_gripe){
  var xhr = $.ajax({
    url: '/embed_details.js',
    type: 'POST',
    dataType: 'JSON',
    data: {url: url, url_type: type, embed_url: embed_url},
    success: function(data){
      file_type = data.type;
      if(file_type == 'video'){
        thumbnail_url = data.thumbnail_url;
        file_html = data.html;
        embed_success = true;
        $(".gripe_master_list").prepend(file_html);
        renderCheckboxAndInput();
        $(".block-edit-image:first .bl-img img").attr("src",data.thumbnail_url).attr("original",data.id).css({"margin":"0"});
        $("div.block-edit-image").each(function(){ 
          $(this).removeClass("nobg"); });
        $("#new_gripe .btn-gripe").removeClass("submitNo");
        var embed_image = $("div.block-edit-image, rootOfList").first();
        $(embed_image).find("textarea").val("");
        $(embed_image).find(".span_val").show();
        $(".block-edit-image:last").addClass("nobg");
        $(embed_gripe).removeAttr("disabled");
        $(embed_gripe).parent().parent().remove();
      }
      else if(file_type == 'photo'){
        image_url = data.src;
        file_html = data.html;
        embed_success = true;
        $(".gripe_master_list").prepend(file_html);
        renderCheckboxAndInput();
        $(".block-edit-image:first .bl-img img").attr("src",data.src).attr("original",data.id).css({"margin":"0"});
        $("div.block-edit-image").each(function(){ 
          $(this).removeClass("nobg"); });
        $("#new_gripe .btn-gripe").removeClass("submitNo");
        var embed_image = $("div.block-edit-image, rootOfList").first();
        $(embed_image).find("textarea").val("");
        $(embed_image).find(".span_val").show();
        $(".block-edit-image:last").addClass("nobg");
        $(embed_gripe).removeAttr("disabled");
        $(embed_gripe).parent().parent().remove();        
      }
    },
    error: function(jqXHR, textStatus, errorThrown){
      $(embed_gripe).removeAttr("disabled");
      console.log("The following error occured: " + textStatus, errorThrown);
    },
    complete: function(){
      $(embed_gripe).removeAttr("disabled");
    }
    
  });

  return embed_success;
}

$(document).ready(function() {
  $(".gripe_master .file-upload-source").live('change', function() {
    fileUpload($(this).attr("status"));
  });

  $(".gripe_master .file-upload-source").click(function() {
    $(".file-upload-source").val('');
  });
  
  $(".embed").click(function(){
    embed_gripes();
  });
  
  $(".ed-embed-text").live("keypress", function(e){
    var ambed_value = $(this).val();
    $(this).prev(".span_val").hide();
  });

  $(".ed-text").live("keypress", function(e){
    var value = $(this).val();
    $(this).prev(".span_val").hide();
  });

  $(".ed-text").live("keyup", function(e){
    var value = $(this).val();
    if(value == ""){
      $(this).prev(".span_val").show();
    }
  });
  
  $(".ed-embed-text").live("keyup", function(e){
    var ambed_value = $(this).val();
    var ambed_gripe = $(this);
    var src_value = '';
    var src_type = '';
    if(ambed_value == ""){
      $(this).prev(".span_val").show();
      $(this).removeAttr("disabled");
    }
    else {
	    $(this).attr("disabled", "disabled");
  		setTimeout(function(){
        $(this).prev(".span_val").hide();
        if(ambed_value.toLowerCase().indexOf("src=") > 0){
          src_value = $(ambed_value).attr("src");
          src_type = 'embed';
        }
        else{
          src_value = ambed_value;
          src_type = 'url';
        }
        var embed_details = get_embed_details(src_value,ambed_value, src_type, ambed_gripe);
	    }, 600);
    }
  });
  
  $(".span_val").live("click", function(e){
    $(this).next().trigger("focus");
  });
  
  $("body").delegate(".ed-embed-text", "change", function(){
    if($("this").val() == ""){
      $(this).prev(".span_val").show();
    }
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
              file_type = $(this).attr('embed'),
              txt = $(this).parent().parent().find(".ed-text").val(),
              RowValue = id + '::' + file_type + '::' + txt + ':::';
              ResultArray = ResultArray + RowValue.toString();

        $("#new_gripe .ResultArray").val(ResultArray.toString());
      })
    }

  });

})

