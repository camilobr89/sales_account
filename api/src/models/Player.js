const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "player",
        {
            player_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true, // Asegura que el nombre de usuario sea único
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true, // Asegura que el email sea único
            },
            password: {
                type: DataTypes.STRING(60), // Acomoda la longitud para hashes de bcrypt
                allowNull: false,
            },
        },
        {
            // Reactivamos los timestamps
            timestamps: true,
            createdAt: 'created_at', // Opcional: renombrar a formato snake_case
            updatedAt: 'updated_at', // Opcional: renombrar a formato snake_case
        }
    );
};
