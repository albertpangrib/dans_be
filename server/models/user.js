'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: '../../api.env' })

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }

    toJSON() {
      const values = { ...this.get() };
      delete values.password;
      delete values.token;
      return values;
    }

    static async generateAuthToken(id) {
      const token = jwt.sign({ id: id.toString() }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
      });
      this.token = this.token ? this.token.concat({ token }) : [{ token }];
      await User.update({ token }, { where: { id } });
      return token;
    }

    static async findByCredentials(username) {
      const user = await User.findOne({ where: { username }});
      if(!user) {
        throw new Error('Unable to login: wrong username');
      }
      return user;
    }
  }

  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email is invalid',
        },
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8],
          msg: 'Password must be at least 8 character',
        },
        isNotPassword(value) {
          if (value.toLowerCase().includes('password')) {
            throw new Error('Password cannot contain "password"');
          }
        },
      },
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
      defaultValue: []
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt',
    underscored: false,
    hooks: {
      beforeSave: async (user, options) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
          user.salt = salt;
        }
      },
    }
  });

  return User;
};