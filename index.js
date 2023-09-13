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
const menuButton = document.querySelector("#menu-button");
const menuContainer = document.querySelectorAll(".menu");
const overlayMenu = document.querySelector(".overlay-menu");
let balanceAmount = 0;

transactionBin.addEventListener("click", (event) => {
    const binElement = event.target;
    const transactionId = binElement.id;
    const transactionIndex = transactions.findIndex(transaction => transaction.id === parseInt(transactionId));
    if (transactionIndex !== -1) {
        const removedTransaction = transactions.splice(transactionIndex, 1)[0];
        balanceAmount -= parseFloat(removedTransaction.amount);
        if (balanceAmount >= 0) {
            balance.textContent = `${balanceAmount.toFixed(2)}€`;
        } else {
            balance.textContent = `-${Math.abs(balanceAmount).toFixed(2)}€`;
        }

        const transactionElements = document.querySelectorAll(`[id="${transactionId}"]`);
        for (const transactionElement of transactionElements) {
            transactionElement.remove();
        }

        saveTransactions();
        renderTransactions();
    }
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

menuButton.addEventListener("click" , () => {
    menuContainer.forEach(container => container.classList.toggle("active"));
});

menuButton.addEventListener("click" , () => {
    overlayMenu.classList.toggle("active");
});

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
        binElement.setAttribute("id", transaction.id);
        binElement.classList= "bin-element"
        binElement.textContent = "Delete";
        transactionBin.appendChild(binElement);
    }
    if (balanceAmount >= 0) {
        balance.textContent = `${balanceAmount.toFixed(2)}€`;
    } else {
        balance.textContent = `${balanceAmount.toFixed(2)}€`;
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
        dateElement.setAttribute("id", transaction.id);
        amountElement.setAttribute("id", transaction.id);
        descriptionElement.setAttribute("id", transaction.id);
        typeElement.setAttribute("id", transaction.id);
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
    const id = transactions.length;

    balanceAmount += parseFloat(amount);
    if (balanceAmount >= 0) {
        balance.textContent = `${balanceAmount.toFixed(2)}€`;
    } else {
        balance.textContent = `${balanceAmount.toFixed(2)}€`;
    }

    // Crée une nouvelle transaction
    const transaction = {date, amount, description, type, id};
    
    addTransaction(transaction);

    const binElement = document.createElement("span");
    binElement.setAttribute("id", transaction.id);
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
