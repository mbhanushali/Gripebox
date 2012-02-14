$(document).ready(function() {
	$("#file-upload-panel").live("submit", function(e){
    $("#progress").show();
    var uuid = $("#X-Progress-ID").val();
    var progress_interval = setInterval(function(){
    	if(jQuery.active == 0){
    		$.ajax({
    			url: '/progress',
    			type: 'GET',
    			data: "X-Progress-ID="+uuid,
    			success: function(xhr){
    				var upload = xhr;
    				if(upload.state == 'uploading'){
    					upload.percent = Math.floor((upload.received / upload.size) * 100);
    					$("#bar").html(upload.percent + '%');
    					if(upload.percent >= 100){
    						clearInterval(progress_interval);
    					}
    				}
    			}
    		});
    	}
    },10);
  });
});