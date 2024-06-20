const { ObjectId } = require('mongodb');
const Employees = require('../../models/Employees/Employees')
const Users = require('../../models/Users/Users')
const bcrypt = require('bcryptjs')
const { formatInTimeZone } = require("date-fns-tz");


/*----------------------------------------
            Get All Employees
----------------------------------------*/

const GetAllEmployees = async (req, res) => {

    try {

        const listEmployees = await Users.find().sort({ "Name": 1 });

        res.status(200).json(
            {
                ok: true,
                msg: "Get all Employees",
                data: listEmployees
            });
    } catch (error) {

    }
}

/*----------------------------------------
                Create Employee
----------------------------------------*/

const CreateEmployee = async (req, res) => {

    try {
        const { EmployeeID } = req.body;

        const employeeExist = await Users.findOne({ EmployeeID });

        if (employeeExist) {

            return res.status(400).json(
                {
                    ok: false,
                    msg: `The employee already exists`,
                    data: null
                });
        }

        //Creacion de modelos

        const InfoUser = new Users();

        const InfoEmployee = new Employees();

        //Data recibida
        const NewUser = (req.body)


        InfoUser.EmployeeID = NewUser.EmployeeID
        InfoUser.Email = NewUser.Email

        //Encriptacion de pass
        const salt = bcrypt.genSaltSync();
        InfoUser.Password = bcrypt.hashSync(NewUser.Password, salt);

        InfoEmployee.EmployeeID = NewUser.EmployeeID
        InfoEmployee.Name = NewUser.Name
        InfoEmployee.Sex = NewUser.Sex
        InfoEmployee.DOB = NewUser.DOB
        InfoEmployee.PlaceOfBirth = NewUser.PlaceOfBirth
        InfoEmployee.RFC = NewUser.RFC

        await InfoUser.save()
        await InfoEmployee.save()

        res.status(201).json(
            {
                ok: true,
                msg: "Employee created",
            });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "An error ocurred while creating the employee",
            data: null
        })
    }
}


/*----------------------------------------
            Update User
----------------------------------------*/

const UpdateEmployee = async (req, res) => {

    try {

        const { EmployeeID } = req.body;
        const employeeExist = await Employees.findOne({ EmployeeID });
        const userExist = await Users.findOne({ EmployeeID });

        let userId = ObjectId(userExist._id)
        let empId = ObjectId(employeeExist._id)

        let timeZone = "America/Chihuahua"

        let now = new Date();
        let today = formatInTimeZone(now, timeZone, 'yyyy-MM-dd HH:mm:ss').replace(" ", "T")
        let todayFormat = new Date(`${today}Z`)

        if (!employeeExist) {

            return res.status(400).json(
                {
                    ok: false,
                    msg: `the user with employe id: ${EmployeeID} was not found`,
                    data: null
                });
        } else {

            //Creacion de modelos

            const InfoUser = new Users(userExist);

            const InfoEmployee = new Employees(employeeExist);

            //Data recibida
            const NewUser = (req.body)

            //No se puede actualizar numero de empleado


            InfoUser.Email = NewUser.Email
            InfoUser.Last_Update_Date = todayFormat

            //Encriptacion de pass
            const salt = bcrypt.genSaltSync();
            InfoUser.Password = bcrypt.hashSync(NewUser.Password, salt);

            InfoEmployee.Name = NewUser.Name
            InfoEmployee.Sex = NewUser.Sex
            InfoEmployee.DOB = NewUser.DOB
            InfoEmployee.PlaceOfBirth = NewUser.PlaceOfBirth
            InfoEmployee.RFC = NewUser.RFC
            InfoEmployee.Last_Update_Date = todayFormat

            await Users.findByIdAndUpdate(userId, InfoUser)
            await Employees.findByIdAndUpdate(empId, InfoEmployee)

            res.status(201).json(
                {
                    ok: true,
                    msg: "User and employee updated",
                });
        }
    } catch (error) {
        //console.log(error)
        res.status(500).json({
            ok: false,
            msg: "An error ocurred while updating the user",
            data: null
        })
    }

}


module.exports = {
    GetAllEmployees,
    CreateEmployee,
    UpdateEmployee
}