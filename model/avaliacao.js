module.exports = (sequelize, Sequelize) => {
    const Avaliacao = sequelize.define('avaliacoes', {
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true
      },
      avaliacao: {
        type: Sequelize.STRING
      }
    });
    
    return Avaliacao;
  }