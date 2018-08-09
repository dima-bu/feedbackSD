import FeedbackSD from '../src/feedback';
import Const from '../src/consts';
import jsdom from 'jsdom';

const {JSDOM} = jsdom;

const params = {
    id: 'feedback2',
    endpoint: 'localhost2',
    initBtnTitle: 'ButtonText2'
};

const feedbackSD = new FeedbackSD();
Object.freeze(feedbackSD);

test('CheckboxWithLabel changes the text after click', () => {
    expect(feedbackSD.params.initBtnTitle).toEqual(Const.BTN_TITLE);
});

test('empty params', () => {
    expect(feedbackSD.checkParams()).toBeFalsy();
    expect(feedbackSD.checkParams({})).toBeFalsy();
});


test('only id params', () => {
    expect(feedbackSD.checkParams({id: 'id'})).toBeFalsy();
});

test('only endpoint params', () => {
    expect(feedbackSD.checkParams({endpoint: 'localhost'})).toEqual(false);
});

test('both  required params params', () => {
    expect(feedbackSD.checkParams({endpoint: 'localhost', id: 'id'})).toEqual(true);
});

//simulate init with JSDOM

const feedbackSD2 = new FeedbackSD();
const dom2 = new JSDOM(`<!DOCTYPE html><div id="feedback2"></div>`);
Object.freeze(feedbackSD2);
feedbackSD2.init(params, dom2);

test('check initBtnTitle after init', () => {
    expect(feedbackSD2.params.initBtnTitle).toEqual(params.initBtnTitle);
});

test('check endpoint', () => {
    expect(feedbackSD2.params.endpoint).toEqual(params.endpoint);
});

test('check id', () => {
    expect(feedbackSD2.params.initDomId).toEqual(params.id);
});

test('compare button title in dom with title in params', () => {
    expect(dom2.window.document.getElementById(params.id).textContent).toEqual(params.initBtnTitle);
});


// //simulate loadForm with JSDOM
const dom3 = new JSDOM(`<!DOCTYPE html><div id="feedback3"></div>`);

const params3 = {
    id: 'feedback3',
    endpoint: 'localhost3',
    initBtnTitle: 'ButtonText3'
};

const feedbackSD3 = new FeedbackSD();
Object.freeze(feedbackSD3);
feedbackSD3.init(params3, dom3);
feedbackSD3.loadForm(dom3);

test('compare label of form name with const', () => {
    expect(dom3.window.document.getElementById('nameFeedbackFormLabel').textContent).toEqual(Const.FORM_NAME);
});
