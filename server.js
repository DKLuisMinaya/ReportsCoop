import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carpeta de distribución Angular
const DIST_FOLDER = path.join(__dirname, 'dist/WebReport');

const app = express();
const PORT = process.env.PORT || 4000;

// Servir archivos estáticos (JS, CSS, assets)
app.use(express.static(DIST_FOLDER));

// Todas las demás rutas devuelven index.html (SPA routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_FOLDER, 'index.csr.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor Express para SPA Angular escuchando en http://localhost:${PORT}`);
});
