/*
    Users routes 
    localhost:4005/api/employees
 */
    const { Router } = require('express')
    const router = Router();
    
    const { GetAllEmployees, CreateEmployee, UpdateEmployee } = require('../../controllers/Employees/EmployeesController')
    
    //get all employees
    
    router.get('/allEmployees', GetAllEmployees)
    
    //create employee
    
    router.post('/newEmployee', CreateEmployee)
    
    //Update employee
    
    router.put('/updateEmployee', UpdateEmployee)
    
    module.exports = router;