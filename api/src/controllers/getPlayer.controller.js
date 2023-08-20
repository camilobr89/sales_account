const axios = require ("axios");
const { Player, SaleIntent } = require ("../db");
const { API_KEY } = process.env;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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



const registerUser = async (req, res) => {
    const { tag, email, password } = req.body;

    try {
        // Verificar si el tag ya está registrado en nuestra base de datos
        const existingUser = await Player.findOne({ where: { tag } });
        if (existingUser) {
            return res.status(400).json({ message: 'El tag ya está registrado en nuestra plataforma' });
        }

        // Verificar si el tag existe en la API de Clash Royale
        if (!tag.startsWith('#')) {
            tag = '#' + tag;
        }
        const url = `https://api.clashroyale.com/v1/players/${encodeURIComponent(tag)}`;
        const options = {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        };
        const response = await axios.get(url, options);

        if (response.data && response.data.tag) {
            // Hashear la contraseña antes de guardarla
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Si el tag existe en la API de Clash Royale, procedemos a registrar al usuario en nuestra base de datos
            const newUser = await Player.create({
                tag,
                email,
                password: hashedPassword
            });

            res.status(201).json(newUser);
        } else {
            res.status(400).json({ message: 'El tag no existe en Clash Royale' });
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            // Si la API de Clash Royale devuelve un error 404, significa que el tag no existe
            res.status(400).json({ message: 'El tag no existe en Clash Royale' });
        } else {
            res.status(500).send('Error al registrar el usuario');
        }
    }
};


// const loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Verificar si el email existe en nuestra base de datos
//         const existingUser = await Player.findOne({ where: { email } });
//         if (!existingUser) {
//             return res.status(400).json({ message: 'El email no está registrado en nuestra plataforma' });
//         }

//         // Verificar si la contraseña es correcta
//         const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
//         if (!isPasswordCorrect) {
//             return res.status(400).json({ message: 'La contraseña es incorrecta' });
//         }

//         // Crear un token de autenticación
//         const token = jwt.sign(
//             { userId: existingUser.player_id, email: existingUser.email },
//             process.env.JWT_SECRET,
//             { expiresIn: '1d' }
//         );

//         // Enviar el token como respuesta
//         res.json({ token });
//     } catch (error) {
//         res.status(500).send('Error al iniciar sesión');

//     }
// };

// const loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Verificar si el email existe en nuestra base de datos
//         const existingUser = await Player.findOne({ where: { email } });
//         if (!existingUser) {
//             return res.status(400).json({ message: 'El email no está registrado en nuestra plataforma' });
//         }

//         // Verificar si la contraseña es correcta
//         const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
//         if (!isPasswordCorrect) {
//             return res.status(400).json({ message: 'La contraseña es incorrecta' });
//         }

//         // Crear un token de autenticación
//         const token = jwt.sign(
//             { userId: existingUser.player_id, email: existingUser.email },
//             process.env.JWT_SECRET,
//             { expiresIn: '1d' }
//         );

//         // Verificar el tag en la API de Clash Royale
//         const tag = existingUser.tag.startsWith('#') ? existingUser.tag : '#' + existingUser.tag;
//         const url = `https://api.clashroyale.com/v1/players/${encodeURIComponent(tag)}`;
//         const options = {
//             headers: {
//                 'Authorization': `Bearer ${API_KEY}`
//             }
//         };
//         const response = await axios.get(url, options);

//         if (response.data && response.data.tag) {
//             // Extraer los datos relevantes de la respuesta de la API
//             const {
//                 name,
//                 expLevel,
//                 trophies,
//                 bestTrophies,
//                 wins,
//                 losses,
//                 battleCount
//             } = response.data;

//             // Combinar los datos del usuario y los datos de la API
//             const userData = {
//                 email: existingUser.email,
//                 tag: existingUser.tag,
//                 name,
//                 expLevel,
//                 trophies,
//                 bestTrophies,
//                 wins,
//                 losses,
//                 battleCount,
//                 token
//             };

//             // Enviar los datos combinados como respuesta
//             res.json(userData);
//         } else {
//             res.status(400).json({ message: 'El tag no existe en Clash Royale' });
//         }
//     } catch (error) {
//         if (error.response && error.response.status === 404) {
//             res.status(400).json({ message: 'El tag no existe en Clash Royale' });
//         } else {
//             res.status(500).send('Error al iniciar sesión');
//         }
//     }
// };

 
module.exports = { getPlayerByTag, registerUser };