# BB84 Quantum Cryptography Simulation
Quantum Key Distribution (QKD)  Simulation Using BB84 Protocol

For an interactive view of the project, visit the implementation website: [https://vedanshishah7.github.io/comp_security_final_project/](https://vedanshishah7.github.io/comp_security_final_project/)

## Overview
This project simulates the BB84 quantum key distribution protocol, one of the first quantum cryptography protocols designed for secure communication. The simulation models quantum bit transmission, measurement, and key reconciliation between Alice and Bob, while also detecting potential eavesdroppers (Eve).

## Features
- **Quantum Bit Transmission:** Alice sends randomly generated quantum bits (qubits) in one of two bases.
- **Measurement & Basis Selection:** Bob measures the qubits using randomly chosen bases.
- **Key Reconciliation:** Alice and Bob compare bases and discard mismatches to form a shared key.
- **Eavesdropping Detection:** If Eve intercepts the qubits, measurement disturbances reveal her presence.
- **Simulation & Analysis:** The protocol's security properties and efficiency are evaluated.

## File Structure
```
COMP_SECURITY_FINAL_PROJECT/
│── cryptography_final_project.pdf      # Final report pdf
│── index.html                          # Visualisation simulation website landing page
│── script.js                           # Visualisation simulation website javascript implementation
│── style.css                           # Visualisation simulation website style script
│── main.py                             # Python script to run the simulation
│── trials.ipynb                        # Jupyter notebook to run the simulation and get the visualisations to understand
│── README.md                           # README file with all the information
│── requirements.txt                    # Requirements file with all the packages needed for the project
```

## Installation
To set up and run the project, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/VedanshiShah7/comp_security_final_project.git
   cd comp_security_final_project
   ```

2. **Create a virtual environment (optional but recommended):**
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies:**
   ```sh
   pip install -r requirements.txt
   ```

## Running the Simulation
To run the BB84 protocol simulation, use:
```sh
python main.py
```
or
Run all in the jupyter notebook
 ```sh
trials.ipynb
```

This will execute the key distribution process and output relevant results, including detection of potential eavesdropping.


## Future Enhancements
- Enhancing error correction methods.
- Visualizing qubit transmission using quantum circuit diagrams.

## License
This project is licensed under the MIT License.
