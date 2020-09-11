module.exports = (sequelize, Sequelize) => {
    const Local = sequelize.define('locais', {
      localNome: {
        type: Sequelize.STRING
      },
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
      organization: {
        type: Sequelize.STRING
      },
      comentario: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.STRING
      }
    });
    
    return Local;
  }

