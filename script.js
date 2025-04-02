document.getElementById('themeToggle').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
});

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

    let ctx = document.getElementById('keyComparisonChart').getContext('2d');
    new Chart(ctx, {
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
    new Chart(eavesCtx, {
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
}
