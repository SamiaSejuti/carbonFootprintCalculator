// MySQL DB connect
module.exports = {
    HOST: 'carbonezero.mysql.database.azure.com',
    USER: 'Kshitijahire',
    PASSWORD: 'Onboardingproject2023',
    DB: 'carbonezero',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};