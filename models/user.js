module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      roleId: {
        type: DataTypes.UUID,
      }, 
      refreshToken:{
        type:DataTypes.TEXT,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      address:{
        type:DataTypes.STRING,
      },
      phone:{
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },{});

    User.associate = function (models) {
        User.belongsTo(models.Role, {
            foreignKey: 'roleId',
        });

        User.hasMany(models.Order,{
            foreignKey:'userId'
        })
    }

    return User
}