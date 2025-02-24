from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator
import numpy as np

def generate_qubits(n):
    """Simulate Alice preparing qubits in random bases."""
    # Randomly choose bases ('X' for Hadamard, 'Z' for standard basis) for each qubit
    bases = np.random.choice(['X', 'Z'], size=n)
    # Generate random classical bits (0 or 1) for encoding
    bits = np.random.randint(0, 2, size=n)
    qubits = []
    
    for i in range(n):
        qc = QuantumCircuit(1, 1)  # Create a single-qubit quantum circuit
        
        # Encode the bit: If bit is 1, apply an X (NOT) gate
        if bits[i] == 1:
            qc.x(0)
        
        # Apply Hadamard if the chosen basis is 'X' (superposition basis)
        if bases[i] == 'X':
            qc.h(0)
        
        qubits.append(qc)  # Store the prepared qubit circuit
    
    return qubits, bases, bits

def measure_qubits(qubits, bases):
    """Simulate Bob measuring qubits in random bases."""
    measured_bits = []  # Store measurement results
    simulator = AerSimulator()  # Initialize the quantum simulator
    
    for i in range(len(qubits)):
        qc = qubits[i].copy()  # Copy the quantum circuit to avoid modifying the original
        
        # Apply Hadamard if Bob's chosen basis is 'X' (to match Alice's 'X' basis)
        if bases[i] == 'X':
            qc.h(0)
        
        qc.measure(0, 0)  # Measure the qubit in the chosen basis
        
        # Simulate the measurement and retrieve the result
        result = simulator.run(qc, shots=1, memory=True).result()
        measured_bits.append(int(result.get_memory()[0]))  # Extract the bit result
    
    return measured_bits

def sift_keys(alice_bases, bob_bases, alice_bits, bob_bits):
    """Sift out the key by keeping only matching bases."""
    key = [alice_bits[i] for i in range(len(alice_bases)) if alice_bases[i] == bob_bases[i]]
    return key

# Simulate BB84 protocol
num_qubits = 10  # Number of qubits to be exchanged

# Step 1: Alice prepares qubits in random bases and encodes random bits
alice_qubits, alice_bases, alice_bits = generate_qubits(num_qubits)

# Step 2: Bob randomly chooses bases for measurement
bob_bases = np.random.choice(['X', 'Z'], size=num_qubits)

# Step 3: Bob measures the qubits in his chosen bases
bob_bits = measure_qubits(alice_qubits, bob_bases)

# Step 4: Alice and Bob publicly compare their bases and keep matching ones
secure_key = sift_keys(alice_bases, bob_bases, alice_bits, bob_bits)

# Step 5: Print the final shared key
print("Final Shared Key:", secure_key)
