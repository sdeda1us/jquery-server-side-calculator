const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('server/public'));


let stringMathPhrase = [];

//GET route
app.get('/calculate', (req, res) => {
    console.log('getting calculation...');
    res.send(stringMathPhrase);
});

//POST route
app.post('/calculate', (req, res) => {
    console.log('posting math pieces...');
    let postStuff = req.body;
    stringMathPhrase.push(postStuff);
    res.sendStatus(200);
})

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})

