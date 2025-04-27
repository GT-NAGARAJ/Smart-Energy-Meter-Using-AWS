// document.getElementById('getDetailsBtn').addEventListener('click', function() {
//     document.getElementById('dropdownMenu').style.display = 'inline-block';
// });

document.getElementById('getAllDetails').addEventListener('click', function(event) {
    event.preventDefault();
    fetchCriticalData(); // Call the function to fetch data from the CriticalData table
});

// Function to fetch data from the "CriticalData" table via the API
async function fetchCriticalData() {
    try {
        const response = await fetch('https://i1qrnm2fgb.execute-api.us-east-1.amazonaws.com/PROD/GetCriticalData', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        displayTable(data); // Function to display data in a table format
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('details').textContent = 'Error fetching data. ' + error;
    }
}

// Function to display data in a table format with recent timestamps at the top
function displayTable(data) {
    const detailsDiv = document.getElementById('details');
    detailsDiv.innerHTML = ''; // Clear previous content

    if (data.length === 0) {
        detailsDiv.textContent = 'No data available.';
        return;
    }

    // Sort the data by timestamp in descending order (most recent first)
    data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';

    // Define the column order
    const predefinedOrder = [
        'timestamp', 
        'ApplianceName', 
        'Status', 
        'Current_Elapsed_Time', 
        'Total_Elapsed_Time', 
        'Current_Power_Consumption', 
        'Total_Power_Consumption'
    ];
    
    // Create table header
    const headerRow = document.createElement('tr');
    const headers = new Set(predefinedOrder); // Use a Set to avoid duplicates

    // Add any additional headers
    data.forEach(item => {
        Object.keys(item).forEach(key => {
            if (item[key] !== null && !headers.has(key)) {
                headers.add(key);
            }
        });
    });

    // Create header cells
    const allHeaders = [...headers];
    allHeaders.forEach(header => {
        const th = document.createElement('th');
        th.style.border = '1px solid #ddd';
        th.style.padding = '8px';
        th.style.backgroundColor = '#f2f2f2';
        th.appendChild(document.createTextNode(header));
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Create table rows
    data.forEach(item => {
        const row = document.createElement('tr');
        allHeaders.forEach(header => {
            const td = document.createElement('td');
            td.style.border = '1px solid #ddd';
            td.style.padding = '8px';
            td.appendChild(document.createTextNode(item[header] !== null ? item[header] : ''));
            row.appendChild(td);
        });
        table.appendChild(row);
    });

    detailsDiv.appendChild(table);
}

// document.getElementById('viewChart').addEventListener('click', function() {
//     fetch('https://rpwb36i74i.execute-api.us-east-1.amazonaws.com/Prod/ViewChart') // Replace with your actual API Gateway endpoint
//         .then(response => response.json())
//         .then(data => {
//             const ctx = document.getElementById('myPieChart').getContext('2d');
//             const myPieChart = new Chart(ctx, {
//                 type: 'pie',
//                 data: data,
//                 options: {
//                     responsive: true,
//                     plugins: {
//                         legend: {
//                             position: 'top',
//                         },
//                         tooltip: {
//                             callbacks: {
//                                 label: function(tooltipItem) {
//                                     return tooltipItem.label + ': ' + tooltipItem.raw + ' kWh';
//                                 }
//                             }
//                         }
//                     }
//                 }
//             });
//         })
//         .catch(error => console.error('Error fetching chart data:', error));
// });

// document.getElementById('viewChart').addEventListener('click', function() {
//     fetch('https://rpwb36i74i.execute-api.us-east-1.amazonaws.com/Prod/ViewChart')
//         .then(response => response.json())
//         .then(data => {
//             console.log(data); // Inspect the data structure

//             const ctxPie = document.getElementById('myPieChart').getContext('2d');
//             const ctxLine = document.getElementById('myLineChart').getContext('2d');

//             // Clear previous charts if they exist
//             if (window.myPieChart) {
//                 window.myPieChart.destroy();
//             }
//             if (window.myLineChart) {
//                 window.myLineChart.destroy();
//             }

//             // Create a new pie chart for power consumption
//             window.myPieChart = new Chart(ctxPie, {
//                 type: 'pie',
//                 data: data.power_consumption,
//                 options: {
//                     responsive: true,
//                     plugins: {
//                         legend: {
//                             position: 'top',
//                         },
//                         tooltip: {
//                             callbacks: {
//                                 label: function(tooltipItem) {
//                                     return tooltipItem.label + ': ' + tooltipItem.raw + ' kWh';
//                                 }
//                             }
//                         }
//                     }
//                 }
//             });

//             // Create a new line chart for elapsed time
//             window.myLineChart = new Chart(ctxLine, {
//                 type: 'line',
//                 data: {
//                     labels: data.elapsed_time.labels,
//                     datasets: [{
//                         label: 'Elapsed Time (hours)',
//                         data: data.elapsed_time.datasets[0].data,
//                         borderColor: '#36A2EB',
//                         fill: false,
//                         tension: 0.1
//                     }]
//                 },
//                 options: {
//                     responsive: true,
//                     plugins: {
//                         legend: {
//                             position: 'top',
//                         },
//                         tooltip: {
//                             callbacks: {
//                                 label: function(tooltipItem) {
//                                     return tooltipItem.label + ': ' + tooltipItem.raw + ' hours';
//                                 }
//                             }
//                         }
//                     },
//                     scales: {
//                         x: {
//                             title: {
//                                 display: true,
//                                 text: 'Appliances'
//                             }
//                         },
//                         y: {
//                             title: {
//                                 display: true,
//                                 text: 'Elapsed Time (hours)'
//                             }
//                         }
//                     }
//                 }
//             });
//         })
//         .catch(error => console.error('Error fetching chart data:', error));
// });

// import Chart from 'chart.js/auto';

// document.getElementById('viewChart').addEventListener('click', function() {
//     fetch('https://rpwb36i74i.execute-api.us-east-1.amazonaws.com/Prod/ViewChart') // Replace with your actual API Gateway endpoint
//         .then(response => response.json())
//         .then(data => {
//             const ctxPie = document.getElementById('myPieChart').getContext('2d');
//             const ctxLine = document.getElementById('myLineChart').getContext('2d');

//             // Clear previous charts if they exist
//             if (window.myPieChart) {
//                 window.myPieChart.destroy();
//             }
//             if (window.myLineChart) {
//                 window.myLineChart.destroy();
//             }

//             // Create a new pie chart for power consumption
//             window.myPieChart = new Chart(ctxPie, {
//                 type: 'pie',
//                 data: data.power_consumption,
//                 options: {
//                     responsive: true,
//                     plugins: {
//                         legend: {
//                             position: 'top',
//                         },
//                         tooltip: {
//                             callbacks: {
//                                 label: function(tooltipItem) {
//                                     return tooltipItem.label + ': ' + tooltipItem.raw + ' kWh';
//                                 }
//                             }
//                         }
//                     }
//                 }
//             });

//             // Create a new line chart for elapsed time
//             window.myLineChart = new Chart(ctxLine, {
//                 type: 'line',
//                 data: {
//                     labels: data.elapsed_time.labels,
//                     datasets: [{
//                         label: 'Elapsed Time (hours)',
//                         data: data.elapsed_time.datasets[0].data,
//                         borderColor: '#36A2EB',
//                         fill: false // Use false instead of null
//                     }]
//                 },
//                 options: {
//                     responsive: true,
//                     plugins: {
//                         legend: {
//                             position: 'top',
//                         },
//                         tooltip: {
//                             callbacks: {
//                                 label: function(tooltipItem) {
//                                     return tooltipItem.label + ': ' + tooltipItem.raw + ' hours'; // Format the tooltip
//                                 }
//                             }
//                         }
//                     },
//                     scales: {
//                         x: {
//                             title: {
//                                 display: true,
//                                 text: 'Appliances'
//                             }
//                         },
//                         y: {
//                             title: {
//                                 display: true,
//                                 text: 'Elapsed Time (hours)'
//                             }
//                         }
//                     }
//                 }
//             });
//         })
//         .catch(error => console.error('Error fetching chart data:', error));
// });

document.getElementById('viewChart').addEventListener('click', function() {
    
    fetch('https://rpwb36i74i.execute-api.us-east-1.amazonaws.com/Prod/ViewChart') // Replace with your actual API Gateway endpoint
        .then(response => response.json())
        .then(data => {
            const ctxPie = document.getElementById('myPieChart').getContext('2d');
            const ctxLine = document.getElementById('myLineChart').getContext('2d');

            // Clear previous charts if they exist
            if (window.myPieChart && typeof window.myPieChart.destroy === 'function') {
                window.myPieChart.destroy();
            }
            if (window.myLineChart && typeof window.myLineChart.destroy === 'function') {
                window.myLineChart.destroy();
            }

            // Create a new pie chart for power consumption
            window.myPieChart = new Chart(ctxPie, {
                type: 'pie',
                data: data.power_consumption,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function(tooltipItem) {
                                    return tooltipItem.label + ': ' + tooltipItem.raw + ' kWh';
                                }
                            }
                        }
                    }
                }
            });

            // Create a new line chart for elapsed time
            window.myLineChart = new Chart(ctxLine, {
                type: 'line',
                data: {
                    labels: data.elapsed_time.labels,
                    datasets: [{
                        label: 'Elapsed Time (hours)',
                        data: data.elapsed_time.datasets[0].data,
                        borderColor: '#36A2EB',
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function(tooltipItem) {
                                    return tooltipItem.label + ': ' + tooltipItem.raw + ' hours';
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Appliances'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Elapsed Time (hours)'
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching chart data:', error));
});


