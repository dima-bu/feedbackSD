const Const = require("../src/consts");

class FeedbackSD {
    constructor() {
        this.params = {
            initDomId:'',
            endpoint : '',
            initBtn : null,
            initBtnTitle : Const.BTN_TITLE,
            doc: {},
            isInit: false
        };
    }

    checkParams(params) {

        if (params && params.id) {
            this.params.initDomId = params.id;
        } else {
            console.log('check id');
            return false;
        }

        if (params && params.initBtnTitle) {
            this.params.initBtnTitle = params.initBtnTitle;
        }

        if (params && params.endpoint) {
            this.params.endpoint = params.endpoint;
        } else {
            console.log('check endpoint');
            return false;
        }

        return true;
    }

    getFormTemplate() {
        var html = [
            '<div class="fbSD_form_wrapper">',
            '<a id="closeBtn" class="close_btn">X</a>',
            '<div>',
            '<label id="nameFeedbackFormLabel">'+Const.FORM_NAME+'</label>',
            '<input type="text" id="nameFeedbackForm" name="name"/>',
            '</div>',
            '<div>',
            '<label>' + Const.FORM_EMAIL + '</label>',
            '<input type="text" id="emailFeedbackForm" name="email"/>',
            '</div>',
            '<div>',
            '<label>' + Const.FORM_TEXT + '</label>',
            '<textarea name="textError" id="textFeedbackForm" rows="3"></textarea>',
            '</div>',
            '<button type="submit" id="formSubmit">'+ Const.FORM_BTN +'</button>',
            '</div>',
        ].join('');
        return html;
    }

    init(params, dom) {

        if (dom) {
            this.params.doc = dom.window.document;
        } else {
            this.params.doc = window.document;
        }

        if (this.checkParams(params)) {
            const initDom = this.params.doc.getElementById(params.id);
            if (initDom) {
                this.params.initBtn = this.params.doc.createElement('button');
                //.setAttribute('buttonId', 'buttonId');
                this.params.initBtn.innerHTML = this.params.initBtnTitle;
                initDom.appendChild(this.params.initBtn);
                this.initOnBtnClick();
            }

        } else {
            console.log('Not initialized');
        }
    }

    initOnBtnClick() {
        this.params.initBtn.onclick = this.loadForm.bind(this);
    }


    initOnFormClick() {
        const submitBtn = this.params.doc.getElementById('formSubmit');
        submitBtn.onclick = this.sendForm.bind(this);
    }

    getFormValues() {
        const nameFeedbackForm = document.getElementById('nameFeedbackForm').value;
        const emailFeedbackForm = document.getElementById('emailFeedbackForm').value;
        const textFeedbackForm = document.getElementById('textFeedbackForm').value;

        if (nameFeedbackForm && textFeedbackForm) {
            return {
                name: nameFeedbackForm,
                email: emailFeedbackForm ? emailFeedbackForm  : '',
                text: textFeedbackForm};
        }

        return {name: '', email: '', text: ''};
    }

    sendForm(e, req) {

        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        let reqObject = {};

        if (!reqObject) {
            reqObject = req;
        } else {
            reqObject = this.getFormValues();
        }

        reqObject = this.getFormValues();

        let xhr = new XMLHttpRequest();
        let body = 'name=' + encodeURIComponent(reqObject.name) +
            '&email=' + encodeURIComponent(reqObject.email)+
            '&text=' + encodeURIComponent(reqObject.text);

        xhr.open('POST', this.params.endpoint, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(body);
        return false;
    }

    initEndPoint(endpoint){
        this.params.endpoint = endpoint;
    }

    loadForm() {
        if (this.params.isInit === true) {
            return false;
        }
        let formWrapper = this.params.doc.createElement('form');
        formWrapper.setAttribute('id', 'formId');
        formWrapper.innerHTML = this.getFormTemplate();
        let initDom = this.params.doc.getElementById(this.params.initDomId);
        initDom.appendChild(formWrapper);
        this.initOnFormClick();
        this.initOnCloseClick();
        this.params.isInit = true;
    }

    initOnCloseClick() {
        const closeBtn = this.params.doc.getElementById('closeBtn');
        closeBtn.onclick = this.closeForm.bind(this);
    }

    closeForm(){
        const formNode = this.params.doc.getElementById('formId');
        while (formNode.hasChildNodes()) {
            formNode.removeChild(formNode.lastChild);
        }
        formNode.remove();
        this.params.isInit = false;
    }
}

module.exports = FeedbackSD;
