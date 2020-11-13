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
    $('#equals').on('click', storeThenPost);
    $('#clear').on('click', function () {$('#leftSide').val('');$('#rightSide').val('');});
}

function storeThenPost() {
    expression.left = $('#leftSide').val();
    expression.right = $('#rightSide').val();
    $.ajax({
        method: 'POST',
        url: '/calculate',
        data: expression
    })
}