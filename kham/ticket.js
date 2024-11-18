

price_option = $("#PRICE")
const currentUrl = new URL(window.location.href);
// 檢查是否包含指定參數
if (currentUrl.searchParams.has('PERFORMANCE_PRICE_AREA_ID')) {
    chrome.storage.local.get({
        kham_ticket_number: 4
    }, items => {
        // 選取 table 中的第二個 tr 的 "minus plus" 按鈕
        const $button = $("table.eventTABLE tr:nth-of-type(2) button.minus.plus");
        console.log(items.kham_ticket_number)
        if ($button.length > 0) {
            // 點擊 n 次
            for (let i = 0; i < items.kham_ticket_number; i++) {
                $button.click();
            }
        } else {
            console.log("找不到目標按鈕");
        }
    })

    chrome.storage.local.get({
        kham_auto_fill_code: false
    }, items => {
        if (items.kham_auto_fill_code) {
            const img = document.getElementById("chk_pic")
            if (img) {
                changeImg(img)
            }
        } else {
            $("#CHK").focus()
        }
    });

} else {
    PERFORMANCE_PRICE_AREA_ID = price_option.find("option").eq(1).val().split('|')
    currentUrl.searchParams.set('PERFORMANCE_PRICE_AREA_ID', PERFORMANCE_PRICE_AREA_ID[0]);
    window.location.href = currentUrl.toString();
}
console.log(currentUrl.toString())
//price_option.find("option").eq(1).prop('selected', true)
console.log(price_option.find("option").eq(1).val())
//price_option.val(price_option.find("option").eq(1).val()).change();

function changeImg(img) {
    chrome.storage.local.get({
        kham_ocr_end_point
    }, items => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        // 將圖片繪製到 Canvas 上
        ctx.drawImage(img, 0, 0);
        // 將 Canvas 內容轉換為 Base64 字串
        const base64String = canvas.toDataURL("image/png");
        console.log("Base64 編碼：", base64String);
        fetch(encodeURI(`${items.kham_ocr_end_point}?img=${base64String}`))
            .then(response => response.json())
            .then(data => {
                const result = data.result; // 假设 API 返回的 JSON 中有 result 字段
                // 填入输入框
                const inputField = document.getElementById("CHK");
                if (inputField) {
                    inputField.value = result.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
                }

                $("#LOGIN_BLOCK5 button").focus()
            });
    });
    


}

$(document).on('keydown', function (event) {
    // 檢查是否按下 Enter 鍵
    if (event.key === "Enter" || event.keyCode === 13) {
        // 模擬按下按鈕
        $("#LOGIN_BLOCK5 button").click();
    }
});