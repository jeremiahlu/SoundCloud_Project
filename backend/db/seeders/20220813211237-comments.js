'use strict';

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
    const commentGenerator = () => {
      let res = [];
      const comments = [
        'I love this song!',
        'Another banger',
        'This beat!',
        'Crazyyy',
        'WOW!',
        'Lit',
        'Terrible song',
        'Check out my mixtape',
        'I knew about this before they blew up',
        'Niceeee'
      ];
      comments.forEach((el) => {
        res.push({
          userId: Math.round(Math.random() * 7),
          songId: Math.round(Math.random() * 53),
          body: comments[Math.round(Math.random() * 10)]
        })
      })
      return res;
    }
    const allComments = commentGenerator();
    await queryInterface.bulkInsert('Comments', allComments)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */ await queryInterface.bulkDelete('Comments', { [Op.or]: allComments })
  }
};
