var express = require('express'),
    cons = require('consolidate'),
    app = express(),
    spotify = require('node-spotify')({ appkeyFile: 'spotify_appkey.key' });

/* GLOBALS */
var playlists;
var playlist
var tracks;
var track;
var logged_in = false;

// assign the mustache engine to .html files
app.engine('html', cons.mustache);

// set .html as the default extension 
app.set('view engine', 'html');

app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

app.use(express.bodyParser());

// test mustache
app.get('/', function(req, res){
  if(logged_in){
    res.redirect('playlists');
  }else{
    res.render('login', '');
  }
});

app.get('/playlists', function(req, res){
  var pl = req.param('index');
  console.log(pl);
  if(pl){
    playlist = playlists[pl];
    tracks = playlist.getTracks();
    res.render('tracks', {'tracks': tracks, 'playlist': playlist})
  }else{
    playlists = spotify.getPlaylists();
    for(var i = 0; i < playlists.length; i++){
      playlists[i]['index'] = i;
    }
    res.render('playlists', {'playlists': playlists});
  }
});

app.post('/play', function(req, res){
      console.log("Received body data:");
      console.log(req.body.track.toString());
      var track = spotify.createFromLink(req.body.track);
      spotify.player.play(track);
});

app.post('/stop', function(req, res){
      console.log("stopping music");
      spotify.player.stop();
      res.send("music stopped");
});

app.post('/login', function(req, res){
  var user = req.body.user;
  var password = req.body.password;
  spotify.login(user, password, true, false);
  spotify.ready(function(){
    logged_in = true;
    res.redirect('../');
  })
});


app.listen(4000);