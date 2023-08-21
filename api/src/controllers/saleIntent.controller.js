// controllers/saleIntentController.js
const { Player, SaleIntent } = require('../db');

const createSaleIntent = async (req, res) => {
    const { playerPlayerId, price } = req.body;

    try {
        // Verificar si el playerId existe
        const player = await Player.findByPk(playerPlayerId);
        if (!player) {
            return res.status(400).json({ message: 'Jugador no encontrado' });
        }

        // Crear intención de compra
        const saleIntent = await SaleIntent.create({
            playerPlayerId,
            price,
            status: 'Pendiente'
        });

        res.status(201).json(saleIntent);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al crear la intención de compra');
    }
};

module.exports = { createSaleIntent };
