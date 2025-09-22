import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './Comentarios.css'; // Você pode criar um CSS para estilizar essa página

function Comentarios() {
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchComentarios() {
      try {
        const response = await api.get('/comentarios'); // Ajuste a rota conforme seu backend
        setComentarios(response.data);
      } catch (err) {
        setError('Erro ao carregar comentários');
      } finally {
        setLoading(false);
      }
    }
    fetchComentarios();
  }, []);

  if (loading) return <p>Carregando comentários...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="comentarios-container">
      <h2>Comentários</h2>
      {comentarios.length === 0 ? (
        <p>Nenhum comentário encontrado.</p>
      ) : (
        <ul>
          {comentarios.map((comentario) => (
            <li key={comentario.id}>
              <strong>{comentario.usuario}</strong>: {comentario.texto}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Comentarios;
