function showImgNews(tab) {
  $(".viewer-info, .viewer-media").hide();
  $(".viewer-preview li").removeClass("active");

   $(".viewer-preview li img[rel='"+tab+"']").parent().addClass("active");

  $(".viewer-info[rel='"+tab+"'], .viewer-media[rel='"+tab+"']").fadeIn();
}

function initNewsPlayer(elem_id,source,image){
  $(".newsvideo").each(function(){
    jwplayer(elem_id).setup({
      'id': 'playerID',
      'width': '411',
      'height': '255',
      'file': source,
      'image': image,
      'skin': '/assets/ccn_skin.xml',
      'modes': [
          //{type: 'html5'},
          {type: 'flash', src: '/assets/player.swf'},
      ],
      'autostart': 'false',
    });
  });
}


$(document).ready(function() {  

  $("ul.viewer-preview li:first").addClass("active");
  $(".viewer-info:first, .viewer-media:first").show();


  $(".viewer-preview li img").click(function() {
    tab = $(this).attr('rel');
    showImgNews (tab);
    initNewsPlayer($(this).attr("elem_id"),$(this).attr("source"),$(this).attr("image"));
  });

  $(".viewer-preview li img:first").click();

});