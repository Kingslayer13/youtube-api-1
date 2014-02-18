/**
 * Created by Kingslayer on 17.02.14.
 */
define (['chai', 'youtube-api', 'jquery', 'load-player'], function(chai, api, $, player){
    var expect = chai.expect;
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

        it('should be "player" to be object', function(done){
            api.on('ready', function(){
                expect(player).to.be.a('object');
                done();
            });

        })
    });


});

