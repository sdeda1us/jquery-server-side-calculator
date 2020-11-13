let expression = {
    left: null,
    right: null,
    operator: null
}

$(document).ready(readyNow);

function readyNow() {
    //event handlers
    $('#plus').on('click', function() {expression.operator = '\+';} );
    $('#minus').on('click', function() {expression.operator = "\-";});
    $('#times').on('click', function() {expression.operator = "\*";});
    $('#divide').on('click', function() {expression.operator = "\/";});
    $('#equals').on('click', storePost);
    $('#clear').on('click', function () {$('#leftSide').val('');$('#rightSide').val('');});
    renderHistory();
}


//Posts to the server
function storePost() {
    expression.left = $('#leftSide').val();
    expression.right = $('#rightSide').val();
    $.ajax({
        method: 'POST',
        url: '/calculate',
        data: expression
    })
    renderBigAnswer();
    renderHistory();
}

//renders answer to last calculaiton to the DOM
function renderBigAnswer(){
    $.ajax({
        method: 'GET',
        url: '/calculate'
    }) .then (function(response) {
        let i = response.length-1;
        $('#bigAnswer').empty();
        $('#bigAnswer').css('font-size', 42);
        $('#bigAnswer').css('font-weight', 'bold');
        $('#bigAnswer').append(`<p>${response[i].answer}</p>`);
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
        for(objects of response){
            $('#history').append(`<li>${objects.left} ${objects.operator} ${objects.right} = ${objects.answer}</li>`);
        }
    }) .catch (function (error) {
        console.log('Error', error);
        alert('Something Bad Happened, Try again Later');
      })
}

