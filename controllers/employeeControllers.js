import { ethers } from 'ethers';
import asyncHandler from 'express-async-handler';

// Constants
const INFURA_ID = process.env.INFURA_ID;
const INFURA_ENDPOINT = `https://sepolia.infura.io/v3/${INFURA_ID}`;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = '0xC736fF56e32198BDd92504df72A7607AC7A84310';

// Provider
const provider = new ethers.providers.JsonRpcProvider(INFURA_ENDPOINT);

// Contract's ABI
const NGEDMS_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"employeeId","type":"uint256"},{"indexed":false,"internalType":"string","name":"firstName","type":"string"},{"indexed":false,"internalType":"string","name":"lastName","type":"string"},{"indexed":false,"internalType":"string","name":"email","type":"string"}],"name":"EmployeeAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"employeeId","type":"uint256"},{"indexed":false,"internalType":"string","name":"firstName","type":"string"},{"indexed":false,"internalType":"string","name":"lastName","type":"string"},{"indexed":false,"internalType":"string","name":"email","type":"string"}],"name":"EmployeeDeleted","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"employees","outputs":[{"internalType":"uint256","name":"employeeId","type":"uint256"},{"internalType":"string","name":"firstName","type":"string"},{"internalType":"string","name":"lastName","type":"string"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"dob","type":"string"},{"internalType":"string","name":"joinDate","type":"string"},{"internalType":"string","name":"department","type":"string"},{"internalType":"string","name":"position","type":"string"},{"internalType":"string","name":"contact","type":"string"},{"internalType":"string","name":"emergencyContact","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAllEmployees","outputs":[{"components":[{"internalType":"uint256","name":"employeeId","type":"uint256"},{"internalType":"string","name":"firstName","type":"string"},{"internalType":"string","name":"lastName","type":"string"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"dob","type":"string"},{"internalType":"string","name":"joinDate","type":"string"},{"internalType":"string","name":"department","type":"string"},{"internalType":"string","name":"position","type":"string"},{"internalType":"string","name":"contact","type":"string"},{"internalType":"string","name":"emergencyContact","type":"string"}],"internalType":"struct NGEDMSV1.Employee[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"employeeId","type":"uint256"}],"name":"getEmployeeById","outputs":[{"components":[{"internalType":"uint256","name":"employeeId","type":"uint256"},{"internalType":"string","name":"firstName","type":"string"},{"internalType":"string","name":"lastName","type":"string"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"dob","type":"string"},{"internalType":"string","name":"joinDate","type":"string"},{"internalType":"string","name":"department","type":"string"},{"internalType":"string","name":"position","type":"string"},{"internalType":"string","name":"contact","type":"string"},{"internalType":"string","name":"emergencyContact","type":"string"}],"internalType":"struct NGEDMSV1.Employee","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_firstName","type":"string"},{"internalType":"string","name":"_lastName","type":"string"},{"internalType":"string","name":"_email","type":"string"},{"internalType":"string","name":"_dob","type":"string"},{"internalType":"string","name":"_joinDate","type":"string"},{"internalType":"string","name":"_department","type":"string"},{"internalType":"string","name":"_position","type":"string"},{"internalType":"string","name":"_contact","type":"string"},{"internalType":"string","name":"_emergencyContact","type":"string"}],"name":"registerEmployee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalEmployees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"employeeId","type":"uint256"}],"name":"unregisterEmployee","outputs":[],"stateMutability":"nonpayable","type":"function"}];

// Contract instance
const contract = new ethers.Contract(CONTRACT_ADDRESS, NGEDMS_ABI, provider);

// Get contract owner
const getOwner = asyncHandler(async (req, res) => {
    try {
        const owner = await contract.owner();
        res.json({ owner });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get total number of employees
const getTotalEmployees = asyncHandler(async (req, res) => {
	try {
			const totalEmployeesBigNumber = await contract.totalEmployees();
			const totalEmployees = totalEmployeesBigNumber.toNumber(); // Convert to regular number
			res.json({ totalEmployees });
	} catch (error) {
			res.status(500).json({ error: error.message });
	}
});


// Add Employee
const addEmployee = asyncHandler(async (req, res) => {
	try {
			const { firstName, lastName, email, dob, joinDate, department, position, contact, emergencyContact } = req.body;

			const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
			const contractWithSigner = contract.connect(wallet);

			// const gasPrice = ethers.utils.parseUnits('50', 'gwei'); // Adjust the gas price as needed
			// const gasLimit = 300000; // Adjust the gas limit as needed

			const tx = await contractWithSigner.registerEmployee(
					firstName,
					lastName,
					email,
					dob,
					joinDate,
					department,
					position,
					contact,
					emergencyContact,
			// 		{
			// 				gasPrice, // Specify the gas price
			// 				gasLimit, // Specify the gas limit
			// 		}
			 );
			const receipt = await tx.wait();

			// Get the employee ID from the event logs
			const event = receipt.events.find(event => event.event === "EmployeeAdded");
			const employeeId = event.args.employeeId.toNumber();

			// Respond to the frontend with the required information
			res.json({
					message: 'Employee added successfully',
					transactionHash: receipt.transactionHash,
					employeeId,
			});
	} catch (error) {
			res.status(500).json({ error: error.message });
	}
});


// Delete Employee
const deleteEmployee = asyncHandler(async (req, res) => {
    try {
        const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
        const contractWithSigner = contract.connect(wallet);

        const { employeeId } = req.params;
        const tx = await contractWithSigner.unregisterEmployee(employeeId);
        const receipt = await tx.wait();
        res.json({ transactionHash: receipt.transactionHash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Employees
const getAllEmployees = asyncHandler(async (req, res) => {
	try {
			// Get all employees data from the contract
			const employeesData = await contract.getAllEmployees();
			
			// Filter out employees with employee ID equal to 0
			const validEmployeesData = employeesData.filter(employee => employee[0].toNumber() !== 0);
			
			// Map the data of valid employees
			const employees = validEmployeesData.map(employee => ({
					employeeId: employee[0].toNumber(),
					firstName: employee[1],
					lastName: employee[2],
					email: employee[3],
					dob: employee[4],
					joinDate: employee[5],
					department: employee[6],
					position: employee[7],
					contact: employee[8],
					emergencyContact: employee[9]
			}));

			// Return the employees data as response
			res.json({ employees });
	} catch (error) {
			res.status(500).json({ error: error.message });
	}
});


// Get Employee by ID
const getEmployeeById = asyncHandler(async (req, res) => {
    try {
        const { employeeId } = req.params;
        const employeeData = await contract.getEmployeeById(employeeId);
        if (!employeeData[0]) {
            res.status(404).json({ error: "Employee not found" });
            return;
        }
        const employee = {
            employeeId: employeeData[0].toNumber(),
            firstName: employeeData[1],
            lastName: employeeData[2],
            email: employeeData[3],
            dob: employeeData[4],
            joinDate: employeeData[5],
            department: employeeData[6],
            position: employeeData[7],
            contact: employeeData[8],
            emergencyContact: employeeData[9]
        };
        res.json({ employee });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export {
    getOwner,
    getTotalEmployees,
    addEmployee,
    deleteEmployee,
    getAllEmployees,
    getEmployeeById,
};
