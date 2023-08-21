// pages/login.js
'use client'

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './redux/slice';
import { useRouter } from 'next/navigation';

function LoginComponent() {
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.user.status);
  const userError = useSelector((state) => state.user.error);
  const router = useRouter();

  useEffect(() => {
    if (userStatus === 'succeeded') {
        router.push('/user');
    }
    }, [userStatus]);




  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            className="text-black"
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
            className="text-black"
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>

      {userStatus === 'loading' && <p>Iniciando sesión...</p>}
      {userStatus === 'succeeded' && <p>¡Inicio de sesión exitoso!</p>}
      {userStatus === 'failed' && <p>Error: {userError}</p>}
      <p>No tienes una cuenta? <a href="/register">Regístrate</a></p>
    </div>
  );
}

export default LoginComponent;

