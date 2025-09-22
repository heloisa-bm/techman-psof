import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Config para __dirname em ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

// Função para ler CSV e transformar em array de objetos (espera cabeçalho separado por ;)
function lerCSV(nomeArquivo) {
  const filePath = path.join(__dirname, "prisma", nomeArquivo);
  const data = fs.readFileSync(filePath, "utf8").trim();
  const linhas = data.split("\n");
  const cabecalho = linhas.shift().split(";");
  return linhas.map(linha => {
    const valores = linha.split(";");
    const obj = {};
    cabecalho.forEach((chave, i) => {
      obj[chave] = valores[i];
    });
    return obj;
  });
}

// Rota de login
app.post("/login", (req, res) => {
  try {
    const { senha } = req.body;
    const usuarios = lerCSV("usuarios.csv");
    const usuario = usuarios.find(u => u.senha === senha);
    if (usuario) {
      return res.json({ id: usuario.id, perfil: usuario.perfil });
    } else {
      return res.status(401).json({ erro: "Senha incorreta" });
    }
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ erro: "Erro interno no servidor" });
  }
});

// Rota para listar equipamentos
app.get("/equipamentos", (req, res) => {
  try {
    const equipamentos = lerCSV("equipamentos.csv");
    return res.json(equipamentos);
  } catch (error) {
    console.error("Erro ao buscar equipamentos:", error);
    return res.status(500).json({ erro: "Erro interno no servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
