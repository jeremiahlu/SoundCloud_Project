'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlaylistSong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }
  PlaylistSong.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
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
    modelName: 'PlaylistSong',

    defaultScope: {
      attributes: {
        exclude: [ 'createdAt', 'updatedAt']
      }
    }
  });
  return PlaylistSong;
};