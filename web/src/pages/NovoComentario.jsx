import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './NovoComentario.css'; // cria esse arquivo pra estilizar se quiser

function NovoComentario() {
  const [comentario, setComentario] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comentario.trim()) {
      setErro('O comentário não pode ficar vazio.');
      return;
    }

    try {
      await api.post('/comentarios', { texto: comentario });
      navigate('/comentarios'); // volta para a lista de comentários após salvar
    } catch (err) {
      setErro('Erro ao salvar comentário. Tente novamente.');
    }
  };

  return (
    <div className="novo-comentario-container">
      <h2>Novo Comentário</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          placeholder="Digite seu comentário aqui..."
          rows={5}
        />
        {erro && <p className="erro">{erro}</p>}
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default NovoComentario;
