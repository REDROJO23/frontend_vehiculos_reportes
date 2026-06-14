import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/EstilosPagina2.css';

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  // URL del backend en Render
  const API_URL = 'https://backend-vehiculos-reportes.onrender.com/api/reports';

  // Función para formatear fecha a DD/MM/YYYY
  const formatFecha = (valor) => {
    if (!valor) return '';
    const fechaObj = new Date(valor);
    const dia = String(fechaObj.getDate()).padStart(2, '0');
    const mes = String(fechaObj.getMonth() + 1).padStart(2, '0');
    const anio = fechaObj.getFullYear();
    return `${dia}/${mes}/${anio}`;
  };

  // Cargar datos desde el backend
  useEffect(() => {
    axios.get(API_URL)
      .then(res => setReports(res.data))
      .catch(err => console.error("Error al cargar reportes:", err));
  }, []);

  return (
    <div className="page">
      <h1 className="title">Reporte de Vehículos</h1>

      <div className="table-section">
        <table className="table">
          <thead>
            <tr>
              <th>No.econ</th>
              <th>Usuario</th>
              <th>Destino</th>
              <th>Salida</th>
              <th>Entrada</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(r => (
              <tr key={r.id}>
                <td>{r.no_econ}</td>
                <td>{r.usuario}</td>
                <td>{r.destino}</td>
                <td>{r.salida}</td>
                <td>{r.entrada}</td>
                <td>{formatFecha(r.fecha)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="table-buttons">
          <button className="btn-anim" onClick={() => navigate('/')}>Regresar</button>
        </div>
      </div>
    </div>
  );
}
