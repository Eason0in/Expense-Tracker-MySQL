'use strict'
module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define(
    'Record',
    {
      name: DataTypes.STRING,
      category: DataTypes.STRING,
      date: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      userId: DataTypes.INTEGER
    },
    {}
  )
  Record.associate = function(models) {
    // associations can be defined here
    Record.belongsTo(models.User, { foreignKey: 'userId' })
  }
  return Record
}
