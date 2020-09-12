module.exports = (sequelize, Sequelize) => {
    const ValorAvaliacao = sequelize.define('valoresAvaliacao', {
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true
      },
      valorAvaliacao: {
        type: Sequelize.STRING
      }
    });
    
    return ValorAvaliacao;
  }