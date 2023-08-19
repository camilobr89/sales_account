// pages/login.js

import React from 'react';

const LoginPage = () => {
    return (
        <div>
            <h1>Iniciar sesión</h1>
            <form>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" required />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input type="password" name="password" required />
                </div>
                <button type="submit">Iniciar sesión</button>
            </form>
            <p>No tienes una cuenta? <a href="/register">Regístrate</a></p>
        </div>
    );
}

export default LoginPage;
