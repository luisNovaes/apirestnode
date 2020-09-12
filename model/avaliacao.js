module.exports = (sequelize, Sequelize) => {
    const Avaliacao = sequelize.define('avaliacoes', {
      
      userId: {
        type: Sequelize.STRING
      },
      localId: {
        type: Sequelize.STRING
      },
      comentario: {
        type: Sequelize.STRING
      }
      
    });
    
    return Avaliacao;
  }