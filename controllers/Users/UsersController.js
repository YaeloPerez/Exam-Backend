const Users = require('../../models/Users/Users')
const Employees = require('../../models/Employees/Employees');


/*----------------------------------------
            Get All Users
----------------------------------------*/

const GetAllUsers = async (req, res) => {

    try {

        const aggregateUsers =
            await Users.aggregate(
                [
                    {
                        '$lookup': {
                            'from': 'employees',
                            'localField': 'EmployeeID',
                            'foreignField': 'EmployeeID',
                            'as': 'InfoEmployee'
                        }
                    }
                ]
            );

        //const listUser = await Users.find().sort({ "Name": 1 });

        res.status(200).json(
            {
                ok: true,
                msg: "Get all users",
                data: aggregateUsers
            });
    } catch (error) {

    }
}


//------------------------------------------------------------------
//                      Delete User
//------------------------------------------------------------------

const DeleteUser = async (req, res = express.response) => {

    try {

        const _id = req.params.id;
        //console.log(_id)
        const user = await Users.findById(_id);

        //console.log(user)

        let EmployeeID = user.EmployeeID

        const employee = await Employees.findOne({ EmployeeID });

        //console.log(employee)

        let ObIdEmployee = employee._id;

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'User does not exist',
                data: null
            });
        }

        if (!employee) {
            return res.status(404).json({
                ok: false,
                msg: 'Employee does not exist',
                data: null
            });
        } else {

            await Users.findByIdAndDelete(_id);
            await Employees.findByIdAndDelete(ObIdEmployee)
            res.status(200).json({
                ok: true,
                msg: 'User & employee deleted',
                data: null
            })
        }

    } catch (error) {
        //console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'An error ocurred while deleting the user',
            data: null
        })
    }


}


module.exports = {
    GetAllUsers,
    DeleteUser
}