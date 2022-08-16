'use strict';

const { Album, User } = require('../models');

const usersAlbum = [
  { 
    userId: 3,
    albumId: 1,
    title: 'DAMN.',
    songTitle: [
      {userId: 3, title: 'BLOOD.'},
      {userId: 3, title: 'DNA.'},
      {userId: 3, title: 'YAH.'},
      {userId: 3, title: 'ELEMENT.'},
      {userId: 3, title: 'FEEL.'},
      {userId: 3, title: 'LOYALTY.'},
      {userId: 3, title: 'PRIDE.'},
      {userId: 3, title: 'HUMBLE.'},
      {userId: 3, title: 'LUST.'},
      {userId: 3, title: 'LOVE.'},
      {userId: 3, title: 'XXX.'},
      {userId: 3, title: 'FEAR.'},
      {userId: 3, title: 'GOD.'},
      {userId: 3, title: 'DUCKWORTH.'},
    ]
  },
  {
    userId: 4,
    albumId: 2,
    title: 'Oops!...I Did It Again',
    songTitle: [
      {userId: 4, title: 'Oops!...I Did It Again'},
      {userId: 4, title: 'Stronger'},
      {userId: 4, title: 'Don"t Go Knockin on My Door'},
      {userId: 4, title: '(I Can"t Get No) Satisfaction'},
      {userId: 4, title: 'Don"t Let Me Be the Last to Know'},
      {userId: 4, title: 'What U See(Is What U Get)'},
      {userId: 4, title: 'Lucky'},
      {userId: 4, title: 'One Kiss From You'},
      {userId: 4, title: 'Where Are You Now'},
      {userId: 4, title: 'Can"t Make You Love Me'},
      {userId: 4, title: 'When Your Eyes Say It'},
      {userId: 4, title: 'Dear Diary'},
    ]
  },
  {
    userId: 5,
    albumId: 3,
    title: 'Fearless',
    songTitle: [
      {userId: 5, title: 'Fearless'},
      {userId: 5, title: 'Fifteen'},
      {userId: 5, title: 'Love Story'},
      {userId: 5, title: 'Hey Stephen'},
      {userId: 5, title: 'White Horse'},
      {userId: 5, title: 'You Belong With Me'},
      {userId: 5, title: 'Breathe'},
      {userId: 5, title: 'Tell Me Why'},
      {userId: 5, title: 'You"re Not Sorry'},
      {userId: 5, title: 'The Way I Loved You'},
      {userId: 5, title: 'Forever & Always'},
      {userId: 5, title: 'The Best Day'},
      {userId: 5, title: 'Change'}
    ]
  },
  { 
    userId: 6,
    albumId: 4,
    title: 'It Was Good Until It Wasn"t',
    songTitle: [
      {userId: 6, title: 'Toxic.'},
      {userId: 6, title: 'Can I'},
      {userId: 6, title: 'Bad News'},
      {userId: 6, title: 'Real Hot Girl Skit'},
      {userId: 6, title: 'Water'},
      {userId: 6, title: 'Change Your Life'},
      {userId: 6, title: 'Belong To The Streets Skit'},
      {userId: 6, title: 'Everybody Business'},
      {userId: 6, title: 'Hate The Club'},
      {userId: 6, title: 'Serial Lover'},
      {userId: 6, title: 'F&MU'},
      {userId: 6, title: 'Can You Blame Me'},
      {userId: 6, title: 'Grieving'},
      {userId: 6, title: 'Open(Passionate'},
      {userId: 6, title: 'Lexii"s Outro'},
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
