feedbackSD - javascript plugin for simple feedback form for any sites

### Basic Usage without NPM

[Live demo](dima-bu.github.io/feedback-sd/index.html)

1) аdd sript tag to head section of html

```html
<head>
    <meta charset="UTF-8">
    <title>Строительный двор</title>
    <script src="./feedbackSD.min.js"></script>
</head>
```

2) init in end of body section

```html

<script>
  feedbackSD.init({id:'feedbackID', endpoin: 'localhost'})
</script>


## params for init function
```
| Param          	     | Type               | Description                         | Required  | Defalt value  |
|------------------------|--------------------|------------------------------------ | --------- |-------------- |
| id 	                 | string 	          | id of an element for appending form | True      |               |
| endpoin 	             | string 	          | url for sending json with form data | True      |               |
| btnTitle 	             | string 	          | text for feeddback btn              | False     | 'Feedback'    |


### Basic Usage with NPM (React example)


```javascript
 npm install feedback-sd
```

```javascript
import React from 'react';
import feedbackSD from 'feedback-sd';

class Form extends React.Component {

  constructor(props) {
    super(props);
    feedbackSD.initEndPoint('localhost')
    this.state = {name: '', email: '', text: ''};
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    feedbackSD.sendForm(event, {name: this.state.name, email: this.state.email, text: this.state.text})
    event.preventDefault();
  }

  handleChangeName(event) {
    this.setState({name: event.target.value});
  }

  handleChangeEmail(event) {
    this.setState({email: event.target.value});
  }

  handleChangeText(event) {
    this.setState({text: event.target.value});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.name} onChange={this.handleChangeName} />
        <input type="text" value={this.state.email} onChange={this.handleChangeEmail} />
        <input type="text" value={this.state.text} onChange={this.handleChangeText} />
        <button onClick={this.handleSubmit}>Отправить форму</button>
      </form>
    );
  }
}

export default Form;
```


### Development mode



```javascript
git clone https://github.com/dima-bu/feedbackSD.git
cd ./feedbackSD
npm i
npm install -g json-server
npm run live
npm run server
```

Open in browser http://localhost:9000
After send form you cah show result in file example/db.json
