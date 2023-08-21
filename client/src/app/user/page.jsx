'use client'

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, createSaleIntent } from '../redux/slice';
import { useRouter } from 'next/navigation';
import { fetchSaleIntents, completeSaleIntent } from '../redux/saleIntentsSlice';


function UserComponent() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('userInfo');
  const user = useSelector((state) => state.user.user);
  const saleIntents = useSelector((state) => state.saleIntents.list);

  const router = useRouter();

  if (!user) {
    return <p>No hay información del usuario disponible.</p>;
  }

  const handleCancelIntent = (intentId) => {
    dispatch(cancelSaleIntent(intentId));
};

const handleCompleteIntent = (intentId) => {
    dispatch(completeSaleIntent(intentId));
};

  const handleLogout = () => {
    dispatch(logout()),
    router.push('/');
  };

  
  const handlePurchaseIntent = () => {
    const enteredPrice = prompt("Por favor, ingresa el precio al que deseas vender tu cuenta:");

    if (enteredPrice) {
        const price = parseInt(enteredPrice, 10);
        if (!isNaN(price)) {
            // Despacha la acción con los datos necesarios
           
            dispatch(createSaleIntent({ playerPlayerId: user.playerPlayerId, price }));
        } else {
            alert("Por favor, ingresa un número válido para el precio.");
        }
    }
};

useEffect(() => {
  if (activeTab === 'salesList') {
    dispatch(fetchSaleIntents());
  }
}, [activeTab, dispatch]);



  return (
    <div>
      <h2>Bienvenido</h2>

      <button onClick={handleLogout}>Cerrar sesión</button>
      <button onClick={handlePurchaseIntent}>Intención de compra</button>

      <div className="tabs">
        <button onClick={() => setActiveTab('userInfo')}>Información del usuario</button>
        <button onClick={() => setActiveTab('salesList')}>Lista de cuentas en venta</button>
      </div>

      {activeTab === 'userInfo' && (
        <div className="tab-content">
          {/* Aquí puedes mostrar la información del usuario */}
          <p>Información del usuario...</p>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <div>
            <strong>Tag:</strong> {user.tag}
          </div>
          <div>
            <strong>Nombre:</strong> {user.name}
          </div>
          <div>
            <strong>Nivel de experiencia:</strong> {user.expLevel}
          </div>
          <div>
            <strong>Trofeos:</strong> {user.trophies}
          </div>
          <div>
            <strong>Mejores Trofeos:</strong> {user.bestTrophies}
          </div>
          <div>
            <strong>Victorias:</strong> {user.wins}
          </div>
          <div>
            <strong>Derrotas:</strong> {user.losses}
          </div>
          <div>
            <strong>Total de batallas:</strong> {user.battleCount}
          </div>
        </div>

        

      )}

      {activeTab === 'salesList' && (
        <div className="tab-content">
          <p>Lista de cuentas en venta:</p>
          {saleIntents.map((intent) => (
            <div key={intent.name}>
              <strong>Nombre:</strong> {intent.name}
              <br />
              <strong>Precio:</strong> {intent.price}
              <br />
              <strong>Estado:</strong> {intent.status}
              <br />
              {user.name === intent.name ? (
                <button onClick={() => handleCancelIntent(intent.id)}>Cancelar</button>
              ) : (
                <button onClick={() => handleCompleteIntent(intent.id)}>Comprar</button>
              )}
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .tabs {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }
        .tab-content {
          border: 1px solid #ccc;
          padding: 20px;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}

export default UserComponent;
