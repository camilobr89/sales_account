const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define(
        "saleIntent",
        {
            sale_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            registration_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM("Pendiente", "Completada", "Cancelada"),
                allowNull: false,
                defaultValue: "Pendiente",
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
