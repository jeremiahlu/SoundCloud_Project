"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Playlists", [
      {
        userId: 11,
        name: "R&B Playlist",
        previewImage:
          "https://image.shutterstock.com/image-photo/pink-neon-sign-rnb-club-260nw-1992688202.jpg",
        // previewImage: 'image url'
      },
      {
        userId: 11,
        name: "Pop Playlist",
        previewImage:
          "https://i.scdn.co/image/ab67616d0000b27300586d48246076eaf6369afb",
        // previewImage: 'image url'
      },
      {
        userId: 11,
        name: "Country Playlist",
        previewImage:
          "https://i.scdn.co/image/ab67706f000000031416f67f937b9ee33b3753e2",
        // previewImage: 'image url'
      },
      {
        userId: 11,
        name: "Rap Playlist",
        previewImage:
          "https://i1.sndcdn.com/artworks-OWRlJVexdDzo99ZL-DWQqOA-t200x200.jpg",
        // previewImage: 'image url'
      },
    ]);
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

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Playlists",
      {
        name: { [Op.in]: ["Country Playlist", "Pop Playlist", "R&B Playlist"] },
      },
      {}
    );
  },
};
