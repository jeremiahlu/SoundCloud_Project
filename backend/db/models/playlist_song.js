'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist_Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }
  Playlist_Song.init({
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
    modelName: 'Playlist_Song',

    defaultScope: {
      attributes: {
        exclude: [ 'createdAt', 'updatedAt']
      }
    }
  });
  return Playlist_Song;
};