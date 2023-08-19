// pages/register.js

import React from 'react';

const RegisterPage = () => {
    return (
        <div>
            <h1>Registro</h1>
            <form>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" required />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input type="password" name="password" required />
                </div>
                <div>
                    <label>Confirmar contraseña:</label>
                    <input type="password" name="confirmPassword" required />
                </div>
                <button type="submit">Registrarse</button>
            </form>
            <p>Ya tienes una cuenta? <a href="/login">Iniciar sesión</a></p>
        </div>
    );
}

export default RegisterPage;
