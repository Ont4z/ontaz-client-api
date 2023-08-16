import mongoose from 'mongoose';

const dbConnection = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_CN}`);
        console.log('database online');

    } catch (error) {
        console.log(error);
        throw new Error('error a la hora de iniciar la base de datos');
    }

}

module.exports = {
    dbConnection
}