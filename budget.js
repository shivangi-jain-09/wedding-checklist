document.addEventListener("DOMContentLoaded", function () {
    // Get DOM elements
    var budgetInput = document.getElementById("budget-input");
    var setBudgetButton = document.getElementById("budget-button");
    var nameInput = document.getElementById("name-input");
    var amountInput = document.getElementById("amount-input");
    var dateInput = document.getElementById("date-input");
    var addButton = document.getElementById("add-button");
    var addedItemTable = document.getElementById("added-item");
    var expenseTrackerTable = document.getElementById("expense-tracker");

    // Event listener for setting budget
    setBudgetButton.addEventListener("click", function () {
        var budget = parseFloat(budgetInput.value) || 0;
        displayBudget(budget);
    });

    // Event listener for adding transaction
    addButton.addEventListener("click", function () {
        var name = nameInput.value;
        var amount = parseFloat(amountInput.value) || 0;
        var date = dateInput.value;

        if (name && amount && date) {
            addTransaction(name, date, amount);
            updateExpenseTracker();
            clearInputFields();
        } else {
            alert("Please fill in all fields.");
        }
    });

    // Event delegation for removing and editing a transaction
    addedItemTable.addEventListener("click", function (event) {
        var target = event.target;
        if (target.classList.contains("remove-button")) {
            removeTransaction(target.closest("tr"));
            updateExpenseTracker();
        } else if (target.classList.contains("edit-button")) {
            editTransaction(target.closest("tr"));
            updateExpenseTracker();
        }
    });

    // Function to add a new transaction to the table
    function addTransaction(name, date, amount) {
        var newRow = document.createElement("tr");
        newRow.className = "data";
        newRow.innerHTML = `
            <th>${name}</th>
            <td>${date}</td>
            <td>${amount}</td>
            <td><button class="edit-button">Edit</button></td>
            <td><button class="remove-button">Remove</button></td>
        `;
        addedItemTable.appendChild(newRow);
    }

    // Function to remove a transaction from the table
    function removeTransaction(row) {
        addedItemTable.removeChild(row);
    }

    // Function to edit a transaction in the table
    function editTransaction(row) {
        var name = row.children[0].innerText;
        var date = row.children[1].innerText;
        var amount = row.children[2].innerText;

        var newName = prompt("Enter new transaction name:", name);
        var newDate = prompt("Enter new date:", date);
        var newAmount = prompt("Enter new amount:", amount);

        if (newName !== null && newDate !== null && newAmount !== null) {
            row.children[0].innerText = newName;
            row.children[1].innerText = newDate;
            row.children[2].innerText = newAmount;
        }
    }

    // Function to update the expense tracker
    function updateExpenseTracker() {
        var totalBudget = parseFloat(budgetInput.value) || 0;
        var spentMoney = calculateSpentMoney();

        var trackerRow = document.createElement("tr");
        trackerRow.innerHTML = `
            <td>${totalBudget}</td>
            <td>${spentMoney}</td>
            <td>${totalBudget - spentMoney}</td>
        `;

        // Remove the previous row if it exists
        if (expenseTrackerTable.rows.length > 1) {
            expenseTrackerTable.deleteRow(1);
        }

        expenseTrackerTable.appendChild(trackerRow);
    }

    // Function to calculate the total spent money
    function calculateSpentMoney() {
        var rows = addedItemTable.querySelectorAll("tr.data");
        var spentMoney = 0;

        rows.forEach(function (row) {
            spentMoney += parseFloat(row.children[2].innerText) || 0;
        });

        return spentMoney;
    }

    // Function to display the budget
    function displayBudget(budget) {
        var trackerRow = document.createElement("tr");
        trackerRow.innerHTML = `
            <td>${budget}</td>
            <td>0</td>
            <td>${budget}</td>
        `;

        // Remove the previous row if it exists
        if (expenseTrackerTable.rows.length > 1) {
            expenseTrackerTable.deleteRow(1);
        }

        expenseTrackerTable.appendChild(trackerRow);
    }

    // Function to clear input fields
    function clearInputFields() {
        nameInput.value = "";
        amountInput.value = "";
        dateInput.value = "";
    }
});
