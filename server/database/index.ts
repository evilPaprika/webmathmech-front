import { Sequelize } from 'sequelize-typescript';
import config from 'config';

const connectDB = async () => {
    const sequelize = new Sequelize(config.databaseURL, {
        database: 'test',
        dialect: 'postgres',
        dialectOptions: {
            ssl: true,
        },
        modelPaths: [`${__dirname}/../models/*.sequelize.js`]
    });

    // Uncomment force: true to reset DB
    sequelize.sync({
        // force: true,
    });
};

export default connectDB;
