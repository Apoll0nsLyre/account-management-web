const modalContainer = document.querySelector(".modal-container");
const transactionForm = modalContainer.querySelector("form");
const transactionListElement = document.querySelector(".grid-transaction");
const transactionDate = document.querySelector(".transaction-date");
const transactionAmount = document.querySelector(".transaction-amount");
const transactionDescription = document.querySelector(".transaction-description");
const transactionType = document.querySelector(".transaction-type");
const addButton = document.getElementById("addButton");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const balance = document.querySelector(".balance-amount");
let balanceAmount = 0;

function deleteTransaction(e) {
    const transaction = e.target.parentElement;
}


function updateBalance() {
    for (const transaction of transactions) {
        balanceAmount += parseInt(transaction.amount);
    }
    if (balanceAmount >= 0) {
        balance.textContent = `+${balanceAmount}€`;
    }else {
        balance.textContent = `-${balanceAmount}€`;
    }
}

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal));

function toggleModal() {
    modalContainer.classList.toggle("active");
}

let transactions = [];

// Charge les transactions enregistrées dans le localStorage
function loadTransactions() {
    const savedTransactions = localStorage.getItem("transactions");
    if (savedTransactions) {
        transactions = JSON.parse(savedTransactions);
        renderTransactions();
    }
    updateBalance();
}

// Enregistre les transactions dans le localStorage
function saveTransactions() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Ajoute une transaction à la liste des transactions
function addTransaction(transaction) {
    transactions.push(transaction);
    saveTransactions();
    renderTransactions();
}

// Affiche les transactions dans le DOM
function renderTransactions() {
    // Efface les transactions existantes
    clearTransactionElements();

    // Ajoute chaque transaction à la liste
    for (const transaction of transactions) {
        const dateElement = document.createElement("span");
        dateElement.textContent = transaction.date;
        transactionDate.appendChild(dateElement);

        const amountElement = document.createElement("span");
        amountElement.textContent = transaction.amount;
        transactionAmount.appendChild(amountElement);

        const descriptionElement = document.createElement("span");
        descriptionElement.textContent = transaction.description;
        transactionDescription.appendChild(descriptionElement);

        const typeElement = document.createElement("span");
        typeElement.textContent = transaction.type;
        transactionType.appendChild(typeElement);
    }
}

// Gère la soumission du formulaire de transaction
transactionForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Récupère les valeurs du formulaire
    const date = transactionForm.elements.date.value;
    const amount = transactionForm.elements.amount.value;
    const description = transactionForm.elements.description.value;
    const type = transactionForm.elements.type.value;

    // Crée une nouvelle transaction
    const transaction = { date, amount, description, type };
    addTransaction(transaction);

    // Réinitialise le formulaire
    transactionForm.reset();
    toggleModal();
});

// Efface les éléments de transaction existants dans le DOM
function clearTransactionElements() {
    while (transactionDate.firstChild) {
        transactionDate.firstChild.remove();
    }

    while (transactionAmount.firstChild) {
        transactionAmount.firstChild.remove();
    }

    while (transactionDescription.firstChild) {
        transactionDescription.firstChild.remove();
    }

    while (transactionType.firstChild) {
        transactionType.firstChild.remove();
    }
}

// Charge les transactions enregistrées au démarrage de la page
loadTransactions();