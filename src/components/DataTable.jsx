import React, { useState } from 'react';
import axios from 'axios';

export default function DataTable({ data, setData }) {
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({});

  const deleteRow = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditForm(data[index]);
  };

  const saveEdit = () => {
    const newData = [...data];
    newData[editIndex] = editForm;
    setData(newData);
    setEditIndex(null);
  };

  const saveToDB = async (row) => {
    try {
      await axios.post('http://localhost:4000/api/reports', row);
      alert("Registro guardado en la base de datos");
    } catch (error) {
      console.error("Error al guardar en BD:", error);
      alert("Error al guardar en BD");
    }
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>No.econ</th><th>Usuario</th><th>Destino</th>
            <th>Salida</th><th>Entrada</th><th>Fecha</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td>{row.no_econ}</td>
              <td>{row.usuario}</td>
              <td>{row.destino}</td>
              <td>{row.salida}</td>
              <td>{row.entrada}</td>
              <td>{row.fecha}</td>
              <td>
                <button onClick={() => startEdit(i)}>Modificar</button>
                <button onClick={() => deleteRow(i)}>Eliminar</button>
                <button onClick={() => saveToDB(row)}>Guardar en BD</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editIndex !== null && (
        <div>
          <h3>Editar Registro</h3>
          <input name="no_econ" value={editForm.no_econ} onChange={(e)=>setEditForm({...editForm,no_econ:e.target.value})}/>
          <input name="usuario" value={editForm.usuario} onChange={(e)=>setEditForm({...editForm,usuario:e.target.value})}/>
          <input name="destino" value={editForm.destino} onChange={(e)=>setEditForm({...editForm,destino:e.target.value})}/>
          <input name="salida" value={editForm.salida} onChange={(e)=>setEditForm({...editForm,salida:e.target.value})}/>
          <input name="entrada" value={editForm.entrada} onChange={(e)=>setEditForm({...editForm,entrada:e.target.value})}/>
          <input type="date" name="fecha" value={editForm.fecha} onChange={(e)=>setEditForm({...editForm,fecha:e.target.value})}/>
          <button onClick={saveEdit}>Guardar Cambios</button>
        </div>
      )}
    </div>
  );
}