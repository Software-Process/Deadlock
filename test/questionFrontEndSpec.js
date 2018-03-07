const chai = require('chai');
var assert = chai.assert;
var expect = require('chai').expect;

var testing = require('../public/javascripts/questionFrontEnd');
  
describe('The functions in question front end', function() {

    it('Verify function changeGreen', function(){

        expect(testing.changeGreen).to.be.a('function');
    });

    it('Verify function changeRed', function(){

        expect(testing.changeRed).to.be.a('function');
    });

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

    it('Verify function tempChangeGreen', function(){

        expect(testing.tempChangeGreen).to.be.a('function');
    });

    it('Verify function tempChangeRed', function(){

        expect(testing.tempChangeRed).to.be.a('function');
    });

    it('Verify function checkVote', function(){

        expect(testing.checkVote).to.be.a('function');
    });

    it('Verify function tempUpCookie', function(){

        expect(testing.tempUpCookie).to.be.a('function');
    });

    it('Verify function tempDownCookie', function(){

        expect(testing.tempDownCookie).to.be.a('function');
    });
    
    it('Verify function getCookie', function(){

        expect(testing.getCookie).to.be.a('function');
    });

});