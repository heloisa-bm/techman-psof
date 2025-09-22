import axios from "axios";

// Instância do axios com baseURL
const api = axios.create({
  baseURL: "http://localhost:5000", // ou https://exemplo.com/api, se for o caso
});

// Função de login usando a instância
export const login = async (password) => {
  try {
    const res = await api.post("/login", { password });
    return res.data;
  } catch (err) {
    console.error("Erro ao conectar no backend:", err);
    throw err;
  }
};

// Exportação padrão da instância
export default api;
