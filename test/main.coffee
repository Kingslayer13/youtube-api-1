define ['chai', 'youtube-api'], ({expect}, api) ->

    describe 'Youtube api', ->
        it 'should call ready event when youtube lib is loaded', (done)->
            expect(api.YoutubePlayer).to.be.a 'undefined'
            api.load()
            api.on 'ready', ->
                expect(api.YoutubePlayer).to.be.a 'function'
                done()

