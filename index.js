// フォームを送信する
async function formSubmit() {
    await $("#word-form").submit();
}

// Googleの検索欄を開く
function openGoogle(searchWord) {
    const url = `https://www.google.com/search?q=${searchWord} とは`;
    window.open(url);
}

// 「送信」ボタンを押したときの動作
function onClick() {
    const searchWord = $("#form-input").val();
    if (searchWord) {
        formSubmit();
        openGoogle(searchWord);
        $("#form-input").val('');
    }
}

// フォームの回答をtableに転記する
$(async function () {
    const sheetId = "1S6AIMQn1g1oX4va__mO0SdPrt4iFLoTUJFZKRHUD91M";
    const sheetName = "フォームの回答 1";
    const apiKey = "AIzaSyBh6fWBIDR8nZvucod3Fe77Ro4Hd3xtjO8";
    const jsonUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;
    await $.getJSON(jsonUrl, async function (data) {
        const wordList = data.values.slice(1);
        wordList.forEach(function (value) {
            const tr = $("<tr></tr>");

            const word = value[1];
            const wordTd = $("<td></td>", {
                text: word,
                class: "learned-word link-primary text-decoration-underline",
            });

            const firstTime = value[0];
            const firstTimeTd = $("<td></td>", {
                text: firstTime,
            });

            const lastTimeTd = $("<td></td>", {
                text: "-",
                class: "last-time",
            });

            writeLastTime(word, lastTimeTd);

            tr.append(wordTd, firstTimeTd, lastTimeTd);
            $("#tbody").append(tr);
        });
    });
});

// 復習リンクをクリックしたときの動作
$(document).on("click", ".learned-word", function () {
    // フォームのinputに転記
    const word = $(this).text();
    $("#review-word").val(word);

    // フォームを送信
    $("#review-form").submit();

    // 検索ページを開く
    const url = `https://www.google.com/search?q=${word} とは`;
    window.open(url);
});

// 復習記録をtableに転記
async function writeLastTime(learnedWord, lastTimeElem) {
    const sheetId = "1S6AIMQn1g1oX4va__mO0SdPrt4iFLoTUJFZKRHUD91M";
    const sheetName = "復習記録";
    const apiKey = "AIzaSyBh6fWBIDR8nZvucod3Fe77Ro4Hd3xtjO8";
    const jsonUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;
    await $.getJSON(jsonUrl, function (data) {
        // 先頭は見出しなのでそれ以外を抽出
        const reviewList = data.values.slice(1);

        // 表中の各単語に対して、復習記録内に合致する単語を検索
        $.each(reviewList, function (_, value) {
            const word = value[1];
            if (word == learnedWord) {
                const time = value[0];
                // 最終復習日を記入
                lastTimeElem.text(time);
                // breakと同じ役割
                return false;
            }
        });
    });
}
