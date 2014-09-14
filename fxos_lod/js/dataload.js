$(function() {

    $('#search').on('click', function() {
        $('#result').empty();

        $.ajax({
            url: 'csvData/data.csv',
            type: 'get',
            dataType:'text',
            async: false
        })
        .success(function(data) {
            var lines = data.split(",EOF");
            for (var i = 1; i < lines.length ; i++) {
                console.log(lines[i]);
            }
        })
        .error(function(e) {
            console.log('error!');
        });
    });
});