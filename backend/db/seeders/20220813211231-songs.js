'use strict';

const { Album, User } = require('../models');

const usersAlbum = [
  { 
    userId: 4,
    albumId: 1,
    title: 'DAMN.',
    songTitle: [
      {userId: 4, title: 'BLOOD.', url: 'audio url',
      previewImage: 'image url'},
      {userId: 4, title: 'DNA.', url: 'audio url',
        previewImage: 'image url'},
      {userId: 4, title: 'YAH.', url: 'audio url',
        previewImage: 'image url'},
      {userId: 4, title: 'ELEMENT.', url: 'audio url',
        previewImage: 'image url'},
      {userId: 4, title: 'FEEL.', url: 'audio url',
        previewImage: 'image url'},
      {userId: 4, title: 'LOYALTY.', url: 'audio url',
        previewImage: 'image url'},
      {userId: 4, title: 'PRIDE.', url: 'audio url',
        previewImage: 'image url'},
      {userId: 4, title: 'HUMBLE.', url: 'audio url',
        previewImage: 'image url'},
      {userId: 4, title: 'LUST.', url: 'audio url',
        previewImage: 'image url'},
      {userId: 4, title: 'LOVE.', url: 'audio url',
        previewImage: 'image url'},
      {userId: 4, title: 'XXX.', url: 'audio url',
        previewImage: 'image url'},
      {userId: 4, title: 'FEAR.', url: 'audio url',
        previewImage: 'image url'},
      {userId: 4, title: 'GOD.', url: 'audio url',
        previewImage: 'image url'},
      {userId: 4, title: 'DUCKWORTH.', url: 'audio url',
        previewImage: 'image url'},
    ]
  },
  {
    userId: 5,
    albumId: 2,
    title: 'Oops!...I Did It Again',
    songTitle: [
      {userId: 5, title: 'Oops!...I Did It Again', url: 'audio url',
      previewImage: 'image url'},
      {userId: 5, title: 'Stronger', url: 'audio url',
        previewImage: 'image url'},
      {userId: 5, title: 'Don"t Go Knockin on My Door', url: 'audio url',
        previewImage: 'image url'},
      {userId: 5, title: '(I Can"t Get No) Satisfaction', url: 'audio url',
        previewImage: 'image url'},
      {userId: 5, title: 'Don"t Let Me Be the Last to Know', url: 'audio url',
        previewImage: 'image url'},
      {userId: 5, title: 'What U See(Is What U Get)', url: 'audio url',
        previewImage: 'image url'},
      {userId: 5, title: 'Lucky', url: 'audio url',
        previewImage: 'image url'},
      {userId: 5, title: 'One Kiss From You', url: 'audio url',
        previewImage: 'image url'},
      {userId: 5, title: 'Where Are You Now', url: 'audio url',
        previewImage: 'image url'},
      {userId: 5, title: 'Can"t Make You Love Me', url: 'audio url',
        previewImage: 'image url'},
      {userId: 5, title: 'When Your Eyes Say It', url: 'audio url',
        previewImage: 'image url'},
      {userId: 5, title: 'Dear Diary', url: 'audio url',
        previewImage: 'image url'},
    ]
  },
  {
    userId: 6,
    albumId: 3,
    title: 'Fearless',
    songTitle: [
      {userId: 6, title: 'Fearless', url: 'audio url',
        previewImage: 'image url'},
      {userId: 6, title: 'Fifteen', url: 'audio url',
        previewImage: 'image url'},
      {userId: 6, title: 'Love Story', url: 'audio url',
        previewImage: 'image url'},
      {userId: 6, title: 'Hey Stephen', url: 'audio url',
        previewImage: 'image url'},
      {userId: 6, title: 'White Horse', url: 'audio url',
        previewImage: 'image url'},
      {userId: 6, title: 'You Belong With Me', url: 'audio url',
        previewImage: 'image url'},
      {userId: 6, title: 'Breathe', url: 'audio url',
        previewImage: 'image url'},
      {userId: 6, title: 'Tell Me Why', url: 'audio url',
        previewImage: 'image url'},
      {userId: 6, title: 'You"re Not Sorry', url: 'audio url',
        previewImage: 'image url'},
      {userId: 6, title: 'The Way I Loved You', url: 'audio url',
        previewImage: 'image url'},
      {userId: 6, title: 'Forever & Always', url: 'audio url',
        previewImage: 'image url'},
      {userId: 6, title: 'The Best Day', url: 'audio url',
        previewImage: 'image url'},
      {userId: 6, title: 'Change', url: 'audio url',
        previewImage: 'image url'}
    ]
  },
  { 
    userId: 7,
    albumId: 4,
    title: 'It Was Good Until It Wasn"t',
    songTitle: [
      {userId: 7, title: 'Toxic.', url: 'audio url',
        previewImage: 'image url'},
      {userId: 7, title: 'Can I', url: 'audio url',
        previewImage: 'image url'},
      {userId: 7, title: 'Bad News', url: 'audio url',
        previewImage: 'image url'},
      {userId: 7, title: 'Real Hot Girl Skit', url: 'audio url',
        previewImage: 'image url'},
      {userId: 7, title: 'Water', url: 'audio url',
        previewImage: 'image url'},
      {userId: 7, title: 'Change Your Life', url: 'audio url',
        previewImage: 'image url'},
      {userId: 7, title: 'Belong To The Streets Skit', url: 'audio url',
        previewImage: 'image url'},
      {userId: 7, title: 'Everybody Business', url: 'audio url',
        previewImage: 'image url'},
      {userId: 7, title: 'Hate The Club', url: 'audio url',
        previewImage: 'image url'},
      {userId: 7, title: 'Serial Lover', url: 'audio url',
        previewImage: 'image url'},
      {userId: 7, title: 'F&MU', url: 'audio url',
        previewImage: 'image url'},
      {userId: 7, title: 'Can You Blame Me', url: 'audio url',
        previewImage: 'image url'},
      {userId: 7, title: 'Grieving', url: 'audio url',
        previewImage: 'image url'},
      {userId: 7, title: 'Open(Passionate', url: 'audio url',
        previewImage: 'image url'},
      {userId: 7, title: 'Lexii"s Outro', url: 'audio url',
        previewImage: 'image url'},
    ]
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {
    for (let albumIdx = 0; albumIdx < usersAlbum.length; albumIdx++) {
      const { userId, albumId, title, songTitle } = usersAlbum[albumIdx];
      const album = await Album.findOne({ where: { title }});

      for (let songIdx = 0; songIdx < songTitle.length; songIdx++) {
        const song = songTitle[songIdx];
        await album.createSong(song);
      }
    }
  },
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */


  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     for (let albumIdx = 0; albumIdx < usersAlbums.length; albumIdx++) {
      const { userId, albumId, title, songTitle } = usersAlbum[albumIdx];
      const album = await Album.findOne({ where: { title }});

      for (let songIdx = 0; songIdx < songTitle.length; songIdx++) {
        const song = songTitle[songIdx];
        await album.destroy( {where: song} );
      }
    }
  }
};
