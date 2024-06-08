# Employee Database Management Backend

## Table of Contents

- [About](#about)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [License](#license)

## About

This backend repo is designed to streamline employee management with features like new employee registration, role-based access control, leave request management, and comprehensive employee statistics. It uses a Solidity smart contract for transparent and future-proof employee registration and a Node.js server that interfaces with the contract via Ether.js.

contract address : 0xC736fF56e32198BDd92504df72A7607AC7A84310

### Potential Applications

This repo can be leveraged to develop backend for various applications such as:

- Decentralized Applications
- SAAS
- Human Resource Management Systems (HRMS)
- Employee Leave Management Systems
- Role-Based Access Control Systems
- Comprehensive Employee Statistics Dashboards
- Blockchain-Integrated Employee Management Solutions

## Features

- **Employee Registration:** Secure and efficient registration of new employees.
- **Role-Based Access Control:** Restricts access to information and pages based on user roles.
- **Leave Management:** Facilitates the management of employee leave requests.
- **Employee Statistics:** Provides detailed statistics and analytics on employee data.
- **Blockchain Integration:** Uses Solidity smart contracts for secure and tamper-proof employee registration.

## Technologies Used

- **Node.js:** Backend server for handling application logic.
- **Express.js:** Framework for building web applications.
- **Ether.js:** For interacting with the Ethereum blockchain and Solidity smart contracts.
- **Mongoose:** For MongoDB object modeling.
- **Cookie-Parser:** For parsing cookies.
- **Cors:** For enabling cross-origin resource sharing.
- **Express-Async-Handler:** For handling asynchronous operations in Express.
- **Dotenv:** For managing environment variables.
- **Bcrypt:** For hashing passwords securely.
- **Jsonwebtoken:** For authentication and authorization using JSON Web Tokens (JWTs).



## Getting Started

To get started with the NSEDMS backend project, follow these steps:

1. **Clone the Repository:** Clone this repository to your local machine using the command:
    ```bash
    git clone https://github.com/AbdulBima/NSEDMS_Backend.git
    ```
2. **Install Dependencies:** Navigate to the project directory and install the necessary dependencies by running:
    ```bash
    npm install
    ```
3. **Set Up Environment Variables:** Create a `.env` file in the project root and add the necessary environment variables:
    ```
    PORT=YOUR_PORT
    INFURA_ID=YOUR_INFURA_ID
    PRIVATE_KEY=YOUR_PRIVATE_KEY
    FRONTEND=http://localhost:3000
    FRONTEND2=http://localhost:3001
    ```
4. **Start the Development Server:** Start the development server by running:
    ```bash
    npm run dev
    ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.