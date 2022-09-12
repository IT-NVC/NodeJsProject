module.exports = (sequelize, DataTypes) => {
    const SubOrder = sequelize.define('SubOrder', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        orderId: {
            type: DataTypes.INTEGER,
        },
        productId:{
          type: DataTypes.INTEGER,
        },
        amount:{
          allowNull: false,
          type: DataTypes.INTEGER
        },
        totalPrice:{
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
      SubOrder.associate = function (models) {

        SubOrder.belongsTo(models.Order,{
            foreignKey:'orderId',
        })

        SubOrder.belongsTo(models.Product,{
          foreignKey:'productId',
      })
      };
      return SubOrder;
  };