const addButton = document.getElementById("addButton");
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const submitButton = document.querySelector(".submit-transaction");
const input = document.querySelectorAll("input");

const transactionDate = document.querySelector(".transaction-date");
const transactionAmount = document.querySelector(".transaction-amount");
const transactionDescription = document.querySelector(".transaction-description");
const transactionType = document.querySelector(".transaction-type");

let transactionList = [];

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal));

function toggleModal() {
    modalContainer.classList.toggle("active");
}

submitButton.addEventListener("click", addTransaction);
submitButton.addEventListener("click", toggleModal);

function addTransaction(e) {
    e.preventDefault();
    const transaction = {
        date: document.getElementById('date').value,
        amount: document.getElementById('amount').value,
        description: document.getElementById('description').value,
        type: document.getElementById('type').value
    }
    transactionList.push(transaction);
    saveTransaction();
    // Effacer les éléments existants pour éviter la duplication
    clearTransactionElements();

    // Ajouter toutes les transactions à la liste
    transactionList.forEach(dataList => {
        let spanDate = document.createElement("span");
        let spanAmount = document.createElement("span");
        let spanDescription = document.createElement("span");
        let spanType = document.createElement("span");

        spanDate.innerHTML += dataList.date;
        spanAmount.innerHTML += dataList.amount;
        spanDescription.innerHTML += dataList.description;
        spanType.innerHTML += dataList.type;

        transactionDate.appendChild(spanDate);
        transactionAmount.appendChild(spanAmount);
        transactionDescription.appendChild(spanDescription);
        transactionType.appendChild(spanType);
    });
    clearValues();
}

function saveTransaction() {
    for (let i = 0; i < transactionList.length; i++) {
        for (let key in transactionList[i]) {
            if (transactionList[i][key] === "") {
                return;
            }
            
        }
    }
    localStorage.setItem("transactionList", JSON.stringify(transactionList));
}

function loadTransactions() {
    const savedTransaction = localStorage.getItem("transactionList");
    if (savedTransaction) {
        transactionList = JSON.parse(savedTransaction);
        addTransaction(new Event("dummy")); // Utilisez un événement fictif pour ajouter les transactions au DOM
    }
}

function clearValues() {
    input.forEach(input => (input.value = ""));
}

function clearTransactionElements() {
    // Effacer tous les éléments enfants des conteneurs de transactions
    transactionDate.innerHTML = "";
    transactionAmount.innerHTML = "";
    transactionDescription.innerHTML = "";
    transactionType.innerHTML = "";
}

loadTransactions();






























