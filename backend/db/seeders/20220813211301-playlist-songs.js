"use strict";

const { Op } = require("sequelize");
const addPlaylistSongs = [
  { userId: 11, playlistId: 1, songId: 1 },
  { userId: 11, playlistId: 1, songId: 2 },
  { userId: 11, playlistId: 1, songId: 26 },
  { userId: 11, playlistId: 2, songId: 12 },
  { userId: 11, playlistId: 2, songId: 20 },
  { userId: 11, playlistId: 3, songId: 3 },
  { userId: 11, playlistId: 3, songId: 11 },
  { userId: 11, playlistId: 4, songId: 14 },
  { userId: 11, playlistId: 4, songId: 15 },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("PlaylistSongs", addPlaylistSongs);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("PlaylistSongs", {
      [Op.or]: addPlaylistSongs,
    });
  },
};
