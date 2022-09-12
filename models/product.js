module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        categoryId:{
          type: DataTypes.INTEGER,
        },
        name:{
          allowNull: false,
          type: DataTypes.STRING
        },
        quantity:{
          allowNull: false,
          type: DataTypes.INTEGER
        },
        quantitySold:{
          allowNull: false,
          type: DataTypes.INTEGER
        },
        price:{
          allowNull: false,
          type: DataTypes.STRING
        },
        LinkImg:{
          allowNull: true,
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


      Product.associate = function (models) {
        Product.hasMany(models.SubOrder,{
            foreignKey:'productId',
        })

        Product.belongsTo(models.Category,{
          foreignKey:'categoryId',
      })
      };
      return Product;
  };