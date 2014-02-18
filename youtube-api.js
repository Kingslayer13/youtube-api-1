define(['jquery'], function ($) {

    var win = $(window),
        calls = $('<div>');

    var api = {
        load: function () {
            calls.trigger('start-load');
        },
        on: function (event, callback) {
            calls.on(event, callback);
        },
        off: function (event, callback) {
            calls.off(event, callback);
        }
    };

    api.on('start-load', function () {
        if (window.onYouTubeIframeAPIReady) {
            calls.on('ready', window.onYouTubeIframeAPIReady);
        }

        window.onYouTubeIframeAPIReady = function () {
            calls.trigger('ready');
        };

        $('<script src="https://www.youtube.com/iframe_api">').appendTo('head');
    });

    api.on('ready', function () {
        function YoutubePlayer(container, options) {
            options.events = {
                onStateChange: function(){}
            };
            window.YT.Player.call(this, container, options);
        }

        YoutubePlayer.prototype = Object.create(window.YT.Player.prototype);
        YoutubePlayer.prototype.constructor = YoutubePlayer;

        YoutubePlayer.prototype.on = function (event, callback) {
            this.addEventListener('onStateChange', function (e){
                if(! e){
                    return event;
                }
                if(e.data == YT.PlayerState[event.toUpperCase()] ){
                    return callback();
                }
            });
        };

        YoutubePlayer.prototype.off = function (event) {
            var player = this;
            for(var i = 0; i < player.g.a.length; i++){
                if(typeof player.g.a[i] == "function"){
                    if(player.g.a[i]() == event){
                        player.g.a[i] = function(){
                            return;
                        };
                    }
                }
            }
        };

        YoutubePlayer.prototype.trigger = function(event){
            var player = this;

        };

        api.YoutubePlayer = YoutubePlayer;

    });

    api.on('ready', function () {
        $(window).trigger('youtube-api-ready', [api]);
    });

    return api;
});