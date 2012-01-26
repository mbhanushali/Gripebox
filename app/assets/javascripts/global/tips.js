function renderCheckboxAndInput(){
  
  /* form, label, input => checkbox */

  $(".tips").each(function(e) {
    defVal = $(this).attr("default");
    if ( ($(this).val() == '') ){
      if (!$(this).prev().is(".span_val"))
        $(this).before("<span class='span_val'>"+defVal+"</span>");
    }else {
      if (!$(this).prev().is(".span_val")) {
        $(this).before("<span class='span_val'>"+defVal+"</span>");
        $(this).prev().hide();
      }
    }
  });
  $(".span_val").click(function(e){
    $(this).parent().find("input.tips").focus();
    $(this).parent().find("textarea.tips").focus();
  });

  $(".tips").keyup(function(e){
    if($(this).val().length == 0){
      $(this).parent().find(".span_val").css({"display":"block"});
      }
  });
  $(".tips").keydown(function(e){
    $(this).parent().find(".span_val").css({"display":"none"});
  });
  



  $(".checkbox").each(function(el) {
      var par = $(this).parent().parent();
      if ( (par.children('.checkboxOn').is('div')) || (par.children('.checkboxOff').is('div')) ) {
      }
      else{
        var ch = $(this).attr('checked');
        if (ch) {
          $(this).wrap("<div class='checkboxOn checkboxDiv'></div>");
        }
        else {
         $(this).wrap("<div class='checkboxOff checkboxDiv'></div>");
       }
      }
    });



  $("input[type=checkbox].checkbox:checked").live('click',function(){ 
    $(this).parent().removeClass("checkboxOff").addClass("checkboxOn");
  });

  $("input[type=checkbox].checkbox:not(:checked)").live('click',function(){ 
    $(this).parent().removeClass("checkboxOn").addClass("checkboxOff");
  });

  /* $("input[type=checkbox].checkbox").live('click',function(e){
    //var ch = $(this).attr('checked');
    //alert(ch);
    if ($(this,":checked")== 'checked') {
      $(this).parent().removeClass("checkboxOff").addClass("checkboxOn");
    }
    else {
      $(this).parent().removeClass("checkboxOn").addClass("checkboxOff");
      
    }
  });
  */


   $("input[type=radio].checkbox").live('click',function(e){
    var ch = $(this).attr('checked'),
        name = $(this).attr('name');

    if (ch) {
      $(this).closest("form").find(".checkboxDiv input[name="+name+"]").parent().removeClass("checkboxOn").addClass("checkboxOff");
      $(this).parent().removeClass("checkboxOff").addClass("checkboxOn");
    }
    else {
      $(this).parent().removeClass("checkboxOn").addClass("checkboxOff");}
  });
  
  $(".gender #gender-m").before('<label class="lbl" for="gender-m">m</label>');
  $(".gender #gender-f").before('<label class="lbl" for="gender-f">f</label>');
  /* end form, label, input => checkbox */ 
}

$(document).ready(function() {
  renderCheckboxAndInput();
})