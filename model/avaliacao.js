module.exports = (sequelize, Sequelize) => {
    const Avaliacao = sequelize.define('avaliacoes', {
      
      userId: {
        type: Sequelize.STRING
      },
      localId: {
        type: Sequelize.STRING
      },
      comentarios: {
        type: Sequelize.STRING
      }
      
    });
    
    return Avaliacao;
  }