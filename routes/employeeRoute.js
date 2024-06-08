import express from "express";
import cookieParser from "cookie-parser";
import {
    getOwner,
    getTotalEmployees,
    addEmployee,
    deleteEmployee,
    getAllEmployees,
    getEmployeeById,
} from "../controllers/employeeControllers.js";

const router = express.Router();

// Use cookie-parser middleware
router.use(cookieParser());

router.get('/owner', getOwner);
router.get('/totalEmployees', getTotalEmployees);
router.post('/addEmployee', addEmployee);
router.delete('/deleteEmployee/:employeeId', deleteEmployee);
router.get('/:employeeId', getEmployeeById);
router.get('/all/getAllEmployees', getAllEmployees);

export default router;
