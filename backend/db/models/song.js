'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Song.hasMany(
        models.Comment, {foreignKey: 'songId', onDelete: 'CASCADE'}
      )
      Song.belongsTo(
        models.User, { as: 'Artists', foreignKey: 'userId'}
      )
      Song.belongsToMany(
        models.Playlist, {through: models.Playlist_Song}
      )
      Song.belongsTo(
        models.Album, {foreignKey: 'albumId'}
      )
    }
  }
  Song.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    albumId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    url: DataTypes.STRING,
    previewImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};