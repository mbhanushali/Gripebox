$(document).ready(function() {
	$("#file-upload-panel").live("submit", function(e){
    var block_edit_image = $(".block-edit-image:first .progress");
    $("#progressbar").progressbar();
    block_edit_image.progressbar();
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
    					block_edit_image.progressbar("option","value",xhr.percent);
    					$("#progressbar").progressbar("option","value",xhr.percent);
    				}
    				else if(xhr.state == 'done'){
    					clearInterval(progress_interval);
    					block_edit_image.progressbar("option","value",100);
    					$("#progressbar").progressbar("option","value",xhr.percent);
    				}
    			}
    		});
    	}
    },10);
  });
});