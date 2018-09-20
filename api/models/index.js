import Sequelize from 'sequelize';

const sequelize = new Sequelize('slack', 'postgres', 'postgres', {
  dialect: 'postgres',
  operatorsAliases: Sequelize.op,
  define: {
    underscored: true,
  },
});

const models = {
  Channel: sequelize.import('./channel.js'),
  Message: sequelize.import('./message.js'),
  Team: sequelize.import('./team.js'),
  User: sequelize.import('./user.js'),
  Member: sequelize.import('./member.js'),
  DirectMessage: sequelize.import('./directMessage.js'),
};

Object.keys(models).forEach(modelName => {
  if (Object.prototype.hasOwnProperty.call(models[modelName], 'associate')) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
