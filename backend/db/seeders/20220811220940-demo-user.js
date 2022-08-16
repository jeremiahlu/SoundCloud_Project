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
        password: bcrypt.hashSync('password')
      },
      {
        firstName: 'Dannie',
        lastName: 'Won',
        email: 'purplesoda@gmail.com',
        username: 'purplesoda',
        password: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Larrie',
        lastName: 'Li',
        email: 'larrieli@gmail.com',
        username: 'asapbeef',
        password: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Kendrick',
        lastName: 'Lamar',
        email: 'klamar@gmail.com',
        username: 'Kendrick',
        password: bcrypt.hashSync('password4')
      },
      {
        firstName: 'Britney',
        lastName: 'Spears',
        email: 'bspears@gmail.com',
        username: 'Britney',
        password: bcrypt.hashSync('password5')
      },
      {
        firstName: 'Taylor',
        lastName: 'Swift',
        email: 'tswift@gmail.com',
        username: 'Taylor',
        password: bcrypt.hashSync('password6')
      },
      {
        firstName: 'Kehlani',
        lastName: 'Parrish',
        email: 'kparish@gmail.com',
        username: 'Kehlani',
        password: bcrypt.hashSync('password7')
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