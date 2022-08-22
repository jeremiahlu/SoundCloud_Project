'use strict';

const { Op } = require('sequelize');
const playlistSongs = [
  {playlistId: 1, songId: 2},
  {playlistId: 2, songId: 12},
  {playlistId: 3, songId: 3},
  {playlistId: 4, songId: 14},
  {playlistId: 1, songId: 26},
  {playlistId: 2, songId: 20},
  {playlistId: 3, songId: 30},
  {playlistId: 4, songId: 51},
  {playlistId: 1, songId: 1},
]

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Playlist_Songs', playlistSongs)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */   
    await queryInterface.bulkDelete('Playlist_Songs', { [Op.or]: playlistSongs })
  }
};
