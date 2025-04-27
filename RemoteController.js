function showRemote() {
    // Hide all remotes first
    document.querySelectorAll('.remote').forEach(remote => remote.style.display = 'none');

    // Show the remote controls container
    document.getElementById('remote-controls').style.display = 'none';
    
    // Get selected appliance
    const appliance = document.getElementById('appliance-select').value;
    
    // Show the selected remote if an appliance is selected
    if (appliance) {
        document.getElementById('remote-controls').style.display = 'block';
        document.getElementById(`${appliance}-remote`).style.display = 'block';
    }
}

function controlAppliance(appliance, action) {
    console.log(`Controlling ${appliance} with action: ${action}`);
    // Implement further functionality for controlling appliances
}
