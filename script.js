window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            await ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
            console.error("User denied account access");
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

    const abi = [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_facultyName",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_studentUSN",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_recordMarks",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_remarks",
                    "type": "string"
                }
            ],
            "name": "uploadAssignment",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                }
            ],
            "name": "getAssignment",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "facultyName",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "studentUSN",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "recordMarks",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "remarks",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct Assignment.AssignmentData",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
    const address = '0x151D98735505efB4E4704b4C766aB3B0B7f2e7A4'; // Replace with your contract address

    const contract = new web3.eth.Contract(abi, address);

    document.getElementById('assignmentForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const facultyName = document.getElementById('facultyName').value;
        const studentUSN = document.getElementById('studentUSN').value;
        const recordMarks = document.getElementById('recordMarks').value;
        const remarks = document.getElementById('remarks').value;

        const accounts = await web3.eth.getAccounts();
        const senderAddress = accounts[0];

        try {
            const receipt = await contract.methods.uploadAssignment(facultyName, studentUSN, recordMarks, remarks)
                .send({ from: senderAddress, gas: 3000000 });

            if (receipt.status) {
                alert('Record marks uploaded successfully!');
            } else {
                alert('Error uploading record marks. Transaction failed.');
            }
        } catch (error) {
            console.error('Error uploading record marks:', error);
            alert('Error uploading record marks. Please check the console for details.');
        }
    });
});
