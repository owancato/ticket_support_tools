

// 設定 MutationObserver 來偵測屬性變化
const observer = new MutationObserver(function (mutationsList) {
  mutationsList.forEach(function (mutation) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
      // src 變更時執行的行為
      console.log("Image source has changed!");
      changeImg()
      // 可以在這裡執行其他行為
    }
  });
});

function changeImg() {
  const imgUrl = img.src;
  fetch(imgUrl)
    .then(response => response.blob())
    .then(blob => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.split(',')[1]; // 获取 Base64 数据
        fetch(encodeURI(`http://127.0.0.1:416/?img=${base64}`))
          .then(response => response.json())
          .then(data => {
            const result = data.result; // 假设 API 返回的 JSON 中有 result 字段
            // 填入输入框
            const inputField = document.getElementById("TicketForm_verifyCode");
            if (inputField) {
              inputField.value = result;
            }
            if(result.length != 4) {
              $("#TicketForm_verifyCode-image").click();
            }
            $("#TicketForm_verifyCode").focus()
          });
      };
      reader.readAsDataURL(blob);
    });

}

if ($("#ticketPriceList select").length > 0) {
  let $ticket_options = $("#ticketPriceList select:first option");
  if ($ticket_options.length) {
    chrome.storage.local.get({
      tixcraft_ticket_number: 0
    }, items => {
      let doSelect = false;
      if (items.tixcraft_ticket_number > 0) {
        $ticket_options.each(function() {
          if ($(this).val() == items.tixcraft_ticket_number) {
            console.log("hit ticket number " + items.tixcraft_ticket_number);
            $(this).prop('selected', true);
            doSelect = true;
            return false;
          }
        });
      }
      // if ticket number can't find or last
      if (doSelect == false) {
        $ticket_options.last().prop('selected', true);
        if (items.tixcraft_ticket_number == 0) {
          console.log("hit last");
        } else {
          console.log("hit failed");
        }
      }
    });
  }
}

// ticket agree mode 1
$("#TicketForm_agree").prop('checked', true)

// please input verify code
$("#TicketForm_verifyCode").focus();

const img = document.getElementById("TicketForm_verifyCode-image");
chrome.storage.local.get({
  tixcraft_auto_fill_code: false
}, items => {
    if(items.tixcraft_auto_fill_code) {

      if (img) {
        console.log(changeImg())
      }

      // 配置 MutationObserver 的選項
      observer.observe(img, { attributes: true });
    } else {
      $("#TicketForm_verifyCode").focus()
    }
});


