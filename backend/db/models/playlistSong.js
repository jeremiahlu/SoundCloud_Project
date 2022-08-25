'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class playlistSong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }
  playlistSong.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    playlistId: {
      type: DataTypes.INTEGER,
    },
    songId: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'playlistSong',

    defaultScope: {
      attributes: {
        exclude: [ 'createdAt', 'updatedAt']
      }
    }
  });
  return playlistSong;
};