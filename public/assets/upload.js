$(document).ready(function() {
	$("#file-upload-panel").live("submit", function(e){
    $("#progress").show();
    var uuid = $("#X-Progress-ID").val();
    setInterval(function(){
    	if(jQuery.active == 0){
    		$.ajax({
    			url: '/progress',
    			type: 'GET',
    			data: "X-Progress-ID="+uuid,
    			success: function(xhr){
    				var upload = jQuery.parseJSON(xhr.responseText);
    				if(upload.state == 'uploading'){
    					upload.percent = Math.floor((upload.received / upload.size) * 100);
    					$("#bar").update(upload.percent + '%');
    				}
    			}
    		});
    	}
    },100);
  });
});