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
const transactionBin = document.querySelector(".transaction-bin");
const deleteAllButton = document.querySelector(".delete-all");
let balanceAmount = 0;

transactionBin.addEventListener("click", (event) => {
    const binElement = event.target;
    const transactionId = binElement.id;
    const elemDelete = transactions.splice(transactionId, 1)[0].amount;
    balanceAmount -= parseFloat(elemDelete);
    if (balanceAmount >= 0) {
        balance.textContent = `${balanceAmount.toFixed(2)}€`;
    } else {
        balance.textContent = `-${balanceAmount.toFixed(2)}€`;
    }
    binElement.remove();
    saveTransactions();
    renderTransactions();
});


deleteAllButton.addEventListener("click", () => {
    // Supprimez toutes les transactions
    transactions = [];
    balanceAmount = 0;
    balance.textContent = balanceAmount.toFixed(2) ;
    document.querySelectorAll(".bin-element").forEach(e => e.remove());
    clearTransactionElements();
    saveTransactions();
    renderTransactions();
    loadTransactions();
});

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
    for (const transaction of transactions) {
        balanceAmount += parseFloat(transaction.amount);

        const binElement = document.createElement("span");
        binElement.classList= "bin-element"
        binElement.textContent = "Delete";
        transactionBin.appendChild(binElement);
    }
    if (balanceAmount >= 0) {
        balance.textContent = `${balanceAmount.toFixed(2)}€`;
    } else {
        balance.textContent = `-${balanceAmount.toFixed(2)}€`;
    }
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
        dateElement.classList= "transaction-element"
        dateElement.textContent = transaction.date;
        transactionDate.appendChild(dateElement);

        const amountElement = document.createElement("span");
        amountElement.classList= "transaction-element"
        amountElement.textContent = transaction.amount;
        transactionAmount.appendChild(amountElement);

        const descriptionElement = document.createElement("span");
        descriptionElement.classList= "transaction-element"
        descriptionElement.textContent = transaction.description;
        transactionDescription.appendChild(descriptionElement);

        const typeElement = document.createElement("span");
        typeElement.classList= "transaction-element"
        typeElement.textContent = transaction.type;
        transactionType.appendChild(typeElement);

        // donnez une id à chaque transaction
        const transactionId = transactions.indexOf(transaction);
        dateElement.setAttribute("id", transactionId);
        amountElement.setAttribute("id", transactionId);
        descriptionElement.setAttribute("id", transactionId);
        typeElement.setAttribute("id", transactionId);
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
    
    balanceAmount += parseFloat(amount);
    if (balanceAmount >= 0) {
        balance.textContent = `${balanceAmount.toFixed(2)}€`;
    } else {
        balance.textContent = `-${balanceAmount.toFixed(2)}€`;
    }

    // Crée une nouvelle transaction
    const transaction = { date, amount, description, type};
    
    addTransaction(transaction);

    const binElement = document.createElement("span");
    binElement.setAttribute("id", transactions.indexOf(transaction));
    binElement.classList= "bin-element"
    binElement.textContent = "Delete";
    transactionBin.appendChild(binElement);

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
