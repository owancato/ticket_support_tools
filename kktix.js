
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    console.log('开始');
    await sleep(50);
    const defaultOrder = Array.from({ length: $(".ticket-unit").length }, (_, i) => i + 1);

    var plusButton;

    chrome.storage.local.get({ 
        kktix_ticket_order: "",
        kktix_ticket_number: 4
        }, function (result) {
        // 使用者設定的順序或預設順序
        var order = defaultOrder;
        if(result.kktix_ticket_order.length) {
            order = result.kktix_ticket_order.split(",").map(Number);
        }
        
        console.log(order);
        // 按照 order 查找 .btn-default.plus
        order.some(index => {
            console.log(index);
            const ticketUnit = $(".ticket-unit").eq(index - 1);
            plusButton = ticketUnit.find(".btn-default.plus");

            if (plusButton.length > 0) {
                console.log("找到按鈕:", plusButton);
                for (let i = 0; i < result.kktix_ticket_number; i++) {
                    // 点击加号按钮
                    plusButton.click(); // 或者 plusButton.trigger('click');
                }
                return true; // 跳出查找循環
            }
            
            return false; // 繼續查找
        });
    });
    /*
    // 获取包含目标 input 的父 div
    $(".ticket-unit").each(function () {
        plusButton = $(this).find(".btn-default.plus");
        if (plusButton.length > 0) {
            console.log("找到按鈕:", plusButton);
            return false; // 跳出迴圈
        }
    });*/

    // ticket agree mode 1
    $("#person_agree_terms").click()
    await sleep(50); // 延迟 2 秒

    chrome.storage.local.get({ kktix_auto_submit: false }, function (result) {
        const button = $('.form-actions.plain.align-center.register-new-next-button-area button');
        // 检查按钮是否存在
        if (button.length) {
            console.log('找到的按钮，文本:', button.text());
            console.log(result.kktix_auto_submit);
            // 判斷是否点击按钮
            if(result.kktix_auto_submit) {
                button.click();
            } else {
                button.focus()
            }
        } else {
            console.log('未找到按钮');
        }
    })
    
    console.log('结束');
}

main();