window.onload = function(){

	$(".track").on('click', function(){
		console.log(this);
		var data = $(this).data('link');
		console.log(data);
		$.post( "/play", {"track": data});
	});

  $(".playlist").on('click', function(){
    var index = $(this).parent().parent()[0].rowIndex; //Get the playlist index
      $.get( "/playlists?index=" + index, function(data){
      document.open();
      document.write(data);
      document.close();
    });
  });

}