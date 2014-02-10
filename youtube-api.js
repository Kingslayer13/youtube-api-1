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
        function YoutubePlayer() {
            window.YT.Player.call(this);
        }

        YoutubePlayer.prototype = Object.create(window.YT.Player.prototype);
        YoutubePlayer.prototype.constructor = YoutubePlayer;

        YoutubePlayer.prototype.on = function () {

        };

        YoutubePlayer.prototype.off = function () {

        };

        api.YoutubePlayer = YoutubePlayer;
    });

    api.on('ready', function () {
        $(window).trigger('youtube-api-ready', [api]);
    });

    return api;
});