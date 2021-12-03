// フォームを送信する
function formSubmit() {
    $("#word-form").submit();
}

// Googleの検索欄を開く
function openGoogle() {
    const searchWord = $("#form-input").val();
    const url = `https://www.google.com/search?q=${searchWord} とは`;
    window.open(url);
}

// 「送信」ボタンを押したときの動作
function onClick() {
    const searchWord = $("#form-input").val();
    if (searchWord) {
        formSubmit();
        openGoogle();
    }
}

// フォームの回答をtableに転記する
$(async function () {
    const sheetId = "1S6AIMQn1g1oX4va__mO0SdPrt4iFLoTUJFZKRHUD91M";
    const sheetName = "フォームの回答 1";
    const apiKey = "AIzaSyBh6fWBIDR8nZvucod3Fe77Ro4Hd3xtjO8";
    const jsonUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;
    await $.getJSON(jsonUrl, function (data) {
        const wordList = data.values.slice(1);
        wordList.forEach(function (value) {
            const tr = $('<tr></tr>')

            const word = value[1]
            const url = `https://www.google.com/search?q=${word} とは`
            const wordTd = $('<td></td>')
            const wordA = $("<a></a>", {
                text: word,
                href: url
            });
            wordTd.append(wordA)


            const firstTime = value[0]
            const firstTimeTd = $("<td></td>", {
                text: firstTime,
            });

            const lastTimeTd = $('<td></td>', {
                text: "-"
            })

            tr.append(wordTd, firstTimeTd, lastTimeTd)
            $('#tbody').append(tr)
        })
    })
});
