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
    $('#equals').on('click', storePostDisplay);
    $('#clear').on('click', function () {$('#leftSide').val('');$('#rightSide').val('');});
}

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

/*

*/