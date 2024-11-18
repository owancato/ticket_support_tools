document.getElementById("save_kktix_option").addEventListener("click", function () {
    var kktix_ticket_order = document.getElementById("kktix_ticket_order").value;
    var kktix_auto_submit = document.getElementById('kktix_auto_submit').checked;
    var tselect = document.getElementById('kktix_ticket_number');
    var kktix_ticket_number = tselect.options[tselect.selectedIndex].value;
    chrome.storage.local.set({ 
        kktix_ticket_order,
        kktix_auto_submit,
        kktix_ticket_number
    }, function () {
        console.log("順序已儲存:", kktix_ticket_order);
    });
    alert("已儲存")
});

document.getElementById('project_select').addEventListener('change', function () {
    const kktixOptions = document.getElementById('kktix_options');
    const tixcraftOptions = document.getElementById('tixcraft_options');
    const khamOptions = document.getElementById('kham_options');
    if (this.value === 'kktix') {
        kktixOptions.style.display = 'block';
        khamOptions.style.display = 'none';
        tixcraftOptions.style.display = 'none';
    } else if (this.value === 'tixcraft') {
        kktixOptions.style.display = 'none';
        khamOptions.style.display = 'none';
        tixcraftOptions.style.display = 'block';
    } else if (this.value === 'kham'){
        kktixOptions.style.display = 'none';
        tixcraftOptions.style.display = 'none';
        khamOptions.style.display = 'block';
    }
  });

document.getElementById("save_tixcraft_option").addEventListener("click", function () {
    var tixcraft_show_certain_area = document.getElementById('tixcraft_show_certain_area').checked;
    var tixcraft_show_area_name = document.getElementById('tixcraft_show_area_name').value;
    var tselect = document.getElementById('tixcraft_ticket_number');
    var tixcraft_ticket_number = tselect.options[tselect.selectedIndex].value;
    var tixcraft_auto_fill_code = document.getElementById('tixcraft_auto_fill_code').checked;

    chrome.storage.local.set({ 
        tixcraft_show_certain_area, 
        tixcraft_show_area_name,
        tixcraft_ticket_number,
        tixcraft_auto_fill_code
    }, function () {
        console.log("已儲存:", tixcraft_ticket_number);
    });
    alert("已儲存")
});

document.getElementById("save_kham_option").addEventListener("click", function () {
    var kham_show_certain_area = document.getElementById('kham_show_certain_area').checked;
    var kham_show_area_name = document.getElementById('kham_show_area_name').value;
    var kham_ocr_end_point = document.getElementById('kham_ocr_end_point').value;
    var tselect = document.getElementById('kham_ticket_number');
    var kham_ticket_number = tselect.options[tselect.selectedIndex].value;
    var kham_auto_fill_code = document.getElementById('kham_auto_fill_code').checked;

    chrome.storage.local.set({ 
        kham_show_certain_area, 
        kham_show_area_name,
        kham_ticket_number,
        kham_auto_fill_code,
        kham_ocr_end_point
    }, function () {
        console.log("已儲存:", kham_ticket_number);
    });
    alert("已儲存")
});

// Restores select box and checkbox state using the preferences stored in browser.storage.
function restore_options() {
    chrome.storage.local.get({
        tixcraft_show_certain_area: false,
        tixcraft_show_area_name: "",
        tixcraft_ticket_number: false,
        tixcraft_auto_fill_code: false,
        kktix_ticket_order: "",
        kktix_auto_submit: false
    }).then(items => {
        // console.log(items);
        document.getElementById('tixcraft_ticket_number').selectedIndex = items.tixcraft_ticket_number;
        document.getElementById('tixcraft_auto_fill_code').checked = items.tixcraft_auto_fill_code;
        document.getElementById('tixcraft_show_certain_area').checked = items.tixcraft_show_certain_area;
        document.getElementById('tixcraft_show_area_name').value = items.tixcraft_show_area_name;

        document.getElementById('kktix_ticket_order').value = items.kktix_ticket_order;
        document.getElementById('kktix_auto_submit').checked = items.kktix_auto_submit;
        document.getElementById('kktix_ticket_number').selectedIndex = items.kktix_ticket_number;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);