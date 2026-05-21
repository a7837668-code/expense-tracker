// ======================= DOM ELEMENTS =======================

const expenseName = document.querySelector("#expName");
const expenseAmount = document.querySelector("#expAmount");
const expenseDate = document.querySelector("#expDate");
const expenseButton = document.querySelector("#addExp");

const ownerName = document.querySelector("#ownerName");
const petrolCost = document.querySelector("#cost");
const destination = document.querySelector("#destination");
const addPetrol = document.querySelector("#petrolEnteryButton");
const petrolDate = document.querySelector("#date");

const petrolButton = document.querySelector("#petrolPageBtn");
const expenseButtons = document.querySelector("#expensePageBtn");
const studentPageBtn = document.querySelector("#studentPageBtn");

const petrolSection = document.querySelector("#petrolSection");
const expenseSection = document.querySelector("#expenseSection");
const studentSection = document.querySelector("#studentSection");

const initialAmount = document.querySelector("#initialExpense");

const totalCard = document.querySelector("#greenCard");
const totalPetrol = document.querySelector("#totalPetrol");
const totalEntriesCard = document.querySelector("#totalEntries");
const spentAmountCard = document.querySelector("#spent");

const totalExpensesPara = document.querySelector("#totalExpensesPara");
const petroCostpara = document.querySelector("#petroCostpara");
const entriesPara = document.querySelector("#entriesPara");

const expenseTable = document.querySelector("#expenseTable");
const petrolBody = document.querySelector("#petrolBody");

const studentName = document.querySelector("#studentName");
const studentFee = document.querySelector("#studentFee");
const studentDate = document.querySelector("#studentDate");
const addStudentBtn = document.querySelector("#addStudentBtn");
const studentBody = document.querySelector("#studentBody");

// ======================= CLASSES =======================

class Expense {
  constructor(name, amount, date) {
    this.name = name;
    this.amount = amount;
    this.date = date;
  }
}

class Petrol {
  constructor(name, cost, destination, date) {
    this.name = name;
    this.cost = cost;
    this.destination = destination;
    this.date = date;
  }
}

class Student {
  constructor(name, fee, date) {
    this.name = name;
    this.fee = fee;
    this.date = date;
  }
}

// ======================= MAIN APP CLASS =======================

class ExpenseTracker {
  constructor() {
    this.expenses = [];
    this.petrol = [];
    this.students = [];

    this.loadData();
  }

  // ================= EXPENSE METHODS =================

  addExpense(expense) {
    this.expenses.push(expense);

    this.renderExpenses();
    this.updateCards();
    this.saveData();
  }

  renderExpenses() {
    expenseTable.innerHTML = "";

    this.expenses.forEach((item, index) => {
      let row = document.createElement("tr");

      row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.amount}</td>
                <td>${item.date}</td>
                <td>
                    <button onclick="tracker.deleteExpense(${index})">
                        Delete
                    </button>
                </td>
            `;

      expenseTable.appendChild(row);
    });
  }

  deleteExpense(index) {
    this.expenses.splice(index, 1);

    this.renderExpenses();
    this.updateCards();
    this.saveData();
  }

  // ================= PETROL METHODS =================

  addPetrol(petrolObj) {
    this.petrol.push(petrolObj);

    this.renderPetrol();
    this.updateCards();
    this.saveData();
  }

  renderPetrol() {
    petrolbody.innerHTML = "";

    let total = 0;

    this.petrol.forEach((item, index) => {
      let row = document.createElement("tr");

      row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.cost}</td>
                <td>${item.destination}</td>
                <td>${item.date}</td>
                <td>
                    <button onclick="tracker.deletePetrol(${index})">
                        Delete
                    </button>
                </td>
            `;

      petrolbody.appendChild(row);

      total += Number(item.cost);
    });

    totalPetrol.innerHTML = `
            Petrol Cost <br> Rs ${total}
        `;
  }

  deletePetrol(index) {
    this.petrol.splice(index, 1);

    this.renderPetrol();
    this.updateCards();
    this.saveData();
  }

  // ================= STUDENT METHODS =================

  addStudent(student) {
    this.students.push(student);

    this.renderStudents();
    this.updateCards();
    this.saveData();
  }

  renderStudents() {
    studentBody.innerHTML = "";

    this.students.forEach((item, index) => {
      let row = document.createElement("tr");

      row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.fee}</td>
                <td>${item.date}</td>
                <td>
                    <button onclick="tracker.deleteStudent(${index})">
                        Delete
                    </button>
                </td>
            `;

      studentBody.appendChild(row);
    });
  }

  deleteStudent(index) {
    this.students.splice(index, 1);

    this.renderStudents();
    this.updateCards();
    this.saveData();
  }

  // ================= UPDATE CARDS =================

  updateCards() {
    let expenseTotal = 0;
    let petrolTotal = 0;

    this.expenses.forEach((item) => {
      expenseTotal += Number(item.amount);
    });

    this.petrol.forEach((item) => {
      petrolTotal += Number(item.cost);
    });

    let totalSpent = expenseTotal + petrolTotal;

    let totalEntries =
      this.expenses.length + this.petrol.length + this.students.length;

    spentAmountCard.innerHTML = `
            Total Spent <br> Rs ${totalSpent}
        `;

    totalExpensesPara.innerHTML = `
            Total Expenses: Rs ${initialAmount.value}
        `;

    petroCostpara.innerHTML = `
            Petrol Cost: Rs ${petrolTotal}
        `;

    entriesPara.innerHTML = `
            Entries: ${totalEntries}
        `;

    totalEntriesCard.innerHTML = `
            Total Entries <br> ${totalEntries}
        `;

    totalCard.innerHTML = `
            Total Expenses <br> Rs ${initialAmount.value}
        `;
  }

  // ================= LOCAL STORAGE =================

  saveData() {
    localStorage.setItem("expenses", JSON.stringify(this.expenses));

    localStorage.setItem("petrol", JSON.stringify(this.petrol));

    localStorage.setItem("students", JSON.stringify(this.students));

    localStorage.setItem("initialAmount", initialAmount.value);
  }

  loadData() {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];

    const savedPetrol = JSON.parse(localStorage.getItem("petrol")) || [];

    const savedStudents = JSON.parse(localStorage.getItem("students")) || [];

    const savedInitialAmount = localStorage.getItem("initialAmount");

    this.expenses = savedExpenses;
    this.petrol = savedPetrol;
    this.students = savedStudents;

    if (savedInitialAmount) {
      initialAmount.value = savedInitialAmount;
    }

    this.renderExpenses();
    this.renderPetrol();
    this.renderStudents();
    this.updateCards();
  }
}

// ======================= OBJECT =======================

const tracker = new ExpenseTracker();

// ======================= EVENT LISTENERS =======================

// expense section show

expenseButtons.addEventListener("click", () => {
  petrolSection.style.display = "none";
  studentSection.style.display = "none";
  expenseSection.style.display = "block";
});

// petrol section show

petrolButton.addEventListener("click", () => {
  expenseSection.style.display = "none";
  studentSection.style.display = "none";
  petrolSection.style.display = "block";
});

// student section show

studentPageBtn.addEventListener("click", () => {
  expenseSection.style.display = "none";
  petrolSection.style.display = "none";
  studentSection.style.display = "block";
});

// add expense

expenseButton.addEventListener("click", () => {
  const expense = new Expense(
    expenseName.value,
    expenseAmount.value,
    expenseDate.value,
  );

  tracker.addExpense(expense);

  expenseName.value = "";
  expenseAmount.value = "";
  expenseDate.value = "";
});

// add petrol

addPetrol.addEventListener("click", () => {
  const petrol = new Petrol(
    ownerName.value,
    petrolCost.value,
    destination.value,
    petrolDate.value,
  );

  tracker.addPetrol(petrol);

  ownerName.value = "";
  petrolCost.value = "";
  destination.value = "";
  petrolDate.value = "";
});

// add student

addStudentBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const student = new Student(
    studentName.value,
    studentFee.value,
    studentDate.value,
  );

  tracker.addStudent(student);

  studentName.value = "";
  studentFee.value = "";
  studentDate.value = "";
});

// initial amount save

initialAmount.addEventListener("input", () => {
  tracker.updateCards();
  tracker.saveData();
});
