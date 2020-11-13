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

/*
function storePostDisplay() {
    expression.left = $('#leftSide').val();
    expression.right = $('#rightSide').val();
    $.ajax({
        method: 'POST',
        url: '/calculate',
        data: expression
    })
    $.ajax({
        method: 'GET',
        url: '/calculate'
    }) .then (function(response) {
        $('#bigAnswer').empty();
        $('#bigAnswer').append(response.answer);
        $('#answers').append(response.expression);
    }) .catch (function (error) {
        console.log('Error', error);
        alert('Something Bad Happened, Try again Later');
      })
}
*/

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
        $('#bigAnswer').append(response[i].answer);
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
            $('#history').append(`<li>${objects.left} ${objects.operator} ${objects.right} = ${objects.answer}`);
        }
    }) .catch (function (error) {
        console.log('Error', error);
        alert('Something Bad Happened, Try again Later');
      })
}