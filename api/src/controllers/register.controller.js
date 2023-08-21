const axios = require ("axios");
const { Player, SaleIntent } = require ("../db");
const { API_KEY } = process.env;
const bcrypt = require('bcrypt');


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


 
module.exports = { registerUser };