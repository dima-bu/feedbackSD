let feedbackSD = {
    initDomId: '',
    endpoit: '',
    initBtn: null,
    initBtnTitle: 'Feedback',
    checkParams(params) {
        if (params && params.id) {
            this.initDomId = params.id;
        } else {
            console.log('check id');
        }

        if (params && params.initBtnTitle) {
            this.initBtnTitle = params.initBtnTitle;
        }

        if (params && params.endpoit) {
            this.endpoit = params.endpoit;
            return true;
        } else {
            console.log('check endpoit');
        }

        return false;
    },
    getFormTemplate() {
        var html = [
            '<div>',
            '<label>Имя</label>',
            '<input type="text" id="nameFeedbackForm" name="name"/>',
            '</div>',
            '<div>',
            '<label>Электронная почта</label>',
            '<input type="text" id="emailFeedbackForm" name="email"/>',
            '</div>',
            '<div>',
            '<label>Ошибка</label>',
            '<textarea name="textError" cols="40" rows="3"></textarea>',
            '</div>',
            '<input type="submit" id="formSubmit" value="Отправить ошибку"/>',
        ].join('');
        return html;
    },
    init(params) {
        if (this.checkParams(params)) {
            const initDom = document.getElementById(params.id);
            if (initDom) {
                this.initBtn = document.createElement('button');
                this.initBtn.setAttribute('buttonId', '');
                this.initBtn.innerHTML = this.initBtnTitle;
                initDom.appendChild(this.initBtn);
                this.initOnClick();
            }

        } else {
            console.log('Not initialized');
        }
    },
    initOnClick() {
        this.initBtn.onclick = this.loadForm.bind(this);
    },
    initFormClick() {
        const submitBtn = document.getElementById('formSubmit');
        submitBtn.onclick = this.sendForm.bind(this);
    },
    sendForm() {
        let reqObject = {};

        reqObject = this.getFormValues();

        let xhr = new XMLHttpRequest();
        let body = 'name=' + encodeURIComponent(reqObject.name) +
            '&surname=' + encodeURIComponent(reqObject.email);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.open('POST', this.endpoit, true);
        xhr.send(body);
        return false;
    },
    getFormValues() {
        const nameFeedbackForm = document.getElementById('nameFeedbackForm').value;
        const emailFeedbackForm = document.getElementById('emailFeedbackForm').value;
        if (nameFeedbackForm && emailFeedbackForm) {
            return {name: nameFeedbackForm, email: emailFeedbackForm};
        }
        return {name: '', email: ''};
    },

    loadForm() {
        let formWrapper = document.createElement('form');
        formWrapper.innerHTML = this.getFormTemplate();
        let initDom = document.getElementById(this.initDomId);
        initDom.appendChild(formWrapper);
        this.initFormClick();
    }
};

window.feedbackSD = feedbackSD;
