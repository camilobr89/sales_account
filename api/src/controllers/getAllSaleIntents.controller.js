const { SaleIntent, Player } = require('../db');

const getAllSaleIntents = async (req, res) => {
    try {
        console.log("Inicio del controlador getAllSaleIntents"); // Punto 1

        const saleIntents = await SaleIntent.findAll({
            attributes: ['price', 'status'], // Selecciona el precio y el estado de la intención de compra
            include: [{
                model: Player,
                attributes: ['name'], // Selecciona solo el nombre del jugador
            }]
        });

        console.log("Intenciones de compra obtenidas:", saleIntents); // Punto 2

        // Transforma la respuesta para que tenga el formato deseado
        const formattedResponse = saleIntents.map(intent => ({
            name: intent.player.dataValues.name, 
            price: intent.price,
            status: intent.status
        }));
        

        console.log("Respuesta formateada:", formattedResponse); // Punto 3

        res.json(formattedResponse);
    } catch (error) {
        console.error("Error en el controlador:", error); // Punto 4
        res.status(500).send('Error al obtener las intenciones de compra');
    }
};

module.exports = { getAllSaleIntents };

