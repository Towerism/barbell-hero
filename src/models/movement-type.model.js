"use strict";

// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const { Sequelize } = require("sequelize");

const DataTypes = Sequelize.DataTypes;

module.exports = function(app) {
  const sequelizeClient = app.get("sequelizeClient");
  const movementType = sequelizeClient.define(
    "movement_type",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        }
      }
    }
  );

  // eslint-disable-next-line no-unused-vars
  movementType.associate = function(models) {
    movementType.hasMany(models.movement);
  };

  return movementType;
};
