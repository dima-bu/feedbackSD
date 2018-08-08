## feedbackSD - javascript plugin for simple feedback form for any sites

### Basic Usage without NPM
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
