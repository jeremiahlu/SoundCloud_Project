'use strict';
const bcrypt = require('bcryptjs');

const {
  Model,
  Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
      toSafeObject() {
        const { id, username, email } = this;
        return { id, username, email };
      }

      validatePassword(password) {
        return bcrypt.compareSync(password, this.password.toString());
      }

      static getCurrentUserById(id) {
        return User.scope("currentUser").findByPk(id);
      }

      static async login({ credential, password }) {
        const { Op } = require('sequelize');
        const user = await User.scope('loginUser').findOne({
          where: {
            [Op.or]: {
              username: credential,
              email: credential
            }
          }
        });
        if (user && user.validatePassword(password)) {
          return await User.scope('currentUser').findByPk(user.id);
        }
      }

      static async signup({ firstName, lastName, username, email, password:pwd }) {
        const password = bcrypt.hashSync(pwd);
        const user = await User.create({
          firstName,
          lastName,
          username,
          email,
          password
        });
        return await User.scope('currentUser').findByPk(user.id);
      }


    static associate(models) {
      // define association here
      User.hasMany(
        models.Playlist, {foreignKey: 'userId'}
      )
      User.hasMany(
        models.Comment, {foreignKey: 'userId', onDelete: 'CASCADE'}
      )
      User.hasMany(
        models.Song, {foreignKey: 'userId', onDelete: 'CASCADE'}
      )
      User.hasMany(
        models.Album, {foreignKey: 'userId', onDelete: 'CASCADE'}
      )
      
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName:{
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
      }
    },
    password: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [0, 60]
      }
    },
    previewImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',

    defaultScope: {
      attributes: {
        exclude: [ "password", "createdAt", "updatedAt" ]
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: [ "password", "previewImage","createdAt", "updatedAt" ] }
      },
      loginUser: {
        attributes: {}
      }
    }
  });
  return User;
};