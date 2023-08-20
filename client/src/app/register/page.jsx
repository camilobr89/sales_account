'use client'

import React, { useState, useEffect, use } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/slice';
import { useRouter } from 'next/navigation';




function RegisterComponent() {
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.user.status);
  const userError = useSelector((state) => state.user.error);
  const router = useRouter();

  const [formData, setFormData] = useState({
    tag: '',
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
    dispatch(registerUser(formData));
  };

  

  useEffect(() => {
    if (userStatus === 'failed' && userError) {
      alert(userError);
    }
}, [userStatus, userError]);

useEffect(() => {
    if (userStatus === 'succeeded') {
        router.push('/');
    }
}, [userStatus]);

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tag:</label>
          <input 
            type="text" 
            name="tag" 
            value={formData.tag} 
            onChange={handleChange} 
            required 
            className="text-black"
          />
        </div>
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
        <button type="submit">Registrarse</button>
      </form>

      {userStatus === 'loading' && <p>Registrando...</p>}
      {userStatus === 'succeeded' && <p>¡Registro exitoso!</p>}
      {userStatus === 'failed' && <p>Error: {userError}</p>}
    </div>
  );
}

export default RegisterComponent;
