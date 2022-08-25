'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Playlist.belongsTo(
        models.User, {foreignKey: 'userId'}
      )
      Playlist.belongsToMany(
        models.Song, {
          through: models.PlaylistSong, 
          hooks: true,
          foreignKey: 'playlistId',
          onDelete: 'CASCADE'
        }
      )
    }
  }
  Playlist.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
    },
    imageUrl: {
      type: DataTypes.STRING
    },
    previewImage: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Playlist',
    // freezeTableName: true,

    defaultScope: {
      attributes: {
        exclude: ['imageUrl']
      }
    }
    
  });
  return Playlist;
};