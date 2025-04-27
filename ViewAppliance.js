

function toggleLightBulb(state) {
    console.log("Light Bulb " + state);
    const bulb = document.querySelector('.light-bulb');
    if (state === 'on') {
        bulb.style.backgroundColor = 'yellow';
        bulb.style.boxShadow = '0 0 15px rgba(255, 255, 0, 0.7)';
    } else {
        bulb.style.backgroundColor = 'white';
        bulb.style.boxShadow = 'none';
    }
}

function toggleAC(state) {
    console.log("AC " + state);
    const acElement = document.getElementById('ac');
    if (state === 'on') {
        acElement.classList.add('ac-on');
    } else {
        acElement.classList.remove('ac-on');
    }
}

function toggleTV(state) {
    console.log("TV " + state);
    const tvElement = document.getElementById('tv');
    if (state === 'on') {
        tvElement.classList.add('tv-on');
    } else {
        tvElement.classList.remove('tv-on');
    }
}

function toggleWM(state) {
    console.log("Washing Machine " + state);
    const wmElement = document.getElementById('wm');
    if (state === 'on') {
        wmElement.classList.add('wm-on');
    } else {
        wmElement.classList.remove('wm-on');
    }
}

function toggleCar(state) {
    console.log("Electric Car " + state);
    const carElement = document.getElementById('car');
    const lightsElement = document.getElementById('car-lights');
    if (state === 'on') {
        carElement.style.backgroundColor = '#00BFFF'; // Bright blue color
        carElement.classList.add('car-animation');
        lightsElement.classList.add('on');
    } else {
        carElement.style.backgroundColor = '#222'; // Dark grey color
        carElement.classList.remove('car-animation');
        lightsElement.classList.remove('on');
    }
}


function toggleFan(state) {
    console.log("Fan " + state);
    const fanBlades = document.querySelector('.fan-blades');
    if (state === 'on') {
        fanBlades.style.animation = 'spin 1s infinite linear';
    } else {
        fanBlades.style.animation = 'none';
    }
}

// function viewAllDetails(appliance) {
//     alert("Displaying all details for " + appliance + ".");
//     // Implement the logic to display all details of the specified appliance
// }

// function viewAllDetails(applianceName) {
//     const apiUrl = `https://your-api-id.execute-api.your-region.amazonaws.com/your-stage/appliance/${applianceName}`;

//     fetch(apiUrl)
//         .then(response => response.json())
//         .then(data => {
//             console.log('Appliance Details:', data);
//             // Display the details as needed
//             alert(`Appliance Details: ${JSON.stringify(data)}`);
//         })
//         .catch(error => {
//             console.error('Error fetching appliance details:', error);
//             alert('Error fetching appliance details.');
//         });
// }

// Function to perform a GET request
// async function viewAllDetails(ApplianceName) {
//     console.log((ApplianceName))


//     try {
//         const response = await fetch(`https://rpwb36i74i.execute-api.us-east-1.amazonaws.com/Prod/ViewAppliance/${ApplianceName}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         });
//         const data = await response.json();
//         console.log('Appliance Details:', data);
//             // Display the details as needed
//             alert(`Appliance Details: ${JSON.stringify(data)}`);

    
//     } catch (error) {
//         console.error('Error fetching appliance details:', error);
//         alert('Error fetching appliance details.');
//     }
// }



// Populate the popup with formatted appliance details
function formatApplianceDetails(data) {
    const detailsElement = document.getElementById('applianceDetails');
    detailsElement.innerHTML = ''; // Clear any previous content

    // Create a table to display the details
    const table = document.createElement('table');
    table.classList.add('details-table');

    // Loop through each key-value pair in the data object
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const row = document.createElement('tr');

            const cellKey = document.createElement('td');
            cellKey.classList.add('cell-key');
            cellKey.textContent = key.replace(/_/g, ' '); // Format key by replacing underscores with spaces

            const cellValue = document.createElement('td');
            cellValue.classList.add('cell-value');
            cellValue.textContent = data[key];

            row.appendChild(cellKey);
            row.appendChild(cellValue);
            table.appendChild(row);
        }
    }

    detailsElement.appendChild(table);
}

async function viewAllDetails(ApplianceName) {
    console.log(ApplianceName);

    try {
        const response = await fetch(`https://rpwb36i74i.execute-api.us-east-1.amazonaws.com/Prod/ViewAppliance/${ApplianceName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        console.log('Appliance Details:', data);

        // Format and display the appliance details in the popup
        formatApplianceDetails(data);
        
        // Display the popup
        document.getElementById('appliancePopup').style.display = 'flex';

    } catch (error) {
        console.error('Error fetching appliance details:', error);
        alert('Error fetching appliance details.');
    }
}

function closePopup() {
    document.getElementById('appliancePopup').style.display = 'none';
}




//timer function  and Update function

// Variables to store the timer IDs and start times for each appliance
let timers = {
    light: { timerId: null, startTime: null, elapsedTime: 0 },
    fan: { timerId: null, startTime: null, elapsedTime: 0 },
    ac: { timerId: null, startTime: null, elapsedTime: 0 },
    tv: { timerId: null, startTime: null, elapsedTime: 0 },
    wm: { timerId: null, startTime: null, elapsedTime: 0 },
    car: { timerId: null, startTime: null, elapsedTime: 0 }
};

// Function to start the timer for an appliance
function startTimer(appliance) {
    if (timers[appliance] && !timers[appliance].timerId) {
        timers[appliance].startTime = Date.now();
        timers[appliance].timerId = setInterval(() => updateTimer(appliance), 1000);
    }
}

// Function to stop the timer for an appliance
function stopTimer(appliance) {
    if (timers[appliance] && timers[appliance].timerId) {
        clearInterval(timers[appliance].timerId);
        timers[appliance].timerId = null;
        // Update the elapsed time to include the last period
        timers[appliance].elapsedTime += Math.floor((Date.now() - timers[appliance].startTime) / 1000);
        timers[appliance].startTime = null;
        // Update the display to show the total elapsed time
        document.getElementById(`total-time-${appliance}`).textContent = `${timers[appliance].elapsedTime} sec`;
    }
}

// Function to update the timer display
function updateTimer(appliance) {
    if (timers[appliance].startTime) {
        timers[appliance].elapsedTime = Math.floor((Date.now() - timers[appliance].startTime) / 1000);
        document.getElementById(`total-time-${appliance}`).textContent = `${timers[appliance].elapsedTime} sec`;
    }
}

// Function to get the elapsed time for an appliance
function getElapsedTime(appliance) {
    if (timers[appliance]) {
        let elapsedTime = timers[appliance].elapsedTime;
        if (timers[appliance].startTime) {
            elapsedTime += Math.floor((Date.now() - timers[appliance].startTime) / 1000);
        }
        return elapsedTime.toFixed(2); // Return elapsed time in seconds
    }
    return '0';
}

// // Example usage
// function changeApplianceStatus(applianceName, status, elapsedTime = '0') {
//     console.log(`Appliance ${applianceName} is ${status}. Elapsed time: ${elapsedTime} seconds.`);
// }

// Event handlers
// document.getElementById('switch-on-light').addEventListener('click', function() {
//     toggleLightBulb('on');
//     startTimer('light');
//     changeApplianceStatus('Living_Room_Light', 'On');
// });

// document.getElementById('switch-off-light').addEventListener('click', function() {
//     toggleLightBulb('off');
//     stopTimer('light');
//     changeApplianceStatus('Living_Room_Light', 'Off', getElapsedTime('light'));
// });

// Similarly for other appliances






// change the status of the blub in dynamodb table  using button 

async function changeApplianceStatus(applianceName, status,elapsedTime=0) {
    try {
        const response = await fetch(`https://rpwb36i74i.execute-api.us-east-1.amazonaws.com/Prod/UpdateStatus`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                ApplianceName: applianceName, 
                Status: status,
                TimeElapsed: elapsedTime// Include time elapsed

            })
        });

        if (response.ok) {
            const result = await response.json();
            console.log(`Status changed to: ${status}`, result);
            console.log(`TimeElapsed :${elapsedTime}`)
            // alert(`Status changed to: ${status}`);
        } else {
            const errorData = await response.json();
            console.error('Error updating status:', errorData);
            alert('Failed to update appliance status.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while updating appliance status.');
    }
}

// async function submitStatusChange(applianceName) {
//     const status = document.getElementById('switch-on-light').disabled ? 'Off' : 'On'; // Get current status
//     await changeApplianceStatus(applianceName, status);
// }

// Function to handle status change on button click
async function submitStatusChange(applianceName) {
    const isSwitchOn = !document.getElementById('switch-on-light').disabled; // Check if switch is ON

    if (isSwitchOn) {
        // If turning on, start the timer
        startTimer(applianceName);
        await changeApplianceStatus(applianceName, 'On');
    } else {
        // If turning off, stop the timer and get elapsed time
        stopTimer(applianceName);
        const elapsedTime = Math.floor((Date.now() - timers[applianceName].startTime) / 1000); // Calculate elapsed time in seconds
        await changeApplianceStatus(applianceName, 'Off', elapsedTime);
    }
}


//popup  to turn on meter reading


function triggerStatusAPI() {
    const apiUrl = 'https://YOUR_API_GATEWAY_ENDPOINT/status'; // Replace with your API Gateway endpoint

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            status: 'on' // Adjust according to your API's expected payload
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert('Status updated successfully!');
        } else {
            alert('Error: ' + data.error);
        }
        hideHeader(); // Hide the header after triggering the API
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while updating the status.');
        hideHeader(); // Hide the header even if there is an error
    });
}


function hideHeader() {
    document.getElementById('header').style.display = 'none';
}
// Call showInitialPopup when the page loads
// window.onload = function() {
//     // For demonstration purposes, show the initial popup
//     showInitialPopup();
// };


// Refresh for every 20 seconds

// Function to auto-refresh the page every 20 seconds
// function autoRefresh() {
//     setInterval(function() {
//         window.location.reload();
//     }, 20000); // 20000 milliseconds = 20 seconds
// }

// // Call the autoRefresh function when the page loads
// window.onload = function() {
//     autoRefresh();
// };

