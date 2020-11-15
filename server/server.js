const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('server/public'));


let mathPhrase = [];

//GET route
app.get('/calculate', (req, res) => {
    let historyArray = [];
    console.log('getting calculation...');
    for (objects of mathPhrase){
        let answer = 0;
        if (objects.operator == '\+'){
            answer = Number(objects.left) + Number(objects.right)
        }else if (objects.operator == '\-'){
            answer = Number(objects.left) - Number(objects.right)
        }else if(objects.operator == '\*'){
            answer = Number(objects.left) * Number(objects.right)
        }else if (objects.operator == '\/'){
            if(objects.right == '0'){
                answer = undefined;
            }else {
                answer = (Number(objects.left) / Number(objects.right)).toFixed(2);
            }
        }
        historyArray.push({
            left: objects.left,
            right: objects.right,
            operator: objects.operator,
            answer: answer
        })
    }
    res.send(historyArray);
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

