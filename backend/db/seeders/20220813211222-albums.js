'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Albums', [
      {
        userId: 4,
        title: 'DAMN.',
        description: 'Fourth studio album by American rapper Kendrick Lamar. Released on April 14, 2017, through Top Dawg Entertainment, Aftermath Entertainment and Interscope Records',
        previewImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTl45jVeQyHWxcEOdaIh0uND5BGYC_Zdk_ww&usqp=CAU'
      },
      {
        userId: 5,
        title: 'Oops!...I Did It Again',
        description: 'Oops!... I Did It Again is the second studio album by American pop singer Britney Spears released on May 3, 2000, through Jive Records. Though much in the vein of her debut album ...Baby One More Time, a pop, dance-pop, and teen pop record, the album incorporates more funkier and R&B sounds.',
        previewImage: 'https://upload.wikimedia.org/wikipedia/en/2/24/Britney_Spears_-_Oops%21..._I_Did_It_Again.png'
      },
      {
        userId: 6,
        title: 'Fearless',
        description: 'Fearless is the second studio album by American singer-songwriter Taylor Swift. It was released November 11, 2008 by Big Machine Records in the U.S. and Canada, and was available internationally beginning in 2009',
        previewImage: 'https://upload.wikimedia.org/wikipedia/en/8/86/Taylor_Swift_-_Fearless.png'
      },
      {
        userId: 7,
        title: 'It Was Good Until It Wasn"t',
        description: 'It Was Good Until It Wasn"t is the second studio album by American singer and songwriter Kehlani. It was released on May 8, 2020, by Atlantic Records. It features guest appearances from Tory Lanez, Jhené Aiko, Masego, Lucky Daye and James Blake, as well as uncredited vocals by Ty Dolla Sign',
        previewImage: 'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2020%2F04%2Fkehlani-it-was-good-until-it-wasnt-new-album-info-000.jpg?w=960&cbr=1&q=90&fit=max'
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
      name: { [Op.in]: [ 'DAMN.', 'Fearless', 'Oops!...I Did It Again', 'It Was Good Until It Wasn"t' ] }
    }, {});
  }
};
