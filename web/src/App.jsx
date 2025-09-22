import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Equipamentos from './pages/equipamentos';
import Comentarios from './pages/Comentarios';
import NovoComentario from './pages/NovoComentario';
import NovoEquipamento from './pages/NovoEquipamento';
import { AuthContext } from './context/Authcontext'; // Importa corretamente

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/equipamentos" /> : <Login />} />
        <Route path="/equipamentos" element={user ? <Equipamentos /> : <Navigate to="/" />} />
        <Route path="/comentarios/:equipamentoId" element={user ? <Comentarios /> : <Navigate to="/" />} />
        <Route path="/novo-comentario/:equipamentoId" element={user ? <NovoComentario /> : <Navigate to="/" />} />
        <Route path="/novo-equipamento" element={user ? <NovoEquipamento /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
export default App

