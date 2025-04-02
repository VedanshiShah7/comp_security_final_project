document.getElementById('themeToggle').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
});

// Store chart instances globally so we can destroy them before updating
let keyComparisonChart, eavesdropChart, keyHistogram, eavesdropPieChart;

function runSimulation() {
    let numQubits = document.getElementById('numQubits').value;
    let eavesdrop = document.getElementById('eavesdrop').checked;

    let aliceBases = Array.from({length: numQubits}, () => Math.random() > 0.5 ? 'X' : 'Z');
    let bobBases = Array.from({length: numQubits}, () => Math.random() > 0.5 ? 'X' : 'Z');
    let aliceBits = Array.from({length: numQubits}, () => Math.random() > 0.5 ? 1 : 0);
    let bobBits = bobBases.map((b, i) => (b === aliceBases[i]) ? aliceBits[i] : Math.random() > 0.5 ? 1 : 0);
    let secureKey = aliceBits.filter((b, i) => aliceBases[i] === bobBases[i]);

    let eavesdropBits = eavesdrop ? bobBits.map(() => Math.random() > 0.5 ? 1 : 0) : [];

    updateVisualization(aliceBases, bobBases, aliceBits, bobBits, secureKey, eavesdropBits);
}

function updateVisualization(aliceBases, bobBases, aliceBits, bobBits, secureKey, eavesdropBits) {
    let container = document.getElementById('animationContainer');
    container.innerHTML = "";

    aliceBases.forEach((base, i) => {
        let div = document.createElement('div');
        div.innerText = `Qubit ${i + 1}: ${base} (${aliceBits[i]}) → ${bobBases[i]} (${bobBits[i]})`;
        div.classList.add("animated");
        div.style.padding = "5px";
        div.style.margin = "5px";
        div.style.backgroundColor = (aliceBases[i] === bobBases[i]) ? "lightgreen" : "lightcoral";
        container.appendChild(div);
    });

    // Destroy existing charts before creating new ones
    if (keyComparisonChart) keyComparisonChart.destroy();
    if (eavesdropChart) eavesdropChart.destroy();
    if (keyHistogram) keyHistogram.destroy();
    if (eavesdropPieChart) eavesdropPieChart.destroy();

    let ctx = document.getElementById('keyComparisonChart').getContext('2d');
    keyComparisonChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Array.from({length: aliceBits.length}, (_, i) => `Q${i + 1}`),
            datasets: [{
                label: 'Correct Key Bits',
                data: secureKey.map(() => 1),
                backgroundColor: 'green'
            }]
        }
    });

    let eavesCtx = document.getElementById('eavesdropChart').getContext('2d');
    eavesdropChart = new Chart(eavesCtx, {
        type: 'line',
        data: {
            labels: Array.from({length: aliceBits.length}, (_, i) => `Q${i + 1}`),
            datasets: [{
                label: 'Eavesdropped Bits',
                data: eavesdropBits,
                borderColor: 'red',
                fill: false
            }]
        }
    });

    let histogramCtx = document.getElementById('keyHistogram').getContext('2d');
    keyHistogram = new Chart(histogramCtx, {
        type: 'bar',
        data: {
            labels: ['0%', '25%', '50%', '75%', '100%'],
            datasets: [{
                label: 'Matched Key Bits',
                data: [2, 5, 10, 7, 3], // Example Data
                backgroundColor: 'blue'
            }]
        }
    });

    let pieCtx = document.getElementById('eavesdropPieChart').getContext('2d');
    eavesdropPieChart = new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: ['Successful Eavesdropping', 'Unchanged Key'],
            datasets: [{
                data: [eavesdropBits.filter(b => b === 1).length, eavesdropBits.filter(b => b === 0).length],
                backgroundColor: ['red', 'green']
            }]
        }
    });
}
