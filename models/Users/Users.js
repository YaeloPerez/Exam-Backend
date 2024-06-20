
const {Schema , model} = require ('mongoose');

const UserSchema = Schema ({

    EmployeeID:{
        type: String,
        trim: true
    },
    
    Email: {
        type: String,
        trim: true
    },

    Password: {
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
    }

});

module.exports = model ('Users' , UserSchema)