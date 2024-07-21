"use strict";

/** @type {import('sequelize-cli').Migration} */
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
    await queryInterface.bulkInsert(
      "lists",
      [
        {
          boardId: 1,
          title: "Ongoing",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          boardId: 1,
          title: "Testing",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          boardId: 1,
          title: "Completed",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("lists", null, {});
  },
};
