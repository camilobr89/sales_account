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
        router.push('/user');
    }
}, [userStatus]);

return (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="bg-violet-400 p-8 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300 w-96">
      <h2 className="text-2xl font-bold mb-4 text-white">Registro de Usuario</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white">Tag:</label>
          <input 
            type="text" 
            name="tag" 
            value={formData.tag} 
            onChange={handleChange} 
            required 
            className="mt-1 p-2 w-full border rounded-md text-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white">Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            className="mt-1 p-2 w-full border rounded-md text-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white">Contraseña:</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
            className="mt-1 p-2 w-full border rounded-md text-black"
          />
        </div>
        <button type="submit" className="w-full bg-white text-B79CED p-2 rounded-md hover:bg-957FEF hover:text-violet">Registrarse</button>
      </form>

      {userStatus === 'loading' && <p className="mt-4 text-center text-7161EF">Registrando...</p>}
      {userStatus === 'succeeded' && <p className="mt-4 text-center text-green-500">¡Registro exitoso!</p>}
      {userStatus === 'failed' && <p className="mt-4 text-center text-red-500">Error: {userError}</p>}
    </div>
  </div>
);
}

export default RegisterComponent;
