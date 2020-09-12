const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.user = require('../model/user.js')(sequelize, Sequelize);
db.role = require('../model/role.js')(sequelize, Sequelize);
db.local = require('../model/local.js')(sequelize, Sequelize);
db.valorAvaliacao = require('../model/valorAvaliacao.js')(sequelize, Sequelize);
db.avaliacao = require('../model/Avaliacao.js')(sequelize, Sequelize);
 
 
db.role.belongsToMany(db.user, { through: 'user_roles', foreignKey: 'roleId', otherKey: 'userId'});
db.user.belongsToMany(db.role, { through: 'user_roles', foreignKey: 'userId', otherKey: 'roleId'});

db.valorAvaliacao.belongsToMany(db.avaliacao, { through: 'avaliacao_valorAvaliacao', foreignKey: 'valorAvaliacaoId', otherKey: 'avaliacaoId'});
db.avaliacao.belongsToMany(db.valorAvaliacao, { through: 'avaliacao_valorAvaliacao', foreignKey: 'avaliacaoId', otherKey: 'valorAvaliacaoId'});
 
module.exports = db;