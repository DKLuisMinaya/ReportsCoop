import express from 'express';
import { join } from 'path';

const app = express();
const PORT = process.env.PORT || 4200;
const DIST_FOLDER = join(process.cwd(), 'dist/WebReport'); // carpeta de tu build SPA

// Servir archivos estáticos
app.use(express.static(DIST_FOLDER));

// Todas las demás rutas deben devolver index.html
app.get('/*', (req, res) => {
  res.sendFile(join(DIST_FOLDER, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor SPA escuchando en puerto ${PORT}`);
});
