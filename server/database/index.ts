import config from 'config';
import { Sequelize } from 'sequelize-typescript';


const connectDB = async () => {
    const sequelize = new Sequelize(config.databaseURL, {
        database: 'test', // TODO: select from configs
        dialect: 'postgres',
        dialectOptions: {
            ssl: true,
        },
        models: [`${__dirname}/../models/*.sequelize.js`]
    });

    // Uncomment force: true to reset DB
    sequelize.sync({
        // alter: true,
    });
};

export default connectDB;
