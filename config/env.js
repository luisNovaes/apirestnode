const env = {
    database: 'desafio-backend',
    username: 'postgres',
    password: 'root',
    host: 'localhost',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
   
  module.exports = env;
  