function AlertTimeClose () {
  setTimeout(function(){
    $(".alert-message").parent().remove();
  }, 6000);
};

function CloseAlert() {
  $(".alert-message .close").live('click',function(){
    $(this).parent().parent().parent().remove();
    return false;
  });
};

function ScrollAlert() {


    var offset = $(".alert-message").offset();
    $(window).scroll(function() {
      if ($(window).scrollTop() > offset.top) {
        $(".alert-message").stop().css({marginTop: $(window).scrollTop() - offset.top });
      }
      else {$(".alert-message").stop().css({marginTop: 0});};});


};

function ScrollAlertPosition () {

      if ($(window).scrollTop() > $(".alert-message").offset().top) {
        $(".alert-message").stop().css({marginTop: $(window).scrollTop() - $(".alert-message").offset().top });
      }
      else {$(".alert-message").stop().css({marginTop: 0});};
};

$(document).ready(function() {

  $(".alert-message").each(function() {
    CloseAlert();
    AlertTimeClose();
    ScrollAlert();

  setTimeout(function(){
    $(".main.alerts.cl .close").click();
  }, 1000);

  });

  

})