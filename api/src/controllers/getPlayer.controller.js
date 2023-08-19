const axios = require ("axios");
const { Player, SaleIntent } = require ("../db");
const { API_KEY } = process.env;

// const getAllPlayers = async (req, res) => {
//     try {
//         // Define la URL y las opciones de la solicitud
//         const url = 'https://api.clashroyale.com/v1/'; // Asegúrate de que esta es la URL correcta
//         const options = {
//             headers: {
//                 'Authorization': `Bearer ${API_KEY}`
//             }
//         };

//         // Realiza la solicitud a la API de Clash Royale
//         const response = await axios.get(url, options);

//         // Envía los datos obtenidos como respuesta
//         res.json(response.data);
//     } catch (error) {
//         console.error('Error al obtener datos de Clash Royale API:', error);
//         res.status(500).send('Error al obtener datos de Clash Royale API');
//     }
// };

const getPlayerByTag = async (req, res) => {
    try {
        let playerTag = req.params.tag; 

        // Asegurarse de que el tag del jugador comience con el carácter '#'
        if (!playerTag.startsWith('#')) {
            playerTag = '#' + playerTag;
        }

        // Define la URL y las opciones de la solicitud
        const url = `https://api.clashroyale.com/v1/players/${encodeURIComponent(playerTag)}`; // Usa encodeURIComponent para codificar correctamente el tag
        const options = {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        };

        // Realiza la solicitud a la API de Clash Royale
        const response = await axios.get(url, options);

        // Envía los datos obtenidos como respuesta
        res.json(response.data);
    } catch (error) {
        console.error('Error al obtener datos de Clash Royale API:', error);
        res.status(500).send('Error al obtener datos de Clash Royale API');
    }
};

module.exports = { getPlayerByTag };