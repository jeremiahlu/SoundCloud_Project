'use strict';

const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Stanly',
        lastName: 'O',
        email: 'stanleyou@gmail.com',
        username: 'stantheman',
        password: bcrypt.hashSync('password'),
        previewImage: "image url"
      },
      {
        firstName: 'Dannie',
        lastName: 'Won',
        email: 'purplesoda@gmail.com',
        username: 'purplesoda',
        password: bcrypt.hashSync('password2'),
        previewImage: "image url"
      },
      {
        firstName: 'Larrie',
        lastName: 'Li',
        email: 'larrieli@gmail.com',
        username: 'asapbeef',
        password: bcrypt.hashSync('password3'),
        previewImage: "image url"
      },
      {
        firstName: 'Kendrick',
        lastName: 'Lamar',
        email: 'klamar@gmail.com',
        username: 'Kendrick',
        password: bcrypt.hashSync('password4'),
        previewImage: "image url"
      },
      {
        firstName: 'Britney',
        lastName: 'Spears',
        email: 'bspears@gmail.com',
        username: 'Britney',
        password: bcrypt.hashSync('password5'),
        previewImage: "image url"
      },
      {
        firstName: 'Taylor',
        lastName: 'Swift',
        email: 'tswift@gmail.com',
        username: 'Taylor',
        password: bcrypt.hashSync('password6'),
        previewImage: "image url"
      },
      {
        firstName: 'Kehlani',
        lastName: 'Parrish',
        email: 'kparish@gmail.com',
        username: 'Kehlani',
        password: bcrypt.hashSync('password7'),
        previewImage: "image url"
      },
      {
        firstName: 'Demo',
        lastName: 'User',
        email: 'demouser@gmail.com',
        username: 'DemoUser',
        password: bcrypt.hashSync('password'),  
        previewImage: "image url"
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: [ 'Demo-lition', 'FakeUser1', 'FakeUser2','Taylor', 'Kendrick', 'Kehlani', 'Britney' ] }
    }, {});
  }
};