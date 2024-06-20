
const {Schema , model} = require ('mongoose');

const EmployeesSchema = Schema ({
    
    EmployeeID:{
        type: String,
        trim: true
    },
    
    Name:{
        type: String,
        trim: true
    },

    Sex:{
        type: String,
        trim: true
    },

    DOB:{
        type: String,
        trim: true
    },

    PlaceOfBirth:{
        type: String,
        trim: true
    },

    RFC:{
        type: String,
        trim: true
    },
    
    Creation_Date:{
        type: Date,
        require: true,
        default: Date.now 
    },

    Last_Update_Date:{
        type: Date,
        require: true,
        default: null
    },

});

module.exports = model ('Employees' , EmployeesSchema)