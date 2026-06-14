import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EstilosPagina1.css';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* Título fijo en la parte superior */}
      <h1 className="title">Reporte de Vehículos</h1>

      {/* Logos centrados en el medio */}
      <div className="logos">
        <div className="logo">
          <img src="/NISSAN.ico" alt="Vehículo" />
        </div>
        <div className="logo">
          <img src="/INFORME-V.ico" alt="Reporte" />
        </div>
      </div>

      {/* Botones centrados debajo de los logos */}
      <div className="buttons">
        <button className="btn-anim" onClick={() => navigate('/register')}>
          Registrar
        </button>
        <button className="btn-anim" onClick={() => navigate('/reports')}>
          Ver Reporte
        </button>
      </div>
    </div>
  );
}