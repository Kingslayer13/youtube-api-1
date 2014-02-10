require.config
    baseUrl: '/youtube-api/'
    paths:
        jquery: 'lib/jquery/jquery'
        mocha: 'lib/mocha/mocha'
        chai: 'lib/chai/chai'

    shim:
        jquery:
            exports: 'jQuery'

        mocha:
            exports: 'mocha'

tests = [
    'main'
]

tests = tests.map (test) -> 'test/' + test

require ['mocha'], (mocha) ->
    mocha.setup 'bdd'
    require tests, ->
        mocha.run()