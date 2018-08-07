var feedback =  {
    newDiv: null,
    initDomId: '',
    checkParams(params){
      if(params && params.id) {
        this.initDomId = params.id;
        return true;
      }
      return false;
    },
    getFormTemplate(){
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
    initDomFunc(params){
      if (this.checkParams(params)){
        const initDom = document.getElementById(params.id);
        if (initDom) {
          this.newDiv = document.createElement('button');
          this.newDiv.setAttribute("buttonId","");
          this.newDiv.innerHTML = 'Получить форму!';
          initDom.appendChild(this.newDiv);
          this.initOnClick();
        }
      } else {
        console.log('Проверьте правильность параметров при инициализации функуии')
      }
    },
    initOnClick(){
      this.newDiv.onclick = this.loadForm.bind(this);
    },
    initFormClick(){
      const submitBtn = document.getElementById('formSubmit');
      submitBtn.onclick = this.sendForm.bind(this);
    },
    sendForm(req){
      let reqObject = {};

      reqObject = this.getFormValues();


      var xhr = new XMLHttpRequest();
      var body = 'name=' + encodeURIComponent(reqObject.name) +
        '&surname=' + encodeURIComponent(reqObject.email);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

      xhr.open('POST', 'localhost', true);
      xhr.send(body);
      return false;

    },
    getFormValues(e){
      debugger;
      const nameFeedbackForm = document.getElementById('nameFeedbackForm').value;
      const emailFeedbackForm = document.getElementById('emailFeedbackForm').value;
      if (nameFeedbackForm && emailFeedbackForm) {
        return {name: nameFeedbackForm, email: emailFeedbackForm}
      }
      return {name: '', email: ''}
    },

    loadForm(){
      let formWrapper = document.createElement('form');
      formWrapper.innerHTML = this.getFormTemplate();
      let initDom = document.getElementById(this.initDomId);
      initDom.appendChild(formWrapper);
      this.initFormClick();
    }
};

window.feedback = feedback;
