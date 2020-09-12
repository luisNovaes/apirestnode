module.exports = (sequelize, Sequelize) => {
    const Local = sequelize.define('locais', {
      
      city: {
        type: Sequelize.STRING
      },
      regiao: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      lat: {
        type: Sequelize.STRING
      },
      lon: {
        type: Sequelize.STRING
      },
      nomelocal: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.STRING
      }
    });
    
    return Local;
  }

