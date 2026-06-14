import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FormRegister({ onAdd }) {
  const [form, setForm] = useState({ no_econ:'', usuario:'', destino:'', salida:'', entrada:'', fecha:'' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = () => { onAdd(form); setForm({ no_econ:'', usuario:'', destino:'', salida:'', entrada:'', fecha:'' }); };

  return (
    <div>
      <input name="no_econ" placeholder="No.econ" value={form.no_econ} onChange={handleChange}/>
      <input name="usuario" placeholder="Usuario" value={form.usuario} onChange={handleChange}/>
      <input name="destino" placeholder="Destino" value={form.destino} onChange={handleChange}/>
      <input name="salida" placeholder="Salida" value={form.salida} onChange={handleChange}/>
      <input name="entrada" placeholder="Entrada" value={form.entrada} onChange={handleChange}/>
      <input type="date" name="fecha" value={form.fecha} onChange={handleChange}/>
      <button onClick={handleSubmit}>Guardar</button>
      <button onClick={() => navigate('/')}>Regresar</button>
    </div>
  );
}