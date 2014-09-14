$(function() {

    $('#search').on('click', function() {
        $('#result').empty();

        //csvの読み込み
        var csvData = [];
        $.get('csvData/bunka_kouen_meisho.csv')
            .done(function(data) {
            
                $.parse(data, {
                    delimiter: "\n",
                    header: false,
                    dynamicTyping: true,
                    preview: 1935,
                    step: function(data, file, inputElem) {
                        csvData.push(data.results[0]);
                    }
                });

                //1935個のデータを全部読み込むとかなり動作がもたつくのでとりあえず300個取ってきてます
                for (var i = 1; i <= 20; i++){
                        $('#result').append(i + '<p>施設名(かな)：' + csvData[i][4] + '</p><p>X座標：' + csvData[i][0] + '</p><p>Y座標：' + csvData[i][1]);
                        x_pos[i-1] = csvData[i][1];
                        y_pos[i-1] = csvData[i][0];
                }
                loadflg = true;
            })

            .fail(function(data) {
                console.log('error');
            });
    });
});