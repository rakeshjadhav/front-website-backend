const { DataTypes } = require('sequelize');



function User(sequelize) {
    const attributes = {
        user_id :       {type : DataTypes.STRING,allowNull: true,primaryKey: true, },
        user_firstname: { type: DataTypes.STRING, allowNull: false },
        user_lastname: { type: DataTypes.STRING, allowNull: false },
        user_email: { type: DataTypes.STRING, allowNull: false },
        username: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false }
    };

    const options = {
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('Users', attributes, options);
}
module.exports = User;