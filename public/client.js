window.onload = function(){

	$(".track").on('click', function(){
		console.log(this);
		var data = $(this).data('link');
		console.log(data);
		$.post( "/play", {"track": data});
	});

  $(".controller>.stop").on('click', function(){
    $.post("/stop", function(data){
      console.log(data);
    });
  });
}