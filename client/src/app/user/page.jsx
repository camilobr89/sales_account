'use client'

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, createSaleIntent } from '../redux/slice';
import { useRouter } from 'next/navigation';
import { fetchSaleIntents, completeSaleIntent, cancelSaleIntent } from '../redux/saleIntentsSlice';
import { fetchUserDetails } from '../redux/userDetailsSlice';


function UserComponent() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('userInfo');
  const user = useSelector((state) => state.user.user);
  const saleIntents = useSelector((state) => state.saleIntents.list);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enteredPrice, setEnteredPrice] = useState("");
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);

  const userDetails = useSelector((state) => state.userDetails.user); 
  const userDetailsStatus = useSelector((state) => state.userDetails.status); 


  const router = useRouter();


  const handleUserDetails = (intent) => {
    console.log(intent);
    dispatch(fetchUserDetails(intent.sale_id));
    setIsDetailsModalOpen(true);
};

  

  

  const handleCancelIntent = (intentId) => {
    dispatch(cancelSaleIntent(intentId));
};

const handleCompleteIntent = (intentId) => {
    dispatch(completeSaleIntent(intentId));
};

  const handleLogout = () => {
    dispatch(logout())
    router.push('/')
  };

  
  const handlePurchaseIntent = () => {
    setIsModalOpen(true);
  };


useEffect(() => {
  if (activeTab === 'salesList') {
    dispatch(fetchSaleIntents());
  }
}, [activeTab, dispatch]);


if (!user) {
  return <p>No hay información del usuario disponible.</p>;
}

return (
  <div className="min-h-screen flex items-center justify-center bg-violet-400">
    <div className="bg-white p-8 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300 w-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-4 text-white text-center">Bienvenido</h2>

      <div className="flex justify-between mb-4">
        <button onClick={handleLogout} className="bg-white text-B79CED p-2 rounded-md hover:bg-957FEF hover:text-black">Cerrar sesión</button>
        <button onClick={handlePurchaseIntent} className="bg-white text-B79CED p-2 rounded-md hover:bg-957FEF hover:text-black">Intención de venta</button>
      </div>

      <div className="flex justify-between mb-4">
        <button onClick={() => setActiveTab('userInfo')} className="bg-white text-B79CED p-2 rounded-md hover:bg-957FEF hover:text-black">Información del usuario</button>
        <button onClick={() => setActiveTab('salesList')} className="bg-white text-B79CED p-2 rounded-md hover:bg-957FEF hover:text-black">Lista de cuentas en venta</button>
      </div>

    
      {isModalOpen && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white p-8 rounded-md shadow-lg">
          <p className="mb-4">Por favor, ingresa el precio al que deseas vender tu cuenta:</p>
          <input type="number" value={enteredPrice} onChange={(e) => setEnteredPrice(e.target.value)} className="border p-2 rounded-md mb-4 w-full" />
          <div className="flex justify-between">
            <button 
              onClick={() => {
                const price = parseInt(enteredPrice, 10);
                if (!isNaN(price)) {
                  dispatch(createSaleIntent({ playerPlayerId: user.playerPlayerId, price }));
                  setIsModalOpen(false);
                } else {
                  alert("Por favor, ingresa un número válido para el precio.");
                }
              }}
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Confirmar
            </button>
            <button 
              onClick={() => setIsModalOpen(false)}
              className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    )}



      {activeTab === 'userInfo' && (
        <div className="bg-white p-4 rounded-md">
          <p className="mb-4 font-medium text-center">Información del usuario</p>
          <table className="min-w-full">
            <tbody>
              <tr><td>Email:</td><td>{user.email}</td></tr>
              <tr><td>Tag:</td><td>{user.tag}</td></tr>
              <tr><td>Nombre:</td><td>{user.name}</td></tr>
              <tr><td>Nivel de experiencia:</td><td>{user.expLevel}</td></tr>
              <tr><td>Trofeos:</td><td>{user.trophies}</td></tr>
              <tr><td>Mejores Trofeos:</td><td>{user.bestTrophies}</td></tr>
              <tr><td>Victorias:</td><td>{user.wins}</td></tr>
              <tr><td>Derrotas:</td><td>{user.losses}</td></tr>
              <tr><td>Total de batallas:</td><td>{user.battleCount}</td></tr>
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'salesList' && (
        <div className="bg-white p-4 rounded-md">
          <p className="mb-4 font-medium text-center">Lista de cuentas en venta</p>
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Nombre</th>
                <th className="border px-4 py-2">Precio</th>
                <th className="border px-4 py-2">Estado</th>
                <th className="border px-4 py-2">Acción</th>
              </tr>
            </thead>
            <tbody>
              {saleIntents.map((intent) => (
                <tr key={intent.sale_id} onClick={() => handleUserDetails(intent)} className="cursor-pointer">
                  <td className="border px-4 py-2">{intent.name}</td>
                  <td className="border px-4 py-2">{intent.price}</td>
                  <td className="border px-4 py-2">{intent.status}</td>
                  <td className="border px-4 py-2">
                    {user.name === intent.name ? (
                      <button onClick={(e) => { e.stopPropagation(); handleCancelIntent(intent.sale_id); }} className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600">Cancelar</button>

                    ) : (
                      intent.status !== 'Cancelada' && <button onClick={(e) => { e.stopPropagation(); handleCompleteIntent(intent.sale_id); }} className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600">Comprar</button>

                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}


{isDetailsModalOpen && userDetails && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
    <div className="bg-white p-8 rounded-md shadow-lg">
      <h3 className="text-xl font-bold mb-4">Detalles del Usuario</h3>
      <p>Email: {userDetails.email}</p>
      <p>Tag: {userDetails.tag}</p>
      <p>Nombre: {userDetails.name}</p>
      <p>Nivel de experiencia: {userDetails.expLevel}</p>
      <p>Trofeos: {userDetails.trophies}</p>
      <p>Mejores Trofeos: {userDetails.bestTrophies}</p>
      <p>Victorias: {userDetails.wins}</p>
      <p>Derrotas: {userDetails.losses}</p>
      <button onClick={() => setIsDetailsModalOpen(false)} className="mt-4 bg-red-500 text-white p-2 rounded-md hover:bg-red-600">Cerrar</button>
    </div>
  </div>
)}





    </div>
  </div>
);
}


export default UserComponent;
