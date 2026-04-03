
if (localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = 'login.html';
}

let transactions = [];

// Page load
loadData();
updateSummary();
renderList();
document.getElementById('date').valueAsDate = new Date();

// ADD
function addTransaction() {
    const desc = document.getElementById('desc').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;

    if (!desc || !amount || amount <= 0 || !date) {
        alert('Please fill all fields!');
        return;
    }

    transactions.push({
        id: Date.now().toString(),
        desc, amount, type, category, date
    });

    saveData();
    updateSummary();
    renderList();

    document.getElementById('desc').value = '';
    document.getElementById('amount').value = '';
}

// DELETE ONE
function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    saveData();
    updateSummary();
    renderList();
}

// RESET ALL
function resetAll() {
    if (confirm('All transactions will be deleted. Are you sure?')) {
        transactions = [];
        saveData();
        updateSummary();
        renderList();
    }
}

// UPDATE SUMMARY
function updateSummary() {
    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expense;

    document.getElementById('balance').textContent = '₹' + balance.toLocaleString('en-IN');
    document.getElementById('total-income').textContent = '₹' + income.toLocaleString('en-IN');
    document.getElementById('total-expense').textContent = '₹' + expense.toLocaleString('en-IN');
}

// RENDER LIST
function renderList() {
    const list = document.getElementById('list');

    if (transactions.length === 0) {
        list.innerHTML = '<p style="text-align:center; color:#6b6b8a; padding:20px;">No transactions yet!</p>';
        return;
    }

    list.innerHTML = transactions.slice().reverse().map(t => `
        <div style="background:#1a1a2e; border:1px solid #2a2a45; border-radius:12px; padding:14px 16px; display:flex; justify-content:space-between; align-items:center;">
            <div>
                <div style="font-size:14px; font-weight:bold; color:#e8e8f0;">${t.desc}</div>
                <div style="font-size:12px; color:#6b6b8a; margin-top:4px;">${t.category} · ${t.date}</div>
            </div>
            <div style="display:flex; align-items:center; gap:12px;">
                <span style="font-size:15px; font-weight:bold; color:${t.type === 'income' ? '#1D9E75' : '#D85A30'};">
                    ${t.type === 'income' ? '+' : '-'}₹${t.amount.toLocaleString('en-IN')}
                </span>
                <button onclick="deleteTransaction('${t.id}')" style="width:auto; padding:4px 10px; margin-top:0; background:transparent; border:1px solid #2a2a45; border-radius:6px; color:#6b6b8a; cursor:pointer;">✕</button>
            </div>
        </div>
    `).join('');
}

// SAVE TO LOCALSTORAGE
function saveData() {
    localStorage.setItem('expenseTracker', JSON.stringify(transactions));
}

// LOAD FROM LOCALSTORAGE
function loadData() {
    const saved = localStorage.getItem('expenseTracker');
    if (saved) transactions = JSON.parse(saved);
}