/**
 * Created by Kingslayer on 17.02.14.
 */
require.config({
    baseUrl: '/youtube-api-1/',
    paths:{
        jquery: 'lib/jquery/dist/jquery',
        mocha: 'lib/mocha/mocha',
        chai: 'lib/chai/chai'
    },
    shim:{
        jquery:{
            exports: 'jQuery'
        },
        mocha:{
            exports: 'mocha'
        }
    }
});

tests = [
    'main'
];

tests = tests.map(function(test){
    return 'test/' + test;
});

require (['mocha'], function(mocha){
    mocha.setup('bdd');

    require (tests, function(){
        mocha.run()
    });
});


