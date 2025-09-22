import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/Authcontext";
import "./equipamentos.css";

function Equipamentos() {
  const [equipamentos, setEquipamentos] = useState([]);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); // 👈 pega o logout do contexto

  useEffect(() => {
    api.get("/equipamentos")
      .then((response) => {
        setEquipamentos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar equipamentos:", error);
      });
  }, []);

  const handleNovoEquipamento = () => {
    navigate("/novo-equipamento");
  };

  const handleVerComentarios = (equipamentoId) => {
    navigate(`/comentarios/${equipamentoId}`);
  };

  const handleLogout = () => {
    logout();           // 👈 limpa o login do contexto e do localStorage
    navigate("/");      // 👈 volta para a tela de senha (login)
  };

  return (
    <div className="equipamentos-container">
      <h1>Equipamentos</h1>

      <div className="botoes-topo">
        <button onClick={handleNovoEquipamento}>Novo Equipamento</button>
        <button onClick={handleLogout}>Sair</button> {/* 👈 botão de sair */}
      </div>

      <ul>
        {equipamentos.map((equip) => (
          <li key={equip.id}>
            <strong>{equip.nome}</strong> - {equip.tipo}
            <button onClick={() => handleVerComentarios(equip.id)}>
              Ver Comentários
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Equipamentos;
