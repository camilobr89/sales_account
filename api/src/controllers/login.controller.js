const axios = require ("axios");
const { Player, SaleIntent } = require ("../db");
const { API_KEY } = process.env;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el email existe en nuestra base de datos
        const existingUser = await Player.findOne({ where: { email } });
        if (!existingUser) {
            return res.status(400).json({ message: 'El email no está registrado en nuestra plataforma' });
        }

        // Verificar si la contraseña es correcta
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'La contraseña es incorrecta' });
        }

        // Crear un token de autenticación
        const token = jwt.sign(
            { userId: existingUser.player_id, email: existingUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Verificar el tag en la API de Clash Royale
        const tag = existingUser.tag.startsWith('#') ? existingUser.tag : '#' + existingUser.tag;
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
            const userData = {
                email: existingUser.email,
                tag: existingUser.tag,
                name,
                expLevel,
                trophies,
                bestTrophies,
                wins,
                losses,
                battleCount,
                token
            };

            // Enviar los datos combinados como respuesta
            res.json(userData);
        } else {
            res.status(400).json({ message: 'El tag no existe en Clash Royale' });
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(400).json({ message: 'El tag no existe en Clash Royale' });
        } else {
            res.status(500).send('Error al iniciar sesión');
        }
    }
};

 
module.exports = { loginUser };