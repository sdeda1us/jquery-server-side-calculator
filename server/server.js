const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('server/public'));


let mathPhrase = [];

//GET route
app.get('/calculate', (req, res) => {
    let i = mathPhrase.length -1;
    console.log(i);
    console.log('getting calculation...');
    let answer = 0;
    if (mathPhrase[i].operator == '\+'){
        answer = Number(mathPhrase[i].left) + Number(mathPhrase[i].right)
    }
    //res.send(`<p>${answer}</p>`);
    res.send({answer: `<p>${answer}</p>`, expression: `<p>${mathPhrase[i].left} ${mathPhrase[i].operator} ${mathPhrase[i].right} = ${answer}</p>`})
});

//POST route
app.post('/calculate', (req, res) => {
    console.log('posting math pieces...');
    let postStuff = req.body;
    mathPhrase.push(postStuff);
    res.sendStatus(200);
})



app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})

