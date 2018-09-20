import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isAlphanumeric: {
          args: true,
          msg: 'Username can only contain letters and numbers',
        },
        len: {
          args: [3, 25],
          msg: 'Username must be between 3 and 25 characters long',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3, 25],
          msg: 'Password must be between 5 and 100 characters long',
        },
      },
    },
  },
  {
    hooks: {
      afterValidate: async user => {
        // eslint-disable-next-line no-param-reassign
        user.password = await bcrypt.hash(user.password, 12);
      },
    },
  });

  User.associate = models => {
    // M:M
    User.belongsToMany(models.Team, {
      through: models.Member,
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
    });
    // M:M
    User.belongsToMany(models.Channel, {
      through: 'channel_member',
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
    });
  };

  return User;
};
