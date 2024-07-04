const order = {};

function incrementCounter(button) {
    const countElement = button.nextElementSibling;
    let count = parseInt(countElement.innerText);
    count++;
    countElement.innerText = count;

    updateOrder(button, count);
}

function decrementCounter(button) {
    const countElement = button.previousElementSibling;
    let count = parseInt(countElement.innerText);
    if (count > 0) {
        count--;
        countElement.innerText = count;

        updateOrder(button, count);
    }
}

function updateOrder(button, count) {
    const foodItem = button.closest('.card');
    const foodName = foodItem.querySelector('.card-title').innerText;

    if (count > 0) {
        order[foodName] = count;
    } else {
        delete order[foodName];
    }

    displayFinalOrder();
}

function displayFinalOrder() {
    const orderList = document.getElementById('order-list');
    // orderList.innerHTML = '';

    for (const [foodName, count] of Object.entries(order)) {
        console.log(foodName, count);
        const listItem = document.createElement('li');
        listItem.innerText = `${foodName}: ${count}`;
        // orderList.appendChild(listItem);
    }
}

function sendInstructions() {
    const instructions = document.getElementById('instructions-text').value;
    let message = "Hello, Here is my order:\n";

    for (const [foodName, count] of Object.entries(order)) {
        message += `${foodName}: ${count}\n`;
    }
    if (instructions) {
        message += `Instructions: ${instructions}`;
    }

    const encodedMessage = encodeURIComponent(message);
    const num = +919910307123; // Enter the WhatsApp number here
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${num}&text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
}
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const tableNumber = urlParams.get('table');

    if (tableNumber) {
        document.getElementById('table-number').innerText = `Table Number: ${tableNumber}`;
    } else {
        document.getElementById('table-number').innerText = `Cabin Name: SIRIUS`;
    }
});
