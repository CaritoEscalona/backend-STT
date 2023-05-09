import Sequelize from 'sequelize';

export const sequelize = new Sequelize('sistemaTejidos', 'postgres', 'pass1234', {
    host: 'sistematejidos.cbrvft6phepf.eu-north-1.rds.amazonaws.com',
// export const sequelize = new Sequelize('sistemaTejidos', 'postgres', 'pass123', {
//    host: 'localhost',
    dialect: 'postgres',
    // Comentar dialectOptions para desarrollo local
    dialectOptions: {
        ssl: {
           rejectUnauthorized: false,
        }
    },
    //comentar logging para mostrar data de bdd al iniciar
    logging: false
});