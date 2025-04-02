document.addEventListener("DOMContentLoaded", function () {
    setupCharts();
});

// Initialize all charts
function setupCharts() {
    drawBB84Steps();
    drawKeyComparisonChart();
    drawPastResultsChart();
}

// Simulate BB84 process
function runBB84() {
    console.log("Running BB84 Simulation...");
    updateKeyComparisonChart();
    updatePastResultsChart();
}

// Visualization for BB84 Steps
function drawBB84Steps() {
    let ctx = document.getElementById('bb84Steps').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Qubit Encoding", "Transmission", "Measurement", "Key Sifting"],
            datasets: [{
                label: "Process Completion",
                data: [1, 0.8, 0.7, 0.6],
                backgroundColor: ["#3498db", "#2ecc71", "#e74c3c", "#f1c40f"]
            }]
        }
    });
}

// Compare Alice's and Bob's keys
function drawKeyComparisonChart() {
    let ctx = document.getElementById('keyComparisonChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Bit 1", "Bit 2", "Bit 3", "Bit 4", "Bit 5"],
            datasets: [{
                label: "Alice’s Key",
                data: [1, 0, 1, 1, 0],
                borderColor: "#3498db"
            }, {
                label: "Bob’s Key",
                data: [1, 1, 1, 0, 0],
                borderColor: "#e74c3c"
            }]
        }
    });
}

// Track past results
function drawPastResultsChart() {
    let ctx = document.getElementById('pastResultsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Run 1", "Run 2", "Run 3"],
            datasets: [{
                label: "Successful Key Matches",
                data: [80, 70, 90],
                backgroundColor: "#2ecc71"
            }]
        }
    });
}

// Update key comparison chart dynamically
function updateKeyComparisonChart() {
    console.log("Updating Key Comparison Chart...");
}

// Update past results chart dynamically
function updatePastResultsChart() {
    console.log("Updating Past Results Chart...");
}
