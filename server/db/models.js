const Sequelize = require('sequelize');

const sequelize = new Sequelize('tbd', 'root', '12345');

const users = sequelize.define('user', {
  userName: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  facebookId: {
    type: Sequelize.STRING
  },
  token: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  }
}, {
  tableName: 'users',
  timestamps: false,
});

const PrivateRooms = sequelize.define('privaterooms', {
  url: {
    type: Sequelize.STRING
  },
}, {
  tableName: 'privaterooms',
});

PrivateRooms.belongsTo(users);
users.hasMany(PrivateRooms);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('It worked!');
  }, err => {
    console.log('An error occurred while creating the table:', err);
  });


sequelize
  .authenticate()
  .then(err => {
    console.log('sqlz Connection has been established successfully.');
  })
  .catch(err => {
    console.log('sqlz Unable to connect to the database:', err);
  });


module.exports.users = users;
