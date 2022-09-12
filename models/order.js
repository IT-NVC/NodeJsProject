module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        userId: {
            type: DataTypes.UUID,
        },
        deliveryAddress:{
            type: DataTypes.STRING,
        },
        statusOrder:{
            type: DataTypes.STRING,
        },
        totalMoney:{
          allowNull: false,
          type:DataTypes.STRING
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
      },{});

      Order.associate = function (models) {
        
        Order.belongsTo(models.User, {
          foreignKey: 'userId',
        });

        Order.hasMany(models.SubOrder,{
            foreignKey:'orderId',
        })
      };
      return Order;
  };