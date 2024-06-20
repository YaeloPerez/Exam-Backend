const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.DB_EXAM_RIMAC, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex : true
        });
        console.log('Database RIMAC online')
    } catch (error) {
        console.log(error);
        throw new Error('An error ocurred while starting database')
    }
}

module.exports = {
    dbConnection
}