import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/Authcontext';
import TecladoVirtual from '../components/TecladoVirtual';
import './Login.css';
import techmanLogo from '../assets/techman.png'; // 👈 importando a imagem

export default function Login() {
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleClickNumero = (num) => {
    if (senha.length < 6) {
      setSenha(senha + num);
    }
  };

  const handleClear = () => {
    setSenha('');
    setErro('');
  };

  const handleLogin = async () => {
    try {
      const response = await api.post('/login', { senha });
      login(response.data);
      navigate('/equipamentos');
    } catch (error) {
      setErro('ERRO: Senha incorreta.');
      setSenha('');
    }
  };

  return (
    <div className="login-container">
      <img src={techmanLogo} alt="Logo Techman" className="logo" /> {/* 👈 usando a imagem importada */}

      <div className="senha-campo">
        {senha.split('').map((_, i) => (
          <span key={i}>*</span>
        ))}
      </div>

      <TecladoVirtual onClick={handleClickNumero} onClear={handleClear} />

      <button
        onClick={handleLogin}
        disabled={senha.length !== 6}
        className="entrar-btn"
      >
        Entrar
      </button>

      {erro && <p className="erro">{erro}</p>}
    </div>
  );
}
