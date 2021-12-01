function formSubmit() {
    $("#word-form").submit();
}

function openGoogle() {
    const searchWord = $("#form-input").val();
    if (searchWord) {
        const url = `https://www.google.com/search?q=${searchWord}`;
        window.open(url);
    }
}

function onClick() {
    formSubmit();
    openGoogle();
}

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
            const url = `https://www.google.com/search?q=${word}`
            const wordTd = $('<td></td>')
            const wordA = $("<a></a>", {
                text: word,
                href: url
            });
            wordTd.append(wordA)


            const time = value[0]
            const timeTd = $("<td></td>", {
                text: time,
            });

            tr.append(wordTd, timeTd)
            $('#tbody').append(tr)
        })
    })
});
