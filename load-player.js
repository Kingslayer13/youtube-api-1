    define(['youtube-api', 'jquery'], function(api, $){
        var player;
        return api.on('ready', function(){
            player = new api.YoutubePlayer('player', {
                width:   600,
                height:  400,
                videoId: 'yQlC6CfVC_g', // youtube.com/watch?v=*******
                wmode: 'transparent',
                playerVars: {
                    rel: 0,               // show related video in the end
                    wmode: 'transparent',
                    modestbranding: 1,    // turn on branding
                    autohide: 1,          // turn on auto hide of tool bar
                    showinfo: 0,          // hide info bar
                    controls: 1           // show tool bar
                }
            });

            player.on('playing', function(e){ //event on playing
                console.log('Playing');
            });

            player.off('playing'); // now previous function is not working

            player.on('playing', function(e){  //event on playing
                console.log('Playing again');
            });

            player.on('paused', function(e){ //event on pause
                console.log('Paused');
            });

            return player;
        });
    });
