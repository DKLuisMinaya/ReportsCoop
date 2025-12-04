import express from 'express';
import path from 'path';

const app = express();

// Carpeta donde Angular genera los archivos de producción
const distFolder = path.join(path.resolve(), 'dist/WebReport');

// Servir archivos estáticos
app.use(express.static(distFolder));

// Cualquier otra ruta se redirige al index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(distFolder, 'index.html'));
});

// Puerto (Railway asigna el puerto con process.env.PORT)
const PORT = process.env.PORT || 4200;

app.listen(PORT, () => {
  console.log(`Frontend SPA escuchando en el puerto ${PORT}`);
});
