'use strict';

const { v4: UUIDV4 } = require('uuid');
const { encrypt } = require('../../server/helpers/PasswordHelper');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { salt, hash } = encrypt('12345678')
      await queryInterface.bulkInsert('users', [{
        id: UUIDV4(),
        fullName: 'Admin',
        email: 'admin@example.com',
        username: 'admin',
        password: hash,
        salt: salt,
        token: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
