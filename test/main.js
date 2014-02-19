/**
 * Created by Kingslayer on 17.02.14.
 */
define (['chai', 'youtube-api', 'jquery'], function(chai, api, $){
    var expect = chai.expect;
    var player;
    var eventTriggered;

    describe('Youtube api', function(){
        it('should call ready event when youtube lib is loaded', function(done){
            expect(api.YoutubePlayer).to.be.a('undefined');
            api.load();
            api.on('ready', function(){
                expect(api.YoutubePlayer).to.be.a('function');
                done();
            });
        });

        it('should be "iframe" element on the page ', function(){
            expect($('iframe').get(0).tagName.toLowerCase()).to.be.equal('iframe');
        });
    });

    describe('Youtube events', function(){

        api.on('ready', function(){
            player = new api.YoutubePlayer('player', {
                width:   600,
                height:  400,
                videoId: 'yQlC6CfVC_g',
                wmode: 'transparent',
                playerVars: {
                    rel: 0,
                    wmode: 'transparent',
                    modestbranding: 1,
                    autohide: 1,
                    showinfo: 0,
                    controls: 1
                }
            });
        });

        it('should be "player" to be object', function(){
            expect(player).to.be.a('object');
        });

        it('should trigger pause event', function(){

            player.on('paused', function(e){ //event on pause
                eventTriggered = true;
            });

            player.trigger('paused');

            expect(eventTriggered).to.be.true;
            eventTriggered = false;
        });

        it('should not react on pause event', function(){

            player.on('playing', function(e){ //event on pause
                eventTriggered = true;
            });

            player.off('playing');

            player.trigger('playing');

            expect(eventTriggered).to.be.false;
        });
    });
});

