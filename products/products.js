document.getElementById('submitProductBtn').addEventListener("click", addProduct);

function addProduct() {
    var productName = document.getElementById('productName').value;
    var productPrice = document.getElementById('productPrice').value;
    var productInventory = document.getElementById('productInventory').value;

    var table = document.getElementById('productResult');
    var newRow = table.insertRow(-1);

    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);

    cell1.innerHTML = productName;
    cell2.innerHTML = productPrice;
    cell3.innerHTML = productInventory;

    let retrievedData = localStorage.getItem('productsData');
    let products = [];

    if (retrievedData) {
        products = JSON.parse(retrievedData);
    }

    products.push({ name: productName, price: productPrice, inventory: productInventory });
    localStorage.setItem('productsData', JSON.stringify(products));
    displayProducts(products);
}

window.onload = function() {
    let retrievedData = localStorage.getItem('productsData');

    if (retrievedData) {
        let parsedData = JSON.parse(retrievedData);
        displayProducts(parsedData);
    }
}

function displayProducts(data) {
    let table = document.createElement("table");
    let tableHead = document.createElement("thead");
    let headerRow = document.createElement("tr");
    let headers = ["نام محصول", "قیمت", "موجودی در انبار", "تغییر موجودی", "حذف محصول"]; // اضافه کردن هدر دکمه

    headers.forEach(function(headerText) {
        let header = document.createElement("th");
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    });

    tableHead.appendChild(headerRow);
    table.appendChild(tableHead);

    data.forEach(function(product) {
        let row = document.createElement("tr");

        for (const prop in product) {
            let cell = document.createElement("td");
            let cellText = document.createTextNode(product[prop]);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }

        let changeInventoryButton = document.createElement("button");
        changeInventoryButton.textContent = "تغییر موجودی";
        changeInventoryButton.onclick = function() {
            changeInventory(product);
        };
        let changeInventoryCell = document.createElement("td");
        changeInventoryCell.appendChild(changeInventoryButton);
        row.appendChild(changeInventoryCell);

        let deleteProductButton = document.createElement("button");
        deleteProductButton.textContent = "حذف محصول";
        deleteProductButton.onclick = function() {
            deleteProduct(product);
        };
        let deleteProductCell = document.createElement("td");
        deleteProductCell.appendChild(deleteProductButton);
        row.appendChild(deleteProductCell);

        table.appendChild(row);
    });

    let element = document.getElementById('productResult');
    element.innerHTML = '';
    element.appendChild(table);
}

function deleteProduct(product) {
    let products = JSON.parse(localStorage.getItem('productsData'));
    let updatedProducts = products.filter(p => p.name !== product.name);
    localStorage.setItem('productsData', JSON.stringify(updatedProducts));
    displayProducts(updatedProducts);
}

function changeInventory(product) {
    let newInventory = parseInt(prompt(`موجودی جدید برای ${product.name}:`, product.inventory), 10);
    if (!isNaN(newInventory)) {
        product.inventory = newInventory;
        let products = JSON.parse(localStorage.getItem('productsData'));
        products.forEach((p, index) => {
            if (p.name === product.name) {
                products[index] = product;
            }
        });
        localStorage.setItem('productsData', JSON.stringify(products));
        displayProducts(products);
    }
}
