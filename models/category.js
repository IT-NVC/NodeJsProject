module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        name:{
          allowNull: false,
          type: DataTypes.STRING
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
      }, {});
      Category.associate = function (models) {
        Category.hasMany(models.Product,{
            foreignKey:'categoryId',
        })
      };
      return Category;
  };