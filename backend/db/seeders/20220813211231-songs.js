'use strict';

const { Album, User } = require('../models');

const usersAlbum = [
  { 
    userId: 4,
    albumId: 1,
    title: 'DAMN.',
    songTitle: [
      {userId: 4, title: 'BLOOD.'},
      {userId: 4, title: 'DNA.'},
      {userId: 4, title: 'YAH.'},
      {userId: 4, title: 'ELEMENT.'},
      {userId: 4, title: 'FEEL.'},
      {userId: 4, title: 'LOYALTY.'},
      {userId: 4, title: 'PRIDE.'},
      {userId: 4, title: 'HUMBLE.'},
      {userId: 4, title: 'LUST.'},
      {userId: 4, title: 'LOVE.'},
      {userId: 4, title: 'XXX.'},
      {userId: 4, title: 'FEAR.'},
      {userId: 4, title: 'GOD.'},
      {userId: 4, title: 'DUCKWORTH.'},
    ]
  },
  {
    userId: 5,
    albumId: 2,
    title: 'Oops!...I Did It Again',
    songTitle: [
      {userId: 5, title: 'Oops!...I Did It Again'},
      {userId: 5, title: 'Stronger'},
      {userId: 5, title: 'Don"t Go Knockin on My Door'},
      {userId: 5, title: '(I Can"t Get No) Satisfaction'},
      {userId: 5, title: 'Don"t Let Me Be the Last to Know'},
      {userId: 5, title: 'What U See(Is What U Get)'},
      {userId: 5, title: 'Lucky'},
      {userId: 5, title: 'One Kiss From You'},
      {userId: 5, title: 'Where Are You Now'},
      {userId: 5, title: 'Can"t Make You Love Me'},
      {userId: 5, title: 'When Your Eyes Say It'},
      {userId: 5, title: 'Dear Diary'},
    ]
  },
  {
    userId: 6,
    albumId: 3,
    title: 'Fearless',
    songTitle: [
      {userId: 6, title: 'Fearless'},
      {userId: 6, title: 'Fifteen'},
      {userId: 6, title: 'Love Story'},
      {userId: 6, title: 'Hey Stephen'},
      {userId: 6, title: 'White Horse'},
      {userId: 6, title: 'You Belong With Me'},
      {userId: 6, title: 'Breathe'},
      {userId: 6, title: 'Tell Me Why'},
      {userId: 6, title: 'You"re Not Sorry'},
      {userId: 6, title: 'The Way I Loved You'},
      {userId: 6, title: 'Forever & Always'},
      {userId: 6, title: 'The Best Day'},
      {userId: 6, title: 'Change'}
    ]
  },
  { 
    userId: 7,
    albumId: 4,
    title: 'It Was Good Until It Wasn"t',
    songTitle: [
      {userId: 7, title: 'Toxic.'},
      {userId: 7, title: 'Can I'},
      {userId: 7, title: 'Bad News'},
      {userId: 7, title: 'Real Hot Girl Skit'},
      {userId: 7, title: 'Water'},
      {userId: 7, title: 'Change Your Life'},
      {userId: 7, title: 'Belong To The Streets Skit'},
      {userId: 7, title: 'Everybody Business'},
      {userId: 7, title: 'Hate The Club'},
      {userId: 7, title: 'Serial Lover'},
      {userId: 7, title: 'F&MU'},
      {userId: 7, title: 'Can You Blame Me'},
      {userId: 7, title: 'Grieving'},
      {userId: 7, title: 'Open(Passionate'},
      {userId: 7, title: 'Lexii"s Outro'},
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
