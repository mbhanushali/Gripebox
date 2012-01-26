function StyleButton() {
  $(".box-gripe #file_image").each(function(){
    $(".box-gripe #file_image").filestyle({
      image: "/assets/one.png",
      imageheight : 24,
      imagewidth : 56,
      width : 56,
      pathClass: "fileImg"
    });
  });
  $(".box-gripe .fileImg").live('click',function() {
    var btn = $(this).closest(".box-gripe").find(".btn-browse");
    btn.addClass("btn-browse-act");

    setTimeout(function(){
      btn.removeClass("btn-browse-act");
    },500);
  });

};

function parseIframeEdit() {
  var data = $("#file-upload-iframe").contents().text(),
      json = jQuery.parseJSON(data),
      status = $("#file-upload-panel").attr("status");


      if(data.length > 0){
        var gId  = $(".btn-gripe-update.active").parent().attr("id"),
            root = $(".box-gripe#" + gId);
        if(json.created_at){
          root.find(".block-edit-image:last .bl-loading").after('<div class="bl-delete">x delete</div>');
          root.find(".block-edit-image:last .bl-loading").text('');
          if(status == 'image')
          {
            $.ajax({
              type: "POST",
              url: "/uploader/image?id=" + json.id,
              success: function(data){
                root.find(".list-edit-image .block-edit-image:last .bl-img img").attr("src",data).attr("original",json.id).css({"margin":"0"}).removeClass("ldng").addClass("newI");
                $(".block-form-action .save-sett").removeClass("submitOff2");
              },
            });
          }
          if(status == 'video'){
            
            $.ajax({
              type: "POST",
              url: "/uploader/image?id=" + json.id,
              success: function(data){
                $(".list-edit-video .block-edit-image.nobg .bl-img img").attr("src",data).attr("original",json.id).css({"margin":"0"}).removeClass("ldng").addClass("newV");
                $(".block-form-action .save-sett").removeClass("submitOff2");
              },
            });
          }
        

        }else{      
          $(".gripe_master_list_error").val(data);
          $(".block-edit-image:last").html("<div class='error'>" + $(".gripe_master_list_error").val() + "</div>");
          $(".block-edit-image:last").append('<div class="bl-delete">x delete</div>');
          
        }  
        root.find(".disabled").remove();
        root.find(".block-form-action .btn-browse, .edit-video, .edit-photo").removeClass("disabledBtn");
      }
};

function fileUploadEdit(status, gId){
  var expansion_for_gipre_img = ['jpg','jpeg','gif','png','ico','bmp'],
      expansion_for_gipre_video = ['mov','mp4','avi','mpeg','m4v'],
      path  = $(".file-upload-source[status='"+ status +"']").val(),
      expansion = path.match(/\.([^\.]+)$/);
  

  if( (status == 'image') && ($.inArray(expansion[1], expansion_for_gipre_img) == -1 ) ){
    alert("No file img pls 'jpg','jpeg','gif','png','ico','bmp' !");
    return false;
  }
  else if ( (status == 'video') && ($.inArray(expansion[1], expansion_for_gipre_video) == -1 ) ){
    alert("No file video pls 'mov','mp4','avi','mpeg','m4v' !");
    return false;
  }  
  else
  {
    //alert("ok");
    
    var root  = $(".box-gripe#"+gId);
    block_upload = '<div class="block-edit-image"><div class="bl-img"><img src="/assets/loading.gif" class="ldng" alt=""></div><div class="bl-content"><textarea default="Add are description." class="tips ed-text"></textarea><div class="bl-loading">loading ...</div><div class="clear"></div></div><div class="clear"></div></div>';
   
    $(".block-form-action .save-sett").addClass("submitOff2");
    root.find(".list-edit-"+status).append(block_upload);
    renderCheckboxAndInput();
    root.find(".block-edit-image").removeClass("nobg");
    root.find(".block-edit-image:last").addClass("nobg");
    root.find("#file-upload-panel").before("<div class ='disabled'> </div>");
    root.find(".block-form-action .btn-browse, .edit-video, .edit-photo").addClass("disabledBtn");

    $("#file-upload-panel").attr("status",status);
    $("#file-upload-panel").submit();

    btnEditGripe(gId);

  }  

}


$(document).ready(function() {
  
  $(".box-gripe .file-upload-source").live('change', function() {
    //
    var gId = $(this).closest(".box-gripe").attr("id");
    fileUploadEdit($(this).attr("status"),gId);
    //btnGripe ();
  });

  $(".box-gripe .file-upload-source").live('click', function(){
    $(".box-gripe .file-upload-source").val('');
  });

  
  $(".form-edit-gripe .save-sett").live('click',function() {    
    var root = $(this).closest(".box-gripe");
    if ( ($(".block-gripe-update").is(".active")) && ($(".edit-photo").is(".active")) && (root.find(".save-sett").is(":not(.submitOff)") ) &&  (root.find(".save-sett").is(":not(.submitOff2)") ) ){
        
      var  ResultArray = '',
           ResultArrayE = '',
           index = 1,
           count = root.find(".list-edit-image .block-edit-image img").length;

      root.find(".list-edit-image .block-edit-image img[original]").each(function(){
          var id = $(this).attr('original'),
              txt = $(this).parent().parent().find(".ed-text").val(),
              RowValue = id + '::' + txt + ':::';
              ResultArray = ResultArray + RowValue.toString();
      })

      root.find(".list-edit-image .block-edit-image img[embed]").each(function(){
          var idE = $(this).attr('src'),
              txtE = $(this).parent().parent().find(".ed-text").val(),
              RowValueE = idE + '::' + txtE + ':::';
              ResultArrayE = ResultArrayE + RowValueE.toString();
      })


      var gId = root.attr("id");


      $.ajax({
        type: "POST",
        url: "/gripe/embed/save",
        data: {
          "idE" : gId,
          "authenticity_token": $("meta[name=csrf-token]").attr('content'),
          "ResultArrayE": ResultArrayE,
          "type": 'image'
        },
        success: function(data){
        
        }
      });


      $.ajax({
        type: "POST",
        url: "/gripe/image/update",
        data: {
          "authenticity_token": $("meta[name=csrf-token]").attr('content'),
          "id" : gId,
          "ResultArray": ResultArray
        },
        success: function(data){
          root.find(".list-edit-image").hide();
          root.find(".box-icons em").removeClass("active");
          root.find(".widget-gripe-pics, .widget-gripe-video").removeClass("db");

          root.find(".widget-gripe-pics ul").html(data);
          root.find(".ico-img").parent().addClass("active").find(".box").text(count);
          root.find(".form-edit-gripe").hide();
          root.find(".widget-gripe-pics").addClass("db");
          root.find(".btn-gripe-update, .block-gripe-update").removeClass("active");
          $.scrollTo( root , 1200 );
          $('.widget-gripe-pics a').lightBox();
          $(".media-content").each(function(){
            playerInit($(this).attr('id'));
          });          
        }
      });
    }



    if ( ($(".block-gripe-update").is(".active")) && ($(".edit-video").is(".active")) &&  (root.find(".save-sett").is(":not(.submitOff)") ) &&  (root.find(".save-sett").is(":not(.submitOff2)") ) ){
        
      var  ResultArray = '',
           ResultArrayE = '',  
           index = 1,
           count = root.find(".list-edit-video .block-edit-image img").length;

      root.find(".list-edit-video .block-edit-image img[original]").each(function(){
          var id = $(this).attr('original'),
              txt = $(this).parent().parent().find(".ed-text").val(),
              RowValue = id + '::' + txt + ':::';
              ResultArray = ResultArray + RowValue.toString();
        //$(".form-edit-gripe .ResultArray").val(ResultArray.toString());
      })

      root.find(".list-edit-video .block-edit-image img[embed]").each(function(){
          var idE = $(this).attr('link'),
              txtE = $(this).parent().parent().find(".ed-text").val(),
              RowValueE = idE + '::' + txtE + ':::';
              ResultArrayE = ResultArrayE + RowValueE.toString();
      })

     var gId = root.attr("id");

      $.ajax({
        type: "POST",
        url: "/gripe/embed/save",
        data: {
          "idE" : gId,
          "authenticity_token": $("meta[name=csrf-token]").attr('content'),
          "ResultArrayE": ResultArrayE,
          "type": 'video'
        },
        success: function(data){
        
        }
      });
      
      $.ajax({
        type: "POST",
        url: "/gripe/video/update",
        data: {
          "authenticity_token": $("meta[name=csrf-token]").attr('content'),
          "id" : gId,
          "ResultArray": ResultArray
        },
        success: function(data){
          root.find(".list-edit-video").hide();
          root.find(".box-icons em").removeClass("active");
          root.find(".widget-gripe-pics, .widget-gripe-video").removeClass("db");

          root.find(".widget-gripe-video ul").html(data);
          root.find(".ico-video").parent().addClass("active").find(".box").text(count);
          root.find(".form-edit-gripe").hide();
          root.find(".widget-gripe-video").addClass("db");
          root.find(".btn-gripe-update, .block-gripe-update").removeClass("active");
          $.scrollTo( root , 1200 );
          renderPlayer();
        }
      });
    }


  });





})

