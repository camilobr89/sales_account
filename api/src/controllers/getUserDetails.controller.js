const axios = require ("axios");
const { Player, SaleIntent } = require ("../db");
const { API_KEY } = process.env;



const getUserDetailsBySaleId = async (req, res) => {
    const { sale_id } = req.params; // Asumiendo que pasas el sale_id como un parámetro en la URL
    console.log(sale_id);

    try {
        // Obtener el saleIntent de la base de datos usando sale_id
        const saleIntent = await SaleIntent.findByPk(sale_id);
        if (!saleIntent) {
            return res.status(404).json({ message: 'Intención de venta no encontrada' });
        }

        console.log(saleIntent);

        // Obtener el usuario asociado a ese saleIntent
        const user = await Player.findByPk(saleIntent.playerPlayerId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar el tag en la API de Clash Royale
        const tag = user.tag.startsWith('#') ? user.tag : '#' + user.tag;
        const url = `https://api.clashroyale.com/v1/players/${encodeURIComponent(tag)}`;
        const options = {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        };
        const response = await axios.get(url, options);

        if (response.data && response.data.tag) {
            // Extraer los datos relevantes de la respuesta de la API
            const {
                name,
                expLevel,
                trophies,
                bestTrophies,
                wins,
                losses,
                battleCount
            } = response.data;

            // Combinar los datos del usuario y los datos de la API
            const userDetails = {
                email: user.email,
                tag: user.tag,
                name,
                expLevel,
                trophies,
                bestTrophies,
                wins,
                losses,
                battleCount
            };

            // Enviar los datos combinados como respuesta
            res.json(userDetails);
        } else {
            res.status(400).json({ message: 'El tag no existe en Clash Royale' });
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(400).json({ message: 'El tag no existe en Clash Royale' });
        } else {
            res.status(500).send('Error al obtener detalles del usuario');
        }
    }
};

module.exports = { getUserDetailsBySaleId };
