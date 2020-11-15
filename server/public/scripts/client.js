//creates an empty object to post to server
let expression = {
    statement: null,
    answer: null
}


$(document).ready(readyNow);

function readyNow() {
    //event click handlers for the number keys
    $('.one').on('click', function() {$('#screen').val($('#screen').val()+ '1')});
    $('.two').on('click', function() {$('#screen').val($('#screen').val()+ '2')});
    $('.three').on('click', function() {$('#screen').val($('#screen').val()+ '3')});
    $('.four').on('click', function() {$('#screen').val($('#screen').val()+ '4')});
    $('.five').on('click', function() {$('#screen').val($('#screen').val()+ '5')});
    $('.six').on('click', function() {$('#screen').val($('#screen').val()+ '6')});
    $('.seven').on('click', function() {$('#screen').val($('#screen').val()+ '7')});
    $('.eight').on('click', function() {$('#screen').val($('#screen').val()+ '8')});
    $('.nine').on('click', function() {$('#screen').val($('#screen').val()+ '9')});
    $('.zero').on('click', function() {$('#screen').val($('#screen').val()+ '0')});

    //event handlers for the operators
    $('.plus').on('click', function() {$('#screen').val($('#screen').val()+ '\+');});
    $('.minus').on('click', function() {$('#screen').val($('#screen').val()+ '\-');});
    $('.times').on('click', function() {$('#screen').val($('#screen').val()+ '\*');});
    $('.divide').on('click', function() {$('#screen').val($('#screen').val()+ '\/');});

    //event handlers for equals, decimal point, and clear keys
    $('.equals').on('click', storePost);
    $('.decimalPoint').on('click', function() {$('#screen').val($('#screen').val()+ '.')}); 
    $('.clear').on('click', function() {$('#screen').val('')});
    renderHistory();
}

//Posts to the server
function storePost() {
    expression.statement = $('#screen').val();  //creates an empty string to parse the right side of the operation
    $.ajax({
        method: 'POST',
        url: '/calculate',
        data: expression
    })
    //Call functions to post to the DOM
    renderBigAnswer();
    renderHistory();
}

//renders answer to last calculaiton to the DOM
function renderBigAnswer(){
    $.ajax({
        method: 'GET',
        url: '/calculate'
    }) .then (function(response) {
        let i = response.length-1; //index location for answer to last calculation
        //append large font answer to DOM
        $('.bigAnswer').empty();
        $('.bigAnswer').css('font-size', 42);
        $('.bigAnswer').css('font-weight', 'bold');
        $('.bigAnswer').append(`<p>${response[i].answer}</p>`);
        //append answer to screen in the calculator
        $('#screen').val(`${response[i].answer}`)
    }) .catch (function (error) {
        console.log('Error', error);
        alert('Something Bad Happened, Try again Later');
      })
}


//renders calculation history to the DOM
function renderHistory(){
    $.ajax({
        method: 'GET',
        url: '/calculate'
    }) .then (function(response) {
        $('.history').empty();
        for(object of response){
            $('.history').append(`<li>${object.statement} = ${object.answer}</li>`);
        }
    }) .catch (function (error) {
        console.log('Error', error);
        alert('Something Bad Happened, Try again Later');
      })
}

