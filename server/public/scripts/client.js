let expression = {
    left: null,
    right: null,
    operator: null
}

$(document).ready(readyNow);

function readyNow() {
    //event handlers
    $('#plus').on('click', function() {expression.operator = '\+'; console.log(expression)} );
    $('#minus').on('click', function() {expression.operator = "\-"; console.log(expression)});
    $('#times').on('click', function() {expression.operator = "\*"; console.log(expression)});
    $('#divide').on('click', function() {expression.operator = "\/"; console.log(expression)});
    $('#equals').on('click', storeThenPost);
    $('#clear').on('click', function () {$('#leftSide').val('');$('#rightSide').val('');});
}

function storeThenPost() {
    expression.left = $('#leftSide').val();
    expression.right = $('#rightSide').val();
    console.log(expression);
}