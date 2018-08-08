var FeedbackSD = require("../src/feedback");
var Const = require("../src/consts");
var assert = require('assert');
var jsdom = require('jsdom');
const { JSDOM } = jsdom;


var params = {
    id:'feedback2',
    endpoint: 'localhost2',
    initBtnTitle: 'ButtonText2'
};

const feedbackSD = new FeedbackSD();
Object.freeze(feedbackSD);

describe ('check constructor', function () {
    it ('initBtnTitle compare with Constant', function () {
        assert.equal(feedbackSD.params.initBtnTitle, Const.BTN_TITLE);
    });
})

describe ('checkParams', function () {
    it ('empty params', function () {
        assert.equal(feedbackSD.checkParams(), false);
    });

    it ('empty object params', function () {
        assert.equal(feedbackSD.checkParams({}), false);
    });

    it ('only id params', function () {
        assert.equal(feedbackSD.checkParams({id: 'id'}), false);
    });

    it ('only endpoint params', function () {
        assert.equal(feedbackSD.checkParams({endpoint: 'localhost'}), false);
    });

    it ('both  required params params', function () {
        assert.equal(feedbackSD.checkParams({endpoint: 'localhost', id: 'id'}), true);
    });
});

//simulate init with JSDOM
const feedbackSD2 = new FeedbackSD();
const dom2 = new JSDOM(`<!DOCTYPE html><div id="feedback2"></div>`);
Object.freeze(feedbackSD2);
feedbackSD2.init(params, dom2);

describe ('check params after init', function () {
    it ('check initBtnTitle after init', function () {
        assert.equal(feedbackSD2.params.initBtnTitle, params.initBtnTitle);
    });

    it ('check endpoint', function () {
        assert.equal(feedbackSD2.params.endpoint, params.endpoint);
    });

    it ('check id', function () {
        assert.equal(feedbackSD2.params.initDomId, params.id);
    });

    it ('compare button title in dom with title in params', function () {
        assert.equal(dom2.window.document.getElementById(params.id).textContent, params.initBtnTitle);

    });
});


//simulate loadForm with JSDOM
const dom3 = new JSDOM(`<!DOCTYPE html><div id="feedback3"></div>`);

var params3 = {
    id:'feedback3',
    endpoint: 'localhost3',
    initBtnTitle: 'ButtonText3'
};

const feedbackSD3 = new FeedbackSD();
Object.freeze(feedbackSD3);
feedbackSD3.init(params3, dom3);
feedbackSD3.loadForm(dom3);

describe ('check dom after load form', function () {
    it ('compare label of form name wirh const', function () {
        assert.equal(dom3.window.document.getElementById('nameFeedbackFormLabel').textContent, Const.FORM_NAME);
    });
});



