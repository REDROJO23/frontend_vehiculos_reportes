import React, { useState, useEffect } from 'react';
import '../styles/EstilosPagina2.css';

export default function RegisterPage() {
  const [data, setData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [editRow, setEditRow] = useState(null);

  // Cargar datos desde la BD al iniciar
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/reports');
        const reports = await res.json();
        setData(reports);
      } catch (err) {
        console.error('Error al cargar datos:', err);
      }
    };
    fetchData();
  }, []);

  // Agregar fila desde formulario y guardar en BD
  const addRow = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newRow = {
      no_econ: form.no_econ.value,
      usuario: form.usuario.value,
      destino: form.destino.value,
      salida: form.salida.value,
      entrada: form.entrada.value,
      fecha: form.fecha.value,
    };

    try {
      const res = await fetch('http://localhost:4000/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRow),
      });

      const dataRes = await res.json();
      if (dataRes.message === 'Registro agregado') {
        alert('Registro guardado correctamente');
        setData([...data, dataRes.data]); // usamos el registro devuelto por el backend (incluye id)
        form.reset();
      }
    } catch (err) {
      console.error('Error al guardar en BD:', err);
    }
  };

  // Seleccionar fila
  const selectRow = (index) => {
    setSelectedIndex(index);
  };

  // Abrir ventana de edición
  const openEditForm = () => {
    if (selectedIndex === null) return;
    setEditRow({ ...data[selectedIndex] });
  };

  // Guardar cambios de edición en BD
  const saveEdit = async (e) => {
    e.preventDefault();
    const id = data[selectedIndex].id;
    try {
      const res = await fetch(`http://localhost:4000/api/reports/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editRow),
      });
      const dataRes = await res.json();
      const updated = [...data];
      updated[selectedIndex] = dataRes.data;
      setData(updated);
      setEditRow(null);
      setSelectedIndex(null);
    } catch (err) {
      console.error('Error al actualizar en BD:', err);
    }
  };

  // Eliminar fila seleccionada en BD
  const deleteRow = async () => {
    if (selectedIndex === null) return;
    const id = data[selectedIndex].id;
    try {
      await fetch(`http://localhost:4000/api/reports/${id}`, { method: 'DELETE' });
      const updated = data.filter((_, i) => i !== selectedIndex);
      setData(updated);
      setSelectedIndex(null);
    } catch (err) {
      console.error('Error al eliminar en BD:', err);
    }
  };

  // Normalizar fecha para mostrar solo YYYY-MM-DD
  const formatFecha = (valor) => {
    if (!valor) return '';
    return valor.split('T')[0]; // corta la parte de hora si viene en ISO
  };

  return (
    <div className="page">
      <h1 className="title">Reporte de Vehículos</h1>

      {/* Formulario a la izquierda */}
      <div className="form-section">
        <form id="form-register" onSubmit={addRow}>
          <label>No.econ</label>
          <input type="text" name="no_econ" required />

          <label>Usuario</label>
          <input type="text" name="usuario" required />

          <label>Destino</label>
          <input type="text" name="destino" required />

          <label>Salida</label>
          <input type="text" name="salida" required />

          <label>Entrada</label>
          <input type="text" name="entrada" required />

          <label>Fecha</label>
          <input type="date" name="fecha" required />

          <div className="form-buttons">
            <button type="submit" className="btn-anim">Guardar</button>
            <button type="button" className="btn-anim" onClick={() => window.location.href = '/'}>Regresar</button>
          </div>
        </form>
      </div>

      {/* Tabla a la derecha */}
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
            {data.map((row, index) => (
              <tr
                key={row.id}
                onClick={() => selectRow(index)}
                className={selectedIndex === index ? 'selected' : ''}
              >
                <td>{row.no_econ}</td>
                <td>{row.usuario}</td>
                <td>{row.destino}</td>
                <td>{row.salida}</td> {/* 👀 se muestra tal cual */}
                <td>{row.entrada}</td> {/* 👀 se muestra tal cual */}
                <td>{formatFecha(row.fecha)}</td> {/* 👀 fecha normalizada */}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="table-buttons">
          <button className="btn-anim" onClick={openEditForm}>Modificar</button>
          <button className="btn-anim" onClick={deleteRow}>Eliminar</button>
        </div>
      </div>

      {/* Ventana de edición */}
      {editRow && (
        <div className="edit-modal">
          <form onSubmit={saveEdit} className="edit-form">
            <label>No.econ</label>
            <input type="text" value={editRow.no_econ} onChange={(e) => setEditRow({ ...editRow, no_econ: e.target.value })} />

            <label>Usuario</label>
            <input type="text" value={editRow.usuario} onChange={(e) => setEditRow({ ...editRow, usuario: e.target.value })} />

            <label>Destino</label>
            <input type="text" value={editRow.destino} onChange={(e) => setEditRow({ ...editRow, destino: e.target.value })} />

            <label>Salida</label>
            <input type="text" value={editRow.salida} onChange={(e) => setEditRow({ ...editRow, salida: e.target.value })} />

            <label>Entrada</label>
            <input type="text" value={editRow.entrada} onChange={(e) => setEditRow({ ...editRow, entrada: e.target.value })} />

            <label>Fecha</label>
            <input type="date" value={formatFecha(editRow.fecha)} onChange={(e) => setEditRow({ ...editRow, fecha: e.target.value })} />

            <div className="form-buttons">
              <button type="submit" className="btn-anim">Guardar cambios</button>
              <button type="button" className="btn-anim" onClick={() => setEditRow(null)}>Cancelar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}