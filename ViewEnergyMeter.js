let currentPower = 0; // Global variable to hold the current power value
let incrementInterval; // Variable to store the interval ID
let initialBalance = 500;
let currentBalance = initialBalance;

async function fetchData() {
    try {
        // Fetch power data
        const powerResponse = await fetch('https://rpwb36i74i.execute-api.us-east-1.amazonaws.com/Prod/FetechMeterData', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ requestType: 'fetchData' })
        });

        if (!powerResponse.ok) {
            throw new Error('Network response was not ok');
        }

        const powerData = await powerResponse.json();
        currentPower = parseFloat(powerData.totalPower);
        document.getElementById('meterScreen').textContent = `${currentPower.toFixed(2)} kWh`;

        // Calculate balance data based on current power and fixed tariff rate
        const tariffRate = 5; // Tariff rate in ₹/kWh
        currentBalance = initialBalance - (currentPower * tariffRate);

        // Update the balance display
        updateBalanceDisplay();
        showPopup(); // Show the popup after fetching data

        // Start incrementing power display
        clearInterval(incrementInterval);
        setTimeout(() => {
            incrementInterval = setInterval(incrementPower, 4000); 
        }, 10000);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function incrementPower() {
    const increment = Math.random() * 0.1; 
    currentPower += increment;
    document.getElementById('meterScreen').textContent = `${currentPower.toFixed(3)} kWh`;
}

function showPopup() {
    document.getElementById('balancePopup').style.display = 'block';
    document.getElementById('balancePopupContent').textContent = `Balance: ₹${currentBalance.toFixed(2)}`;
}

function closePopup() {
    document.getElementById('balancePopup').style.display = 'none';
}

function showAddBalanceForm() {
    document.getElementById('addBalanceForm').style.display = 'block';
}

function submitAddBalance() {
    const amountToAdd = parseFloat(document.getElementById('amountToAdd').value);
    if (!isNaN(amountToAdd) && amountToAdd > 0) {
        initialBalance += amountToAdd;
        updateBalanceDisplay();
        document.getElementById('addBalanceForm').style.display = 'none'; // Hide form after adding balance
    } else {
        alert('Please enter a valid amount.');
    }
}

function updateBalanceDisplay() {
    document.getElementById('availableBalance').textContent = `Balance: ₹${initialBalance.toFixed(2)}`;
    document.getElementById('updatedBalance').textContent = `Updated Balance: ₹${initialBalance.toFixed(2)}`;
}
