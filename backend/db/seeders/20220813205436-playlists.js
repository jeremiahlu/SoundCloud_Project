'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Playlists', [
      {
        userId: 7,
        name: 'R&B Playlist',
        imageURL: 'https://image.shutterstock.com/image-photo/pink-neon-sign-rnb-club-260nw-1992688202.jpg'
      },
      {
        userId: 5,
        name: 'Pop Playlist',
        imageURL: 'https://i.scdn.co/image/ab67616d0000b27300586d48246076eaf6369afb'
      },
      {
        userId: 6,
        name: 'Country Playlist',
        imageURL: 'https://i.scdn.co/image/ab67706f000000031416f67f937b9ee33b3753e2'
      },
      {
        userId: 4,
        name: 'Rap Playlist',
        imageURL: 'https://i1.sndcdn.com/artworks-OWRlJVexdDzo99ZL-DWQqOA-t500x500.jpg'
      }
    ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Playlists', {
      name: { [Op.in]: ['Country Playlist', 'Pop Playlist', 'R&B Playlist'] }
    }, {});
  }
};
