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
db.avaliacao = require('../model/avaliacao.js')(sequelize, Sequelize);
 
 
db.role.belongsToMany(db.user, { through: 'user_roles', foreignKey: 'roleId', otherKey: 'userId'});
db.user.belongsToMany(db.role, { through: 'user_roles', foreignKey: 'userId', otherKey: 'roleId'});

db.avaliacao.belongsToMany(db.local, { through: 'local_avaliacao', foreignKey: 'avaliacaoId', otherKey: 'localId'});
db.local.belongsToMany(db.avaliacao, { through: 'local_avaliacao', foreignKey: 'localId', otherKey: 'avaliacaoId'});
 
module.exports = db;