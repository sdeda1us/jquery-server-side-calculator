const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('server/public'));


let mathPhrase = [];

//GET route
app.get('/calculate', (req, res) => {
    console.log('getting calculation...');
    for (object of mathPhrase){
        let answer = 0;
        if (object.statement.includes('\+')){
            let mathParts = object.statement.split('+');
            object.answer = Number(mathParts[0]) + Number(mathParts[1]);
        }else if (object.statement.includes('\-')){
            let mathParts = object.statement.split('-');
            object.answer = Number(mathParts[0]) - Number(mathParts[1]);
        }else if(object.statement.includes('\*')){
            let mathParts = object.statement.split('*');
            object.answer = Number(mathParts[0]) * Number(mathParts[1]);
        }else if (object.statement.includes('\/')){
            let mathParts = object.statement.split('/');
            if(mathParts[1] == '0'){
                answer = undefined;
            }else{
                object.answer = Number(mathParts[0]) / Number(mathParts[1]);
            }
        }
    }
    res.send(mathPhrase);
});

//POST route
app.post('/calculate', (req, res) => {
    console.log('posting math pieces...');
    let postStuff = req.body;
    mathPhrase.push(postStuff);
    res.sendStatus(200);
})



app.listen(process.env.PORT || PORT, () => {
  console.log ('Server is running on port', PORT)
})

