import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 4000;

const DIST_FOLDER = path.join(__dirname, 'dist', 'WebReport', 'browser');

// Servir archivos estáticos
app.use(express.static(DIST_FOLDER));


app.use((req, res) => {
  res.sendFile(path.join(DIST_FOLDER, 'index.csr.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});