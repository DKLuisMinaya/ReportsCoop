import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Carpeta donde Angular deja los archivos compilados
const distFolder = path.join(__dirname, 'dist/WebReport');

// Servir archivos estáticos
app.use(express.static(distFolder));

// Redirigir todas las rutas a index.html (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(distFolder, 'index.html'));
});

// Iniciar el servidor
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
