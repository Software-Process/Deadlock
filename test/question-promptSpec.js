var sinon = require('sinon');
const chai = require('chai');
var assert = chai.assert;
var expect = require('chai').expect;

var testing = require('../public/javascripts/question-prompt');
  
describe('The functions in question-propmpt', function() {

    it('Verify function checkFilled', function(){

        expect(testing.checkFilled).to.be.a('function');
    });

    it('Verify function clear', function(){

        expect(testing.clear).to.be.a('function');
    });

});
