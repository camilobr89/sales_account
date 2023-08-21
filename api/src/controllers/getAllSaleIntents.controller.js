const { SaleIntent, Player } = require('../db');

const getAllSaleIntents = async (req, res) => {
    try {
    
        const saleIntents = await SaleIntent.findAll({
            attributes: ['price', 'status'], // Selecciona el precio y el estado de la intención de compra
            include: [{
                model: Player,
                attributes: ['name'], // Selecciona solo el nombre del jugador
            }]
        });

        // Transforma la respuesta para que tenga el formato deseado
        const formattedResponse = saleIntents.map(intent => ({
            name: intent.player.dataValues.name, 
            price: intent.price,
            status: intent.status
        }));
        
        res.json(formattedResponse);
    } catch (error) {
        console.error("Error en el controlador:", error); // Punto 4
        res.status(500).send('Error al obtener las intenciones de compra');
    }
};

module.exports = { getAllSaleIntents };

