/**
 * Created by Kingslayer on 17.02.14.
 */
define (['chai', 'youtube-api', 'jquery'], function(chai, api, $){
    var expect = chai.expect;
    var player;
    describe('Youtube api', function(){
        it('should call ready event when youtube lib is loaded', function(done){
            expect(api.YoutubePlayer).to.be.a('undefined');
            api.load();
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
                expect(api.YoutubePlayer).to.be.a('function');
                done()
            });
        });

        it('should be "iframe" element on the page ', function(){
            expect($('iframe').get(0).tagName.toLowerCase()).to.be.equal('iframe');
        });
    });

    describe('Youtube events', function(){
        it('should be div element created on player pause', function(done){

            player.on('paused', function(e){ //event on pause
                var exampleNode = '<div id="tested">'
                $('#test').append(exampleNode);
            });

            player.trigger('paused');

            expect($('#test')[0].children[0].id).to.be.equal('tested');
            done();
        });

        it('should not add div element on player pause', function(done){

            player.off('paused');

            player.trigger('paused');

            expect($('#test')[0].children.length).to.be.equal(1);
            done();
        });
    });
});

