const chai = require('chai');
var assert = chai.assert;
var expect = require('chai').expect;

var testing = require('../public/javascripts/questionFrontEnd');
  
describe('The functions in question front end', function() {

    it('Verify function changeGreen1', function(){

        expect(testing.changeGreen1).to.be.a('function');
    });

    it('Verify function changeRed1', function(){

        expect(testing.changeRed1).to.be.a('function');
    });

    it('Verify function accept', function(){

        expect(testing.accept).to.be.a('function');
    });

    it('Verify function reject', function(){

        expect(testing.reject).to.be.a('function');
    });

    it('Verify function frontEndSubmit', function(){

        expect(testing.frontEndSubmit).to.be.a('function');
    });

    it('Verify function questionChangeGreen', function(){

        expect(testing.questionChangeGreen).to.be.a('function');
    });

    it('Verify function questionChangeRed', function(){

        expect(testing.questionChangeRed).to.be.a('function');
    });

    it('Verify function checkVote', function(){

        expect(testing.checkVote).to.be.a('function');
    });

    it('Verify function questionUpCookie', function(){

        expect(testing.questionUpCookie).to.be.a('function');
    });

    it('Verify function questionDownCookie', function(){

        expect(testing.questionDownCookie).to.be.a('function');
    });
    
    it('Verify function getCookie', function(){

        expect(testing.getCookie).to.be.a('function');
    });

});