"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Albums", [
      {
        userId: 4,
        title: "DAMN.",
        description:
          "Fourth studio album by American rapper Kendrick Lamar. Released on April 14, 2017, through Top Dawg Entertainment, Aftermath Entertainment and Interscope Records",
        previewImage:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTl45jVeQyHWxcEOdaIh0uND5BGYC_Zdk_ww&usqp=CAU",
      },
      {
        userId: 5,
        title: "Oops!...I Did It Again",
        description:
          "Oops!... I Did It Again is the second studio album by American pop singer Britney Spears released on May 3, 2000, through Jive Records. ",
        previewImage:
          "https://upload.wikimedia.org/wikipedia/en/2/24/Britney_Spears_-_Oops%21..._I_Did_It_Again.png",
      },
      {
        userId: 6,
        title: "Fearless",
        description:
          "Fearless is the second studio album by American singer-songwriter Taylor Swift. It was released November 11, 2008 by Big Machine Records in the U.S. and Canada, and was available internationally beginning in 2009",
        previewImage:
          "https://upload.wikimedia.org/wikipedia/en/8/86/Taylor_Swift_-_Fearless.png",
      },
      {
        userId: 7,
        title: 'It Was Good Until It Wasn"t',
        description:
          'It Was Good Until It Wasn"t is the second studio album by American singer and songwriter Kehlani. It was released on May 8, 2020, by Atlantic Records. ',
        previewImage:
          "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2020%2F04%2Fkehlani-it-was-good-until-it-wasnt-new-album-info-000.jpg?w=960&cbr=1&q=90&fit=max",
      },
      {
        userId: 8,
        title: "The College Dropout",
        description:
          "The College Dropout is the debut studio album by American rapper and producer Kanye West. It was released on February 10, 2004, by Def Jam Recordings and Jay-Z's Roc-A-Fella Records.",
        previewImage:
          "https://upload.wikimedia.org/wikipedia/en/a/a3/Kanyewest_collegedropout.jpg",
      },
      {
        userId: 9,
        title: "Man On The Moon: The End of Day",
        description:
          "Man on the Moon: The End of Day is the debut studio album by American rapper Kid Cudi. It was released on September 15, 2009, through Dream On, GOOD Music, and Universal Motown Records.",
        previewImage:
          "https://upload.wikimedia.org/wikipedia/en/2/26/ManonTheMoonTheEndofDay.jpg",
      },
      {
        userId: 10,
        title: "Dangerous Woman",
        description:
          "Dangerous Woman is the third studio album by American singer Ariana Grande. It was released through Republic Records on May 20, 2016. Grande began work on the album shortly after the release of her second studio album My Everything",
        previewImage:
          "https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png",
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
        name: {
          [Op.in]: [
            "DAMN.",
            "Fearless",
            "Oops!...I Did It Again",
            'It Was Good Until It Wasn"t',
            "The College Dropout",
            "Man On The Moon: The End of Day",
            "Dangerous Woman"
          ],
        },
      },
      {}
    );
  },
};
