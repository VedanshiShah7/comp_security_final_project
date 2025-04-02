function runSimulation() {
    const numQubits = parseInt(document.getElementById("numQubits").value);
    const aliceBases = randomBases(numQubits);
    const bobBases = randomBases(numQubits);
    const aliceBits = randomBits(numQubits);
    const transmittedQubits = encodeQubits(aliceBits, aliceBases);
    const bobMeasurements = measureQubits(transmittedQubits, bobBases);
    const matchingIndices = getMatchingIndices(aliceBases, bobBases);
    const key = generateKey(aliceBits, bobMeasurements, matchingIndices);
    
    displayResults(aliceBits, aliceBases, bobBases, bobMeasurements, key);
    updateChart(key);
}

function randomBits(length) {
    return Array.from({ length }, () => Math.round(Math.random()));
}

function randomBases(length) {
    return Array.from({ length }, () => Math.random() < 0.5 ? '+' : 'x');
}

function encodeQubits(bits, bases) {
    return bits.map((bit, i) => ({ bit, basis: bases[i] }));
}

function measureQubits(qubits, bases) {
    return qubits.map((qubit, i) => bases[i] === qubit.basis ? qubit.bit : Math.round(Math.random()));
}

function getMatchingIndices(aliceBases, bobBases) {
    return aliceBases.map((base, i) => (base === bobBases[i] ? i : -1)).filter(i => i !== -1);
}

function generateKey(aliceBits, bobBits, indices) {
    return indices.map(i => aliceBits[i]);
}

function displayResults(aliceBits, aliceBases, bobBases, bobBits, key) {
    let output = "Alice Bits:   " + aliceBits.join(" ") + "\n";
    output += "Alice Bases:  " + aliceBases.join(" ") + "\n";
    output += "Bob Bases:    " + bobBases.join(" ") + "\n";
    output += "Bob Bits:     " + bobBits.join(" ") + "\n";
    output += "Final Key:    " + key.join(" ") + "\n";
    document.getElementById("output").innerText = output;
}

function updateChart(key) {
    const ctx = document.getElementById("keyChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: key.map((_, i) => i + 1),
            datasets: [{
                label: "Key Bits",
                data: key,
                backgroundColor: "rgba(75, 192, 192, 0.6)"
            }]
        }
    });
}
