## README: Casa de Videojuegos - Intercambio de Cuentas de Jugadores

### Descripción

Una casa de videojuegos ha decidido permitir a sus jugadores visualizar datos específicos de uno de sus juegos más populares, Clash Royale. Además, se ha habilitado una opción donde los jugadores pueden vender sus cuentas de manera segura entre ellos. Este proyecto se basa en la construcción de una solución que permita a los jugadores consultar datos de su cuenta y registrar su intención de venderla.

### Arquitectura Digital de la Solución

1. **Web Front**:
   - Tecnología utilizada: React.
   - Funcionalidades: Permite consultar un jugador y registrar la intención de venta.

2. **clash-royale-api**:
   - API externa que proporciona datos sobre los jugadores de Clash Royale.
   - Se requiere una cuenta de desarrollador para acceder a las API.

3. **Registry-sales-mngr**:
   - API construida en Node.js.
   - Funcionalidades: Registrar la intención de venta de un jugador para que otros jugadores puedan verla.

### Tecnologías Utilizadas

- **Frontend**: React, JS/HTML/CSS/Tailwing.
- **Backend**: Node.js.
- **APIs**: Clash Royale API.
- **Otras herramientas**: Redux para el manejo del estado, Next.js para el enrutamiento y axios para las solicitudes HTTP.

### Cómo ponerlo en marcha

1. **Configuración inicial**:
   - Clona el repositorio en tu máquina local.
   - Instala las dependencias usando `npm install` en la carpeta de api y client.

2. **Configuración de las API**:
   - Regístrate en la [API de Clash Royale](https://developer.clashroyale.com/) y obtén tu API_KEY.
   - Añade tu API_KEY o tus variables de entorno al archivo `.env` en la raíz de la carpeta api.

3. **Ejecución**:
   - Ejecuta el servidor de desarrollo para backend usando `npm start` estando ubicado en la carpeta api.
   - consulta tu api por la ruta `http://localhost:3001`.
   - Ejecuta el servidor de desarrollo para frontend usando `npm run dev` o `yarn dev` estando ubicado en la carpeta client.
   - Abre tu navegador y navega a `http://localhost:3000`.

4. **Uso**:
   - En la página principal, los jugadores pueden iniciar sesión o registrarse con su tag de jugador.
   - También pueden registrar su intención de vender su cuenta, lo que se mostrará a otros jugadores.
   - Los jugadores pueden ver una lista de cuentas en venta y decidir comprar una cuenta o cancelar su intención de venta.



Este README proporciona una visión general del proyecto y cómo ponerlo en marcha. Si tienes alguna pregunta o inquietud, no dudes en preguntar. ¡Buena suerte con tu proyecto!