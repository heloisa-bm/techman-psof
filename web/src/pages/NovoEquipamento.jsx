import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './NovoEquipamento.css';

function NovoEquipamento() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome.trim() || !descricao.trim()) {
      setErro('Preencha todos os campos.');
      return;
    }

    try {
      await api.post('/equipamentos', { nome, descricao });
      navigate('/equipamentos');
    } catch {
      setErro('Erro ao salvar equipamento.');
    }
  };

  return (
    <div className="novo-equipamento-container">
      <h2>Novo Equipamento</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          rows={4}
        />
        {erro && <p className="error">{erro}</p>}
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default NovoEquipamento;