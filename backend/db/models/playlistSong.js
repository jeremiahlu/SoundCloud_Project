"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PlaylistSong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PlaylistSong.belongsTo(models.Playlist, {
        foreignKey: "playlistId",
      });

      PlaylistSong.belongsTo(models.Song, {
        foreignKey: "songId",
      });

      PlaylistSong.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  PlaylistSong.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      playlistId: {
        type: DataTypes.INTEGER,
      },
      songId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "PlaylistSong",

      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );
  return PlaylistSong;
};
