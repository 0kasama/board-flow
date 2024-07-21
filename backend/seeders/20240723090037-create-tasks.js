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
      "tasks",
      [
        {
          listId: 1,
          title: "No Description and Due Date",
          createdAt: new Date(),
          updatedAt: new Date(),
          
        },
        {
          listId: 1,
          title: "Complete Example",
          description: "This is description",
          dueDate: "2024-08-01",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          listId: 2,
          title: "With Description",
          description: "This is description",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          listId: 3,
          title: "With Due Date",
          dueDate: "2024-08-01",
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
    await queryInterface.bulkDelete("tasks", null, {});
  },
};
