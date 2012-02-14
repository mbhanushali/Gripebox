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
    				if(xhr.state == 'uploading'){
    					xhr.percent = Math.floor((xhr.received / xhr.size) * 100);
    					$("#bar").html(xhr.percent + '%');
    				}
    				else if(xhr.state == 'done'){
    					clearInterval(progress_interval);
    					$("#bar").html('100%');
    				}
    			}
    		});
    	}
    },10);
  });
});