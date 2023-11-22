// اضافه کردن رویداد کلیک به دکمه با id = "submitBtn"
document.getElementById('submitBtn').addEventListener("click", clicked);

// تعریف تابع clicked
function clicked() {
    var clfName = document.getElementById('clfName').value;
    var cPhone = document.getElementById('cPhonenumber').value;
    var cIndebt = document.getElementById('cIndebt').value;
    var cPA = document.getElementById('cPA').value;

    var customerName = document.createElement("p");
    var customerNameValue = document.createTextNode(clfName);
    customerName.appendChild(customerNameValue); 

    var customerPhone = document.createElement("p");
    var customerPhoneValue = document.createTextNode(cPhone);
    customerPhone.appendChild(customerPhoneValue);

    var customerIndebt = document.createElement("p");
    var customerIndebtValue = document.createTextNode(cIndebt);
    customerIndebt.appendChild(customerIndebtValue);

    var customerPA = document.createElement("p");
    var customerPAValue = document.createTextNode(cPA);
    customerPA.appendChild(customerPAValue);

    var element = document.getElementById('result');
    element.appendChild(customerName);
    element.appendChild(customerPhone);
    element.appendChild(customerIndebt);
    element.appendChild(customerPA);

    // دریافت داده‌های موجود در localStorage
    let retrievedData = localStorage.getItem('customersData');
    let customers = [];

    // اگر داده‌ای در localStorage وجود دارد، آن را بازیابی کنید
    if (retrievedData) {
        customers = JSON.parse(retrievedData);
    }

    // افزودن اطلاعات جدید به آرایه مشتریان
    customers.push({ name: clfName, phone: cPhone, debt: cIndebt, previousAmount: cPA });

    // ذخیره مجدد داده‌های جدید در localStorage
    localStorage.setItem('customersData', JSON.stringify(customers));

    // نمایش اطلاعات مشتریان
    displayCustomers(customers);
}

// تابع نمایش اطلاعات مشتریان
window.onload = function() {
    let retrievedData = localStorage.getItem('customersData');

    if (retrievedData) {
        let parsedData = JSON.parse(retrievedData);
        displayCustomers(parsedData);
    }
}

function displayCustomers(data) {
    let table = document.createElement("table");
    let tableHead = document.createElement("thead");
    let headerRow = document.createElement("tr");
    let headers = ["نام مشتری", "شماره تلفن", "بدهی", "حساب قبلی", "تغییر بدهی", "تغییر حساب قبلی", "حذف مشتری"]; // اضافه کردن هدر دکمه‌ها

    // ساخت سرستون‌های جدول
    headers.forEach(function(headerText) {
        let header = document.createElement("th");
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    });

    tableHead.appendChild(headerRow);
    table.appendChild(tableHead);

    // نمایش مشتریان در جدول
    data.forEach(function(customer) {
        let row = document.createElement("tr");

        for (const prop in customer) {
            let cell = document.createElement("td");
            let cellText = document.createTextNode(customer[prop]);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }

        // ساخت دکمه‌های تغییر بدهی و حساب قبلی برای هر مشتری
        let changeDebtButton = document.createElement("button");
        changeDebtButton.textContent = "تغییر بدهی";
        changeDebtButton.onclick = function() {
            changeDebt(customer); // فراخوانی تابع تغییر بدهی
        };
        let changeAccountButton = document.createElement("button");
        changeAccountButton.textContent = "تغییر حساب قبلی";
        changeAccountButton.onclick = function() {
            changeAccount(customer); // فراخوانی تابع تغییر حساب قبلی
        };

        let deleteCustomerButton = document.createElement("button");
        deleteCustomerButton.textContent = "حذف مشتری";
        deleteCustomerButton.onclick = function() {
            deleteCustomer(customer); // فراخوانی تابع حذف مشتری
        };

        let cell1 = document.createElement("td");
        cell1.appendChild(changeDebtButton);
        row.appendChild(cell1);
        let cell2 = document.createElement("td");
        cell2.appendChild(changeAccountButton);
        row.appendChild(cell2);
        let cell3 = document.createElement("td");
        cell3.appendChild(deleteCustomerButton);
        row.appendChild(cell3);

        table.appendChild(row);
    });

    let element = document.getElementById('result');
    element.innerHTML = ''; // پاک کردن محتوای قبلی
    element.appendChild(table);
}

// تابع تغییر بدهی
function changeDebt(customer) {
    let newDebt = parseInt(prompt(`بدهی جدید برای ${customer.name}:`, customer.debt), 10);
    if (!isNaN(newDebt)) {
        customer.debt = newDebt;
        updateCustomerData(customer);
    }
}

// تابع تغییر حساب قبلی
function changeAccount(customer) {
    let newAccount = parseInt(prompt(`حساب قبلی جدید برای ${customer.name}:`, customer.previousAmount), 10);
    if (!isNaN(newAccount)) {
        customer.previousAmount = newAccount;
        updateCustomerData(customer);
    }
}

// تابع بروزرسانی اطلاعات مشتری
function updateCustomerData(customer) {
    let customers = JSON.parse(localStorage.getItem('customersData'));
    customers.forEach((c, index) => {
        if (c.name === customer.name) {
            customers[index] = customer; // به روزرسانی مشتری
        }
    });
    localStorage.setItem('customersData', JSON.stringify(customers));
    displayCustomers(customers); // نمایش مجدد مشتریان بعد از به روزرسانی
}

// تابع حذف مشتری
function deleteCustomer(customer) {
    let customers = JSON.parse(localStorage.getItem('customersData'));
    let updatedCustomers = customers.filter(c => c.name !== customer.name);
    localStorage.setItem('customersData', JSON.stringify(updatedCustomers));
    displayCustomers(updatedCustomers); // نمایش مجدد مشتریان بعد از حذف
}
