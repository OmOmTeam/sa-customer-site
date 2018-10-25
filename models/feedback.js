'use strict';
module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define('Feedback', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    feedback: DataTypes.TEXT,
    synchronized: DataTypes.BOOLEAN
  }, {});
  Feedback.associate = function(models) {
    // associations can be defined here
  };
  return Feedback;
};