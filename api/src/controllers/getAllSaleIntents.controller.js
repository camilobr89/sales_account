const { SaleIntent, Player } = require('../db');

const SALE_INTENT_STATUSES = {
    PENDING: 'Pendiente',
    CANCELED: 'Cancelada',
    COMPLETED: 'Completada'
  };
  

const getAllSaleIntents = async (req, res) => {
    try {
    
        const saleIntents = await SaleIntent.findAll({
            attributes: ['sale_id', 'price', 'status'], // Selecciona el precio y el estado de la intención de compra
            include: [{
                model: Player,
                attributes: ['name'], // Selecciona solo el nombre del jugador
            }]
        });

        // Transforma la respuesta para que tenga el formato deseado
        const formattedResponse = saleIntents.map(intent => ({
            sale_id: intent.sale_id,
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


const cancelSaleIntent = async (req, res) => {
    try {
        const { sale_id } = req.params;

        const saleIntent = await SaleIntent.findByPk(sale_id);
        if (!saleIntent) {
            return res.status(404).json({ message: 'Intención de compra no encontrada' });
        }

        saleIntent.status = SALE_INTENT_STATUSES.CANCELED;
        await saleIntent.save();

        res.json({ message: 'Intención de compra cancelada con éxito' });
    } catch (error) {
        console.error("Error en el controlador:", error);
        if (error.name === 'SequelizeDatabaseError' && error.parent.code === '22P02') {
            res.status(400).send('Valor inválido para el estado de la intención de compra');
        } else {
            res.status(500).send('Error al cancelar la intención de compra');
        }
    }
};

const completeSaleIntent = async (req, res) => {
    try {
        const { sale_id } = req.params;
     

        const saleIntent = await SaleIntent.findByPk(sale_id);
       
        if (!saleIntent) {
            return res.status(404).json({ message: 'Intención de compra no encontrada' });
        }

       

        saleIntent.status = SALE_INTENT_STATUSES.COMPLETED;
        await saleIntent.save();

       

        res.json({ message: 'Intención de compra completada con éxito' });
    } catch (error) {
        console.error("Error en el controlador:", error);
        res.status(500).send('Error al completar la intención de compra');
    }
};



module.exports = { getAllSaleIntents, cancelSaleIntent, completeSaleIntent };

